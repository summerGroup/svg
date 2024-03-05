import { useMemo } from "react";
import { getPointsList, getSvgHeight } from "./util";

interface Props {
  list: any[];
  edge?: number;
  svgWidth?: number;
}

export default function Polygons(props: Props) {
  const { list, edge = 20, svgWidth = 600 } = props;

  const pointsInfo = useMemo(() => {
    return getPointsList({ list, edge, svgWidth });
  }, [list, edge, svgWidth]);

  return (
    <div
      style={{
        width: `${svgWidth}px`,
        height: getSvgHeight(pointsInfo.lineNum, edge),
      }}
    >
      <svg
        style={{
          width: `100%`,
          height: `100%`,
        }}
      >
        {pointsInfo.pointsList.map((p, i) => {
          return (
            <polygon
              points={p.points}
              style={{ stroke: "#000", fill: "#ccc", strokeWidth: 2, boxSizing: 'border-box' }}
              key={i}
            />
          );
        })}
      </svg>
    </div>
  );
}
