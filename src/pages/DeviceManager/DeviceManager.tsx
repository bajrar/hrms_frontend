import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'antd';
import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import './deviceManager.css';
import type { ColumnsType } from 'antd/es/table';
import ModalComponent from '../../Components/Ui/Modal/Modal';
import AddDeviceForm from '../../Components/DeviceManger/AddDeviceForm';
import { useEffect, useState } from 'react';
import ImportAttendanceForm from '../../Components/DeviceManger/ImportAttendanceForm';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { getDevices } from '../../redux/features/addedDeviceSlice';
import { apis } from '../../Components/apis/constants/ApisService';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';

export interface DataType {
  deviceName?: string;
  location: string;
  action: string;
}

const DeviceManager = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [deviceArray, setDeviceArray] = useState<any>();
  const [deviceId, setDeviceId] = useState('');
  const dispatch = useDispatch();

  const columns: ColumnsType<DataType> = [
    {
      title: 'DEVICE NAME',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: 'LOCATION',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      render: (record) => (
        <div className="d-flex action-btn-container">
          <FontAwesomeIcon
            icon={faPen}
            color="#35639F"
            onClick={() => openUpdateModals(record)}
            style={{ cursor: 'pointer' }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            color="#35639F"
            onClick={() => deleteDevice(record)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getDevices() as any);
  }, [dispatch]);

  const { devices } = useAppSelector((state) => state.deviceSlice);

  useEffect(() => {
    const deviceArray: DataType[] = [];
    devices?.map((deviceData: any) => {
      const tableData = {
        deviceName: deviceData?.deviceName,
        location: deviceData?.location,
        action: deviceData?._id,
      };
      deviceArray.push(tableData);
    });

    setDeviceArray(deviceArray);
  }, [devices]);

  const deleteDevice: any = async (id: any) => {
    try {
      const res = await apis.deleteDevices(id);
      if (res.status === 200) {
        dispatch(getDevices() as any);
      }
    } catch {
      console.log('error');
    }
  };
  const openUpdateModals = (deviceNumber: string) => {
    setOpenUpdateModal(true);
    setDeviceId(deviceNumber);
  };

  return (
    <Layout>
      <Navbar />
      <div className="device-manager-page padding">
        <hr />
        <BreadCrumbs
          imagesrc="/images/attendance.svg"
          location="Attendance / Shift Management"
          location1="Device Manager"
        />
        <hr />
        <div className="device-manager-header d-flex align-items-center justify-content-between">
          <input type="text" className="search-field" placeholder="Search" />
          <div className="button-container">
            <button className="secondary-btn d-flex align-items-center" onClick={() => setIsImportModalOpen(true)}>
              <div className="icon-container">
                <img src="/images/uploads.svg" alt="" />
              </div>{' '}
              Import Attendance
            </button>
            <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus} /> Add Device
            </button>
          </div>
        </div>
        <Table columns={columns} className="table-container" dataSource={deviceArray} />
        <ModalComponent
          openModal={isModalOpen}
          // handleCancel={handleCancel}
          classNames="add-device-modal"
          closeModal={setIsModalOpen}
        >
          <h3 className="modal-title">ADD DEVICE</h3>
          <AddDeviceForm setIsModalOpen={setIsModalOpen} />
        </ModalComponent>
        <ModalComponent
          openModal={isImportModalOpen}
          // handleCancel={handelImportCancel}
          closeModal={setIsImportModalOpen}
          classNames=""
        >
          <h3 className="modal-title">IMPORT FILE</h3>
          <ImportAttendanceForm />
        </ModalComponent>

        <ModalComponent
          openModal={openUpdateModal}
          // handleCancel={handleCancel}
          classNames="add-device-modal"
          closeModal={setOpenUpdateModal}
        >
          <h3 className="modal-title">Update DEVICE</h3>
          <AddDeviceForm setIsModalOpen={setOpenUpdateModal} fromUpdate deviceId={deviceId} />
        </ModalComponent>
      </div>
    </Layout>
  );
};

export default DeviceManager;
