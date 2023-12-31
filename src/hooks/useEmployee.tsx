import { EmployeeInitialValues } from '../Components/Employee/FormController';

const useEmployee = () => {
  const transformPayload = (values: EmployeeInitialValues) => {
    const {
      idType,
      employeeId,
      dob,
      mobile,
      dateOfJoining,
      confirmationDate,
      designation,
      probationPeriod,
      count,
      contactName,
      contact,
      relation,
      projectName,
      projectPermission,
      bankName,
      bankAccount,
      branch,
      ssf,
      pan,
      ...rest
    } = { ...values };

    const payload = {
      ...rest,
      employeeNumber: employeeId,
      dob: dob?.bsDate,
      mobileNumber: mobile,
      dateOfJoining: dateOfJoining?.bsDate,
      confirmationDate: confirmationDate?.bsDate,
      designation,
      probation: { type: probationPeriod, count },
      emergency: { name: contactName, contact, relation },
      project: { name: projectName, permission: projectPermission },
      payroll: {
        bankMeta: {
          name: bankName,
          account: bankAccount,
          branch: branch,
        },
        ssf: ssf,
        pan: pan,
      },
    };

    return payload;
  };

  const transformInput = ({
    employeeNumber,
    employeeName,
    dob,
    gender,
    mobileNumber,
    email,
    designation,
    dateOfJoining,
    reportingManager,
    probation,
    confirmationDate,
    status,
    emergency,
    project,
    payroll,
  }: any) => {
    return {
      idType: 'manual',
      employeeId: employeeNumber,
      employeeName: employeeName,
      dob: dob,
      gender: gender,
      email: email,
      reportingManager: reportingManager,
      status: status,
      mobile: mobileNumber,
      dateOfJoining: dateOfJoining,
      confirmationDate: confirmationDate,
      designation: designation,
      probationPeriod: probation?.type,
      count: probation?.count,
      contactName: emergency?.name,
      contact: emergency?.contact,
      relation: emergency?.relation,
      projectName: project?.name,
      projectPermission: project?.permission,
      bankName: payroll?.bankMeta.name,
      bankAccount: payroll?.bankMeta?.account,
      branch: payroll?.bankMeta?.branch,
      ssf: payroll?.ssf,
      pan: payroll?.pan,
    };
  };

  return { transformPayload, transformInput };
};

export default useEmployee;
