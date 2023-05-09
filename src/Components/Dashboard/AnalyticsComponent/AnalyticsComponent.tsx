import './analyticsComponents.css';
import { MdOutlineTrendingUp } from 'react-icons/md';

const AnalyticsComponent = () => {
  const AnalyticsArray = [
    {
      title: 'Total Employees',
      number: '35',
      bgColor: ' #f4fbf5',
      color: '#22BB33',
      percentage: '10',
      category: 'Employee',
    },
    {
      title: 'Working Employees',
      number: '35',
      color: '#22BB33',
      bgColor: ' #f4fbf5',
      percentage: '10',
      category: 'Employee',
    },
    {
      title: 'Resigned Employees',
      number: '35',
      color: '#BB2124',
      bgColor: '#FBF4F4',
      percentage: '10',
      category: 'Employee',
    },
    {
      title: 'Vacancy',
      number: '35',
      color: '#22BB33',
      bgColor: ' #f4fbf5',
      percentage: '10',
      category: 'Employee',
    },
    {
      title: 'Job View',
      number: '35',
      color: '#22BB33',
      bgColor: ' #f4fbf5',
      percentage: '10',
      category: 'Employee',
    },
    {
      title: 'Job Applied',
      number: '35',
      color: '#22BB33',
      bgColor: ' #f4fbf5',
      percentage: '10',
      category: 'Employee',
    },
  ];
  return (
    <div className='analytics-component-container'>
      {AnalyticsArray.map((item, index) => {
        return (
          <div className='analytics-component' key={index}>
            <h3 className='analytics-title'>{item?.title}</h3>
            <div className='analytics-number'>
              <p className='numbers'>{item?.number}</p>
              <div
                className='percentage-container'
                style={{ backgroundColor: item?.bgColor }}
              >
                <MdOutlineTrendingUp size={16} color={item?.color} />
                <p
                  className='percentage'
                  color={item?.color}
                  style={{ color: item?.color }}
                >
                  {item?.percentage}%
                </p>{' '}
              </div>
            </div>
            <span className='category-name'>Employee</span>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsComponent;
