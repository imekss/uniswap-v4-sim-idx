export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function isValidChainId(chain: string): boolean {
  return Number.isInteger(Number(chain)) && Number(chain) > 0;
}