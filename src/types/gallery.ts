// Gallery data types

export interface ImagePair {
  id: string
  mainImage: string
  namesImage: string
}

export interface CreaturesSeries {
  id: string
  title: string
  emblem: string | null
  pairs: ImagePair[]
}

export interface SimpleImage {
  id: string
  path: string
  title: string
}

export interface GalleryData {
  creatures: CreaturesSeries[]
  artomat: SimpleImage[]
  circles: SimpleImage[]
  sketchbook: SimpleImage[]
  other: SimpleImage[]
}
