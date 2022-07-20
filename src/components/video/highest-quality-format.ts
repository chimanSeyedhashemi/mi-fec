import { MapObject, VideoFormat } from "../../common/interfaces";

export const highestQualityFormat = (formats: MapObject<VideoFormat>): string => {
  let result = '';

  const formatsEntries = Object.entries(formats);
  formatsEntries.sort((a, b) => a[1].size - b[1].size);
  formatsEntries.reverse();

  const highestQuality = formatsEntries.filter((format) => format[1].size === formatsEntries[0][1].size);

  if (highestQuality.length > 1) {
    highestQuality.sort((a, b) => Number(a[1].res.split('p')[0]) - Number(b[1].res.split('p')[0]));
    highestQuality.reverse();
    result = `${highestQuality[0][0]} ${highestQuality[0][1].res}`;
  } else {
    result = `${formatsEntries[0][0]} ${formatsEntries[0][1].res}`;
  }

  return result;
};