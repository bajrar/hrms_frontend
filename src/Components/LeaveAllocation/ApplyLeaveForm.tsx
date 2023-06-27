import { Button, Form, Input, Select, message } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import { IForm } from "../Shifts/AddShiftForm";
import { useAppSelector } from "../../hooks/useTypedSelector";
import "./addLeaveForm.css";
import { useEffect, useState } from "react";
import { reduceByKeys } from "../../hooks/HelperFunctions";
import { apis } from "../apis/constants/ApisService";
import { RootState } from "../../store";
import {
  useApplyLeaveMutation,
  useGetLeavesQuery,
} from "../../redux/api/leaveSlice";
import { useGetUserProfileQuery } from "../../redux/features/profileSlice";
import Selects from "../Ui/Selects/Selects";
const { Option } = Select;

const ApplyLeaveForm = ({ setIsModalOpen }: IForm) => {
  const [leaveNameArray, setLeaveNameArray] = useState<any[]>([]);
  const [leaveNameSelect, setLeaveNameSelect] = useState<any[]>([]);
  const [leaveOption, setLeaveOption] = useState("");
  const [form] = Form.useForm();

  const userData = useAppSelector((state: RootState) => state.userSlice.value);
  const { leaves } = useAppSelector((state) => state.leaveSlice);
  const { tokenData } = useAppSelector((state) => state.verifyTokenSlice);
  const userRole = tokenData?.role ? tokenData?.role : userData?.role;
  const { data: employeeData } = useGetUserProfileQuery(tokenData.userSn || "");
  console.log(employeeData, "mero data");
  const { data, isLoading } = useGetLeavesQuery("leave");

  const [
    applyLeave,
    {
      data: leaveResponse,
      error: leaveError,
      isSuccess: isLeaveSuccess,
      isError: isLeaveError,
    },
  ] = useApplyLeaveMutation();
  useEffect(() => {
    const shiftNameArray = reduceByKeys(leaves?.leave, "_id", "leaveName");
    setLeaveNameArray(shiftNameArray);
  }, [leaves?.leave]);

  // console.log(leaveNameArray, "select name");
  useEffect(() => {
    if (leaveNameArray) {
      const leaveArray = leaveNameArray?.map((leaveName: any) => {
        return {
          label: leaveName?.label,
          value: leaveName?.value,
        };
      });
      setLeaveNameSelect(leaveArray);
    }
  }, [leaveNameArray]);

  // console.log({ leaveNameSelect }, "fix select");
  // useEffect(() => {
  //   const leaveNameArray = reduceByKeys(data?.leave, "_id", "leaveName");
  //   setLeaveNameArray(leaveNameArray);
  // }, [data?.leave, isLoading]);
  // useEffect(() => {
  //   if (leaveNameArray) {
  //     const leaveArray = leaveNameArray?.map((leaveName: any) => {
  //       return {
  //         label: leaveName?.label,
  //         value: leaveName?.value,
  //       };
  //     });
  //     setLeaveNameSelect(leaveArray);
  //   }
  // }, [leaveNameArray]);

  // const onleaveName = (value: string[]) => {
  //   form.setFieldValue("leaveName", value);
  // };

  const onLeaveName = (value: string) => {
    // const employeeArray: any = [];
    setLeaveOption(value);
    form.setFieldValue("leaveName", value);
  };

  const onCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const { TextArea } = Input;
  const onFinish = async (values: any) => {
    const { startDate, endTime, leaveName, ...rest } = values;
    console.log({ endTime });
    try {
      // await applyLeave({
      //   from: startDate,
      //   to: endTime.bsDate,
      //   employeeId: employeeData?.employee?.employeeNumber,
      //   employeeName: employeeData?.employee?.employeeName,
      //   id: values.leaveName,
      //   ...rest,
      // });
      console.log(values.leaveName, "lllll");
      const res = await apis.applyLeave(
        {
          from: startDate,
          to: endTime.bsDate,
          employeeId: employeeData?.employee?.employeeNumber,
          employeeName: employeeData?.employee?.employeeName,
          ...rest,
        },
        values.leaveName
      );
      if (res.status === 200) {
        message.success("Leave Applied");
        form.resetFields();
      }
      setIsModalOpen(false);
    } catch {
      message.error("Something Went Wrong");
    } finally {
      // setIsModalOpen(false);
    }
  };
  useEffect(() => {
    if (isLeaveSuccess) {
      message.success(leaveResponse?.message);
      form.resetFields();
    } else if (isLeaveError) {
      message.error("");
    }
  }, [leaveResponse, isLeaveSuccess, isLeaveError]);

  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
  const [selectedName, setSelectedName] = useState<string | undefined>(
    undefined
  );

  const handleIdChange = (value: string) => {
    // setSelectedId(value);
    const selectedUser = employeeData?.employee?.find((employee: any) =>
      employee.employeeNumber.toString().includes(value.toString())
    );
    // console.log(selectedUser?.employeeName, "setSelectedName");
    if (selectedUser) {
      setSelectedName(selectedUser?.employeeName);
      setSelectedId(selectedUser?.employeeNumber);
    } else {
      setSelectedId(undefined);
      setSelectedName(undefined);
    }
    form.setFieldsValue({
      employeeName: selectedUser ? selectedUser?.employeeName : undefined,
    });
  };

  const handleNameChange = (value: string) => {
    setSelectedName(value);
    const selectedUser = employeeData?.employee?.find((employee: any) =>
      employee.employeeName.toLowerCase().includes(value.toLowerCase())
    );
    if (selectedUser) {
      setSelectedId(selectedUser?.employeeNumber);
      setSelectedName(selectedUser?.employeeName);
      // console.log(selectedUser.employeeNumber, "setSelectedID");
    } else {
      setSelectedId(undefined);
      setSelectedName(undefined);
    }
    form.setFieldsValue({
      employeeId: selectedUser ? selectedUser?.employeeNumber : undefined,
    });
  };

  const onStartChange = ({ bsDate }: any) => {
    form.setFieldValue("startDate", bsDate);
  };
  const onEndChange = ({ bsDate }: any) => {
    form.setFieldValue("endDate", bsDate);
  };

  return (
    <div className="assign-leave-form">
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <div className="d-flex form-second-row align-items-start">
          <Form.Item
            className="form-input col"
            name="leaveName"
            label="Select Leave *"
            rules={[{ required: true, message: "Leave Name is Required" }]}
          >
            <Select
              placeholder="Select the type of leave"
              className="selects form-input-wrapper"
              options={leaveNameSelect}
              onChange={onLeaveName}
              value={leaveOption}
            />
          </Form.Item>
          <Form.Item
            className="form-input col shift-time"
            name="approvedBy"
            label="Approved By *"
            rules={[
              {
                required: true,
                message: "Start time is Required",
              },
            ]}
          >
            <Input
              placeholder="Enter the name of the person who approved this leave"
              className="form-input-wrapper"
              type="text"
            />
          </Form.Item>
        </div>
        {userRole === "admin" && (
          <div className="form-second-row align-items-start ">
            <Form.Item
              className="form-input col unit-input"
              name="employeeId"
              label="Employee ID *"
              rules={[{ required: true, message: "ID is Required" }]}
            >
              {/* <Input
                placeholder="Type the employee ID to search and select"
                className="form-input-wrapper days-input"
                type="text"
              /> */}
              <Select
                showSearch
                filterOption={true}
                className="selects form-input-wrapper"
                placeholder="Type the employee ID to search and select"
                onSelect={handleIdChange}
                value={selectedId ? selectedId.toString() : undefined}
              >
                {employeeData?.employee?.map((employee: any) => (
                  <Option key={employee._id} value={employee.employeeNumber}>
                    {employee.employeeNumber}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              className="form-input col"
              name="employeeName"
              label="Employee Name *"
              rules={[{ required: true, message: "Name is Required" }]}
            >
              {/* <Input
                placeholder="Enter the maximum unit allowed (e.g. 100 days)"
                className="form-input-wrapper"
                type="text"
              /> */}
              <Select
                showSearch
                filterOption={true}
                className="selects form-input-wrapper"
                value={selectedName}
                onChange={handleNameChange}
              >
                {employeeData?.employee?.map((employee: any) => (
                  <Option key={employee._id} value={employee.employeeName}>
                    {employee.employeeName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        )}

        <div className="d-flex align-items-center start-end-container ">
          <Form.Item
            className="form-input col shift-time"
            name="startDate"
            label="Select Date *"
            rules={[
              {
                required: true,
                message: "Start time is Required",
              },
            ]}
          >
            <Calendar
              onChange={onStartChange}
              className=" date-picker  "
              dateFormat="YYYY/MM/DD"
              language="en"
            />
            <CalendarOutlined className="calendar-icon" />
          </Form.Item>

          <Form.Item
            className="form-input col shift-time"
            name="endTime"
            label=<div></div>
            rules={[
              {
                required: true,
                message: "End time is Required",
              },
            ]}
          >
            <Calendar
              onChange={onEndChange}
              className="date-picker "
              dateFormat="YYYY/MM/DD"
              language="en"
            />
          </Form.Item>
        </div>

        <Form.Item
          className="form-input col mt-2"
          name="reason"
          label="Reason for leave *"
        >
          <TextArea
            style={{ height: 96, resize: "none" }}
            // onChange={onChange}
            placeholder="Enter the reason for your leave"
          />
        </Form.Item>

        <div className="form-btn-container mt-4">
          <Button type="default" onClick={() => onCancel()}>
            Cancel
          </Button>

          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ApplyLeaveForm;
