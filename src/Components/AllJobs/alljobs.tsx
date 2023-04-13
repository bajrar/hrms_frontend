import { Button, Input, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { apis } from "../apis/constants/ApisService";
// import { Header } from "../Header/header";

type Props = {};

export const Alljobs = (props: Props) => {
  const [jobs, setJobs] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  useEffect(() => {
    const getJobs = async () => {
      const res = await apis.getJobs();
      // console.log(res.data.jobs);
      setJobs(res.data.jobs);
    };
    getJobs();
  }, []);

  const handleDelete: React.MouseEventHandler<HTMLAnchorElement> = async (
    id: any
  ) => {
    try {
      if (window.confirm("Do you really want to delete it?")) {
        await apis.deleteJob(id);
      }
      window.location.reload();
    } catch {
      console.log("error");
    }
  };

  const columns = [
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      filteredValue: [searchedText],
      onFilter: (value: any, record: { title: string }) => {
        return String(record.title).toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: "Job Status",
      dataIndex: "status",
      key: "status",
      tags: ["open", "close"],
    },
    {
      title: "View Job",
      key: "viewjob",
      width: 100,
      render: (jobs: { _id: string }) => (
        <Link to={`/aboutjob/${jobs._id}`} style={{ textDecoration: "none" }}>
          <Button>View</Button>
        </Link>
      ),
    },
    {
      title: "Edit Job",
      key: "edirJob",
      width: 100,
      render: (jobs: { _id: string }) => (
        <Link to={`/updatejob/${jobs._id}`} style={{ textDecoration: "none" }}>
          <Button>Edit</Button>
        </Link>
      ),
    },
    {
      title: "Delete Job",
      key: "deleteJob",
      width: 100,
      render: (jobs: { _id: any }) => (
        <Button
          onClick={() => {
            handleDelete(jobs._id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <h1 className="text-center mb-4 mt-4 text-muted">All Jobs</h1>
        <Input.Search
          placeholder="Search here..."
          className="mb-4"
          size="large"
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
        />
        <Table dataSource={jobs} columns={columns} />
      </div>
    </>
  );
};
