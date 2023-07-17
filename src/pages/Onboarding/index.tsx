import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';

import { Button, Form, Select, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import ModalComponent from '../../Components/Ui/Modal/Modal';
import FormContainer from '../../Components/Employee/forms/FormContainer';

/* ASSETS */
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './onboarding.css';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import OnboardingForm from '../../Components/Onboarding/OnboardingForm';
import DeleteModal from '../../Components/Ui/DeleteModal/DeleteModal';
import { ToastContainer, toast } from 'react-toastify';
import {
  useOnboardingEmployeeListingsQuery,
  useRemoveEmployeeMutation,
  useUpdateEmployeeOnboardingMutation,
} from '../../redux/api/employeeApiSlice';
import form from 'antd/es/form';

const Onboarding = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [onboarding, setOnboarding] = useState(false);
  const [mappedOnboarding, setMappedOnboarding] = useState([]);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isMaskClosable, setIsMaskClosable] = useState<boolean>(true);
  const [metaIds, setMetaIds] = useState<{ id: string; empId: string }>({ id: '', empId: '' });

  const [handleRemoveEmployee] = useRemoveEmployeeMutation();
  const [handleUpateEmployeeStatus, updateResp] = useUpdateEmployeeOnboardingMutation();
  const { isLoading, error, data: onboardingData } = useOnboardingEmployeeListingsQuery('pending,rejected');

  useEffect(() => {
    const filtered = onboardingData
      ?.filter((employee: any) => typeof employee.payroll !== 'undefined')
      .map((employee: any) => ({
        _id: employee._id,
        employeeId: employee.employeeId,
        employeeName: employee.employeeName,
        email: employee.email,
        dateOfJoining: employee.dateOfJoining,
        bank: employee?.payroll?.bankMeta?.name,
        bankAcc: employee?.payroll?.bankMeta?.account,
        branch: employee?.payroll?.bankMeta?.branch,
        ssf: employee?.payroll?.ssf,
        pan: employee?.payroll?.pan,
        status: employee?.onboardingStatus,
        action: employee._id,
      }));
    setMappedOnboarding(filtered);
  }, [isLoading, onboardingData]);

  const columns: ColumnsType<any> = [
    {
      title: 'EMPLOYEE NAME',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'EMAIL ADDRESS',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'DATE OF JOINING',
      dataIndex: 'dateOfJoining',
      key: 'dateOfJoining',
    },
    {
      title: 'BANK',
      dataIndex: 'bank',
      key: 'bank',
    },
    {
      title: 'BANK A/C',
      dataIndex: 'bankAcc',
      key: 'bankAcc',
    },
    {
      title: 'BRANCH (location)',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'SSF NO',
      dataIndex: 'ssf',
      key: 'ssf',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'PAN NO',
      dataIndex: 'pan',
      key: 'pan',
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <div className="d-flex action-btn-container">
            <FontAwesomeIcon icon={faPen} color="#35639F" onClick={() => openUpdateModal(record?._id)} />
            <FontAwesomeIcon icon={faTrash} color="#35639F" onClick={() => openDeleteModal(record?._id)} />
          </div>
        );
      },
    },
  ];

  const openDeleteModal = (id: string) => {
    setDeleteModal(true);
    setMetaIds({ ...metaIds, id });
  };

  const openUpdateModal = (id: any) => {
    setUpdateStatus(true);
    setMetaIds({ ...metaIds, id });
  };

  const handleUpdateStatus = async ({ status }: any) => {
    try {
      await handleUpateEmployeeStatus({
        id: metaIds.id,
        onboardingStatus: status,
      });
      console.log(updateResp);
      toast.success('Employee Onboarding Updated Sucesfully', {
        position: 'top-center',
        autoClose: 5000,
      });
    } catch (error) {
      toast.error('Something Went Wrong', {
        position: 'top-center',
        autoClose: 5000,
      });
    }
  };

  const handleRemoveEmployeeOnboarding = async () => {
    try {
      handleRemoveEmployee(metaIds.id);
      toast.success('Employee deleted Sucesfully', {
        position: 'top-center',
        autoClose: 5000,
      });
    } catch (error) {
      toast.error('Something Went Wrong', {
        position: 'top-center',
        autoClose: 5000,
      });
    } finally {
      setDeleteModal(false);
    }
  };

  const handleCancel = () => {
    setUpdateStatus(false);
    form.resetFields();
  };

  return (
    <>
      <ToastContainer />
      <div className="holiday-page padding">
        <hr />
        <BreadCrumbs imagesrc="/images/attendance.svg" location="Employee Management" location1="Onboarding" />
        <hr />

        <div className="attendance-filters-bottom d-flex " style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            type="text"
            placeholder="Search names"
            className="search-field"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          />
          <div className="div" style={{ display: 'flex', gap: 10 }}>
            <button className="primary-btn" onClick={() => setOnboarding(true)}>
              <FontAwesomeIcon icon={faPlus} /> Onboarding
            </button>
          </div>
        </div>

        <Table columns={columns} className="onboarding-table" dataSource={mappedOnboarding} loading={isLoading} />
        <ModalComponent
          openModal={onboarding}
          classNames="add-employee-modal holidays-modal"
          destroyOnClose={true}
          closeModal={setOnboarding}
          maskClosable={isMaskClosable}
        >
          <Typography.Title level={5} style={{ letterSpacing: 1.2, marginBottom: '0.8rem' }}>
            EMPLOYEE ONBOARDING
          </Typography.Title>
          <FormContainer closeModal={setOnboarding} setMaskClosable={setIsMaskClosable} />
        </ModalComponent>

        <ModalComponent openModal={updateStatus} closeModal={setUpdateStatus}>
          <Typography.Title level={5} style={{ letterSpacing: 1.2, marginBottom: '0.8rem' }}>
            UPDATE STATUS
          </Typography.Title>
          <Form onFinish={handleUpdateStatus} form={form} autoComplete="off" className="p-2">
            <Form.Item
              className="form-input col "
              name="status"
              label="Status *"
              rules={[{ required: true, message: 'Status is Required' }]}
            >
              <Select
                options={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'onboarded', label: 'Onboarded' },
                  { value: 'rejected', label: 'Rejected' },
                ]}
                className="selects status-selects"
                placeholder="Update status"
              ></Select>
            </Form.Item>
            <div className="form-btn-container mt-4">
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </div>
          </Form>
        </ModalComponent>

        <DeleteModal
          openModal={deleteModal}
          setOpenModal={setDeleteModal}
          deleteItem={handleRemoveEmployeeOnboarding}
        />
      </div>
    </>
  );
};

export default Onboarding;
