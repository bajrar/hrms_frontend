import { Button } from "antd";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "../Layout";
import Navbar from "../Ui/Navbar";
import Spinner from "../Spinner/Spinner";
import EmployeeForm from "./EmployeeForm";
import ModalComponent from "../Ui/Modal/Modal";
import BreadCrumbs from "../Ui/BreadCrumbs/BreadCrumbs";
import { useGetProfileQuery } from "../../redux/api/employee";

/* ASSETS */
import "./employeeDetails.css";
import "./add-employee-form.css";
import { faPen, faArrowRight } from "@fortawesome/free-solid-svg-icons";

enum empKeys {
  empId = "employeeNumber",
  name = "employeeName",
  email = "email",
  dob = "dob",
  gender = "gender",
  designation = "designation",
  reportingManager = "reportingManager ",
  status = "status",
  dateofJoining = "dateOfJoining",
  probation = "",
  mobileNumber = "mobileNumber",
  emergencyName = "",
  emergencyContact = "emergencyContact",
  relation = "",
}

const EmpDetails = () => {
  const { empId } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [activeEmployee, setActiveEmployee] = useState<any>(undefined);

  const { isLoading, error, data } = useGetProfileQuery(empId);

  useEffect(() => {
    if (data?.employee) {
      const mapped = Object.keys(data.employee)
        .map((key) => {
          switch (key) {
            case empKeys.empId:
              return { index: 0, key, value: data.employee[key] };
            case empKeys.dob:
              return { index: 1, key, value: data.employee[key] };
            case empKeys.gender:
              return { index: 2, key, value: data.employee[key] };
            case empKeys.email:
              return { index: 3, key, value: data.employee[key] };
            case empKeys.mobileNumber:
              return { index: 4, key, value: data.employee[key] };
            case empKeys.dateofJoining:
              return { index: 5, key, value: data.employee[key] };
            case empKeys.designation:
              return { index: 6, key, value: data.employee[key] };
            case empKeys.reportingManager:
              return { index: 7, key, value: data.employee[key] };
            case empKeys.status:
              return { index: 8, key, value: data.employee[key] };
            default:
              break;
          }
        })
        .filter((elem) => !!elem)
        .sort((a: any, b: any) => a.index - b.index);

      const mappedSec = Object.keys(data.employee)
        .map((key) => {
          switch (key) {
            case empKeys.emergencyName:
              return { index: 0, key, value: data.employee[key] };
            case empKeys.emergencyContact:
              return { index: 1, key, value: data.employee[key] };
            case empKeys.relation:
              return { index: 2, key, value: data.employee[key] };
            default:
              break;
          }
        })
        .filter((elem) => !!elem)
        .sort((a: any, b: any) => a.index - b.index);

      setEmployeeData({ primary: mapped, secondary: mappedSec });
    }
  }, [data]);
  console.log(employeeData);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Layout>
          <Navbar />
          <div style={{ margin: 40 }}>
            <BreadCrumbs
              imagesrc="/images/attendance.svg"
              location="Employee Management"
              location1="Add Employee"
              location2={data?.employee?.employeeName}
            />
            <hr />
            <div className="employee-intro">
              <h4>
                {data?.employee?.employeeName}{" "}
                <span style={{ padding: "0 0.75rem" }}>
                  <FontAwesomeIcon
                    icon={faPen}
                    color="#35639F"
                    size="xs"
                    onClick={() => {
                      /* open modal */
                      setActiveEmployee(data?.employee);
                    }}
                  />
                </span>
              </h4>
              <Button
                className="btn"
                type="primary"
                onClick={() =>
                  navigate(`/attendance/${data?.employee?.employeeNumber}`)
                }
              >
                Go to attendance
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
            <div className="employee-details-container">
              <div className="employee-details">
                {employeeData?.primary.map((item: any) => (
                  <div className="employee-details__meta">
                    <h6 className="employee-details__meta-title">
                      {item.key.toUpperCase()}
                    </h6>
                    <p className="employee-details__meta-content">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="employee-details-container">
              <h4>IN CASE OF EMERGENCY</h4>
              <div className="employee-details">
                {employeeData?.secondary.map((item: any) => (
                  <div className="employee-details__meta">
                    <h6 className="employee-details__meta-title">
                      {item.key.toUpperCase()}
                    </h6>
                    <p className="employee-details__meta-content">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      )}

      {/* MODAL CMP */}
      <ModalComponent
        openModal={!!activeEmployee}
        classNames="holidays-modal"
        closeModal={() => setActiveEmployee(undefined)}
      >
        {!!activeEmployee && (
          <EmployeeForm
            update
            setIsModalOpen={() => setActiveEmployee("")}
            employeeId={activeEmployee}
            defaultValue={activeEmployee}
          />
        )}
      </ModalComponent>
    </>
  );
};

export default EmpDetails;
