import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf';

import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import ModalComponent from '../../Components/Ui/Modal/Modal';
import Selects from '../../Components/Ui/Selects/Selects';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { getApplicants } from '../../redux/features/applicantsSlice';
import { getSingleApplicant } from '../../redux/features/singleApplicantSlice';
import './applicants.css';

export interface DataType {
  position?: string;
  applicantName?: string;
  email?: string;
  address?: string;
  city?: string;
  status?: React.ReactNode;
  action?: string;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Applicants = () => {
  const dispatch = useDispatch();
  const [applicantArray, setApplicantArray] = useState<any[]>();
  const [applicantModal, setApplicantModal] = useState<boolean>(false);

  const filterByType = [
    {
      value: 'applicantName',
      label: 'Applicant Name ( A- Z )',
    },
    {
      value: '- applicantName',
      label: 'Applicant Name ( Z - A )',
    },
    {
      value: 'position',
      label: 'Position',
    },
    {
      value: 'status',
      label: 'Status',
    },
  ];
  const viewSingleApplicant = (applicantId: any) => {
    dispatch(getSingleApplicant({ applicantId }) as any);
    setApplicantModal(true);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'POSITION',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'APPLICANT NAME',
      dataIndex: 'applicantName',
      key: 'applicantName',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'ADDRESS',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'CITY',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      render: (record) => (
        <div className='d-flex action-btn-container'>
          <FontAwesomeIcon icon={faPen} color='#35639F' />
          <span
            className='viewMoreBtn'
            onClick={() => viewSingleApplicant(record)}
          >
            View
          </span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getApplicants() as any);
  }, [dispatch]);

  const { applicants } = useAppSelector((state) => state.applicantSlice);
  const { applicant } = useAppSelector((state) => state.singleApplicantSlice);

  useEffect(() => {
    const applicantsData: DataType[] = [];
    applicants?.applicants?.map((item: any) => {
      const tableData = {
        position: item?.position,
        applicantName: `${item?.firstName} ${item?.lastName}`,
        email: item?.email,
        address: item?.address,
        city: item?.city,
        status: item?.status,
        action: item?._id,
      };
      applicantsData.push(tableData);
    });
    setApplicantArray(applicantsData);
  }, [applicants]);

  return (
    <div className='applicants-page padding'>
      <hr />
      <BreadCrumbs
        imagesrc='/images/vacancy.svg'
        location='Vacancy Management'
        location1='Applicants'
      />
      <hr />

      <div className='d-flex align-items-start applicants-header'>
        <Selects
          className='applicants-select'
          placeHolder='Filter by type'
          options={filterByType}
        />
        <input type='text' placeholder='Search' className='search-field' />
      </div>
      <Table
        columns={columns}
        className='table-container'
        dataSource={applicantArray}
      />
      <ModalComponent
        openModal={applicantModal}
        //  handleCancel={handleCancel}
        closeModal={setApplicantModal}
      >
        <h3 className='modal-title'>APPLICANTS DETAILS</h3>
        <table className='application-table'>
          <tbody>
            <tr className='application-table-row'>
              <th className='application-table-head'>POSITION</th>
              <td className='application-table-body'>
                {applicant?.applicant?.title}
              </td>
            </tr>
            <tr className='application-table-row'>
              <th className='application-table-head'>APPLICANT NAME</th>
              <td className='application-table-body'>
                {`${applicant?.applicant?.firstName} ${applicant?.applicant?.lastName}`}
              </td>
            </tr>
            <tr className='application-table-row'>
              <th className='application-table-head'>EMAILE</th>
              <td className='application-table-body'>
                {applicant?.applicant?.email}
              </td>
            </tr>
            <tr className='application-table-row'>
              <th className='application-table-head'>PHONE</th>
              <td className='application-table-body'>
                {applicant?.applicant?.phone}
              </td>
            </tr>
            <tr>
              <th className='application-table-head'>ADDRESS</th>
              <td className='application-table-body'>
                {applicant?.applicant?.address}
              </td>
            </tr>
            <tr className='application-table-row'>
              <th className='application-table-head'>CITY</th>
              <td className='application-table-body'>
                {applicant?.applicant?.city}
              </td>
            </tr>
            <tr className='application-table-row'>
              <th className='application-table-head'>LINKEDIN LINK</th>
              <td className='application-table-body'>
                {applicant?.applicant?.github}
              </td>
            </tr>
            <tr className='application-table-row'>
              <th className='application-table-head'>
                RESUME AND COVER LETTER
              </th>
              <td className='application-table-body'>
                {/* <Document file='./pdf/dummy.pdf' /> */}
                <Document file={`${applicant?.applicant?.resume}`} />
              </td>
            </tr>
          </tbody>
        </table>
      </ModalComponent>
    </div>
  );
};

export default Applicants;
