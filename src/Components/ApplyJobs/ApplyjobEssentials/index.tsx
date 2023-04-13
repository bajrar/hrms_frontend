import { FaStarOfLife } from "react-icons/fa";
import { Form, Input, Select, Button } from "antd";
import { ImLocation } from "react-icons/im";
import { apis } from "../../apis/constants/ApisService";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

export const ApplyjobEssentials = (props: Props) => {
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    var data = values;
    try {
      const res = await apis.createJob(data);
      if (res.status === 201) {
        toast.success("Job Submitted Sucesfully", {
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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <ToastContainer />
      <h1 className="essential">
        <span>
          {" "}
          <FaStarOfLife />
        </span>{" "}
        ESSENTIALS
      </h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="row">
          <Form.Item
            className="form-input col"
            name="title"
            label="Job Title"
            rules={[{ required: true, message: "Job Title is Required!" }]}
          >
            <Input name="title"></Input>
          </Form.Item>
        </div>
        <div className="row">
          <Form.Item
            className="form-input col"
            name="employmentType"
            label="Employment Type"
            rules={[
              { required: true, message: "Employment Type is Required!" },
            ]}
          >
            <Select placeholder="Select a Type">
              <Select.Option value="Full Time">Full Time</Select.Option>
              <Select.Option value="Part Time">Part Time</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="form-input col"
            name="minExperience"
            label="Minimum Experience"
            rules={[
              {
                required: true,
                message: "Minimum Experience is Required ",
              },
            ]}
          >
            <Input name="minExperience" />
          </Form.Item>
        </div>

        <div className="job-description">
          <h3>Job Description*</h3>
          <div className="description-box">
            <div className="row">
              <div className="col">
                <Form.Item
                  name="descriptions"
                  rules={[
                    {
                      required: true,
                      message: "Description is Required!",
                    },
                  ]}
                >
                  <ReactQuill theme="snow" />
                </Form.Item>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="row">
          <Form.Item
            className="form-input col"
            name="qnrs"
            label="Quality and Requirements"
            rules={[
              {
                required: true,
                message: "Quality and Requirements are Required!",
              },
            ]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>
        </div>
        <div className="row">
          <Form.Item
            className="form-input col"
            name="status"
            label="Job Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a Status">
              <Select.Option value="open">Open</Select.Option>
              <Select.Option value="closed">Closed</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="row">
          <Form.Item
            className="form-input col"
            name="jobType"
            label="Job type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a Job Type">
              <Select.Option value="onsite">Onsite</Select.Option>
              <Select.Option value="hyrbid">Hybrid</Select.Option>
              <Select.Option value="remote">Remote</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <h1 className="essential">
          <span>
            {" "}
            <ImLocation />
          </span>{" "}
          LOCATION
        </h1>
        <div className="row">
          <Form.Item
            className="form-input col"
            name="country"
            label="Country"
            rules={[{ required: true, message: "Country is Required!" }]}
          >
            <Select placeholder="Select a Country">
              <Select.Option value="Nepal">Nepal</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="row">
          <Form.Item
            className="form-input col col-sm-12"
            name="city"
            label="City or Town"
            rules={[{ required: true, message: "City or Town is Required!" }]}
          >
            <Input name="city" />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
