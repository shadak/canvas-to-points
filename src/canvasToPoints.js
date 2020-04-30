const chunkRGBA = (data) => {
  const chunkedRGBA = [];
  let index = 0;
  while (index < data.length) {
    chunkedRGBA.push(data.slice(index, index + 4));
    index += 4;
  }

  return chunkedRGBA;
};


const extractPoints = (canvas) => {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const chunkedData = chunkRGBA(imageData);

  return null;
}

const filterDensity = (points, density) => {

}

const exportJSON = (points) => {

}

const canvasToPoints = (canvas, density) => filterDensity(extractPoints(canvas), density);


export default canvasToPoints
