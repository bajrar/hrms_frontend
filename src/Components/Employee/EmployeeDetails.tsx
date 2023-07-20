import { Button, Typography } from 'antd';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Spinner from '../Spinner/Spinner';
import ModalComponent from '../Ui/Modal/Modal';
import BreadCrumbs from '../Ui/BreadCrumbs/BreadCrumbs';
import { useGetProfileQuery, useUpdateEmployeeMutation } from '../../redux/api/employeeApiSlice';

/* ASSETS */
import './employeeDetails.css';
import './add-employee-form.css';
import { faPen, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import FormController, { EmployeeInitialValues } from './FormController';
import useEmployee from '../../hooks/useEmployee';
import { ToastContainer } from 'react-toastify';

enum EMERGENCY {
  NAME = 'name',
  CONTACT = 'contact',
  RELATION = 'relation',
}

enum PAYROLL {
  BANK_META = 'bankMeta',
  SSF = 'ssf',
  PAN = 'pan',
}

enum empKeys {
  EMPLOYEE_NUMBER = 'employeeNumber',
  NAME = 'employeeName',
  EMAIL = 'email',
  DOB = 'dob',
  GENDER = 'gender',
  DESIGNATION = 'designation',
  REPORTING_MANAGER = 'reportingManager ',
  STATUS = 'status',
  DATE_OF_JOINING = 'dateOfJoining',
  PROBATION = '',
  EMERGENCY = 'emergency',
  MOBILE_NUMBER = 'mobileNumber',
  PAYROLL = 'payroll',
}

const EmployeeDetailsMeta = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="employee-details__meta">
      <h6 className="employee-details__meta-title">{label?.toUpperCase()}</h6>
      <p className="employee-details__meta-content">{value}</p>
    </div>
  );
};
const EmpDetails = () => {
  const { empId } = useParams();
  const navigate = useNavigate();
  const { transformPayload } = useEmployee();
  const { isLoading, error, data } = useGetProfileQuery(empId);
  const [updateEmployeeHandler, { isLoading: isUpdating }] = useUpdateEmployeeMutation();

  const [employeeData, setEmployeeData] = useState<any>(null);
  const [isMaskClosable, setIsMaskClosable] = useState<boolean>(true);
  const [activeEmployee, setActiveEmployee] = useState<any>(undefined);
  const userInfoMemoize = useMemo(
    () => [
      empKeys.EMPLOYEE_NUMBER,
      empKeys.DOB,
      empKeys.GENDER,
      empKeys.EMAIL,
      empKeys.MOBILE_NUMBER,
      empKeys.DATE_OF_JOINING,
      empKeys.DESIGNATION,
      empKeys.REPORTING_MANAGER,
      empKeys.STATUS,
    ],
    [],
  );

  useEffect(() => {
    if (data?.employee) {
      const info = userInfoMemoize
        .map((key, index) => ({ key, value: data.employee[key], index }))
        .filter((elem) => !!elem)
        .sort((a: any, b: any) => a.index - b.index);

      const emergencyContact = Object.keys(data?.employee)
        .filter((key) => key === empKeys.EMERGENCY)
        .map((target) => {
          return Object.keys(data.employee[target]).map((targetKey) => {
            if (targetKey === EMERGENCY.NAME) {
              return { index: 0, key: targetKey, value: data.employee[target][targetKey] };
            } else if (targetKey === EMERGENCY.CONTACT) {
              return { index: 1, key: targetKey, value: data.employee[target][targetKey] };
            } else if (targetKey === EMERGENCY.RELATION) {
              return { index: 2, key: targetKey, value: data.employee[target][targetKey] };
            }
          });
        })
        .flat()
        .filter((item) => !!item)
        .sort((a: any, b: any) => a.index - b.index);

      const payroll = Object.keys(data?.employee)
        .filter((key) => key === empKeys.PAYROLL)
        .map((target) => {
          return Object.keys(data.employee[target]).map((targetKey) => {
            if (targetKey === PAYROLL.BANK_META) {
              return { index: 0, key: targetKey, value: data.employee[target][targetKey] };
            } else if (targetKey === PAYROLL.SSF) {
              return { index: 1, key: targetKey, value: data.employee[target][targetKey] };
            } else if (targetKey === PAYROLL.PAN) {
              return { index: 2, key: targetKey, value: data.employee[target][targetKey] };
            }
          });
        })
        .flat()
        .filter((elem) => !!elem)
        .sort((a: any, b: any) => a.index - b.index);
      setEmployeeData({ userInfo: info, emergencyContact, payroll });
    }
  }, [data]);

  const handleUpdateEmployee = async (values: EmployeeInitialValues) => {
    setIsMaskClosable(false);
    const payload = transformPayload(values);
    updateEmployeeHandler({ ...payload, id: activeEmployee?._id });
  };

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <Spinner />
      ) : (
        <div style={{ margin: 40 }}>
          <BreadCrumbs
            imagesrc="/images/attendance.svg"
            location="Employee Management"
            location1="employee"
            location2={data?.employee?.employeeName}
          />
          <hr />
          <div className="employee-intro">
            <h4>
              {data?.employee?.employeeName}{' '}
              <span style={{ padding: '0 0.75rem' }}>
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
              onClick={() => navigate(`/attendance/${data?.employee?.employeeNumber}`)}
            >
              Go to attendance
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
          <div className="employee-details-container">
            <div className="employee-details">
              {employeeData?.userInfo?.map((item: any) => (
                <EmployeeDetailsMeta key={item.key} label={item.key} value={item.value} />
              ))}
            </div>
          </div>

          <div className="employee-details-container">
            {' '}
            <h4>PAYROLL DETAILS</h4>{' '}
            <div className="employee-details">
              {employeeData?.payroll?.map((item: any) => (
                <>
                  {item?.key === 'bankMeta' ? (
                    <div key={item.key} style={{ width: '100%' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          maxWidth: '952px',
                        }}
                      >
                        <EmployeeDetailsMeta key={'Bank'} label={'bank'} value={item.value.name} />
                        <EmployeeDetailsMeta key={'bank acocunt'} label={'bank a/c'} value={item.value.account} />
                        <EmployeeDetailsMeta key={'Branch'} label={'branch'} value={item.value.branch} />
                      </div>
                    </div>
                  ) : (
                    <div key={item.key} className="employee-details__meta">
                      <EmployeeDetailsMeta key={item.key} label={item.key} value={item.value} />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>

          <div className="employee-details-container">
            <h4>IN CASE OF EMERGENCY</h4>
            <div className="employee-details">
              {employeeData?.emergencyContact?.map((item: any) => (
                <EmployeeDetailsMeta key={item.key} label={item.key} value={item.value} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CMP */}
      <ModalComponent
        openModal={!!activeEmployee}
        classNames="holidays-modal"
        closeModal={() => setActiveEmployee(undefined)}
        destroyOnClose={true}
        maskClosable={isMaskClosable}
      >
        {!!activeEmployee && (
          <>
            <Typography.Title level={5} style={{ letterSpacing: 1.2, marginBottom: '0.8rem' }}>
              UPDATE EMPLOYEE
            </Typography.Title>
            <FormController
              closeModal={() => setActiveEmployee(undefined)}
              handleSubmit={handleUpdateEmployee}
              isLoading={isUpdating}
              initialValues={activeEmployee}
            />
          </>
        )}
        {/* {!!activeEmployee && (
          <EmployeeForm
            update
            setIsModalOpen={() => setActiveEmployee('')}
            employeeId={activeEmployee}
            defaultValue={activeEmployee}
          />
        )} */}
      </ModalComponent>
    </>
  );
};

export default EmpDetails;
