import { Button, Divider, Image, Space, Typography } from 'antd';
import React from 'react';
import FlexBetween from '../Ui/FlexBetween';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
type Props = {
  activeEmployee: any;
};

enum KEYS {
  EMPLOYEE_ID = 'employeeNumber',
  EMPLOYEE_NAME = 'employeeName',
  DOB = 'dob',
  GENDER = 'gender',
  MOBILE_NUMBER = 'mobileNumber',
  EMAIL = 'email',
  DESIGNATION = 'designation',
  DATE_OF_JOINING = 'dateOfJoining',
  REPORTING_MANAGER = 'reportingManager',
  STATUS = 'status',
  PROJECT = 'project',
  PROBATION = 'probation',
  ONBOARDING_STATUS = 'onboardingStatus',
  PAYROLL = 'payroll',
  EMERGENCY = 'emergency',
  CONFIRMATION_DATE = 'confirmationDate',
}

enum EMER_KEYS {
  NAME = 'name',
  CONTACT = 'contact',
  RELATION = 'relation',
}

enum PAYROLL_KEYS {
  BANK = 'bankMeta',
  SSF = 'ssf',
  PAN = 'pan',
}

const CompareFunction = (compareList: any) => {
  const compareItem = compareList.toLowerCase().trim().split(' ').join('');
  return compareItem;
};

const EmployeeDetailsMeta = ({ label, value }: { label: string; value: any }) => {
  return (
    <Space direction="vertical" style={{ width: '254px', height: '46px' }}>
      <Typography.Title level={5} style={{ textTransform: 'capitalize' }}>
        {label.replace(/([a-z])([A-Z])/g, '$1 $2')}
      </Typography.Title>
      <Typography.Text style={{ textTransform: 'capitalize' }}>{value}</Typography.Text>
    </Space>
  );
};

const CustomStats = ({ color, status }: any) => {
  return (
    <span
      style={{
        display: 'inline-block',
        borderLeft: `4px solid ${color}`,
        padding: '0 1rem',
      }}
    >
      {status}
    </span>
  );
};

const ProfileView = ({ activeEmployee }: Props) => {
  const navigate = useNavigate();
  const { employeeName, mobileNumber, email } = activeEmployee;
  const basicInfo = [KEYS.GENDER, KEYS.DOB, KEYS.EMPLOYEE_ID];
  const officialDetails = [
    KEYS.CONFIRMATION_DATE,
    KEYS.DESIGNATION,
    KEYS.REPORTING_MANAGER,
    KEYS.STATUS,
    KEYS.DATE_OF_JOINING,
    KEYS.PROJECT,
    KEYS.PROBATION,
  ];
  const emergency = [EMER_KEYS.NAME, EMER_KEYS.CONTACT, EMER_KEYS.RELATION];
  const payroll = [PAYROLL_KEYS.BANK, PAYROLL_KEYS.SSF, PAYROLL_KEYS.PAN];

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <FlexBetween>
        <Space style={{ display: 'flex', gap: '1.25rem' }}>
          <Image
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="profile"
            width={70}
            style={{
              borderRadius: '50%',
            }}
          />
          <Space direction="vertical">
            <Typography.Title color="#292D32" level={5}>
              {employeeName}
            </Typography.Title>
            <Typography.Text color="#292D32">{mobileNumber}</Typography.Text>
            <Typography.Text color="#292D32">{email} </Typography.Text>
          </Space>
        </Space>
        <Button className="btn" type="dashed" onClick={() => navigate(`/attendance/${activeEmployee?.employeeNumber}`)}>
          Go to attendance
        </Button>
      </FlexBetween>

      <Space direction="vertical" style={{ padding: '1.5rem 0', width: '100%' }}>
        <Typography.Title level={5} style={classes.title}>
          <span style={classes.label}> Basic Information</span>
        </Typography.Title>
        <FlexBetween style={{ flexWrap: 'wrap' }}>
          {basicInfo.map((key) => (
            <EmployeeDetailsMeta key={key} label={key} value={activeEmployee?.[key]} />
          ))}
        </FlexBetween>
      </Space>

      <Space direction="vertical">
        <Typography.Title level={5} style={classes.title}>
          <span style={classes.label}>Offical Details</span>
        </Typography.Title>
        <FlexBetween style={{ flexWrap: 'wrap', gap: '1.8rem' }}>
          {officialDetails.map((key) => {
            const value = activeEmployee?.[key];
            if (key === KEYS.PROBATION) {
              return <EmployeeDetailsMeta key={key} label={key} value={value?.['type']} />;
            } else if (key === KEYS.PROJECT) {
              return <EmployeeDetailsMeta key={key} label={key} value={value?.['name']} />;
            } else if (key === KEYS.STATUS) {
              const color =
                CompareFunction(value) === 'working'
                  ? '#22BB33'
                  : CompareFunction(value) === 'pending'
                  ? '#22BB33'
                  : CompareFunction(value) === 'resigned'
                  ? '#F0AD4E'
                  : 'transparent';

              return <EmployeeDetailsMeta key={key} label={key} value={<CustomStats color={color} status={value} />} />;
            }
            return <EmployeeDetailsMeta key={key} label={key} value={value} />;
          })}
        </FlexBetween>
      </Space>

      <Space direction="vertical" style={{ padding: '1.5rem 0' }}>
        <Typography.Title level={5} style={classes.title}>
          <span style={classes.label}> Payroll Details</span>
        </Typography.Title>
        <FlexBetween style={{ flexWrap: 'wrap', gap: '1.5rem' }}>
          {payroll.map((key) => {
            if (key === PAYROLL_KEYS.BANK) {
              return (
                <FlexBetween style={{ flexWrap: 'wrap', gap: '1rem', width: '100%' }}>
                  <EmployeeDetailsMeta key={'bank'} label={'bank'} value={activeEmployee[KEYS.PAYROLL][key]['name']} />
                  <EmployeeDetailsMeta
                    key={'bankA/c'}
                    label={'bank a/c'}
                    value={activeEmployee?.[KEYS.PAYROLL]?.[key]?.['account']}
                  />
                  <EmployeeDetailsMeta
                    key={'branch'}
                    label={'branch'}
                    value={activeEmployee?.[KEYS.PAYROLL]?.[key]?.['branch']}
                  />
                </FlexBetween>
              );
            }
            return <EmployeeDetailsMeta key={key} label={key} value={activeEmployee?.[KEYS.PAYROLL]?.[key]} />;
          })}
        </FlexBetween>
      </Space>

      <Space direction="vertical" style={{ padding: '1.5rem 0', width: '100%' }}>
        <Typography.Title level={5} style={classes.title}>
          <span style={classes.label}>Emergeny Contact Details</span>
        </Typography.Title>
        <FlexBetween style={{ flexWrap: 'wrap', gap: '1rem' }}>
          {emergency.map((key) => {
            return <EmployeeDetailsMeta key={key} label={key} value={activeEmployee[KEYS.EMERGENCY][key]} />;
          })}
        </FlexBetween>
      </Space>
    </Space>
  );
};

const classes = {
  title: {
    color: 'var(--primary-color-100-brand-color, #023C87)',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: '1px',
    borderBottom: '1.3px solid #D8D8D8',
  },
  label: {
    display: 'inline-block',
    padding: '0.5em 0',
    borderBottom: '2px solid var(--primary-color-100-brand-color, #023C87)',
  },
};

export default ProfileView;
