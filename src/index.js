import canvas from 'canvas';
import canvasToPoints from './canvasToPoints';

const canvasEl = canvas.createCanvas(400, 400);

const json = canvasToPoints(canvasEl, 1);

export default canvasToPoints;
