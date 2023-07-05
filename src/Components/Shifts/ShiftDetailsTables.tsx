import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { getSingleShift } from '../../redux/features/singleShiftSlice';
import { useGetShiftByIdQuery } from '../../redux/api/shift/shiftApiSlice';

const ShiftDetailsTable = () => {
  const { shiftId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (shiftId) {
      dispatch(
        getSingleShift({
          shiftId,
        }) as any
      );
    }
  }, [dispatch]);

  // const { data } = useAppSelector((state) => state.singleShiftSlice);
  const { data, isLoading: loading } = useGetShiftByIdQuery({ shiftId });

  return (
    <table className='shift-details-table'>
      <tbody>
        <tr>
          <th className='shift-table-head'>WORKING DAYS</th>
          <td className='shift-table-body'>
            {data?.workingDay?.map((item: any) => (
              <span>{item}</span>
            ))}
          </td>
        </tr>
        <tr>
          <th className='shift-table-head'>TIME</th>
          <td className='shift-table-body'>
            {data?.startTime} -{data?.endTime}
          </td>
        </tr>
        <tr>
          <th className='shift-table-head'>SHIFT SCHEDULING</th>
          <td className='shift-table-body'>{data?.shiftSchedule}</td>
        </tr>
        <tr>
          <th className='shift-table-head'>DEVICE</th>
          <td className='shift-table-body'>{data?.device}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ShiftDetailsTable;
