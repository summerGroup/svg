
const list = new Array(10000).fill(1)
const e = 20;
const y_d = e * 3 / 5;
const x_d = e * 4 / 5;
const oddStartX1 = x_d;
const oddStartY1 = y_d;
let lineStartX = oddStartX1;
let lineStartY = oddStartY1;

let lineStarts: number[][]= []
let lineNum = 1;

const svgWidth = 600

const count = Math.floor(svgWidth / (2 * x_d))

const lines = Math.ceil(list.length / count)




const format = (list: number[]) => list.join(',')

const getPoints = (startX: number, startY: number) => {
    const point1 = [startX, startY]
    const point2 = [startX + x_d, startY - y_d];
    const point3 = [startX + 2 * x_d, startY];
    const point4 = [startX + 2 * x_d, startY + e];
    const point5 = [startX + x_d, startY + e + y_d];
    const point6 = [startX, startY + e]
    const points = [format(point1), format(point2), format(point3), format(point4), format(point5), format(point6)]
    return points.join(' ')
}





export default function Polygon() {

    
    

  return (
    <div style={{width: `${svgWidth}px`, height: `${lines * (e +  y_d) + y_d}px`}}>
        <svg style={{width: `100%`, height: `100%`, border: '1px solid blue', overflow: 'auto'}} >
            {
                list.map((_l, i) => {
                    let x = lineStartX;
                    let y = lineStartY;
                 
                    

                    if(i === 0) {
                        lineStarts.push([oddStartX1, oddStartY1])
                    }
                  
                    if(lineStartX > svgWidth || svgWidth - lineStartX < x_d *2) {
                        
                        
                        const _oldLineStarts = [...lineStarts]
                        lineNum += 1
                        const [_x, _y] = _oldLineStarts[_oldLineStarts.length -1];
                        let _sx = _x;
                        let _sy = _y + e + y_d;

                        if(lineNum % 2 === 0) {
                           _sx = _x - x_d;
                        } else {
                           _sx = _x + x_d;
                        }
                        x =  _sx;
                        y =  _sy;
                        lineStarts.push([_sx, _sy])
                        lineStartX = _sx
                        lineStartY = _sy
                    } else {
                        x = lineStartX
                        y = lineStartY
                    }
                    const p1 = getPoints(x, y)
                    
                    lineStartX = lineStartX + 2 * x_d;

                    

                    return  <polygon points={p1} style={{stroke: '#000', fill: '#ccc', strokeWidth: 2}} key={i}/>
                })
            }
       
        </svg>
       
    </div>
  )
}
