export interface Category {
  id: number;
  name: string;
}

export interface VideoFormat{
  res: string;
  size:number
}
export interface Video {
  id: number;
  catIds: number[];
  name: string;
  releaseDate: string;
  formats:MapObject<VideoFormat>
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}



export interface StringObject {
   [key: string]: string;
}

export interface MapObject<T> {
   [key: string]: T;
}