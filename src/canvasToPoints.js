import fs from 'fs';

const chunkRGBA = (data) => {
  const chunkedRGBA = [];
  let index = 0;
  while (index < data.length) {
    chunkedRGBA.push(data.slice(index, index + 4));
    index += 4;
  }

  return chunkedRGBA;
};

const attachCoordinates = (chunkedData, canvasWidth) => (
  chunkedData.map((RGBA, index) => {
    const x = index % canvasWidth;
    const y = Math.floor(index / canvasWidth);

    return { x, y, RGBA };
  })
);

const isEmptyPoint = ({ RGBA }) => !RGBA.every((_) => _ === 0);

const extractPoints = (canvas) => {
  const ctx = canvas.getContext('2d');
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return attachCoordinates(chunkRGBA(data), canvas.width);
};

const adjustForWebGL = (point, width, height) => ({
  x: point.x / width,
  y: point.y / height,
  RGBA: point.RGBA,
});

const getJSON = (points) => JSON.stringify(points);

const exportJSON = (points) => {
  const data = getJSON(points);
  fs.writeFile('points.json', data, 'utf8', (err) => console.log(err));
};

const canvasToPoints = (canvas, webgl) => {
  const { width, height } = canvas;
  const points = extractPoints(canvas).filter(isEmptyPoint);

  return webgl
    ? points.map((point) => adjustForWebGL(point, height, width))
    : points;
};

export { getJSON, exportJSON };
export default canvasToPoints;
