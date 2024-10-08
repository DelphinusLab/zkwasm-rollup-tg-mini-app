import { TonConnectUI } from "@tonconnect/ui-react";
import { BN } from "bn.js";
import { CurveField, Point, PrivateKey, bnToHexLe } from "delphinus-curves/src/altjubjub";

function zkWasmMiniRollupSendUrl() {
  // TODO
  return "______________/send";
}

function deriveL2Account(ton: TonConnectUI) {
  const l1address = ton.account?.address;

  // TODO: Use address as msg and sign the msg
  // const sig = ton.sign(l1address);

  // TODO: derive L2Address from sig
  // const l2address = sig.substring(sig, _);

  return "fffffffffffffff"
}

function sign(cmd: Array<bigint>, ton: TonConnectUI) {
  const l2address = deriveL2Account(ton);
  // signning a [u64; 4] message with private key
  const pkey = PrivateKey.fromString(l2address);
  const r = pkey.r();
  const R = Point.base.mul(r);
  const H = cmd[0] + (cmd[1] << 64n) + (cmd[2] << 128n) + (cmd[3] << 196n);
  const hbn = new BN(H.toString(10));
  const S = r.add(pkey.key.mul(new CurveField(hbn)));
  const pubkey = pkey.publicKey;

  return {
    msg: bnToHexLe(hbn),
    pkx: bnToHexLe(pubkey.key.x.v),
    pky: bnToHexLe(pubkey.key.y.v),
    sigx: bnToHexLe(R.x.v),
    sigy: bnToHexLe(R.y.v),
    sigr: bnToHexLe(S.v),
  };
}

// TODO
export const signAndSend = async (cmd: Array<bigint>, ton: TonConnectUI) => {
  const sig = sign(cmd, ton);

  const response = await fetch(zkWasmMiniRollupSendUrl(), {
    method: 'POST',
    body: JSON.stringify(sig),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
  });

  const { data } = await response.json();

  if (!response.ok) {/* handle exception */ }

  return data?.jobid;
}

// TODO: delete when completing signAndSend
export const signAndSendMock = async (cmd: Array<bigint>, ton: TonConnectUI) => {
  return 999;
}