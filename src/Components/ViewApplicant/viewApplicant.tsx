import { Button, Input, Table } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { apis } from "../apis/constants/ApisService";
// import { Header } from "../Header/header";

type Props = {};
type ApplicantCredentialsT = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  postal: string;
  github: string;
  resume: string;
  jobId: string;
};

export const ViewApplicant = (props: Props) => {
  const [searchedText, setSearchedText] = useState("");
  const [applicant, setApplicant] = useState<ApplicantCredentialsT[]>([]);
  useEffect(() => {
    const getApplicants = async () => {
      const res = await apis.getApplicants();
      setApplicant(res.data.applicant);
    };
    getApplicants();
  }, []);
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      filteredValue: [searchedText],
      onFilter: (value: any, record: { firstName: string }) => {
        return String(record.firstName)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },

    {
      title: "View Applicant",
      width: 100,
      render: (applicant: { _id: string }) => (
        <Link
          to={`/viewapplicantmain/${applicant?._id}`}
          style={{ textDecoration: "none" }}
        >
          <Button>View</Button>
        </Link>
      ),
    },
  ];
  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <h1 className="text-center mb-4 mt-4 text-muted">All Applicants</h1>
        <Input.Search
          placeholder="Search here..."
          className="mb-4"
          onSearch={(value) => {
            setSearchedText(value);
          }}
          size="large"
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
        />
        <Table dataSource={applicant} columns={columns} />
      </div>
    </>
  );
};
