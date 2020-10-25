// изменение окончания
export function changeEnding(str, value) {
  if (!str.includes(' ') && !str.includes('комплект')) {
    return (str = str.slice(0, -1) + value)
  }

  return str
}

// добавление строкого модификатора
export function addMod(url) {
  const urlMod = url.split('.')
  urlMod[urlMod.length - 2] += '_220x220_1'
  return urlMod.join('.')
}
