import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import ModalComponent from '../Ui/Modal/Modal';
import AddLeaveForm from './AddLeaveForm';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { getLeave } from '../../redux/features/leaveSlice';
import { Link, useNavigate } from 'react-router-dom';
import AssignLeaveForm from './AssignLeaveForm';
import DeleteModal from '../Ui/DeleteModal/DeleteModal';
import { apis } from '../apis/constants/ApisService';
import { useTokenData } from '../../hooks/userTokenData';

export interface DataType {
  leaveName?: string;
  unit?: string;
  maximumUnit?: string;
  leaveDetails: string;
  accumulated?: boolean;
  action: string;
  view: string;
}

const AddLeave = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [leaveArray, setLeaveArray] = useState<DataType[]>([]);
  const [isAssignOpen, setIsAssignOpen] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteLeaveId, setDeleteLeaveId] = useState<string>('');
  const [shiftId, setShiftId] = useState<string>('');
  const [updateModalIsOpen, setUpdateModalIsModal] = useState<boolean>(false);
  const [isAssignShiftModalOpen, setIsAssignShiftModalOpen] = useState(false);
  const { isAdminTemp } = useTokenData();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAdminTemp) {
      navigate('/leave');
    } else {
      navigate('/request-leave');
    }
  }, [isAdminTemp, navigate]);
  const columns: ColumnsType<DataType> = [
    {
      title: 'LEAVE NAME',
      dataIndex: 'leaveName',
      key: 'leaveName',
    },
    {
      title: 'UNIT',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'MAXIMUM UNIT',
      dataIndex: 'maximumUnit',
      key: 'maximumUnit',
    },
    {
      title: 'LEAVE DETAILS',
      dataIndex: 'leaveDetails',
      key: 'leaveDetails',
    },
    {
      title: 'ACCUMULATED',
      dataIndex: 'accumulated',
      key: 'accumulated',
      render: (record) => <>{record ? 'Checked' : '-'}</>,
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      render: (record) => (
        <div className="d-flex action-btn-container">
          <FontAwesomeIcon icon={faPen} color="#35639F" onClick={() => openUpdateModal(record)} />{' '}
          <FontAwesomeIcon icon={faTrash} color="#35639F" onClick={() => openDeleteModal(record)} />
        </div>
      ),
    },
    {
      title: '',
      dataIndex: 'view',
      key: 'view',
      render: (record) => (
        <Link className="viewMoreBtn" to={`/leave/${record}`}>
          View
        </Link>
      ),
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    dispatch(getLeave() as any);
  }, [dispatch]);

  const { leaves } = useAppSelector((state) => state.leaveSlice);

  useEffect(() => {
    const leaveData: DataType[] = [];
    leaves?.leave?.map((leave: any) => {
      if (leave?.leaveName?.toLowerCase().includes(searchText)) {
        const tableData = {
          leaveName: leave.leaveName,
          unit: leave?.leaveUnit,
          maximumUnit: leave?.maximumUnitAllowed,
          leaveDetails: leave?.leaveNote,
          accumulated: leave?.accumulated,
          action: leave?._id,
          view: leave?._id,
        };
        leaveData.push(tableData);
      }
    });
    setLeaveArray(leaveData);
  }, [leaves.leave, searchText]);

  const openDeleteModal = (id: string) => {
    setDeleteModal(true);
    setDeleteLeaveId(id);
  };

  const deletLeave = async () => {
    try {
      const res = await apis.deleteLeave(deleteLeaveId);
      if (res.status === 200) {
        dispatch(getLeave() as any);
      }
    } catch {
      message.error('Something went wrong');
    } finally {
      setDeleteModal(false);
    }
  };
  const openUpdateModal = (shiftId: any) => {
    setShiftId(shiftId);
    setUpdateModalIsModal(true);
  };

  const handleAssignShiftOk = () => {
    setIsAssignShiftModalOpen(false);
  };

  return (
    <div className="add-leave">
      <div className="add-leave-top d-flex align-items-center justify-content-between">
        <input
          type="text"
          placeholder="Search"
          className="search-field search-shift"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
        <div className="d-flex align-items-center button-container">
          <button className="assign-shift-btn" onClick={() => setIsAssignOpen(true)}>
            Assign Leave
          </button>
          <button className="primary-btn" onClick={showModal}>
            <FontAwesomeIcon icon={faPlus} /> Add Leave
          </button>
        </div>
      </div>
      <Table columns={columns} className="shifts-table" dataSource={leaveArray} />
      <ModalComponent openModal={isModalOpen} classNames="add-leave-modal" closeModal={setIsModalOpen}>
        <h3 className="modal-title">ADD LEAVE</h3>
        <AddLeaveForm setIsModalOpen={setIsModalOpen} />
      </ModalComponent>
      <ModalComponent openModal={isAssignOpen} closeModal={setIsAssignOpen} classNames="add-leave-modal">
        <h3 className="modal-title">ASSIGN LEAVE</h3>
        <AssignLeaveForm setIsAssignOpen={setIsAssignOpen} />
      </ModalComponent>
      <ModalComponent
        openModal={updateModalIsOpen}
        handleOk={handleAssignShiftOk}
        closeModal={setUpdateModalIsModal}
        classNames="assign-shift-modal"
        okText="Save"
      >
        <h3 className="modal-title">UPDATE LEAVE</h3>
        <AssignLeaveForm
          setUpdateModalIsModal={setUpdateModalIsModal}
          setIsAssignOpen={setIsAssignOpen}
          fromUpdate
          shiftId={shiftId}
        />
      </ModalComponent>
      <DeleteModal openModal={deleteModal} setOpenModal={setDeleteModal} deleteItem={deletLeave} />
    </div>
  );
};

export default AddLeave;
