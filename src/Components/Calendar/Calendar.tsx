import type { BadgeProps } from 'antd';
import { Badge, Calendar, ConfigProvider } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { getEmployeeData } from '../../redux/features/SingleAttendanceSlice';

type Props = {};
const getListData = (value: Dayjs) => {
  let listData;

  switch (value.date()) {
    case 1:
      listData = [
        { type: 'warning', content: '09:00 Am' },
        { type: 'success', content: '18:00 Pm' },
      ];
      break;
    case 2:
      listData = [{ type: 'error', content: 'Absent' }];
      break;
    case 3:
      listData = [
        { type: 'warning', content: '09:10 Am' },
        { type: 'success', content: '17:40 Pm' },
      ];
      break;
    case 4:
      listData = [{ type: 'success', content: 'Holiday' }];
      break;
    case 5:
      listData = [{ type: 'success', content: 'Holiday' }];
      break;
    case 6:
      listData = [
        { type: 'warning', content: '10:00 Am' },
        { type: 'success', content: '18:00 Pm' },
      ];
      break;
    case 7:
      listData = [
        { type: 'warning', content: '09:10 Am' },
        { type: 'success', content: '18:15 Pm' },
      ];
      break;
    case 8:
      listData = [{ type: 'error', content: 'Absent' }];
      break;
    case 9:
      listData = [
        { type: 'warning', content: '09:10 Am' },
        { type: 'success', content: '18:15 Pm' },
      ];
      break;

    default:
  }

  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export const BigCalendar = (props: Props) => {
  // const [locale] = useState<Locale>(zhCN);
  const [value, onChange] = useState(new Date());
  let { employeeId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getEmployeeData({
        userSn: employeeId,
        startDate: '',
        endDate: '',
      }) as any
    );
  }, [dispatch, employeeId]);
  const { employee } = useAppSelector(
    (state: any) => state.SingleAttendanceSlice
  );

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className='events'>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps['status']}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='mt-4 p-2'>
      {/* <ConfigProvider locale={locale}> */}
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        value={dayjs()}
      />
      {/* <Calendar onChange={onChange} value={value} /> */}
      {/* </ConfigProvider> */}
    </div>
  );
};
