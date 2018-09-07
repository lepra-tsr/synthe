import App, { ANALYSE_FFT_SIZE } from './App';

export default class Drawer {
  static cx: CanvasRenderingContext2D;
  static width: number;
  static height: number;
  static currentX: number;
  static init(canvas: HTMLCanvasElement) {
    const cx = canvas.getContext('2d');
    if (!(cx instanceof CanvasRenderingContext2D)) { return false }
    Drawer.cx = cx;
    Drawer.width = canvas.width;
    Drawer.height = canvas.height;
    Drawer.currentX = 0;
  }

  static update(low: number, high: number) {
    const { cx, width, height, currentX, flush } = Drawer;
    const drawLow = height - (height * (low / 256));
    const drawHigh = height - (height * (high / 256));

    if (width < currentX) {
      flush();
    }

    cx.fillStyle = '#cccccc';
    cx.fillRect(currentX, height / 2, 1, 1);

    cx.fillStyle = '#aaaaaa';
    cx.fillRect(currentX, drawLow, 1, drawHigh - drawLow);

    this.currentX++;
  }

  static flush() {
    // const { cx, width, height } = Drawer;
    // cx.clearRect(0, 0, width, height);
    Drawer.currentX = 0;
  }

  static updateFrequency(_powerArray: Uint8Array) {
    const { sampleRate } = App;
    const { cx, width, height, currentX, flush } = Drawer;
    const rawLength = ANALYSE_FFT_SIZE;
    const VALID_LENGTH = App.ceilIndexFFT;
    const powerArray = _powerArray.slice(0, VALID_LENGTH);
    const validLength = powerArray.length;
    const arrayPerPixel: number = Math.floor(validLength / height);
    const frequencyCeil = Math.floor(sampleRate * (validLength / rawLength));

    if (width < currentX) {
      flush();
    }

    for (let i = 0; i < validLength; i++) {
      if (i % arrayPerPixel !== 0) { continue; }
      const progress = (i / validLength);
      const powerBlockArray = powerArray.slice(i, i + arrayPerPixel);
      const power: number = Math.floor(powerBlockArray.reduce((x, y) => x + y) / arrayPerPixel);
      const _plotY: number = (height * progress);
      const plotY = Math.floor(_plotY);
      if ((currentX % 50 === 0) && (i % 50 === 0)) {
        const hertz = Math.floor(progress * frequencyCeil);
        cx.fillStyle = 'lightGray';
        cx.font = '9px "consolas"'
        cx.fillText(`${hertz}Hz`, currentX - 100, plotY);
      }
      const c = (power / 255);
      cx.fillStyle = `rgba(0,180,150,${c})`;
      cx.fillRect(currentX, plotY, 1, 1);
    }

    this.currentX++;
  }
}