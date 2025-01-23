function formatToReal(value: number): string {
  return value
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    .replace('R$', '')
    .trim()
}

function parseMoney(value: string): number {
  return Number(value.replaceAll('.', '').replace(',', '.'))
}

export const NumberUtils = {
  formatToReal,
  parseMoney
}
