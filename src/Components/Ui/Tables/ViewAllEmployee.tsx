import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './attendanceReport.css';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../hooks/useTypedSelector';
import { EmployeeStats } from '../../../pages/Attendance/Attendance';
import { getEmployee } from '../../../redux/features/employeeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';


export interface DataType {
  id?: string;
  key?: string;
  date: string;
  name: string;
  status: React.ReactNode;
  designation: string;
}

export const CompareFunction = (compareList: any) => {
  const compareItem = compareList.toLowerCase().trim().split(' ').join('');
  return compareItem;
};

const ViewAllEmployee = ({ defaultDate, searchText, status,getData ,showModal}: any) => {
  const dispatch = useAppDispatch();
  const [attendanceData, setAttendanceData] = useState<any>([]);
  const [getEmployeeData,setGetEmployeeData] = useState({}as any)

  useEffect(() => {
    // dispatch(getUsers({ status: status, date: defaultDate }) as any);
    dispatch(getEmployee() as any);
  }, [dispatch]);

  const {employee} = useAppSelector((state) => state.employeeSlice);

  const columns: ColumnsType<DataType> = [
    {
      title: 'SN',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: 'EID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'EMPLOYEE NAME',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'DATE OF JOINING',
      dataIndex: 'date',
      key: 'date',
    },

  
    {
      title: 'DESIGNATION',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (item) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.split('-').map((ite: any, i: number) => {
              return (
                <EmployeeStats
                  key={i}
                  status={ite}
                  color={
                    CompareFunction(ite) === 'working'
                      ? '#22BB33'
                      : CompareFunction(ite) === 'pending'
                      ? '#F0AD4E'
                      : CompareFunction(ite) === 'resigned'
                      ? '#BB2124'
                      : 'transparent'
                  }
                />
              );
            })}
          </div>
        );
      },
    },
    {
      title: 'ACTION',
      dataIndex: 'view',
      key: 'view',
      render: (item) => {
        return (
          <div style={{display:'flex',gap:20,justifyContent:'center',alignItems:'center'}}>
                 <FontAwesomeIcon
            icon={faPen}
            color='#35639F'
            // onClick={() => updateEmployee(id)}
            onClick={() =>{ 
              setGetEmployeeData(item)
              showModal()
            }}
          />
            <Link className='viewMoreBtn' to={`/employee/${item}`}>
              View
            </Link>
          </div>
        );
      },
    },
  ];
  getData(getEmployeeData)
  useEffect(() => {
    const data1: DataType[] = [];
    employee?.employee?.map((userData:any,sn:any) => {
      if (userData.employeeName.toLowerCase().includes(searchText)) {
        const dateObject = new Date(userData.dateOfJoining);
      const formattedDate = dateObject.toISOString().split('T')[0];
        const tableData = {
          id: userData?.employeeNumber,
          key: userData?.employeeNumber,
          date: formattedDate,
          name: userData?.employeeName,
          status: userData.status,
          designation: userData?.designation,
          view: userData,
          sn:sn+1
        };
        data1.push(tableData);
      }

    });

    setAttendanceData(data1);
  }, [employee, searchText]);

 const filterData =  status?attendanceData.filter(((each:any)=>each.status === status)): attendanceData

  return (
    <Table
      rowClassName={(record) =>
        record.status === 'resigned'
          ? 'absent-class'
          : record.status === 'pending'
          ? 'holiday-class'
          : ''
      }  
      columns={columns}
      dataSource={filterData}
    />
  );
};

export default ViewAllEmployee;
