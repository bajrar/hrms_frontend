import React, { useEffect, useState } from "react";
import { apis } from "../apis/constants/ApisService";
import { message, Form, Input, Select, Button } from "antd";
import { useDispatch } from "react-redux";
import { getLeave } from "../../redux/features/leaveSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { reduceByKeys } from "../../hooks/HelperFunctions";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { getUsers } from "../../redux/features/attendanceSlice";
import { getEmployee } from "../../redux/features/employeeSlice";

const AssignLeaveForm = ({ setIsAssignOpen, setUpdateModalIsModal }: any) => {
  const [leaveNameArray, setLeaveNameArray] = useState<any[]>([]);
  const [leaveNameSelect, setLeaveNameSelect] = useState<any[]>([]);
  const [employeeNameArray, setEmployeeNameArray] = useState<any[]>([]);
  const [employeeNameSelect, setEmployeeNameSelect] = useState<any[]>([]);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const dispatch = useDispatch();
  const { leaves } = useAppSelector((state) => state.leaveSlice);
  const { user } = useAppSelector((state) => state.attendanceSlice);
  const { employee } = useAppSelector((state) => state.employeeSlice);
  useEffect(() => {
    const shiftNameArray = reduceByKeys(leaves?.leave, "_id", "leaveName");
    setLeaveNameArray(shiftNameArray);
  }, [leaves?.leave]);
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
  useEffect(() => {
    dispatch(getUsers({ status: "", date: "" }) as any);
  }, [dispatch]);
  useEffect(() => {
    // dispatch(getUsers({ status: status, date: defaultDate }) as any);
    dispatch(getEmployee() as any);
  }, [dispatch]);

  useEffect(() => {
    const employeeList: any = [];
    employee?.employee?.map((each: any) => {
      employeeList.push({
        label: each.employeeName,
        value: each.employeeNumber,
      });
      setEmployeeNameArray(employeeList);
    });
  }, [employee]);

  // useEffect(() => {
  //   const employeeNameArray = reduceByKeys(
  //     user,
  //     'employeeNumber',
  //     'employeeName'
  //   );
  //   setEmployeeNameArray(employeeNameArray);
  // }, [user]);

  // useEffect(() => {
  //   const employeeNameArray: any = [];

  //   leaves?.leave?.map((each: any) => {
  //     const selectedValue = form.getFieldValue('leaveName');
  //     console.log(selectedValue, '<------ this is selected value');
  //     // console.log(each, '<----- this is each');
  //     employeeNameArray.push({
  //       label: each.employeeName,
  //       value: each.userSn,
  //     });
  //   });
  //   // setEmployeeNameArray(employeeNameArray);
  // }, []);

  useEffect(() => {
    if (employeeNameArray) {
      const employeeArray = employeeNameArray?.map((employeeName: any) => {
        return {
          label: employeeName?.label,
          value: employeeName?.value,
        };
      });
      setEmployeeNameSelect(employeeArray);
    }
  }, [employeeNameArray]);

  const onFinish = async (values: any) => {
    try {
      const res = await apis.assignLeave(values, values.leaveName);
      if (res.status === 201) {
        message.success("Leave Created");
        form.resetFields();
        dispatch(getLeave() as any);
      }
      message.success("Leave Assigned Successfully");
    } catch {
      message.error("Something Went Wrong");
    } finally {
      setIsAssignOpen(false);
    }
  };
  const onLeaveName = (value: string) => {
    const employeeArray: any = [];
    form.setFieldValue("leaveName", value);
    const leaveId = form.getFieldValue("leaveName");
    const selectedLeave = leaves?.leave?.find(
      (each: any) => each._id === leaveId
    );
    selectedLeave?.assignedTo?.map((each: any) => {
      employeeArray.push({ label: each.employeeName, value: each.userSn });
    });
    setEmployeeNameArray(employeeArray);
  };

  const onEmployeeName = (value: string) => {
    form.setFieldValue("assignTo", value);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item
        className="form-input col"
        name="leaveName"
        label="Leave Name *"
        rules={[{ required: true, message: "Leave Name is Required" }]}
      >
        <Select
          placeholder="Select the type of leave"
          className="selects form-input-wrapper"
          suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
          options={leaveNameSelect}
          onSelect={onLeaveName}
        />
      </Form.Item>
      <Form.Item
        className="form-input col"
        name="assignTo"
        label="Assign To *"
        rules={[{ required: true, message: "Employee(s) Name is Required" }]}
      >
        <Select
          placeholder="Type the name of an employee to search and select"
          className="selects form-input-wrapper"
          suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
          mode="multiple"
          options={employeeNameSelect}
          onSelect={onEmployeeName}
        />
      </Form.Item>

      <Form.Item
        className="form-input col"
        name="leaveNotes"
        label="Leave notes *"
      >
        <TextArea
          style={{ height: 96, resize: "none" }}
          // onChange={onChange}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
      "
        />
      </Form.Item>

      <div className="form-btn-container" style={{ marginTop: 15 }}>
        <Button type="default" onClick={() => setUpdateModalIsModal(false)}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Assign
        </Button>
      </div>
    </Form>
  );
};

export default AssignLeaveForm;
