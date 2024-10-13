class RestauranteClass {
  image: string
  title: string
  description: string
  score: number
  id: number
  infos: string[]

  constructor(
    image: string,
    title: string,
    description: string,
    score: number,
    id: number,
    infos: string[]
  ) {
    this.image = image
    this.title = title
    this.description = description
    this.score = score
    this.id = id
    this.infos = infos
  }
}

export default RestauranteClass
