import { IEmployeeStats } from '../../interface/attendance/attendance';

export const EmployeeStats = ({ backgroundColor, color, status, numberOfEmployee, classNames }: IEmployeeStats) => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor,
        borderLeft: `4px solid ${color}`,
      }}
      className={`employee-stats ${classNames}`}
    >
      {status} {numberOfEmployee === 0 || numberOfEmployee ? <> &#40; {numberOfEmployee} &#41; </> : ''}
    </div>
  );
};
