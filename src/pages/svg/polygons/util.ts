const getXd = (edge: number) => edge;
const getYd = (edge: number) => 0.5 * edge;

const format = (list: number[]) => list.join(",");

const getPoints = (data: {
  startX: number;
  startY: number;
  x_d: number;
  y_d: number;
  edge: number;
}) => {
  const { startX, startY, x_d, y_d, edge } = data;
  const point1 = [startX, startY];
  const point2 = [startX + x_d, startY - y_d];
  const point3 = [startX + 2 * x_d, startY];
  const point4 = [startX + 2 * x_d, startY + edge];
  const point5 = [startX + x_d, startY + edge + y_d];
  const point6 = [startX, startY + edge];
  const points = [
    format(point1),
    format(point2),
    format(point3),
    format(point4),
    format(point5),
    format(point6),
  ];
  return points.join(" ");
};

export const getPointsList = (pData: {
  list: any[];
  edge: number;
  startPosition?: { x: number; y: number };
  svgWidth: number;
}) => {
  const { list, edge, startPosition, svgWidth } = pData;
  let x_d = getXd(edge);
  let y_d = getYd(edge);
  // 起始位置多1px, 解决第一行被截断
  const { x: firstStartX = x_d + 1, y: firstStartY = y_d + 1 } = startPosition || {};
  let result: { points: string; node: any }[] = [];
  let lineStartX = firstStartX;
  let lineStartY = firstStartY;
  let lineStarts: number[][] = [];
  let lineNum = 1;

  list.forEach((_l, i) => {
    let x = lineStartX;
    let y = lineStartY;
    if (i === 0) {
      lineStarts.push([firstStartX, firstStartY]);
    }

    if (lineStartX > svgWidth || svgWidth - lineStartX < x_d * 2) {
      const _oldLineStarts = [...lineStarts];
      lineNum += 1;
      const [_x, _y] = _oldLineStarts[_oldLineStarts.length - 1];
      let _sx = _x;
      let _sy = _y + edge + y_d;
      if (lineNum % 2 === 0) {
        _sx = _x - x_d;
      } else {
        _sx = _x + x_d;
      }
      x = _sx;
      y = _sy;
      lineStarts.push([_sx, _sy]);
      lineStartX = _sx;
      lineStartY = _sy;
    } else {
      x = lineStartX;
      y = lineStartY;
    }
    const p1 = getPoints({ startX: x, startY: y, x_d, y_d, edge });
    result.push({ points: p1, node: _l });
    lineStartX = lineStartX + 2 * x_d;
  });
  return {
    pointsList: result,
    lineNum
  };
};

export const getSvgHeight = (
  lines: number | undefined,
  edge: number
) => {
  return `${(lines || 0) * 1.5 * edge + 0.6 * edge}px`;
};
