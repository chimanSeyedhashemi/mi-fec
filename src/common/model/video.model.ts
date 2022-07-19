import { MapObject, VideoFormat } from "../interfaces";

export interface ProcessedVideo {
  id: number;
  name: string;
  author: string;
  categories: string[];
  releaseDate?: string;
  formats:MapObject<VideoFormat>

}

export type CreateProcessedVideo = Omit<ProcessedVideo, "id" | "releaseDate" | "formats">

export type EditProcessedVideo = ProcessedVideo