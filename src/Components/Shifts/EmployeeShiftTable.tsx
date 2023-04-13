import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { getSingleShift } from '../../redux/features/singleShiftSlice';
import { apis } from '../apis/constants/ApisService';

export interface DataType {
  id?: string;
  employeeName?: string;
  shiftNotes: string;
  action: string;
}

const EmployeeShiftTable = () => {
  const { shiftId } = useParams();
  const [shiftArray, setShiftArray] = useState<any>([]);

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
      title: 'SHIFT NOTES',
      dataIndex: 'shiftNotes',
      key: 'shiftNotes',
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      render: (record) => (
        <div className='d-flex action-btn-container'>
          {/* <FontAwesomeIcon icon={faPen} color='#35639F' /> */}
          <FontAwesomeIcon
            icon={faTrash}
            color='#35639F'
            onClick={() => deleteEmployee(record)}
          />
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();

  const { data } = useAppSelector((state) => state.singleShiftSlice);

  useEffect(() => {
    const shifts: DataType[] = [];
    data?.assignedTo?.map((shiftData: any) => {
      const tableData = {
        id: shiftData?.userSn,
        employeeName: shiftData?.employeeName,
        shiftNotes: data?.shiftNote,
        action: shiftData?.userSn,
      };
      shifts.push(tableData);
    });

    setShiftArray(shifts);
  }, [data]);

  const deleteEmployee = async (userSn: string) => {
    try {
      const res = await apis.deleteEmployeeFromShift(userSn);
      if (res.status === 200) {
        if (shiftId) {
          dispatch(
            getSingleShift({
              shiftId,
            }) as any
          );
        }
      }
    } catch {
      console.log('error');
    }
  };

  return (
    <Table
      columns={columns}
      className='shift-employee-table'
      dataSource={shiftArray}
      // pagination={tableParams.pagination}
    />
  );
};

export default EmployeeShiftTable;
