import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import './Graph.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
type GraphProps = {};
const data = [
  { date: '01/24', TE: '30', NJ: '2', RE: '2' },
  { date: '01/25', TE: '35', NJ: '5', RE: '0' },
  { date: '01/26', TE: '28', NJ: '1', RE: '3' },
  { date: '01/27', TE: '26', NJ: '0', RE: '5' },
  { date: '01/28', TE: '32', NJ: '0', RE: '0' },
  { date: '01/29', TE: '22', NJ: '6', RE: '1' },
  { date: '01/30', TE: '29', NJ: '1', RE: '9' },
  { date: '02/01', TE: '27', NJ: '3', RE: '6' },
  { date: '02/02', TE: '24', NJ: '4', RE: '2' },
  { date: '02/03', TE: '33', NJ: '6', RE: '5' },
  { date: '02/04', TE: '34', NJ: '5', RE: '5' },
  { date: '02/05', TE: '35', NJ: '3', RE: '6' },
  { date: '02/06', TE: '32', NJ: '1', RE: '3' },
  { date: '02/07', TE: '31', NJ: '2', RE: '4' },
  { date: '02/08', TE: '28', NJ: '2', RE: '2' },
];
export const Graph = ({}: GraphProps) => {
  const graphcontainer = useRef<any>();
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });
  const getWidth = () => {
    setGraphSize({
      width: graphcontainer.current?.offsetWidth,
      height: graphcontainer.current?.offsetHeight,
    });
  };
  useEffect(() => {
    getWidth();
  }, []);
  return (
    <div className='hr-dashboard-graph' ref={graphcontainer}>
      <div className='hr-dashboard-graph-content'>
        <div className='hr-dashboard-graph-header'>
          <span>Last 15-day record of newly hired and resigned employees</span>
        </div>
        <div className='row hr-dashboard-graph-sub-header'>
          <div className='col-3 hr-dashboard-graph-sub-header-one'>
            <text>Total Employee</text>
          </div>
          <div className='col-3 hr-dashboard-graph-sub-header-two'>
            <text>Newly Joined</text>
          </div>
          <div className='col-3 hr-dashboard-graph-sub-header-three'>
            <text>Resigned</text>
          </div>
        </div>
        <div className='hr-dashboard-graph-diagram'>
        
          <BarChart width={graphSize.width} height={400} data={data}>
            <Bar dataKey='TE' fill='#023C87' radius={[5, 5, 0, 0]} />
            <Bar dataKey='NJ' fill='#00B9F1' radius={[5, 5, 0, 0]} />
            <Bar dataKey='RE' fill='#BB2124' radius={[5, 5, 0, 0]} />
            <CartesianGrid
              stroke='#D8D8D8'
              vertical={false}
              strokeDasharray='5 5'
              
            />
            <XAxis dataKey='date' axisLine={true} />
            <YAxis orientation='right' axisLine={false}  />
            <Tooltip />
            <LabelList dataKey='TE' position='top' />
            <LabelList dataKey='NJ' position='top' />
            <LabelList dataKey='RE' position='top' />
          </BarChart>
          
        </div>
      </div>
    </div>
  );
};
