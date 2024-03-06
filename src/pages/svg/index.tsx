import Polygons from "./polygons";
import "./index.less";
import { useEffect, useState } from "react";
import {debounce} from 'lodash'
import { getPointsList } from "./polygons/util";

const colorConfig = {
  'success': {stoke: '#000', fill: 'rgba(115, 191, 105, 0.8)'},
  'fail': {stoke: '#000', fill: 'rgba(242, 73, 92, 0.8)'},
  'wait': {stoke: '#000', fill: 'rgb(255, 255, 255, 0.6)'},
  'processing': {stoke: '#000', fill: '#faad14'},
}


const nodes: {name: string; stores: any[], pointsInfo?: { pointsList: { points: string; node: any; }[]; lineNum: number; }}[] = [
  {
    name: "安徽1",
    stores: new Array(3).fill(colorConfig.success),
  },
  {
    name: "北京2",
    stores: new Array(50).fill(colorConfig.fail),
  },
  {
    name: "上海3",
    stores: new Array(600).fill(colorConfig.success),
  },
  {
    name: "南京4",
    stores: new Array(100).fill(colorConfig.processing),
  },
  {
    name: "苏州5",
    stores: new Array(780).fill(colorConfig.wait),
  },
  {
    name: "无锡6",
    stores: new Array(300).fill(colorConfig.wait),
  },
  {
    name: "内蒙古7",
    stores: new Array(20).fill(colorConfig.wait),
  },
  {
    name: "大理8",
    stores: new Array(5).fill(colorConfig.success),
  },
  {
    name: "天目湖9",
    stores: new Array(6).fill(colorConfig.success),
  },
  {
    name: "靖江10",
    stores: new Array(8).fill(colorConfig.success),
  },
  {
    name: "江苏11",
    stores: new Array(20).fill(colorConfig.fail),
  },
  {
    name: "云南12",
    stores: new Array(30).fill(colorConfig.success),
  },
];

const handleLayout = (list: typeof nodes, colNum: number, edge: number, svgWidth: number) => {
  const res: Array<typeof nodes> = new Array(colNum).fill([]);
  const heights = new Array(colNum).fill(0);
  list.forEach((v, i) => {
    const pointsInfo = getPointsList({list: v.stores, edge, svgWidth})
    if (i <= colNum - 1) {
      heights[i] = heights[i] + pointsInfo.lineNum + header / edge;
      res[i] = [...res[i], {...v, pointsInfo: pointsInfo || []}];
    } else {
      const min = Math.min.apply(null, heights);
      const minIndex = heights.findIndex((h) => h === min);
      res[minIndex] = [...res[minIndex], {...v, pointsInfo: pointsInfo || []}];
      heights[minIndex] = heights[minIndex] + pointsInfo.lineNum + header / edge;
    }
  });
  return res; 
};



const colNum = 3
const margin = 4
const padding = 6
const edge = 10
const header = 30

const modifyHeight = margin * 2 + header 


const defaultWidth = (window.innerWidth - 32 - colNum * 2 * margin - colNum * 2 * padding )/ colNum


export default function PolygonPage() {

  const [svgWidth, setSvgWith] = useState(defaultWidth)
  const [dataLists, setDataLists] = useState<{ name: string; stores: any[]; pointsInfo?: { pointsList: { points: string; node: any; }[]; lineNum: number; } | undefined; }[][]>([])

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

  useEffect(() => {
    if(nodes.length && svgWidth) {
      const dataLists = handleLayout(nodes, colNum, edge, svgWidth);
      console.log(dataLists);
      
      setDataLists(dataLists)
    } else {
      setDataLists([])
    }

  }, [svgWidth, nodes, colNum])

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
                   <Polygons pointsInfo={node.pointsInfo} svgWidth={svgWidth} edge={edge}/>
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
