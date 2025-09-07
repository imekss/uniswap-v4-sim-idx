export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidChainId(chain: string): boolean {
  return Number.isInteger(Number(chain)) && Number(chain) > 0;
}

export function toIsoFromSeconds(ts: string | number): string {
  return new Date(Number(ts) * 1000).toISOString();
}

export function toIsoFromMillis(ts: string | number): string {
  return new Date(Number(ts)).toISOString();
}