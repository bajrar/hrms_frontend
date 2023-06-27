import { useEffect, useState } from "react";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { Table } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import DownloadBtn from "../Ui/DownloadBtn/DownloadBtn";
import "./dailyReport.css";
import NepaliDate from "nepali-date-converter";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/features/attendanceSlice";
import { todayInBsFormat } from "../Customcalendar/GetTodaysDate";
import { formatTime } from "../Ui/Tables/SingleEmployee";
import { ProjectTeamOptions } from "../../utils/Constants";
import Selects from "../Ui/Selects/Selects";

export interface DataType {
  id?: string;
  key?: string;
  date: string;
  name: string;
  status: React.ReactNode;
  designation: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
}

const DailyReports = () => {
  const [attendanceData, setAttendanceData] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const [defaultDate, setDefaultDate] = useState(todayInBsFormat);
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);

  const onSelect = (e: any) => {
    setStatus(e);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onDateChange = ({ bsDate }: any) => {
    setDefaultDate(bsDate);
  };

  const role = tokenData?.role ? tokenData?.role : userData?.role;
  const email = tokenData?.email ? tokenData?.email : userData?.email;
  useEffect(() => {
    dispatch(getUsers({ status: status, date: defaultDate }));
  }, [dispatch, status, defaultDate]);

  const { user, loading } = useAppSelector((state) => state.attendanceSlice);
  console.log("looking for status: ", status);

  const columns: ColumnsType<DataType> = [
    {
      title: "EID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "DESIGNATION",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "PROJECT TEAM",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "ARRIVAL TIME",
      dataIndex: "clockIn",
      key: "clockIn",
    },
    {
      title: "DEPARTURE TIME",
      dataIndex: "clockOut",
      key: "clockOut",
    },
    {
      title: "WORK HOURS",
      dataIndex: "workHours",
      key: "workHours",
      render: (item) => {
        return (
          <div className="workhours">
            <p>
              {item} {item === "-" ? "" : "Hours"}{" "}
            </p>
          </div>
        );
      },
    },
  ];

  const today: any = new NepaliDate();
  today.setDate(today.getDate() + 1);
  const disable2morrowDate = today.format("YYYY-MM-DD");

  useEffect(() => {
    const data1: DataType[] = [];
    let attendanceUser = user;
    if (role === "user") {
      attendanceUser = user?.filter((each) => each.email === email);
    }
    attendanceUser?.map((userData, sn) => {
      userData?.attendanceRecords?.map((attendance: any) => {
        if (userData.employeeName.toLowerCase().includes(searchText)) {
          const tableData = {
            sn: sn + 1,
            id: userData?.employeeNumber,
            key: userData?.employeeNumber,
            date: attendance?.attendanceByDate?.date,
            name: userData?.employeeName,

            status:
              attendance?.attendanceByDate?.status === "WFH"
                ? "Working From Home"
                : attendance?.attendanceByDate?.holiday
                ? "Holiday"
                : attendance.attendanceByDate?.absent
                ? "Absent"
                : `${attendance?.attendanceByDate?.morningStatus} - ${attendance?.attendanceByDate?.eveningStatus}`,

            designation: userData?.designation,
            clockIn: attendance?.attendanceByDate?.absent
              ? "Absent"
              : attendance?.attendanceByDate?.holiday
              ? "Holiday"
              : `${formatTime(attendance?.attendanceByDate?.entryTime)}`,
            clockOut: attendance?.attendanceByDate?.absent
              ? "Absent"
              : attendance?.attendanceByDate?.holiday
              ? "Absent"
              : attendance?.attendanceByDate?.exitTime === "-"
              ? attendance?.attendanceByDate?.exitTime
              : `${formatTime(attendance?.attendanceByDate?.exitTime)}`,
            workHours: attendance?.attendanceByDate?.absent
              ? "0.00"
              : attendance?.attendanceByDate?.holiday
              ? "0.00"
              : attendance?.attendanceByDate?.workHour,
            view: userData?.employeeNumber,
          };
          data1.push(tableData);

          // setAttendanceData([...attendanceData, tableData]);
        }
      });
    });

    setAttendanceData(data1);
  }, [user, searchText]);

  const filterData = status
    ? attendanceData.filter((each: any) => each.designation === status)
    : attendanceData;

  return (
    <div>
      <div className="attendance-filters working-condition p-0 calendar-wrapper">
        <Calendar
          onChange={onDateChange}
          className="date-picker calender-container-picker leave-inputs "
          language="en"
          dateFormat="YYYY/MM/DD"
          maxDate={disable2morrowDate}
        />
        <CalendarOutlined className="calendar-icon" />
      </div>

      <div className="d-flex justify-content-between align-items-center daily-report-search">
        <input
          type="text"
          placeholder="Search members"
          className="search-field"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          onKeyDown={(e) => {
            const key = e.key;
            const regex = /^[A-Za-z\s]+$/;
            if (!regex.test(key)) {
              e.preventDefault();
            }
          }}
        />
        <div style={{ display: "flex", gap: 10 }}>
          <Selects
            placeHolder="Search project name"
            onSelect={onSelect}
            // onChange={onChange}
            value={status}
            options={ProjectTeamOptions}
          />

          <DownloadBtn report={attendanceData} />
        </div>
      </div>
      <div className="daily-report-table-container">
        <Table
          rowClassName={(record) =>
            record.clockIn === "Absent"
              ? "absent-class"
              : record.clockIn === "Holiday"
              ? "holiday-class"
              : ""
          }
          columns={columns}
          dataSource={filterData}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DailyReports;
