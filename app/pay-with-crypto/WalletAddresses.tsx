"use client";

import { useMemo, useState } from "react";

interface WalletEntry {
  label: string;
  chain: string;
  address: string;
  recommended?: boolean;
}

const WALLET_ADDRESSES: WalletEntry[] = [
  {
    label: "Tether (USDT) — TRC-20",
    chain: "Tron",
    address: "TZHynj19n7utakfek7MYGnkV6ry96vMBCf",
    recommended: true,
  },
  {
    label: "Bitcoin (BTC) — Bitcoin Network",
    chain: "Bitcoin",
    address: "bc1qjqjwvhqunfdgxeq8qfg98az658nalqmsstpdgr",
  },
  {
    label: "Tether (USDT) — BEP-20",
    chain: "BNB Smart Chain",
    address: "0x5e1918D9D2e36eeB322B9870d7413aD9131B6522",
  },
  {
    label: "Tether (USDT) — ERC-20",
    chain: "Ethereum",
    address: "0x5e1918D9D2e36eeB322B9870d7413aD9131B6522",
  },
  {
    label: "Ethereum (ETH) — ERC-20",
    chain: "Ethereum",
    address: "0x5e1918D9D2e36eeB322B9870d7413aD9131B6522",
  },
];

export default function WalletAddresses({ email }: { email: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(address);
      setTimeout(() => setCopied(null), 2400);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  const memoEmail = useMemo(() => email, [email]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Pay with crypto for your current order</h2>
      <p className=" mb-6">
        Select your Network, copy the address, and send funds to the matching network.
      </p>

      <p className="mb-2">
        After sending funds, please email <strong>{memoEmail}</strong> with:
      </p>
      <ul className="list-disc list-inside space-y-1 mb-6">
        <li>Transaction ID / hash</li>
        <li>A screenshot of the completed transfer</li>
        <li>Your order number / name</li>
      </ul>

      <div className="grid gap-4">
        {WALLET_ADDRESSES.map((wallet) => (
          <div
            key={wallet.address}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">{wallet.label}</p>
                  {wallet.recommended ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                      Recommended
                    </span>
                  ) : null}
                </div>
                <p className="text-xs text-slate-500">Chain: {wallet.chain}</p>
              </div>
              <button
                onClick={() => copyAddress(wallet.address)}
                className="self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Copy Address
              </button>
            </div>

            <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 break-all">
              {wallet.address}
            </div>

            {copied === wallet.address ? (
              <p className="mt-2 text-sm text-green-700">Copied to clipboard!</p>
            ) : null}
          </div>
        ))}
      </div>


    </>
  );
}
