export class CardImage {
  #name: string
  #zIndex: number
  #scale?: number
  #offset?: [number, number]
  #rotation?: number

  constructor(name:string, zIndex:number) {
    this.#name = name
    this.#zIndex = zIndex
  }
}