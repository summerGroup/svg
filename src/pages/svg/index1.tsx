import Polygons from "./polygons";
import "./index1.less";

const nodes = [
  {
    name: "安徽",
    stores: new Array(100).fill(1),
  },
  {
    name: "北京",
    stores: new Array(50).fill(1),
  },
  {
    name: "上海",
    stores: new Array(600).fill(1),
  },
  {
    name: "南京",
    stores: new Array(1000).fill(1),
  },
  {
    name: "苏州",
    stores: new Array(700).fill(1),
  },
  {
    name: "无锡",
    stores: new Array(300).fill(1),
  },
  {
    name: "内蒙古",
    stores: new Array(2).fill(1),
  },
  {
    name: "大理",
    stores: new Array(5).fill(1),
  },
];

export default function PolygonPage() {
  return (
    <div className="polygon-page-wrap">
      {nodes.map((node) => {
        return (
          <div key={node.name} className="card-wrap">
            <div className="title">{node.name}</div>
            <Polygons list={node.stores} svgWidth={450} />
          </div>
        );
      })}
    </div>
  );
}
