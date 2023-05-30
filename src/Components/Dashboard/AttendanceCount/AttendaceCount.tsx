import { MdInfo } from 'react-icons/md';
import { PieChart, Pie, Cell } from 'recharts';
import './attendanceCount.css';
import { useEffect, useState } from 'react';
import { axiosApiInstance } from '../../apis/constants/ApisService';

const AttendaceCount = () => {
  const [dashboardData, setDashboardData] = useState([] as any);
  // const [attendanceData, setAttendanceData] = useState([] as any);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboard = await axiosApiInstance.get('/dashboard');
        setDashboardData(dashboard.data.dashboardData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const data01 = [
    { name: 'Others', value: 1, color: '#E6F8FE' },
    {
      name: 'Female',
      value: dashboardData.maleEmployeeCount,
      color: '#023C87',
    },
    {
      name: 'Male',
      value: dashboardData.femaleEmployeeCount,

      color: '#00B9F1',
    },
  ];

  return (
    <div className='attendance-count'>
      <hr />
      <span style={{ fontWeight: 'bold' }}>Employee Attendance Count</span>
      <div className='attendance-count-container'>
        <div>
          <div className='attedance-container'>
            <p>Attendance</p>
            <div>
              <span>Present (New baneshwor office) (10)</span>
              <span>Present (Old baneshwor office) (10)</span>
              <span>Working From Home (5)</span>
              <span>On Leave (10)</span>
            </div>
          </div>
          <div className='leave-request-container'>
            <div className='on-leave'>
              <p>
                On Leave Today <MdInfo color='#BB2124' />
              </p>
              <span>Total (10)</span>
            </div>
            <div className='on-request'>
              <p>
                Request for Approval <MdInfo color='#F0AD4E' />
              </p>
              <span>Total (10)</span>
            </div>
          </div>
        </div>
        <div className='pie-chart-container'>
          {' '}
          <h3 className='title'>Gender Ratio</h3>
          <PieChart width={100} height={100}>
            <Pie
              dataKey='value'
              isAnimationActive={false}
              data={data01}
              cx='50%'
              cy='50%'
              outerRadius={40}
              fill='#8884d8'
            >
              {data01.map((item, index) => {
                return <Cell key={index} fill={item.color} />;
              })}
            </Pie>
          </PieChart>
          <div>
            <div>
              <p>Male 60%</p>
            </div>
            <div>
              <p>Female 30%</p>
            </div>
            <div>
              <p>Others 10%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendaceCount;
