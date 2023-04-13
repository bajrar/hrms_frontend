import { Button, Form, Input, Upload } from "antd";
import { apis } from "../apis/constants/ApisService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ViewjobsForm = ({id}: any) => {
  // console.log(id)
  const onFinish = async (values: any) => {
    console.log("Success:", 
    values);
    let file = {
      originalname: values?.resume?.name,
      mimetype: values?.resume?.type,
      type: values?.resume?.type,
      filename: values?.resume?.name,
      size: values?.resume?.size,
    };
    const json = JSON.stringify(file);
    const blob = new Blob([json], { type: "application/pdf" });
    const data = new FormData();
    data.append("firstName", values.firstName);
    data.append("lastName", values.lastName);
    data.append("email", values.email);
    data.append("phone", values.phone);
    data.append("address", values.address);
    data.append("city", values.city);
    data.append("state", values.state);
    data.append("postal", values.postal);
    data.append("github", values.github);
    data.append("resume", blob);
    data.append("jobId", id);

    try {
      const res = await apis.createApplicant(data);

      if (res.status === 201) {
        toast.success("Application Submitted Sucesfully", {
          position: "top-center",
          autoClose: 5000,
        });
        // window.location.reload();
      }
    } catch {
      toast.error("Something Went Wrong", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };
  return (
    <>
      <ToastContainer />

      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          className="form-input col"
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "First Name is Required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="form-input col"
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Last Name is Required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="form-input col"
          name="email"
          label="Email Address"
          rules={[{ required: true, message: "Email is Required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="form-input col"
          name="phone"
          label="Phone"
          rules={[{ required: true, message: "Phone no. is Required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="form-input col"
          name="address"
          label="Address"
          rules={[{ required: true, message: "Country is Required!" }]}
        >
          <Input placeholder="Address" />
        </Form.Item>
        <div className="row ">
          <Form.Item
            className="form-input col"
            name="city"
            rules={[{ required: true, message: "City is Required!" }]}
          >
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item
            className="form-input col"
            name="state"
            rules={[{ required: true, message: "State is Required!" }]}
          >
            <Input placeholder="State" />
          </Form.Item>
          <Form.Item
            className="form-input col"
            name="postal"
            rules={[{ required: true, message: "Postal Code is Required!" }]}
          >
            <Input placeholder="Postal" />
          </Form.Item>
        </div>
        <Form.Item
          className="form-input col"
          name="resume"
          label="Resume and Cover letter"
          // getValueFromEvent={({ file }) => file.originFileObj}
          rules={[{ required: true, message: "Resume is Required!" }]}
        >
          <Upload accept=".pdf"
          >
            <Button>Upload files</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          className="form-input col"
          name="github"
          label="Linkedin Link"
          rules={[{ required: true, message: "Linkedin Link is Required!" }]}
        >
          <Input placeholder="Linkedin Link" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          SUBMIT APPLICATION
        </Button>
        <p>
          Or, <br /> Send Us your Resume at{" "}
          <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=hr@virtuosway.com">
            hr@virtuosway.com
          </a>{" "}
        </p>
      </Form>
    </>
  );
};
