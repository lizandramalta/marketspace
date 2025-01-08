export function formatToReal(value: number): string {
  return value
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    .replace('R$', '')
    .trim()
}

export const NumberUtils = {
  formatToReal
}
