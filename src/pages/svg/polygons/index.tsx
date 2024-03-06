import { useMemo } from "react";
import { getPointsList, getSvgHeight } from "./util";
import _ from "lodash";

interface Props {
  pointsInfo:
    | { pointsList: { points: string; node: any }[]; lineNum: number }
    | undefined;
  edge?: number;
  svgWidth?: number;
}

export default function Polygons(props: Props) {
  const { pointsInfo, edge = 20, svgWidth = 600 } = props;

  // const pointsInfo = useMemo(() => {

  //   return getPointsList({ list, edge, svgWidth });
  // }, [list, edge, svgWidth]);

  const _height = useMemo(() => {
    return getSvgHeight(pointsInfo?.lineNum, edge);
  }, [pointsInfo, edge]);

  return (
    <div
      style={{
        width: `${svgWidth}px`,
        height: _height,
      }}
    >
      <svg
        style={{
          width: `100%`,
          height: `100%`,
        }}
      >
        {pointsInfo?.pointsList.map((p, i) => {
          return (
            <polygon
              points={p.points}
              style={{
                stroke: `${p.node?.stroke || "#000"}`,
                fill: `${p.node?.fill || "#666"}`,
                strokeWidth: 2,
                boxSizing: "border-box",
                filter: "brightness(100%)",
                opacity: 0.7,
              }}
              key={i}
            />
          );
        })}
      </svg>
    </div>
  );
}
