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

  return [transformPayload];
};

export default useEmployee;
