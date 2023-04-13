import { Button, Form, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";

import { apis } from "../apis/constants/ApisService";

type Props = {};

export const AddUserDevice = (props: Props) => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      const res = await apis.addUserInDevice(values);
      console.log(res, "<------- this is response");
      if (res.status === 200) {
        toast.success("User Added Sucesfully", {
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

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <ToastContainer />
      <div className="virtuosway-hr-leaveform mt-4">
        <h1>Add User In Device</h1>
        <hr />
        <div className="virtuosway-hr-leaveform form">
          <Form layout="vertical" onFinish={onFinish} onReset={onReset}>
            <Form.Item
              name="uid"
              label="UId"
              rules={[{ required: true, message: "UId is Required!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="userid"
              label="User Id"
              rules={[{ required: true, message: "User Id is Required!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Name is Required!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password For Device"
              rules={[
                { required: true, message: "Password For Device is Required!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Form>
        </div>
      </div>
    </>
  );
};
