export default function formatNumber(value) {
  if (value) {
    const numberValue = parseFloat(value)
    return isNaN(numberValue) ? '' : numberValue.toFixed(2)
  }
  return ''
}
