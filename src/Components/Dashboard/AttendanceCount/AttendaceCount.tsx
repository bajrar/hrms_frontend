import { MdInfo } from 'react-icons/md';
import { PieChart, Pie, Cell } from 'recharts';
import './attendanceCount.css';
import { useEffect, useMemo, useState } from 'react';
import { axiosApiInstance } from '../../apis/constants/ApisService';
import { Popover } from 'antd';

const AttendaceCount = () => {
  const [dashboardData, setDashboardData] = useState([] as any);
  // const [attendanceData, setAttendanceData] = useState([] as any);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboard = await axiosApiInstance.get('/');
        setDashboardData(dashboard.data.dashboardData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const data01 = [
    { name: 'Others', value: 0, color: '#E6F8FE' },
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

  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);

  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { pointAtCenter: true };
    return showArrow;
  }, [showArrow, arrowAtCenter]);

  // popover Content
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <div className='attendance-count'>
      <hr />
      <span style={{ fontWeight: 'bold' }}>Employee Attendance Count</span>
      <div className='attendance-count-container'>
        <div>
          <div className='attedance-container'>
            <p>Attendance</p>
            <div className='d-flex gap-3'>
              <div className='d-flex flex-column gap-3'>
                <span className='border-start border-4 border-info ps-2'>
                  Present (New baneshwor office) (10)
                </span>
                <span className='border-start border-4 border-info ps-2'>
                  Present (Old baneshwor office) (10)
                </span>
              </div>
              <div className='d-flex flex-column gap-3'>
                <span
                  style={{
                    borderLeft: '4px solid #BB22A3',
                    paddingLeft: '0.5rem',
                  }}
                >
                  Working From Home (5)
                </span>
                <span className='border-start border-4 border-danger ps-2'>
                  On Leave (10)
                </span>
              </div>
            </div>
          </div>
          <div className='leave-request-container'>
            <div className='on-leave'>
              <p>
                On Leave Today
                <Popover
                  placement='bottom'
                  content={content}
                  title='Title'
                  arrow={mergedArrow}
                >
                  <MdInfo color='#BB2124' className='mx-2 fs-6' />
                </Popover>
              </p>
              <span className='border-start border-4 border-danger ps-2'>
                Total (10)
              </span>
            </div>
            <div className='on-request'>
              <p>
                Request for Approval{' '}
                <MdInfo color='#F0AD4E' className='mx-1 fs-6' />
              </p>
              <span className='border-start border-4 border-warning ps-2'>
                Total (10)
              </span>
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
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  width: '3px',
                  backgroundColor: '#023C87',
                  position: 'absolute',
                }}
              >
                &nbsp;
              </span>
              <p className='mx-2'>Male 60%</p>
            </div>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  width: '3px',
                  backgroundColor: '#00B9F1',
                  position: 'absolute',
                }}
              >
                &nbsp;
              </span>
              <p className='mx-2'>Female 30%</p>
            </div>
            {/* <div>
              <p>Others 10%</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendaceCount;
