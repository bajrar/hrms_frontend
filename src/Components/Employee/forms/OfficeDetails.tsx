import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import { Button, Form, FormInstance, Input, Select } from 'antd';
import { useEffect } from 'react';

/* Assets */
import '../add-employee-form.css';
import '../employeeDetails.css';

type BasicInfoFormProps = {
  closeModal: (state: boolean) => void;
  form: FormInstance<any>;
  handleTabChange: () => void;
  isFormDisabled?: boolean;
};

const dayOptions = [
  { label: '30', value: '30' },
  { label: '60', value: '60' },
  { label: '90', value: '90' },
];

const monthOptions = [
  { label: '1 month', value: '1 month' },
  { label: '2 month', value: '2 month' },
  { label: '3 month', value: '3 month' },
];

const permissionOptions = [
  { label: 'Owner', value: 'owner' },
  { label: 'Admin', value: 'admin' },
  { label: 'Member', value: 'member' },
];

const monthDayBindings = [
  { month: '1 month', day: '30' },
  { month: '2 month', day: '60' },
  { month: '3 month', day: '90' },
];

enum monthAndDaysEnum {
  month = 'probationPeriod',
  day = 'count',
}
const OfficeDetailsForm = ({ closeModal, form, handleTabChange, isFormDisabled = false }: BasicInfoFormProps) => {
  useEffect(() => {
    /* on mount fetch data from redux store */
  }, []);

  const closeModalHandler = () => {
    form.resetFields();
    closeModal(false);
  };

  const handleChangeSelect = (name: string) => {
    return (value: string) => {
      if (name === monthAndDaysEnum.month) {
        const target = monthDayBindings.find((item) => item.month === value);
        form.setFieldsValue({ [monthAndDaysEnum.day]: target?.day });
      } else if (name === monthAndDaysEnum.day) {
        const target = monthDayBindings.find((item) => item.day === value);
        form.setFieldsValue({ [monthAndDaysEnum.month]: target?.month });
      }
    };
  };

  return (
    <div className="mb-4">
      <div style={{ paddingInline: 5 }}>
        <Form layout="vertical" autoComplete="off" form={form} disabled={isFormDisabled}>
          <div className="row add-employee__section__tab p-2 mt-4">
            <Form.Item
              className="form-input col"
              label="Email *"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input valid email!',
                  pattern: /^[a-zA-Z0-9_.+-]+@(eeposit\.com|virtuosway\.com.np)$/,
                },
              ]}
            >
              <Input
                name="email"
                placeholder="Enter email address (e.g. example@email.com)"
                className="form-input-wrapper"
                type="text"
              />
            </Form.Item>

            <Form.Item
              className="form-input col"
              label="Mobile Number * "
              name="mobile"
              initialValue="test@eeposit.com"
              rules={[{ required: true, message: 'Please input your Mobile Number!' }]}
            >
              <Input
                name="mobile"
                placeholder="Enter phone number (e.g. 9368745698)"
                className="form-input-wrapper"
                type="number"
              />
            </Form.Item>
          </div>

          <div className="row add-employee__section__tab p-2">
            <Form.Item
              label="Confirmation Date *"
              className="form-input col"
              name="confirmationDate"
              // initialValue={moment(employeeData?.dateOfJoining)}
            >
              <Calendar className=" date-picker calender-container-picker " language="en" dateFormat="YYYY/MM/DD" />
            </Form.Item>
            <Form.Item
              className="form-input col"
              label="Designation *"
              name="designation"
              rules={[{ required: true, message: 'Please input your designation!' }]}
            >
              <Input
                name="employeeId"
                placeholder="Enter job title or designation (e.g. Senior Manager)"
                className="form-input-wrapper"
                type="text"
              />
            </Form.Item>
          </div>

          <div className="row add-employee__section__tab p-2">
            <Form.Item
              className="form-input col"
              label="Reporting Manager *"
              name="reportingManager"
              rules={[
                {
                  required: true,
                  message: 'Please input your reporting manager!',
                },
              ]}
            >
              <Input
                name="reportingManager"
                placeholder="Enter the name of reporting manager (e.g. John Doe)"
                className="form-input-wrapper"
                type="text"
              />
            </Form.Item>

            <Form.Item label="Status * " className="form-input col" name="status" initialValue={{}}>
              <Select
                showSearch
                size="large"
                placeholder="Select status"
                style={{}}
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={[
                  {
                    value: 'working',
                    label: 'Working',
                  },
                  {
                    value: 'resigned',
                    label: 'Resigned',
                  },
                  {
                    value: 'pending',
                    label: 'Pending',
                  },
                ]}
              />
            </Form.Item>
            <div className="add-employee__section p-0"></div>
          </div>

          <div className="row  add-employee__section__tab p-2">
            <Form.Item
              label="Date of Joining *"
              className="form-input col"
              name="dateOfJoining"
              // initialValue={moment(employeeData?.dateOfJoining)}
            >
              <Calendar className=" date-picker calender-container-picker" language="en" dateFormat="YYYY/MM/DD" />
            </Form.Item>

            <div className="form-input col">
              <div className="row">
                <Form.Item
                  label="Probation Period :"
                  className="form-input col-7 mx-3"
                  name="probationPeriod"
                  rules={[
                    {
                      required: true,
                      message: 'Probation period required',
                    },
                  ]}
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="Month"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    onChange={handleChangeSelect('probationPeriod')}
                    options={monthOptions}
                  />
                </Form.Item>

                <Form.Item
                  label="Days :"
                  className="form-input col-3 mx-3"
                  name="count"
                  rules={[{ required: true, message: 'Days count required' }]}
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="Day"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    onChange={handleChangeSelect('count')}
                    options={dayOptions}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="row add-employee__section__tab p-2">
            <Form.Item
              className="form-input col"
              label="Project Name *"
              name="projectName"
              rules={[{ required: true, message: 'Please input your Project Name!' }]}
            >
              <Input
                name="projectName"
                placeholder="Enter email address (e.g. example@email.com)"
                className="form-input-wrapper"
                type="text"
              />
            </Form.Item>

            <Form.Item
              label="Project Permission *"
              className="form-input col my-1"
              name="projectPermission"
              rules={[
                {
                  required: true,
                  message: 'Project Permission required',
                },
              ]}
              initialValue={{}}
            >
              <Select
                size="large"
                showSearch
                placeholder="Days"
                optionFilterProp="children"
                className="form-input-wrapper"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                options={permissionOptions}
              />
            </Form.Item>
          </div>

          <div className="form-footer" style={{ display: 'flex', gap: 10 }}>
            <Button type="primary" onClick={() => closeModalHandler()} danger>
              Cancel
            </Button>
            <Button type="primary" onClick={handleTabChange}>
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default OfficeDetailsForm;
