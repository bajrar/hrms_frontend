import { useState } from "react";
import { Button, Form, Input, Radio, RadioChangeEvent, DatePicker } from "antd";
import { toast } from "react-toastify";
import { apis } from "../apis/constants/ApisService";
import "./add-employee-form.css";
import BreadCrumbs from "../Ui/BreadCrumbs/BreadCrumbs";
import Layout from "../Layout";
import Navbar from "../Ui/Navbar";

const Employee = () => {
  const [gender, setGender] = useState("");

  const onFinish = async (values: any) => {
    try {
      const res = await apis.addEmployee(values);

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

  const validatePhoneNumber = (_: any, value: any) => {
    const phoneNumberRegex = /^[0-9]{10}$/; // Assuming the phone number should be exactly 10 digits
    if (!value || phoneNumberRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Please enter a valid 10-digit mobile number");
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };
  const firstRow = [
    {
      name: "employeeNumber",
      label: "Employee Number",
      message: "Employee Number is Required",
      placeHolder: "EX: 6854654163",
      type: "number",
    },
    {
      name: "employeeName",
      label: "Employee Name",
      message: "Employee Name is Required",
      placeHolder: "John Doe",
      type: "text",
    },
  ];

  const fourthRow = [
    {
      name: "reportingManager",
      label: "Reporting Manager",
      message: "Reporting Manager Required",
      type: "text",
    },
    {
      name: "status",
      label: "Status",
      message: "Status Required",
      type: "text",
    },
  ];
  const emergencyContact = [
    {
      name: "emergencyName",
      label: "Emergency Contact Name",
      message: "Emergency Contact Name Required",
      placeHolder: "EX: John Doe",
      type: "text",
    },
    {
      name: "emergencyContact",
      label: "Emergency Contact Number",
      message: "Emergency Contact Number Required",
      placeHolder: "EX: 2541210",
      type: "number",
    },
    {
      name: "parentName",
      label: "Father's/Mother's Name",
      message: "Father's/ Mother's Name Required",
      placeHolder: "John Doe",
      type: "text",
    },
    {
      name: "spouseName",
      label: "Spouse Name",
      message: "Spouse Name Required",
      placeHolder: "John Doe",
      type: "text",
    },
  ];

  return (
    <Layout>
      <Navbar />
      <div className="mb-4">
        <div style={{ marginTop: 30, paddingInline: 32 }}>
          <div style={{ paddingInline: -32 }}>
            <BreadCrumbs
              imagesrc="/images/employee.svg"
              location="Employee Management"
              location1="Add Employee"
            />
            <hr />
          </div>
          <Form layout="vertical" onFinish={onFinish} autoComplete="off">
            <div className="row p-0">
              <h3 className="add-employee__section-header">
                Basic Information
              </h3>
              <hr />
              <div className="add-employee__section p-0">
                {firstRow.map((item) => (
                  <Form.Item
                    className="form-input col"
                    name={item.name}
                    label={
                      <span>
                        {item.label}
                        <span className="asterisk">*</span>
                      </span>
                    }
                    rules={[{ required: true, message: item.message }]}
                  >
                    <Input
                      name={item.name}
                      placeholder={item.placeHolder}
                      className="form-input-wrapper"
                      type={item.type}
                    />
                  </Form.Item>
                ))}
              </div>
            </div>
            <div className="row add-employee__section pt-4">
              <Form.Item
                label={
                  <span>
                    Date of Birth
                    <span className="asterisk">*</span>
                  </span>
                }
                className="form-input  form-input-container"
                name="dob"
              >
                <DatePicker
                  placeholder="dd/mm/yyyy"
                  className="form-input-contain"
                  suffixIcon={
                    <div className="calendar-container">
                      <img src="./images/calendar.svg" alt="calendar" />
                    </div>
                  }
                />
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    Gender
                    <span className="asterisk">*</span>
                  </span>
                }
                className="form-input  form-input-container"
                name="gender"
              >
                <Radio.Group onChange={onChangeRadio} value={gender}>
                  <Radio value={"male"}>Male</Radio>
                  <Radio value={"female"}>Female</Radio>
                  <Radio value={"other"}>Other</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="row pt-4">
              <h3 className="add-employee__section-header">
                {" "}
                Official Details
              </h3>
              <hr />
              <div className="add-employee__section p-0">
                <Form.Item
                  className="form-input col"
                  name="email"
                  label={
                    <span>
                      Email
                      <span className="asterisk">*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Email Required" }]}
                >
                  <Input
                    name="email"
                    placeholder="johndoe@gmail.com"
                    className="form-input-wrapper"
                    type="email"
                  />
                </Form.Item>
                <Form.Item
                  className="form-input col"
                  name="mobileNumber"
                  label={
                    <span>
                      Mobile Number<span className="asterisk">*</span>
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Mobile Number is Required",
                    },
                    { validator: validatePhoneNumber },
                  ]}
                >
                  <Input
                    name="mobileNumber"
                    placeholder="EX: 6854654163"
                    className="form-input-wrapper"
                    type="number"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span>
                      Date of Joining
                      <span className="asterisk">*</span>
                    </span>
                  }
                  className="form-input col"
                  name="dateOfJoining"
                >
                  <DatePicker
                    placeholder="dd/mm/yyyy"
                    className="form-input-contain"
                    suffixIcon={
                      <div className="calendar-container">
                        <img src="./images/calendar.svg" />
                      </div>
                    }
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row add-employee__section pt-4">
              {fourthRow.map((item) => (
                <Form.Item
                  className="form-input form-input-container-fourth"
                  name={item.name}
                  label={
                    <span>
                      {item.label}
                      <span className="asterisk">*</span>
                    </span>
                  }
                  rules={[{ required: true, message: item.message }]}
                >
                  <Input
                    name={item.name}
                    className="form-input-wrapper form-input-wrapper"
                    type={item.type}
                  />
                </Form.Item>
              ))}
              <Form.Item
                label={
                  <span>
                    Designation
                    <span className="asterisk">*</span>
                  </span>
                }
                className="form-input  form-input-container-fourth"
                name="designation"
              >
                <Input
                  name="designation"
                  placeholder="Designation"
                  className="form-input-wrapper"
                  type="text"
                />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Project Team
                    <span className="asterisk">*</span>
                  </span>
                }
                className="form-input  form-input-container-fourth"
                name="projectTeam"
              >
                <Input
                  name="projectTeam"
                  placeholder="Project Team"
                  className="form-input-wrapper"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="row pt-4">
              <h3 className="add-employee__section-header">
                Emergency Contact Details
              </h3>
              <hr />
              {emergencyContact.map((item) => (
                <div className="col-4">
                  <Form.Item
                    className="form-input col"
                    name={item.name}
                    label={item.label}
                    rules={[{ required: false }]}
                  >
                    <Input
                      name={item.name}
                      placeholder={item.placeHolder}
                      className="form-input-wrapper"
                      type={item.type}
                    />
                  </Form.Item>
                </div>
              ))}
            </div>

            <div className="form-footer">
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Employee;
