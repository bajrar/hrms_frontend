import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import LeaveDetailTable from '../../Components/LeaveAllocation/LeaveDetailTable';
import { useDispatch } from 'react-redux';
import { getSingleLeave } from '../../redux/features/singleLeaveSlice';
import { useAppSelector } from '../../hooks/useTypedSelector';

export interface DataType {
  id?: string;
  employeeName?: string;
  leaveNotes: string;
  action: string;
}

const LeaveDetails = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'EID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'EMPLOYEE NAME',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'LEAVE NOTES',
      dataIndex: 'leaveNotes',
      key: 'leaveNotes',
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      render: (record) => (
        <div className='d-flex action-btn-container'>
          <FontAwesomeIcon icon={faPen} color='#35639F' />
          <FontAwesomeIcon icon={faTrash} color='#35639F' />
        </div>
      ),
    },
  ];

  const { leaveId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSingleLeave({
        leaveId,
      } as any) as any
    );
  }, [dispatch]);

  const { leave } = useAppSelector((state) => state.singleLeave);

  // useEffect(() => {
  //   const shifts: DataType[] = [];
  //   data?.assignedTo?.map((shiftData: any) => {
  //     const tableData = {
  //       id: shiftData?.userSn,
  //       employeeName: shiftData?.employeeName,
  //       shiftNotes: data?.shiftNote,
  //       action: shiftData?.userSn,
  //     };
  //     shifts.push(tableData);
  //   });

  //   setShiftArray(shifts);
  // }, [data]);

  return (
    <div className='padding'>
      <hr />
      <BreadCrumbs
        imagesrc='/images/leave.svg'
        location='Leave Management &nbsp; &nbsp;Leave Allocation'
        location1='Add leave'
        location2='Annual Leave'
      />
      <hr />
      <LeaveDetailTable />

      <Table columns={columns} className='table-container' />
    </div>
  );
};

export default LeaveDetails;
