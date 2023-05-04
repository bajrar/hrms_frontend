import React, { useEffect } from 'react';
import { getSingleLeave } from '../../redux/features/singleLeaveSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';

const LeaveDetailTable = () => {
  const dispatch = useDispatch();

  const { leaveId } = useParams();

  useEffect(() => {
    dispatch(
      getSingleLeave({
        leaveId,
      } as any) as any
    );
  }, [dispatch]);
  const { leave } = useAppSelector((state) => state.singleLeave);

  return (
    <table className='shift-details-table'>
      <tbody>
        <tr>
          <th className='shift-table-head'>UNIT</th>
          <td className='shift-table-body'>
            <span>{leave?.leave?.leaveUnit}</span>
          </td>
        </tr>
        <tr>
          <th className='shift-table-head'>MAXIMUM UNIT</th>
          <td className='shift-table-body'>
            {leave?.leave?.maximumUnitAllowed}
          </td>
        </tr>
        <tr>
          <th className='shift-table-head'>ACCUMULATED</th>
          <td className='shift-table-body'>
            {leave?.leave?.accumulated ? 'Checked' : 'Unchecked'}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default LeaveDetailTable;
