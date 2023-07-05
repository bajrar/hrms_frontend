import { useEffect, useState } from 'react';
import { Button, Form, Table } from 'antd';

import '../add-employee-form.css';
// import "../add-employee-form.css";
import BreadCrumbs from '../../Ui/BreadCrumbs/BreadCrumbs';
import Layout from '../../Layout';
import Navbar from '../../Ui/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalComponent from '../../Ui/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { getEmployee } from '../../../redux/features/employeeSlice';
import AddProjectForm from './AddProjectForm';
import AssignProjectForm from './AssignProjectForm';
import { useGetEmployeeQuery } from '../../../redux/api/employeeApiSlice';

export interface DataType {
  id?: string;
  key?: string;
  date: string;
  name: string;
  status: React.ReactNode;
  designation: string;
}

export const ManageProjects = () => {
  const [gender, setGender] = useState('');
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  // const [UpdateisModalOpen, setUpdateIsModalOpen] = useState<boolean>(false);
  // const [getEmployeeData,setGetEmployeeData] = useState({}as any)
  const [activeEmployee, setActiveEmployee] = useState<any>(undefined);
  const dispatch = useAppDispatch();
  const [attendanceData, setAttendanceData] = useState<any>([]);
  const [filterData, setFilterData] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(getUsers({ status: status, date: defaultDate }) as any);
    dispatch(getEmployee() as any);
  }, [dispatch]);

  // const { employee, loading } = useAppSelector((state) => state.employeeSlice);
  const { data: employee, isLoading: loading } = useGetEmployeeQuery('employee');
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const viewModel = () => {
    setIsViewOpen(!isViewOpen);
  };
  const updateEmployeeModel = (id: string) => {
    setActiveEmployee(id);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'PROJECT NAME',
      dataIndex: 'employeeNumber',
      key: 'employeeNumber',
    },
    {
      title: 'DEPARTMENT/SECTION',
      dataIndex: 'employeeName',
      key: 'employeeName',
      filteredValue: [searchText],
      onFilter: (value: any, record: any) => {
        // console.log(record);
        return String(record.employeeName).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'ADDED DATE',
      dataIndex: 'dateOfJoining',
      key: 'dateOfJoining',
    },
    {
      title: 'ACTION',
      dataIndex: 'view',
      key: 'view',
      render: (item) => {
        // console.log(item);
        return (
          <div className="d-flex align-items-center action-btn-container">
            <FontAwesomeIcon
              icon={faPen}
              color="#35639F"
              // onClick={() => updateEmployee(id)}
              onClick={() => {
                setActiveEmployee({ ...item });
              }}
            />{' '}
            <FontAwesomeIcon icon={faTrash} color="#35639F" onClick={() => setActiveEmployee({ ...item })} />
            <Button
              className=""
              style={{
                color: '#3333F1',
              }}
              onClick={() => {
                navigate(`/manageProjects/${item?.employeeNumber}`);
              }}
              type="text"
            >
              VIEW
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ margin: 40 }}>
          <BreadCrumbs imagesrc="/images/attendance.svg" location="Employee Management" location1="Manage Projects" />
          <hr />
          <div
            className="attendance-filters-bottom d-flex "
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <input
              type="text"
              placeholder="Search"
              className="search-field"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="div" style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                className="btn"
                style={{
                  height: '40px',
                  color: '#007bff',
                  backgroundColor: 'transparent',
                  backgroundImage: 'none',
                  borderColor: '#007bff',
                }}
                onClick={() => setIsViewOpen(true)}
              >
                Assign Project
              </button>

              <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
                <FontAwesomeIcon icon={faPlus} /> Add Projects
              </button>
            </div>
          </div>
        </div>

        <div className="attendace-page">
          <div className="row table-container">
            <Table
              rowClassName={(record) =>
                record.status === 'resigned' ? 'absent-class' : record.status === 'pending' ? 'holiday-class' : ''
              }
              columns={columns}
              dataSource={employee?.employee}
              loading={loading}
            />
          </div>
        </div>
        {/* <EmployeeForm/> */}
      </Layout>

      <ModalComponent
        openModal={isModalOpen}
        classNames="add-employee-modal holidays-modal"
        closeModal={setIsModalOpen}
      >
        <AddProjectForm setIsModalOpen={setIsModalOpen} employeeId={activeEmployee} />
      </ModalComponent>

      <ModalComponent openModal={isViewOpen} classNames="add-employee-modal holidays-modal" closeModal={setIsViewOpen}>
        <AssignProjectForm setIsViewOpen={setIsViewOpen} employeeId={activeEmployee} />
      </ModalComponent>

      {/* <ModalComponent
        openModal={!!activeEmployee}
        classNames="holidays-modal"
        closeModal={() => setActiveEmployee(undefined)}
      >
        {!!activeEmployee && (
          <EmployeeForm
            update
            setIsModalOpen={() => setActiveEmployee("")}
            employeeId={activeEmployee}
            defaultValue={activeEmployee}
          />
        )}
      </ModalComponent> */}
    </>
  );
};

export default ManageProjects;
