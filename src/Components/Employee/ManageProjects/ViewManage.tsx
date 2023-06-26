import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  DatePicker,
  Select,
  Table,
  Modal,
} from "antd";

import "../add-employee-form.css";
// import "../add-employee-form.css";
import BreadCrumbs from "../../Ui/BreadCrumbs/BreadCrumbs";
import Layout from "../../Layout";
import Navbar from "../../Ui/Navbar";
import { WorkingCondition } from "../../../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalComponent from "../../Ui/Modal/Modal";
import ViewAllEmployee from "../../Ui/Tables/ViewAllEmployee";
import { isErrored } from "stream";
import { EmployeeForm } from "../EmployeeForm";
import { Link, useNavigate } from "react-router-dom";
import { CompareFunction } from "../../Ui/Tables/AttendaceReport";
import { ColumnsType } from "antd/es/table";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useTypedSelector";
import { getEmployee } from "../../../redux/features/employeeSlice";
import { EmployeeStats } from "../../../pages/Attendance/Attendance";
import AddProjectForm from "./AddProjectForm";
import AssignProjectForm from "./AssignProjectForm";

export interface DataType {
  id?: string;
  key?: string;
  date: string;
  name: string;
  status: React.ReactNode;
  designation: string;
}

export const ViewManage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);

  const [activeEmployee, setActiveEmployee] = useState<any>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getUsers({ status: status, date: defaultDate }) as any);
    dispatch(getEmployee() as any);
  }, [dispatch]);

  const { employee, loading } = useAppSelector((state) => state.employeeSlice);
  const [form] = Form.useForm();
  // console.log(employee, "EE");

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [filteredData, setFilteredData] = useState<any[]>(employee?.employee);

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
      title: "EID",
      dataIndex: "employeeNumber",
      key: "employeeNumber",
    },
    {
      title: "EMPLOYEE NAME",
      dataIndex: "employeeName",
      key: "employeeName",
      // filteredValue: [searchText],
      // onFilter: (value: any, record: any) => {
      //   // console.log(record);
      //   return String(record.employeeName)
      //     .toLowerCase()
      //     .includes(value.toLowerCase());
      // },
    },
    {
      title: "EMPLOYEE EMAIL",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
    },
    {
      title: "PROJECT NOTES",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "ACTION",
      dataIndex: "view",
      key: "view",
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
            />{" "}
            <FontAwesomeIcon
              icon={faTrash}
              color="#35639F"
              onClick={() => setActiveEmployee({ ...item })}
            />
          </div>
        );
      },
    },
  ];

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
    filterTable(value);
  };

  const filterTable = (value: string) => {
    if (value === "All") {
      setFilteredData(employee?.employee);
    } else {
      const filtered = employee?.employee.filter(
        (item: any) => item.designation === value
      );
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ margin: 40 }}>
          <BreadCrumbs
            imagesrc="/images/attendance.svg"
            location="Employee Management"
            location1="Manage Projects"
            location2="Apply Here"
          />
          <hr />
          <div
            className="attendance-filters-bottom d-flex "
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Select
              value={selectedOption}
              defaultValue="All"
              onChange={handleSelectChange}
              placeholder="Apply Here"
              style={{ width: 200, marginBottom: 16 }}
              options={[
                { value: "All", label: "All" },
                { value: "React Native", label: "React Native" },
                { value: "Executive Director", label: "Executive Director" },
                {
                  value: "Human Resources (HR)",
                  label: "Human Resources (HR)",
                },
                {
                  value: "React Native Developer",
                  label: "React Native Developer",
                },
                { value: "QA", label: "QA" },
              ]}
            ></Select>
            {/* <input
              type="text"
              placeholder="Apply Here"
              className="search-field"
              onChange={(e) => setSearchText(e.target.value)}
            /> */}
          </div>
        </div>

        <div className="attendace-page">
          <div className="row table-container">
            <Table
              rowClassName={(record) =>
                record.status === "resigned"
                  ? "absent-class"
                  : record.status === "pending"
                  ? "holiday-class"
                  : ""
              }
              columns={columns}
              dataSource={filteredData}
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
        <AddProjectForm
          setIsModalOpen={setIsModalOpen}
          employeeId={activeEmployee}
        />
      </ModalComponent>

      <ModalComponent
        openModal={isViewOpen}
        classNames="add-employee-modal holidays-modal"
        closeModal={setIsViewOpen}
      >
        <AssignProjectForm
          setIsViewOpen={setIsViewOpen}
          employeeId={activeEmployee}
        />
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

export default ViewManage;
