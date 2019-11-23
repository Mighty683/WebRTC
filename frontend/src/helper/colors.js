
const colors = ['#f7a504', '#A7B543', '#F7B317', '#C25E07', '#C36E2C', '#806D3C', '#DD9449', '#E7B932', '#296078', '#1F585B'];

export function getColor (parentColor) {
  let colorsWithoutParent = colors.filter(color => color !== parentColor)
  return colorsWithoutParent[Math.floor(Math.random() * colorsWithoutParent.length)]
}