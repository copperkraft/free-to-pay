import levelImage from '../data/farm.png';

const loadImage: (src: string) => Promise<HTMLImageElement> = (src) => new Promise((
  resolve,
  reject,
) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = src;
});

const colorMap: { [key: string]: string } = {
  '255,255,255,255': '⬜', // space
  '255,242,0,255': '🌾', // collectible
  '34,177,76,255': '🌲',
  '181,230,29,255': '🟩',
};

const splitArray: <T>(
  array: T[],
  chunkSize: number
) => T[][] = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export const parseImage = async () => {
  const image = await loadImage(levelImage);
  const inputCanvas = document.createElement('canvas');
  const context = inputCanvas.getContext('2d');
  if (!context) { return []; }
  const { width, height } = image;
  context.drawImage(image, 0, 0, width, height);
  const imageData = context.getImageData(0, 0, width, height).data;
  return splitArray(splitArray(Array.from(imageData), 4), width);
};

export const mapImageToLevel = async () => (await parseImage())
  .map((row) => row
    .map((item) => item.join())
    .map((item) => {
      if (!colorMap[item]) {
        colorMap[item] = '?';
      }
      return colorMap[item];
    }));
