import { useState, useEffect, useRef } from 'react';
import { debounce } from 'utils/utils';
import './grid.scss';

const buildMesh = (ctx, step, lineWidth, padding, drawNow = false) => {
  const { width: trueWidth, height: trueHeight } = ctx.canvas;
  const width = trueWidth - lineWidth - padding.right - padding.left;
  const height = trueHeight - lineWidth - padding.top - padding.bottom;
  const N_r = 1 + height / step;
  const N_c = 1 + width / step;
  ctx.lineWidth = lineWidth;
  [...Array(N_r).keys()].forEach((r) => {
    ctx.moveTo(padding.left, padding.top + 0.5 + (r * height) / (N_r - 1));
    ctx.lineTo(
      trueWidth - padding.right,
      padding.top + 0.5 + (r * height) / (N_r - 1)
    );
  });
  [...Array(N_c).keys()].forEach((c) => {
    ctx.moveTo(padding.left + 0.5 + (c * width) / (N_c - 1), padding.top);
    ctx.lineTo(
      padding.left + 0.5 + (c * width) / (N_c - 1),
      trueHeight - padding.bottom
    );
  });
  if (drawNow) {
    ctx.stroke();
  }
  return ctx;
};

const roundToStep = (value, step) => {
  const remainder = value % step;
  return value + (step - remainder);
};

const Grid = ({ container }) => {
  const canvasRef = useRef(null);
  const [mouseTrack, setMouseTrack] = useState(false);
  const radius = 20;
  const gridLineWidth = 1;
  const padding = { right: 5, left: 5, top: 5, bottom: 1 };
  const redrawCanvas = () => {
    if (canvasRef.current) {
      const { innerWidth: vw, innerHeight: vh } = window;
      const width =
        roundToStep(2 * vw, radius) +
        gridLineWidth +
        padding.right +
        padding.left;
      const height =
        roundToStep(2 * vh, radius) +
        gridLineWidth +
        padding.top +
        padding.bottom;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;

      const ctx = canvasRef.current.getContext('2d');
      buildMesh(ctx, radius, gridLineWidth, padding).stroke();
    }
  };

  useEffect(() => {
    const listener = debounce(() => redrawCanvas(), 100);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);

  useEffect(() => redrawCanvas(), [canvasRef]);

  useEffect(() => {
    if (mouseTrack) {
      container.current.style.cursor = 'grabbing';
      const listener = (event) => {
        const { movementX: dX, movementY: dY } = event;
        if (container.current.matches(':hover')) {
          container.current.scrollBy(-dX, -dY);
        } else {
          setMouseTrack(false);
        }
      };
      window.addEventListener('mousemove', listener);
      return () => window.removeEventListener('mousemove', listener);
    } else {
      container.current.style.cursor = 'grab';
    }
  }, [mouseTrack, container]);

  return (
    <canvas
      ref={canvasRef}
      width="2160"
      height="1440"
      className="canvas"
      onMouseDown={() => setMouseTrack(true)}
      onMouseUp={() => setMouseTrack(false)}
    />
  );
};

export default Grid;
