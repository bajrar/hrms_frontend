import { Table, Form, Select } from "antd";
import { useEffect, useState } from "react";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import type { ColumnsType } from "antd/es/table";
import Selects from "../Ui/Selects/Selects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./addLeaveForm.css";
import ModalComponent from "../Ui/Modal/Modal";
import ApplyLeaveForm from "./ApplyLeaveForm";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { RootState } from "../../store";
import { CalendarOutlined } from "@ant-design/icons";
import { reduceByKeys } from "../../hooks/HelperFunctions";
import { useGetLeavesQuery } from "../../redux/api/leaveSlice";
import { useGetTokenDataQuery } from "../../redux/api/tokenSlice";

export interface DataType {
  eid?: string;
  employeeName?: string;
  leaveType: string;
  date: string;
  reasonForLeave: string;
  approvedBy: string;
}

const ApplyLeave = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [leaveNameArray, setLeaveNameArray] = useState<any[]>([]);
  const [leaveNameSelect, setLeaveNameSelect] = useState<any[]>([]);
  const [filterLeaveData, setFilterLeaveData] = useState<any>([]);
  const [searchByLeave, setSearchByLeave] = useState("");
  const userDetails = localStorage.getItem("userDetails");
  const employeeDetails = JSON.parse(userDetails || "");
  const [form] = Form.useForm();
  const { Option } = Select;

  const onStartDateChange = ({ bsDate }: any) => {
    setStartDate(bsDate);
  };
  const onEndDateChange = ({ bsDate }: any) => {
    setEndDate(bsDate);
  };
  // const { data: leaveData, isLoading } = useGetLeavesQuery('leave');
  const { leaves } = useAppSelector((state: any) => state.leaveSlice);
  console.log({ leaves }, "1st");
  const { data: tokenData } = useGetTokenDataQuery("token");
  const userRole = tokenData?.role;
  let leaveEndpont = "leave/employee/appliedLeave";
  if (userRole === "user") {
    leaveEndpont = `leave/employee/appliedLeave?userSn=${tokenData?.userSn}`;
  }
  const { data: leaveData, isLoading } = useGetLeavesQuery(leaveEndpont);

  const columns: ColumnsType<DataType> = [
    {
      title: "EID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "EMPLOYEE NAME",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "LEAVE TYPE",
      dataIndex: "leaveType",
      key: "leaveType",
      filters: leaveNameSelect.map((leaveName: any) => ({
        text: leaveName.label,
        value: leaveName.value,
      })),
      onFilter: (value: any, record: DataType) => record.leaveType === value,
    },
    {
      title: "DATE",
      key: "date",
      render: (item, record: any) => {
        return (
          <div>
            {record.from} -{record.to}{" "}
          </div>
        );
      },
    },
    {
      title: "REASON FOR LEAVE",
      dataIndex: "reason",
      key: "reasonForLeave",
    },
    {
      title: "APPROVED BY",
      dataIndex: "approvedBy",
      key: "approvedBy",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const shiftNameArray = reduceByKeys(leaves?.leave, "_id", "leaveName");
    setLeaveNameArray(shiftNameArray);
  }, [leaves?.leave]);

  console.log(leaveNameArray, "2scond");
  useEffect(() => {
    if (leaveNameArray) {
      const leaveArray = [
        { label: "ALL", value: "" },
        ...leaveNameArray.map((leaveName: any) => ({
          label: leaveName?.label,
          value: leaveName?.label,
        })),
      ];
      setLeaveNameSelect(leaveArray);
    }
  }, [leaveNameArray]);

  console.log(leaveNameSelect, "JAI");
  // const allLeaveTaken = employeeDetails?.leave.flatMap(
  //   (leave: any) => leave.leaveTakenOn
  // );
  const allLeaveTaken = leaveData?.leave;
  console.log(
    "🚀 ~ file: ApplyLeave.tsx:122 ~ ApplyLeave ~ allLeaveTaken:",
    allLeaveTaken
  );

  const onLeaveChange = (value: string) => {
    setSearchByLeave(value.toLowerCase());
  };

  console.log(searchByLeave, "selected");
  useEffect(() => {
    const filterLeaveData = searchByLeave
      ? allLeaveTaken.filter(
          (leave: any) => leave.leaveType.toLowerCase() === searchByLeave
        )
      : allLeaveTaken;
    setFilterLeaveData(filterLeaveData);
  }, [searchByLeave, allLeaveTaken]);

  return (
    <div className="assign-leave">
      <div className="d-flex justify-content-between align-items-center daily-report-search">
        <div className="attendance-filters calendar-wrapper">
          <div className="calendar-wrapper">
            <Calendar
              onChange={onStartDateChange}
              className="date-picker calender-container-picker leave-inputs calender-wrapper "
              dateFormat="YYYY/MM/DD"
              language="en"
            />
            <CalendarOutlined className="calendar-icon" />
          </div>
          To
          <div className="calendar-wrapper">
            <Calendar
              onChange={onEndDateChange}
              className="date-picker calender-container-picker leave-inputs"
              dateFormat="YYYY/MM/DD"
              language="en"
            />

            <CalendarOutlined className="calendar-icon" />
          </div>
        </div>
        <div className="d-flex gap-5 daily-report-saerch-right">
          <div className="d-flex flex-grow-1">
            <Select
              showSearch
              onChange={onLeaveChange}
              placeholder="Search leave name"
              className="selects form-input-wrapper w-100"
              filterOption={(input, option: any) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {leaveNameSelect.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
          {/* <Selects placeHolder='Search leave name' className='leave-inputs' /> */}
          <button className="primary-btn" onClick={showModal}>
            <FontAwesomeIcon icon={faPlus} /> Apply Leave
          </button>
        </div>
      </div>
      <div className="daily-report-table-container">
        <Table
          columns={columns}
          dataSource={filterLeaveData}
          loading={isLoading}
        />
      </div>
      <ModalComponent
        openModal={isModalOpen}
        classNames="assign-leave-modal"
        closeModal={setIsModalOpen}
      >
        <h3 className="modal-title">APPLY LEAVE</h3>
        <ApplyLeaveForm setIsModalOpen={setIsModalOpen} />
      </ModalComponent>
    </div>
  );
};

export default ApplyLeave;
