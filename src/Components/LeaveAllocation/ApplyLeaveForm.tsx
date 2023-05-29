import { Button, Form, Input } from "antd";
import Selects from "../Ui/Selects/Selects";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import { IForm } from "../Shifts/AddShiftForm";
import "./addLeaveForm.css";

const ApplyLeaveForm = ({ setIsModalOpen }: IForm) => {
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const { TextArea } = Input;
  return (
    <div className="assign-leave-form">
      <Form layout="vertical">
        <div className="d-flex form-second-row align-items-start">
          <Form.Item
            className="form-input col"
            name="leaveName"
            label="Select Leave *"
            rules={[{ required: true, message: "Shift Name is Required" }]}
          >
            <Selects placeHolder="Select the name of the leave " />
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
        <div className="form-second-row align-items-start ">
          <Form.Item
            className="form-input col unit-input"
            name="unit"
            label="Employee ID *"
            rules={[{ required: true, message: "Shift Name is Required" }]}
          >
            <Input
              placeholder="Type the employee ID to search and select"
              className="form-input-wrapper days-input"
              type="text"
            />
          </Form.Item>
          <Form.Item
            className="form-input col"
            name="maximumUnitAllowed"
            label="Employee Name *"
            rules={[{ required: true, message: "Shift Name is Required" }]}
          >
            <Input
              placeholder="Enter the maximum unit allowed (e.g. 100 days)"
              className="form-input-wrapper"
              type="text"
            />
          </Form.Item>
        </div>

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
              // onChange={onStartDateChange}
              className=" date-picker  "
              dateFormat="YYYY/MM/DD"
              language="en"
            />
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
              // onChange={onEndDateChange}
              className="date-picker "
              dateFormat="YYYY/MM/DD"
              language="en"
            />
          </Form.Item>
        </div>

        <Form.Item
          className="form-input col"
          name="leaveDeatils"
          label="Reason for leave *"
        >
          <TextArea
            style={{ height: 96, resize: "none" }}
            // onChange={onChange}
            placeholder="Enter the reason for your leave"
          />
        </Form.Item>

        <div className="form-btn-container">
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
