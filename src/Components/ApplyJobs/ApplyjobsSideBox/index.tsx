import React from "react";
import { FaStarOfLife } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { IoMdWarning } from "react-icons/io";
import { Button } from "antd";

type Props = {};

export const ApplyjobsSideBox = (props: Props) => {
  return (
    <>
      <div className="info-box">
        <h3>
          <span>
            <FaStarOfLife color="#800000" />
          </span>
          Job Title
        </h3>
        <h3>
          <span>
            <FaStarOfLife color="#800000" />
          </span>
          Employment Type
        </h3>
        <h3>
          <span>
            <FaStarOfLife color="#800000" />
          </span>
          Minimum Experience
        </h3>
        <h3>
          <span>
            <TiTick color="green" />
          </span>
          Workflow
        </h3>
        <h3>
          <span>
            <FaStarOfLife color="#800000" />
          </span>
          Job Description
        </h3>
        <h3>
          <span>
            <IoMdWarning color="yellow" />
          </span>
          Location
        </h3>
        <p>Add a City and State/Province to the job's location</p>
      </div>
      <div className="required-fields">
        <span>
          <FaStarOfLife color="#800000" />
        </span>
        <p>You must complete all required fields to save or publish your job</p>
      </div>
      <Button className="create-job-btn">Create Job</Button>
    </>
  );
};
