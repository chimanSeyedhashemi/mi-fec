import { getCategories } from './categories';
import { getAuthors } from './authors';
import { ProcessedVideo } from '../common/model/video.model';


export const getVideos = (): Promise<ProcessedVideo[]> => {
  return Promise
    .all([getCategories(),getAuthors()])
    .then(([categories, authors]) => {
      let videos: ProcessedVideo[] = []

      authors.forEach(author => {
        const authorVideos: Array<ProcessedVideo> = author.videos.map(video => ({
          id: video.id,
          name: video.name,
          author: author.name,
          releaseDate: video.releaseDate,
          formats:video.formats,
          categories: categories.filter(category => video.catIds.find(id => id === category.id)).map(category => category.name)
          
        } ))

        videos = videos.concat(authorVideos)

      })

    return videos;
  });
};
