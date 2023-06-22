import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { EmployeeStats } from "../../../pages/Attendance/Attendance";
import { CompareFunction } from "./AttendaceReport";
import { useGetAttendanceByDateRangeQuery } from "../../../redux/api/attendanceByDateSlice";
import NepaliDate from "nepali-date-converter";
import { useGetTokenDataQuery } from "../../../redux/api/tokenSlice";

interface DataType {
  id?: string;
  key: string;
  date: string;
  name: string;
  status: React.ReactNode;
  designation: string;
  clockIn: string;
  clockOut: string;
  workHours: string;
}
export const formatTime = (time: any) => {
  const t = time ?? "";
  const q = t.split(":");
  return q.length >= 2 ? `${q[0]}:${q[1]}` : "";
  // const t = time;
  // const q = t?.split(':');
  // return `${q[0]}:${q[1]}`;
};
const UserDashboardAttendance = () => {
  const [attendanceData, setAttendanceData] = useState<any>([]);
  const currentDate = new NepaliDate(new Date()).format("YYYY/MM/DD");
  const startDate = new NepaliDate(new Date()).format("YYYY/MM");
  const { data: tokenData } = useGetTokenDataQuery("token");
  console.log("Hello User:", tokenData?.userSn);
  const { data: employee, isLoading } = useGetAttendanceByDateRangeQuery({
    userSn: tokenData?.userSn,
    startDate: `${startDate}/01`,
    endDate: currentDate,
  });
  let { employeeId } = useParams();

  // const { employee } = useAppSelector(
  //   (state: any) => state.SingleAttendanceSlice
  // );

  console.log({ employee }, "<------ this is the employee");
  const columns: ColumnsType<DataType> = [
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (item) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                // backgroundColor: '#22BB33',
                borderLeft: `4px solid ${
                  item === "Absent"
                    ? "red"
                    : item === "Holiday"
                    ? "#9376E0"
                    : "#44BB32"
                }`,
              }}
              className={`employee-stats `}
            >
              {item}
            </div>

            {/* {item.split('-').map((ite: any, i: number) => {
              return (
                <EmployeeStats
                  key={i}
                  status={ite}
                  color={
                    CompareFunction(ite) === 'timelyin'
                      ? '#22BB33'
                      : CompareFunction(ite) === 'timelyout'
                      ? '#22BB33'
                      : CompareFunction(ite) === 'earlyin'
                      ? '#F0AD4E'
                      : CompareFunction(ite) === 'earlyout'
                      ? '#F0AD4E'
                      : CompareFunction(ite) === 'lateout'
                      ? '#BB2124'
                      : CompareFunction(ite) === 'latein'
                      ? '#BB2124'
                      : 'transparent '
                  }
                />
              );
            })} */}
          </div>
        );
      },
    },

    {
      title: "WORK HOURS",
      dataIndex: "workHours",
      key: "workHours",
      render: (item) => {
        console.log(item === "", "<------ this is work ahr");
        return (
          <div className="workhours">
            <p>
              {item} {item === "" ? "-" : "Hours"}{" "}
            </p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    setAttendanceData(employee);
  }, [employeeId]);

  useEffect(() => {
    const data1: DataType[] = [];
    employee?.result?.map((userData: any) => {
      const tableData = {
        key: userData?._id,
        date: userData?.attendanceByDate?.date,
        name: userData?.employeeName,
        status: userData?.attendanceByDate?.absent
          ? "Absent"
          : userData?.attendanceByDate?.holiday
          ? "Holiday"
          : "Present",
        // status:
        //   userData?.attendanceByDate?.holiday ||
        //   userData?.attendanceByDate?.absent
        //     ? ''
        //     : `${userData?.attendanceByDate?.morningStatus} - ${userData?.attendanceByDate?.eveningStatus}`,
        designation: userData?.designation,
        clockIn: userData?.attendanceByDate?.absent
          ? "Absent"
          : userData?.attendanceByDate?.holiday
          ? "Holiday"
          : `${formatTime(userData?.attendanceByDate?.entryTime)}`,
        clockOut: userData?.attendanceByDate?.absent
          ? ""
          : userData?.attendanceByDate?.holiday
          ? ""
          : userData?.attendanceByDate?.exitTime === "-"
          ? userData?.attendanceByDate?.exitTime
          : `${formatTime(userData?.attendanceByDate?.exitTime)}`,
        workHours: userData?.attendanceByDate?.absent
          ? ""
          : userData?.attendanceByDate?.holiday
          ? ""
          : userData?.attendanceByDate?.workHour,
      };

      data1.push(tableData);
    });

    setAttendanceData(data1);
  }, [employee]);

  return isLoading ? (
    <Skeleton active />
  ) : (
    <div className="single-employee">
      <Table
        // rowClassName={(record) =>
        //   record.clockIn === 'Absent'
        //     ? 'absent-class'
        //     : record.clockIn === 'Holiday'
        //     ? 'holiday-class'
        //     : ''
        // }
        columns={columns}
        dataSource={attendanceData}
        // pagination={tableParams.pagination}
      />
    </div>
  );
};

export default UserDashboardAttendance;
