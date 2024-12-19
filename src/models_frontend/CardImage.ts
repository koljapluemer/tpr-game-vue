export type CardImage = {
  name: string
  zIndex: number
  scale: number
  offset: [number, number]
  rotation: number
}

export function createDefaultCardImage(name:string):CardImage {
  return {
    name: name,
    zIndex: 1,
    scale: 1,
    offset: [0, 0],
    rotation: 0
  }
}