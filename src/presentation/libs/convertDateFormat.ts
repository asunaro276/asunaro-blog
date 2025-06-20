export const convertDateFormat = (date: string | null) => {
  console.log(date)
  if (date === null) {
    return ''
  }
  const date_converted = date.split('-')
  return `${date_converted[0]}.${date_converted[1]}.${date_converted[2].split('T')[0]}`
}
