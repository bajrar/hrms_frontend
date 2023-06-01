import React, { useEffect } from "react";
import { Button, Form, Input, message, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { getJobs } from "../../redux/features/getJobsSlice";
import { getSingleJob } from "../../redux/features/singleJobSlice";
import { apis } from "../apis/constants/ApisService";
import {
  employmentTypeArray,
  jobStatusArray,
  jobsTypeArray,
} from "../../utils/Constants";

const AddJobsForm = ({ setIsModalOpen, fromUpdateJobs, jobId }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleJob({ jobId }) as any);
  }, [jobId]);

  const onFinish = async (values: any) => {
    try {
      const res = await apis.createJob(values);
      if (res.status === 201) {
        message.success("Job created successfully");
        dispatch(getJobs() as any);
      }
    } catch {
      message.error("Something went wrong");
    } finally {
      setIsModalOpen(false);
    }
  };

  const onUpdateJobs = async (values: any) => {
    try {
      const res = await apis.updateJob(jobId, values);
      if (res.status === 200) {
        dispatch(getJobs() as any);
        message.success("Job updated successfully");
      }
    } catch {
      message.error("Something went wrong");
    } finally {
      setIsModalOpen(false);
    }
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const { job, loading } = useAppSelector((state) => state.singleJobSlice);

  if (loading && fromUpdateJobs) {
    return <span>...loading</span>;
  }

  const initialValues =
    fromUpdateJobs && job?.job
      ? job.job
      : {
          title: "",
          employmentType: "",
          minExperience: "",
          descriptions: "",
          qnrs: "",
          jobDetail: "",
          status: "",
          jobType: "",
          country: "",
          city: "",
        };

  return (
    <div className="add-jobs-form">
      <Form
        layout="vertical"
        onFinish={fromUpdateJobs ? onUpdateJobs : onFinish}
        autoComplete="off"
        className="shift-assign-form"
        initialValues={initialValues}
      >
        <Form.Item
          className="form-input col"
          name="title"
          label="Job Title *"
          rules={[{ required: true, message: "Job title is Required" }]}
        >
          <Input
            placeholder="Enter Job Title"
            className="form-input-wrapper"
            type="text"
          />
        </Form.Item>
        <div className="form-second-row align-items-start">
          <Form.Item
            className="form-input col working-day"
            name="employmentType"
            label="Employment Type *"
            rules={[{ required: true, message: "Employment Type is Required" }]}
          >
            <Select
              placeholder="Select Employment Type"
              className="selects form-input-wrapper"
              // onChange={onWorkingDaySelection}
              suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
              popupClassName="custom-select-dropdown"
              options={employmentTypeArray}
            />
          </Form.Item>
          <Form.Item
            className="form-input col working-day"
            name="minExperience"
            label="Minimum Experience *"
            rules={[
              { required: true, message: "Minimum Experience is Required" },
            ]}
          >
            <Input
              placeholder="Enter Minimum Experience"
              className="form-input-wrapper"
            />
          </Form.Item>
        </div>
        <Form.Item
          className="form-input col job-description-input"
          name="descriptions"
          label="Job Description *"
          rules={[
            {
              required: true,
              message: "Job Description are Required!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            placeholder="Enter Job Description..."
            modules={modules}
            formats={formats}
            className="job-description-text"
          />
        </Form.Item>
        <Form.Item
          className="form-input col quality-requirement-input"
          name="qnrs"
          label="Quality and Requirements *"
          rules={[
            {
              required: true,
              message: "Quality and Requirements are Required!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            placeholder="Enter Quality and Requirements..."
            modules={modules}
            formats={formats}
            className="job-description-text"
          />
        </Form.Item>
        <Form.Item
          className="form-input col quality-requirement-input"
          name="jobDetail"
          label="Job Detail *"
          rules={[
            {
              required: true,
              message: "Job Detail are Required!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            placeholder="Enter Job Detail..."
            modules={modules}
            formats={formats}
            className="job-description-text"
          />
        </Form.Item>
        <div className="form-second-row add-jobs-bottom">
          <Form.Item
            className="form-input col working-day"
            name="status"
            label="Job Status *"
            rules={[{ required: true, message: "Job Status is Required" }]}
          >
            <Select
              placeholder="Select Job Status"
              className="selects form-input-wrapper"
              // onChange={onWorkingDaySelection}
              suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
              popupClassName="custom-select-dropdown"
              options={jobStatusArray}
            />
          </Form.Item>
          <Form.Item
            className="form-input col working-day"
            name="jobType"
            label="Job Type *"
            rules={[{ required: true, message: "Job Type is Required" }]}
          >
            <Select
              placeholder="Enter Job Type"
              options={jobsTypeArray}
              className="selects form-input-wrapper"
              suffixIcon={<FontAwesomeIcon icon={faAngleDown} />}
              popupClassName="custom-select-dropdown"
            />
          </Form.Item>
        </div>
        <div className="form-second-row">
          <Form.Item
            className="form-input col working-day"
            name="country"
            label="Country *"
            rules={[{ required: true, message: "Country Name is Required" }]}
          >
            <Input
              placeholder="Enter Country Name"
              className="form-input-wrapper"
              type="text"
            />
          </Form.Item>
          <Form.Item
            className="form-input col working-day"
            name="city"
            label="City or Town *"
            rules={[{ required: true, message: "City or Town is Required" }]}
          >
            <Input
              placeholder="Enter City or Town"
              className="form-input-wrapper"
              type="text"
            />
          </Form.Item>
        </div>

        <div className="form-btn-container" style={{ marginTop: 15 }}>
          <Button type="default" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {fromUpdateJobs ? "Update" : "Add"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddJobsForm;
