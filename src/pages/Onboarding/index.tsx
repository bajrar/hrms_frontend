import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';

import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import AddHolidaysForm from '../../Components/Holidays/AddHolidaysForm';
import Layout from '../../Components/Layout';
import ModalComponent from '../../Components/Ui/Modal/Modal';
import Navbar from '../../Components/Ui/Navbar';

/* ASSETS */
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './onboarding.css';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';
import OnboardingForm from '../../Components/Onboarding/OnboardingForm';
import DeleteModal from '../../Components/Ui/DeleteModal/DeleteModal';
import { ToastContainer } from 'react-toastify';
import { useEmployeeListingsQuery } from '../../redux/api/employeeApiSlice';

const Onboarding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [mappedOnboarding, setMappedOnboarding] = useState([]);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [metaIds, setMetaIds] = useState<{ id: string; empId: string }>({ id: '', empId: '' });
  const [updateModalIsOpen, setUpdateModalIsModal] = useState<boolean>(false);

  const { isLoading, error, data: onboardingData } = useEmployeeListingsQuery('');

  console.log('🚀 ~ file: index.tsx:29 ~ Onboarding ~ onboardingData:', onboardingData);
  console.log('🚀 ~ file: index.tsx:24 ~ Onboarding ~ mappedOnboarding:', mappedOnboarding);

  const showModal = () => {
    setIsModalOpen(true);
  };

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
            <FontAwesomeIcon icon={faPen} color="#35639F" onClick={() => openUpdateModal(record?.employeeId)} />
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

  const openUpdateModal = (empId: any) => {
    setUpdateModalIsModal(true);
    setMetaIds({ ...metaIds, empId });
  };

  const deleteOnboarding = () => {
    console.log(metaIds);
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
            <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus} /> Onboarding
            </button>
          </div>
        </div>

        <Table columns={columns} className="onboarding-table" dataSource={mappedOnboarding} loading={isLoading} />
        <ModalComponent openModal={isModalOpen} classNames="holidays-modal" closeModal={setIsModalOpen}>
          <h3 className="modal-title">EMPLOYEE ONBOARDING</h3>
          <OnboardingForm setIsModalOpen={setIsModalOpen} />
        </ModalComponent>

        <ModalComponent openModal={updateModalIsOpen} classNames="holidays-modal" closeModal={setUpdateModalIsModal}>
          <h3 className="modal-title">UPDATE EMPLOYEE ONBOARDING</h3>
          <OnboardingForm setIsModalOpen={setUpdateModalIsModal} shiftId={metaIds.empId} />
        </ModalComponent>

        <DeleteModal openModal={deleteModal} setOpenModal={setDeleteModal} deleteItem={deleteOnboarding} />
      </div>
    </>
  );
};

export default Onboarding;
