function phoneMask(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})$/, '$1-$2')
}

function moneyMask(value: string): string {
  const numericValue = value.replace(/\D/g, '')

  const cents = parseInt(numericValue, 10)

  const formattedValue = (cents / 100)
    .toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
    .replace('R$', '')
    .trim()

  return formattedValue
}

export const MaskUtils = {
  phoneMask,
  moneyMask
}
