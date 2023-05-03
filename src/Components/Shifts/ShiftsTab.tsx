import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import './shifts.css';
import ModalComponent from '../Ui/Modal/Modal';
import AddShiftForm from './AddShiftForm';
import { getShift } from '../../redux/features/shiftSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import AssignShiftForm from './AssignShiftForm';
import { apis } from '../apis/constants/ApisService';
import DeleteModal from '../Ui/DeleteModal/DeleteModal';

export interface DataType {
  date: string;
  shiftName: string;
  workingDays: string;
  time: string;
  shiftScheduling: string;
  device: string;
  view?: React.ReactNode;
}

const ShiftsTab = () => {
  const [searchText, setSearchText] = useState('');
  const [isAddShiftModalOpen, setIsAddShiftModalOpen] = useState(false);
  const [isAssignShiftModalOpen, setIsAssignShiftModalOpen] = useState(false);
  const [shiftArray, setShiftArray] = useState<any>([]);
  const [updateModalIsOpen, setUpdateModalIsModal] = useState<boolean>(false);
  const [shiftId, setShiftId] = useState<string>('');
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteShiftId, setDeleteShiftId] = useState<string>('');

  const dispatch = useAppDispatch();
  const columns: ColumnsType<DataType> = [
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'SHIFT NAME',
      dataIndex: 'shiftName',
      key: 'shiftName',
    },
    {
      title: 'WORKING DAYs',
      dataIndex: 'workingDays',
      key: 'workingDays',
    },
    {
      title: 'TIME',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'SHIFT SCHEDULING ',
      dataIndex: 'shiftScheduling',
      key: 'shiftScheduling',
    },
    {
      title: 'DEVICE',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      render: (record) => (
        <div className='d-flex action-btn-container'>
          <FontAwesomeIcon
            icon={faPen}
            color='#35639F'
            onClick={() => openUpdateModal(record)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            color='#35639F'
            onClick={() => openDeleteModal(record)}
          />
        </div>
      ),
    },
    {
      title: '',
      dataIndex: 'view',
      key: 'view',
      render: (record) => (
        <Link className='viewMoreBtn' to={`/shift/${record}`}>
          View
        </Link>
      ),
    },
  ];

  const showAddShiftModal = () => {
    setIsAddShiftModalOpen(true);
  };

  const handleAddShiftOk = () => {
    setIsAddShiftModalOpen(false);
  };

  const showAssignShiftModal = () => {
    setIsAssignShiftModalOpen(true);
  };

  const handleAssignShiftOk = () => {
    setIsAssignShiftModalOpen(false);
  };

  const deleteShift: any = async () => {
    try {
      const res = await apis.deleteShifts(deleteShiftId);
      if (res.status === 200) {
        dispatch(getShift() as any);
      }
    } catch {
      message.error('Something went wrong');
    } finally {
      setDeleteModal(false);
    }
  };

  const openDeleteModal = (id: string) => {
    setDeleteModal(true);
    setDeleteShiftId(id);
  };

  const openUpdateModal = (shiftId: any) => {
    setShiftId(shiftId);
    setUpdateModalIsModal(true);
  };

  useEffect(() => {
    dispatch(getShift() as any);
  }, [dispatch]);

  const { data } = useAppSelector((state: any) => state.shiftSlice);

  useEffect(() => {
    const shifts: DataType[] = [];
    data?.shift?.map((shiftData: any) => {
      if (shiftData?.shiftName?.toLowerCase().includes(searchText)) {
        const tableData = {
          date: dayjs(shiftData.createdAt).format('YYYY-MM-DD'),
          shiftName: shiftData?.shiftName,
          workingDays: shiftData?.workingDay,
          time: `${shiftData.startTime} - ${shiftData?.endTime}`,
          shiftScheduling: shiftData?.shiftSchedule,
          device: shiftData?.device,
          action: shiftData?._id,
          view: shiftData?._id,
        };
        shifts.push(tableData);
      }
    });

    setShiftArray(shifts);
  }, [data?.shift, searchText]);

  return (
    <div>
      <div className='d-flex align-items-center justify-content-between'>
        <form action=''>
          <input
            type='text'
            placeholder='Search shifts'
            className='search-field search-shift'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          />
        </form>
        <div className='d-flex align-items-center button-container '>
          <button className='assign-shift-btn' onClick={showAssignShiftModal}>
            Assign shifts
          </button>
          <button
            className='primary-btn add-shift-btn'
            onClick={showAddShiftModal}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Shifts
          </button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={shiftArray}
        className='shifts-table'
      />
      <ModalComponent
        openModal={isAddShiftModalOpen}
        handleOk={handleAddShiftOk}
        closeModal={setIsAddShiftModalOpen}
        classNames='assign-shift-modal'
        okText='Add'
      >
        <h3 className='modal-title'>ADD SHIFT</h3>
        <AddShiftForm
          isModalOpen={isAddShiftModalOpen}
          setIsModalOpen={setIsAddShiftModalOpen}
        />
      </ModalComponent>
      <ModalComponent
        openModal={isAssignShiftModalOpen}
        handleOk={handleAssignShiftOk}
        closeModal={setIsAssignShiftModalOpen}
        classNames='assign-shift-modal'
        okText='Assign'
      >
        <h3 className='modal-title'>ASSIGN SHIFT</h3>
        <AssignShiftForm
          isModalOpen={isAssignShiftModalOpen}
          setIsModalOpen={setIsAssignShiftModalOpen}
        />
      </ModalComponent>
      <ModalComponent
        openModal={updateModalIsOpen}
        handleOk={handleAssignShiftOk}
        closeModal={setUpdateModalIsModal}
        classNames='assign-shift-modal'
        okText='Save'
      >
        <h3 className='modal-title'>UPDATE SHIFT</h3>
        <AddShiftForm
          setUpdateModalIsModal={setUpdateModalIsModal}
          fromUpdate
          shiftId={shiftId}
        />
      </ModalComponent>

      <DeleteModal
        openModal={deleteModal}
        setOpenModal={setDeleteModal}
        deleteItem={deleteShift}
      />
    </div>
  );
};

export default ShiftsTab;
