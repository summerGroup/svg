import Polygons from "./polygons";
import "./index.less";
import { useEffect, useState } from "react";
import {debounce} from 'lodash'

const colorConfig = {
  'success': {stoke: '#ccc', fill: 'rgba(115, 191, 105, 0.6)'},
  'fail': {stoke: '#ccc', fill: 'rgba(242, 73, 92, 0.6)'},
  'wait': {stoke: '#ccc', fill: '#666'},
  'processing': {stoke: '#ccc', fill: '#666'},
}

const nodes = [
  {
    name: "安徽",
    stores: new Array(100).fill(colorConfig.success),
  },
  {
    name: "北京",
    stores: new Array(50).fill(colorConfig.fail),
  },
  {
    name: "上海",
    stores: new Array(600).fill(colorConfig.wait),
  },
  // {
  //   name: "南京",
  //   stores: new Array(1000).fill({stoke: '#ccc', fill: 'rgba(242, 73, 92, 0.8)'}),
  // },
  // {
  //   name: "苏州",
  //   stores: new Array(700).fill(1),
  // },
  {
    name: "无锡",
    stores: new Array(300).fill(colorConfig.wait),
  },
  {
    name: "内蒙古",
    stores: new Array(2).fill(colorConfig.wait),
  },
  {
    name: "大理",
    stores: new Array(5).fill(colorConfig.success),
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

const colNum = 4
const margin = 4
const padding = 6

const defaultWidth = (window.innerWidth - 32 - colNum * 2 * margin - colNum * 2 * padding )/ colNum


export default function PolygonPage() {

  const dataLists = handleLayout(nodes, colNum);

  const [svgWidth, setSvgWith] = useState(defaultWidth)

  const handleOnSize =() => {
    const el = document.querySelector('#polygon-page-wrap') as HTMLDivElement;
    const _width = (el?.offsetWidth  -  colNum * 2 * margin - colNum * 2 * padding)/colNum
    if(_width) {      
      setSvgWith(_width)
    }
  }

  const debounceResize =  debounce(handleOnSize, 100)

  useEffect(() => {
    handleOnSize()
    window.addEventListener('resize',debounceResize)
    return () => {
      window.removeEventListener('resize', debounceResize)
    }
  }, [])

  return (
    <div className="polygon-page-wrap" id="polygon-page-wrap">
      {dataLists.map((dataList, i) => {
        return (
          <div className="col" key={i} >
            {dataList.map((node) => {
              return (
                <div key={node.name} className="card-wrap">
                  <div className="title">{node.name}</div>
                  <div style={{padding: '4px 6px'}}>
                   <Polygons list={node.stores} svgWidth={svgWidth} edge={16}/>
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
