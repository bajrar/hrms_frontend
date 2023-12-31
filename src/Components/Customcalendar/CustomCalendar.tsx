import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EmployeeStats } from '../../pages/Attendance/Attendance';
import { IYear } from '../../pages/Attendance/EmployeeAttendance';
import { getEmployeeData } from '../../redux/features/SingleAttendanceSlice';
import { daysOfWeek, monthNames, NepaliMonthDays, nepaliMonthDays } from '../../utils/Constants';

import './Customcalendar.css';
import { todayInBs } from './GetTodaysDate';
import { useGetSingleAttendanceQuery } from '../../redux/features/attendanceUpdateSlice';

function Calendar({ month, year }: { month: number; year: IYear }) {
  let yearNumber: keyof NepaliMonthDays = year.year.toString();
  const monthInString = month + 1 <= 9 ? `0${month + 1}` : month + 1;
  const [weeks, setWeeks] = useState<any>([]);
  const [startindDayData, setStartindDayData] = useState<number[]>([]);
  const [earlyIn, setEarlyIn] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { employeeId } = useParams();

  const [startOfDate, setStartOfDate] = useState(
    `${year.year}/${monthInString}/01`,
    // `${year.year}/${month + 1}/01`
  );

  const [endOfDate, setEndofDate] = useState<any>(
    `${year.year}/${monthInString}/${nepaliMonthDays[yearNumber][month]}`,
  );
  console.log({ year });

  //Calculate the starting day of each month based on the number of days in previous months
  useEffect(() => {
    const startingDays = [year.startDay];
    nepaliMonthDays[yearNumber].forEach((days, i) => {
      const startingDayOfMonth = (startingDays[i] + days) % 7;
      startingDays.push(startingDayOfMonth);
    });
    setStartindDayData(startingDays);
  }, [year]);

  useEffect(() => {
    if (
      year.year === todayInBs.getYear() &&
      month === todayInBs.getMonth() &&
      nepaliMonthDays[yearNumber][month] > todayInBs.getDay()
    ) {
      let localMonth: any;
      let localDate: any;
      if (todayInBs.getMonth() + 1 < 10) {
        localMonth = `0${todayInBs.getMonth() + 1}`;
      }
      if (todayInBs.getDate() < 10) {
        localDate = `0${todayInBs.getDate()}`;
      }
      setEndofDate(`${todayInBs.getYear()}/${localMonth}/${todayInBs.getDate()}`);
    } else {
      setEndofDate(`${year.year}/${month + 1}/${nepaliMonthDays[yearNumber][month]}`);
    }
    const localMonth = todayInBs.getMonth() + 1 < 10 ? `0${todayInBs.getMonth() + 1}` : todayInBs.getMonth() + 1;
    if (year.year === todayInBs.getYear() && month === todayInBs.getMonth()) {
      setStartOfDate(`${todayInBs.getYear()}/${localMonth}/01`);
    } else {
      setStartOfDate(`${year.year}/${monthInString}/01`);
    }

    dispatch(
      getEmployeeData({
        userSn: employeeId,
        startDate: startOfDate,
        endDate: endOfDate,
      }) as any,
    );
  }, [dispatch, employeeId, endOfDate, month, year, startOfDate, todayInBs]);
  // Create an array of weeks in the month
  useEffect(() => {
    const weeksArr = [];
    let week = [];
    let day = 1;

    for (let i = 0; i < startindDayData[month]; i++) {
      week.push(null);
    }
    while (day <= nepaliMonthDays[yearNumber][month]) {
      week.push(day);
      if (week.length === 7) {
        weeksArr.push(week);
        week = [];
      }
      day++;
    }
    while (week.length < 7) {
      week.push(null);
    }
    weeksArr.push(week);
    setWeeks(weeksArr);
  }, [month, year, startindDayData]);

  // const { employee } = useAppSelector((state: any) => state.SingleAttendanceSlice);
  const { data: employee, isLoading } = useGetSingleAttendanceQuery({
    userSn: employeeId,
    startDate: startOfDate,
    endDate: endOfDate,
  });

  const checkStatus = (morningStatus: string, eveningStatus: string) => {
    morningStatus === 'early-in' && eveningStatus === 'late-out' ? setEarlyIn(true) : setEarlyIn(false);
    return earlyIn;
  };

  // Filter employee attendance data for the current month
  const filteredAttendance = employee?.result?.filter((item: any) => {
    const attendanceDate = new Date(item?.attendanceByDate?.date);
    return attendanceDate.getFullYear() === year.year && attendanceDate.getMonth() === month;
  });

  // Render the calendar
  return (
    <div className="calendar-wrapper">
      <h2 className="calendar-title">
        {year.year} {monthNames[month]}
      </h2>

      <table className="calendar-container">
        <thead className="calendar-header">
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day} className="calendar-head">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body-container">
          {weeks.map((week: any, i: number) => (
            <tr key={i} className="table-row-container">
              {week.map((day: any, j: number) => (
                <td key={`${i}-${j}`} className="table-data-container">
                  {day}
                  {filteredAttendance?.map((item: any, index: number) => {
                    const dayDate = new Date(item.attendanceByDate.date).getDate();
                    if (dayDate === day) {
                      // console.log(item?.attendanceByDate, 'HAHA');
                      return item?.attendanceByDate?.holiday ? (
                        <div className="status-container">
                          <EmployeeStats
                            backgroundColor="transparent"
                            color="#9747FF"
                            status="Holiday"
                            classNames="holiday-container"
                          />
                        </div>
                      ) : item?.attendanceByDate?.absent ? (
                        <div className="status-container">
                          <EmployeeStats
                            backgroundColor="#"
                            color="#BB2124"
                            status="Absent"
                            classNames="holiday-container"
                          />
                        </div>
                      ) : (
                        <div className="status-container">
                          <EmployeeStats
                            backgroundColor={
                              item?.attendanceByDate?.morningStatus?.toLowerCase() === 'timely in'
                                ? '#F4FBF5'
                                : item?.attendanceByDate?.morningStatus?.toLowerCase() === 'late in'
                                ? '#FBF4F4'
                                : ''
                            }
                            color={
                              item?.attendanceByDate?.morningStatus?.toLowerCase() === 'timely in'
                                ? '#22BB33'
                                : item?.attendanceByDate?.morningStatus?.toLowerCase() === 'late in'
                                ? '#BB2124'
                                : ''
                            }
                            status={item.attendanceByDate.entryTime}
                            numberOfEmployee={item.numberOfEmployee}
                          />
                          -{' '}
                          <EmployeeStats
                            backgroundColor={
                              item?.attendanceByDate?.eveningStatus?.toLowerCase() === 'timely out'
                                ? '#F4FBF5'
                                : item?.attendanceByDate?.eveningStatus?.toLowerCase() === 'early out'
                                ? '#FEFBF6'
                                : ''
                            }
                            color={
                              item?.attendanceByDate?.eveningStatus?.toLowerCase() === 'timely out'
                                ? '#22BB33'
                                : item?.attendanceByDate?.eveningStatus?.toLowerCase() === 'early out'
                                ? '#F0AD4E'
                                : ''
                            }
                            status={item.attendanceByDate.exitTime}
                            numberOfEmployee={item.numberOfEmployee}
                          />
                        </div>
                      );
                    }
                  })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
