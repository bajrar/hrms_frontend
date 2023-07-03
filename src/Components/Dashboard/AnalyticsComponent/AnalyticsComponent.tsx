import NepaliDate from 'nepali-date-converter';
import { axiosApiInstance } from '../../apis/constants/ApisService';
import './analyticsComponents.css';
import { MdOutlineTrendingUp } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useGetDashboardQuery } from '../../../redux/api/dashboard/dashboardSliceApi';

const AnalyticsComponent = () => {
  const nepaliDate = new NepaliDate(new Date()).format('YYYY/MM/DD');
  const [dashboardData, setDashboardData] = useState([] as any);
  // const [attendanceData, setAttendanceData] = useState([] as any);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const dashboard = await axiosApiInstance.get('/dashboard');
  //       setDashboardData(dashboard.data.dashboardData);
  //     } catch (error) {
  //       console.error('Error fetching dashboard data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const { data, isLoading } = useGetDashboardQuery('dashboard');
  useEffect(() => {
    setDashboardData(data?.dashboardData);
  }, [isLoading, data]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count < 50) {
      if (count === 56) {
        setCount(2);
      }
      setTimeout(() => {
        setCount(count + 1);
      }, 100);
    }
  }, [count]);
  const AnalyticsArray = [
    {
      title: 'Total Employees',
      number: data?.dashboardData.totalEmployee || '...',
      bgColor: ' #f4fbf5',
      color: '#22BB33',
      percentage: '10',
      category: 'Employee',
    },
    {
      title: 'Working Employees',
      number: data?.dashboardData.workingEmployee || '...',
      color: '#22BB33',
      bgColor: ' #f4fbf5',
      percentage: '10',
      category: 'Employee',
    },
    {
      title: 'Resigned Employees',
      number: data?.dashboardData?.resignedEmployee || '...',
      color: '#BB2124',
      bgColor: '#FBF4F4',
      percentage: '10',
      category: 'Employee',
    },
    {
      title: 'Vacancy',
      number: data?.dashboardData?.totalOpenJobs || '...',
      color: '#22BB33',
      bgColor: ' #f4fbf5',
      percentage: '10',
      category: 'Employee',
    },
    {
      title: 'Job View',
      number: data?.dashboardData?.jobView || '...',
      color: '#22BB33',
      bgColor: ' #f4fbf5',
      percentage: '10',
      category: 'Employee',
    },
    {
      title: 'Job Applied',
      number: data?.dashboardData?.totalJobApplied || '...',
      color: '#22BB33',
      bgColor: ' #f4fbf5',
      percentage: '10',
      category: 'Employee',
    },
  ];
  return (
    <div className="analytics-component-container">
      {AnalyticsArray.map((item, index) => {
        return (
          <div className="analytics-component" key={index}>
            <h3 className="analytics-title">{item?.title}</h3>
            <div className="analytics-number">
              <p className="numbers">{isLoading ? count : item?.number}</p>
              <div className="percentage-container" style={{ backgroundColor: item?.bgColor }}>
                <MdOutlineTrendingUp size={16} color={item?.color} />
                <p className="percentage" color={item?.color} style={{ color: item?.color }}>
                  {item?.percentage}%
                </p>{' '}
              </div>
            </div>
            <span className="category-name">{item?.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsComponent;
