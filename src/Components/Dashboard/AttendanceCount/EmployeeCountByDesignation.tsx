import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const EmployeeCountByDesignation = () => {
  const data = [
    { name: 'Associate Software Engineer', value: 0.16666666666666666 },
    { name: 'Software Engineer', value: 0.04411764705882353 },
    { name: 'Sr.Associate Software Engineer', value: 0.0297029702970297 },
    { name: 'Software Engineer', value: 0.0297029702970297 },
    { name: 'Software Engineer', value: 0.0297029702970297 },
  ];
  return (
    <div>
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
        layout='vertical'
        barCategoryGap={24}
      >
        {/* <CartesianGrid strokeDasharray='3 3' /> */}
        <XAxis type='number' hide />
        <YAxis type='category' dataKey='name' width={100} />
        <Tooltip />
        <Legend />
        <Bar
          dataKey='value'
          fill='#45B9F1'
          background={{ fill: '#eee' }}
          height={18}
        />
      </BarChart>
    </div>
  );
};

export default EmployeeCountByDesignation;
