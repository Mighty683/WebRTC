
const colors = ['#fff', '#f0f', '#ff0', '#0ff'];

export function getColor (parentColor) {
  let colorsWithoutParent = colors.filter(color => color !== parentColor)
  return colorsWithoutParent[Math.floor(Math.random() * colorsWithoutParent.length)]
}