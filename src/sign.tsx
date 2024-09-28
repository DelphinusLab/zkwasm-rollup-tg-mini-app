import { TonConnectUI } from "@tonconnect/ui-react";
import { BN } from "bn.js";
import { CurveField, Point, PrivateKey, bnToHexLe } from "delphinus-curves/src/altjubjub";
import { SignMessageMutateAsync } from "wagmi/query";

function zkWasmMiniRollupSendUrl() {
  // TODO
  return "______________/send";
}

async function signGetL2Address(l1address: string, signMessage: SignMessageMutateAsync<any>) {
  const signature = await signMessage({ message: l1address });

  // TODO: derive L2Address from sig
  // const l2address = sig.substring(signature, _);

  return signature;
}

export const signAndSend = async (cmd: Array<bigint>, l1address: string, signMessage: SignMessageMutateAsync<any>) => {
  const l2address = await signGetL2Address(l1address, signMessage);

  const pkey = PrivateKey.fromString(l2address.toString());
  const r = pkey.r();
  const R = Point.base.mul(r);
  const H = cmd[0] + (cmd[1] << 64n) + (cmd[2] << 128n) + (cmd[3] << 196n);
  const hbn = new BN(H.toString(10));
  const S = r.add(pkey.key.mul(new CurveField(hbn)));
  const pubkey = pkey.publicKey;
  const request = {
    msg: bnToHexLe(hbn),
    pkx: bnToHexLe(pubkey.key.x.v),
    pky: bnToHexLe(pubkey.key.y.v),
    sigx: bnToHexLe(R.x.v),
    sigy: bnToHexLe(R.y.v),
    sigr: bnToHexLe(S.v),
  };

  const response = await fetch(zkWasmMiniRollupSendUrl(), {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
  });

  const { data } = await response.json();

  if (!response.ok) { return null }

  return data?.jobid;
}

// TODO: delete when completing signAndSend
export const signAndSendMock = async (cmd: Array<bigint>, l1address: string, signMessage: SignMessageMutateAsync<any>) => {
  return 999;
}