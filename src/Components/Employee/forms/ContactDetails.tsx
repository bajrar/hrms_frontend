import { Button, Form, FormInstance, Input } from 'antd';
import { ToastContainer } from 'react-toastify';

/* Assets */
import '../add-employee-form.css';
import '../employeeDetails.css';

type BasicInfoFormProps = {
  closeModal: (state: boolean) => void;
  form: FormInstance<any>;
  handleTabChange: () => void;
  disabledForm?: boolean;
};

const ContactDetail = ({ closeModal, form, disabledForm = false, handleTabChange }: BasicInfoFormProps) => {
  const handleModalClose = () => {
    form.resetFields();
    closeModal(false);
  };
  return (
    <>
      <ToastContainer />
      <div className="mb-4">
        <div style={{ paddingInline: 5 }}>
          <Form layout="vertical" autoComplete="off" form={form} disabled={disabledForm}>
            <div
              className="row add-employee__section__tab p-2 mt-4  
             "
            >
              <Form.Item
                className="form-input col"
                label="Contact Name *"
                name="contactName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Contact Name !',
                  },
                ]}
              >
                <Input
                  name="email"
                  placeholder="Enter the name of contact person (e.g. Jane Doe) "
                  className="form-input-wrapper"
                  type="text"
                />
              </Form.Item>

              <Form.Item
                className="form-input col"
                label="Contact Number * "
                name="contact"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Contact Number!',
                  },
                ]}
              >
                <Input
                  name="mobile"
                  placeholder="Enter contact number (e.g. 9368745698)"
                  className="form-input-wrapper"
                  type="number"
                />
              </Form.Item>
            </div>

            <div className="row add-employee__section__tab p-2">
              <Form.Item
                className="form-input col-6"
                label="Relation to employee*"
                name="relation"
                rules={[{ required: true, message: 'Please input your relation!' }]}
              >
                <Input
                  name="email"
                  placeholder="Enter the relationship of contact person (e.g. parent)"
                  className="form-input-wrapper"
                  type="text"
                />
              </Form.Item>
            </div>

            <div className="form-footer" style={{ display: 'flex', gap: 10 }}>
              <Button type="default" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button type="primary" htmlType="button" onClick={handleTabChange}>
                Next
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ContactDetail;
