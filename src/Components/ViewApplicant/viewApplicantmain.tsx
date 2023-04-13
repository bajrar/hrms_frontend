import React, { useState } from "react";
// import { Header } from "../Header/header";
import "../ViewJobs/viewjob.css";
import { useEffect } from "react";
import { apis } from "../apis/constants/ApisService";
import { useParams } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";
import { IoIosTime } from "react-icons/io";
import { GiGraduateCap } from "react-icons/gi";
import { GiOfficeChair } from "react-icons/gi";
import { SiLinkedin } from "react-icons/si";
import { Button } from "antd";

type Props = {};
type JobCredentialsT = {
  title: string;
  employmentType: string;
  minExperience: number;
  descriptions: string;
  qnrs: string;
  country: string;
  city: string;
  status: string;
  jobType: boolean;
};

export const ViewApplicantmain = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const [applicant, setApplicant] = useState<{ [key: string]: any }>([]);
  const [jobs, setJobs] = useState<JobCredentialsT>();

  useEffect(() => {
    if (id !== undefined) {
      const getApplicant = async () => {
        const res = await apis.getApplicantsById(id);
        // console.log(res.data);
        setApplicant(res.data.applicant);
      };
      getApplicant();
    }
  }, [id]);
  useEffect(() => {
    const getJobs = async () => {
      const res = await apis.getJobsById(applicant?.jobId);
      // console.log(applicant?.jobId);
      setJobs(res.data.job);
    };
    getJobs();
  }, [applicant?.jobId]);
  return (
    <>
      {/* <Header /> */}
      <div className="container mt-5">
        <div className="viewjobs-job-title">
          <h1>{jobs?.title}</h1>
          <div className="row">
            <div className="col-sm-6 items">
              <div className="items-inner">
                <p>
                  <span>
                    <ImLocation2 />
                  </span>
                  {jobs?.city}, {jobs?.country}
                </p>

                <p>
                  <span>
                    <IoIosTime />
                  </span>

                  {jobs?.employmentType}
                </p>
              </div>
              <div className="items-inner">
                <p>
                  <span>
                    <GiGraduateCap />
                  </span>
                  {jobs?.minExperience}
                </p>
                <p className="text-capitalize">
                  <span>
                    <GiOfficeChair />
                  </span>

                  {jobs?.jobType}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row gap-2 ">
          {jobs && (
            <div className="col-sm-6">
              <div className="about-virtuosway ">
                <h1 className="pb-2 ">About Virtuosway</h1>
                <p className=" paragraph ">
                  At Virtuosway, we offer end-to-end enterprise and web
                  solutions using the latest technologies to create world-class
                  B2B and B2C solutions. With over 123 years of experience and a
                  robust team of web experts, we will engineer high-quality yet
                  budget-friendly web applications for your business. We bring
                  revolution to reality. Shaping your business ideas into an
                  innovative next-gen web-based app is what we do the best, as
                  proven by deliverables across multiple industry verticals that
                  are being used by millions. By partnering with Virtuosway to
                  create made-to-order web applications, you can accelerate your
                  business's user base, unlock new digital channels, raise
                  conversion by many folds, and reach exciting business
                  milestones.
                </p>
              </div>

              <div className="job-details">
                <h1>Job Description</h1>
                <p dangerouslySetInnerHTML={{ __html: jobs.descriptions }}></p>
                <h1>Qualification and Experience</h1>
                <p dangerouslySetInnerHTML={{ __html: jobs.qnrs }}></p>
              </div>

              <i>
                Equal Opportunity Employer: Race, Color, Religion, Sex, Sexual
                Orientation, Gender Identity, National Origin, Age, Genetic
                Information, Disability, Protected Veteran Status, or any other
                legally protected group status.
              </i>
            </div>
          )}
          <div className="col-sm-5">
            <h1 className="mb-4">Applicant Detail</h1>
            {applicant && (
              <>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="card-text">Name</p>
                        <p className="card-text">Email</p>
                        <p className="card-text">Phone</p>
                        <p className="card-text">Address</p>
                        <p className="card-text">LinkedIn</p>
                        <p className="card-text">Resume</p>
                      </div>
                      <div className="col-sm-6">
                        <p className="card-text">
                          {applicant?.firstName} {applicant?.lastName}
                        </p>
                        <p className="card-text">{applicant?.email}</p>
                        <p className="card-text">{applicant?.phone}</p>
                        <p className="card-text">
                          {applicant?.address},{applicant?.city}
                        </p>
                        <a
                          className="card-text"
                          href={applicant?.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <SiLinkedin />
                        </a>
                        <br />
                        <Button
                          href={`http://13.127.226.186:8000/public/resume/${applicant?.resume}`}
                          target="_blank"
                          rel="noreferrer"
                          download
                        >
                          View Resume
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};
