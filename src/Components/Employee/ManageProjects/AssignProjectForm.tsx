import { useEffect, useState, memo, useMemo } from "react";
import { Button, Form, Input, Select } from "antd";
import { toast } from "react-toastify";

import { apis, axiosApiInstance } from "../../apis/constants/ApisService";
import "../add-employee-form.css";
import BreadCrumbs from "../../Ui/BreadCrumbs/BreadCrumbs";
import Layout from "../../Layout";
import Navbar from "../../Ui/Navbar";
import Selects from "../../Ui/Selects/Selects";
import { WorkingCondition } from "../../../utils/Constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ModalComponent from "../../Ui/Modal/Modal";
import ViewAllEmployee from "../../Ui/Tables/ViewAllEmployee";
import { isErrored } from "stream";
import { useAppSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getSingleEmployee } from "../../../redux/features/singleEmployeeSlice";
import moment from "moment";
import { getEmployee } from "../../../redux/features/employeeSlice";
import dayjs from "dayjs";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import NepaliDate from "nepali-date-converter";
import { MdCalendarToday } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";

export const selectedEmployee = (state: any, id: string) =>
  state?.find((item: any) => item?.employeeNumber === id);

export const AssignProjectForm = ({
  setIsViewOpen,
  update = false,
  employeeId = "",
  isDisable = false,
  defaultValue: employeeData = {},
}: any) => {
  const [selectText, setSelectText] = useState("");

  const dispatch = useDispatch();
  const [getDateOfJoining, setDateOfJoining] = useState();
  const [getDob, setDob] = useState();
  const defaultDob = employeeData?.dob?.split("/").join("-");
  const defaultdateOfJoining = employeeData?.dateOfJoining
    ?.split("/")
    .join("-");
  console.log(defaultDob, defaultdateOfJoining);

  const [form] = Form.useForm();
  const onSelect = (e: any) => {
    setSelectText(e);
  };
  const onFinish = async (values: any) => {
    const { dateOfJoining, dob, ...rest } = values;

    try {
      const res = await apis.addEmployee({
        ...rest,
        dob: getDob,
        dateOfJoining: getDateOfJoining,
      });

      if (res.status === 201) {
        toast.success("Employee Submitted Sucesfully", {
          position: "top-center",
          autoClose: 5000,
        });
        window.location.reload();
      }
    } catch {
      toast.error("Something Went Wrong", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    const {
      designation,
      email,
      employeeNumber,
      gender,
      mobileNumber,
      reportingManager,
      employeeName,
      dob,
      projectTeam,
    } = employeeData;

    form.setFieldsValue({
      designation,
      email,
      employeeNumber,
      gender,
      mobileNumber,
      employeeName,
      reportingManager,
      projectTeam,
      dob: dayjs(dob, "YYYY/MM/DD"),
    });
  }, [employeeData]);
  if (!setIsViewOpen) {
    return <> </>;
  }

  const onUpdateEmployee = async (values: any) => {
    const { dateOfJoining, dob, ...rest } = values;
    try {
      const res = await apis.updateEmployee(
        { ...rest, dob: getDob, dateOfJoining: getDateOfJoining },
        employeeData._id
      );
      if (res.status === 201) {
        form.resetFields();
        getEmployee();
      }
    } catch {
    } finally {
      setIsViewOpen(false);
    }
  };
  const firstRow = [
    {
      name: "EmployeeEmail",
      label: "Employee Email *",
      message: "Required!",
      placeHolder: "Enter the email id",
      type: "email",
    },
  ];
  const secondRow = [
    {
      name: "EmployeeID",
      label: "Employee ID",
      message: "Required!",
      placeHolder: "Type the employee ID to search and select",
      type: "text",
    },
    {
      name: "EmployeeName",
      label: "Employee Name",
      message: "Required!",
      placeHolder: "Type the employee name to search and select",
      type: "text",
    },
  ];

  const closeModal = () => {
    form.resetFields();
    setIsViewOpen(false);
  };

  return (
    <>
      <h3 className="modal-title">ASSIGN PROJECT</h3>
      <div className="mb-4">
        <div style={{ paddingInline: 5 }}>
          <Form
            layout="vertical"
            onFinish={update ? onUpdateEmployee : onFinish}
            autoComplete="off"
            form={form}
            initialValues={{ name: employeeData?.employeeName }}
            disabled={isDisable}
          >
            <div className="row p-0 mb-4">
              <div className="add-employee__section p-0">
                <Form.Item
                  label="Project Name"
                  className="form-input col"
                  name="projectName"
                >
                  <Select
                    className="w-100"
                    placeholder="Select the projects"
                    size="large"
                    onChange={onSelect}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                      { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                  />
                </Form.Item>
                {firstRow.map((item, index) => {
                  return (
                    <Form.Item
                      className="form-input col"
                      name={item.name}
                      label={item.label}
                      rules={[{ required: true, message: item.message }]}
                      key={index + item?.name}
                    >
                      <Input
                        name={item.name}
                        placeholder={item.placeHolder}
                        className="form-input-wrapper"
                        type={item.type}
                      />
                    </Form.Item>
                  );
                })}
              </div>
            </div>
            <div className="row mb-4">
              <div className="add-employee__section p-0">
                {secondRow.map((item, index) => {
                  return (
                    <Form.Item
                      className="form-input col"
                      name={item.name}
                      label={item.label}
                      rules={[{ required: true, message: item.message }]}
                      key={index + item?.name}
                    >
                      <Input
                        name={item.name}
                        placeholder={item.placeHolder}
                        className="form-input-wrapper"
                        type={item.type}
                      />
                    </Form.Item>
                  );
                })}
              </div>
            </div>

            <div className="row mb-4">
              <div className="add-employee__section p-0">
                <Form.Item
                  className="form-input col"
                  name="Project Notes"
                  label="Project Notes *"
                  rules={[{ required: true, message: "required!" }]}
                >
                  <TextArea
                    name="Project Notes"
                    rows={4}
                    placeholder="Enter any additional notes or comments for your leave notes"
                    className="form-input-wrapper"
                  />
                </Form.Item>
              </div>
            </div>

            <div
              className="form-footer"
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <Button
                type="primary"
                className="d-flex justify-content-center align-items-center fs-6 px-3 py-3 text-center"
                htmlType="submit"
              >
                Apply
              </Button>
              <Button
                type="primary"
                className="d-flex justify-content-center align-items-center fs-6 px-3 py-3 text-center"
                onClick={() => closeModal()}
                danger
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AssignProjectForm;
