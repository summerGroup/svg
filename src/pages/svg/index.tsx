import Polygons from "./polygons";
import "./index.less";

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

const handleLayout = (list: typeof nodes, colNum: number) => {
  const res: Array<typeof nodes> = new Array(colNum).fill([]);
  const heights = new Array(colNum).fill(0);
  list.forEach((v, i) => {
    if (i <= colNum - 1) {
      heights[i] = heights[i] + v.stores?.length || 0;
      res[i] = [...res[i], v];
    } else {
      const min = Math.min.apply(null, heights);
      const minIndex = heights.findIndex((h) => h === min);
      res[minIndex] = [...res[minIndex], v];
      heights[minIndex] = heights[minIndex] + v.stores?.length || 0;
    }
  });
  return res;
};

export default function PolygonPage() {
  const colNum = 3
  const margin = 10
  const dataLists = handleLayout(nodes, colNum);
  const svgWidth = (window.innerWidth - colNum * 2 * margin )/ colNum;

  return (
    <div className="polygon-page-wrap">
      {dataLists.map((dataList, i) => {
        return (
          <div className="col" key={i} >
            {dataList.map((node) => {
              return (
                <div key={node.name} className="card-wrap">
                  <div className="title">{node.name}</div>
                  <div style={{padding: '4px 6px'}}>
                   <Polygons list={node.stores} svgWidth={svgWidth - 8} />
                  </div>

                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
