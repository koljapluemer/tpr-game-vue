export class CardImage {
  #name: string
  #zIndex: number
  #scale: number = 1
  #offset: [number, number] = [0, 0]
  #rotation: number = 1

  get scale() {
    return this.#scale
  }

  get rotation() {
    return this.#rotation
  }

  get name() {
    return this.#name
  }

  get zIndex() {
    return this.#zIndex
  }

  get offset() {
    return this.#offset
  }

  constructor(name: string, zIndex: number) {
    this.#name = name
    this.#zIndex = zIndex
  }
}