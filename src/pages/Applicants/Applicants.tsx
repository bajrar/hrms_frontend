import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Select, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import ModalComponent from '../../Components/Ui/Modal/Modal';
import Selects from '../../Components/Ui/Selects/Selects';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { getApplicants } from '../../redux/features/applicantsSlice';
import { getSingleApplicant } from '../../redux/features/singleApplicantSlice';
import './applicants.css';
import { API_URL, API_URL1 } from '../../Components/apis/constants/constant';
import { apis } from '../../Components/apis/constants/ApisService';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import { Link } from 'react-router-dom';
import { BsLinkedin } from 'react-icons/bs';
import { useGetSingleApplicantQuery, useGetApplicantsQuery } from '../../redux/api/applicantApiSlice';

export interface DataType {
  position?: string;
  applicantName?: string;
  email?: string;
  address?: string;
  city?: string;
  status?: React.ReactNode;
  action?: string;
}

const Applicants = () => {
  const dispatch = useDispatch();
  const [applicantArray, setApplicantArray] = useState<any[]>();
  const [filterApplicantArary, setFilterApplicantArary] = useState<any[]>();
  const [applicantModal, setApplicantModal] = useState<boolean>(false);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);
  const [applicantId, setApplicantId] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterByType] = useState('');
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();

  const filterByType = [
    {
      value: 'applicantName',
      label: 'Applicant Name ( A- Z )',
    },
    {
      value: '-applicantName',
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
    console.log({ applicantId });
    dispatch(getSingleApplicant({ applicantId }) as any);
    setApplicantModal(true);
  };
  const onSelect = (e: any) => {
    setFilterByType(e);
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
        <div className="d-flex action-btn-container">
          <FontAwesomeIcon
            icon={faPen}
            style={{ cursor: 'pointer' }}
            color="#35639F"
            onClick={() => openUdateModal(record)}
          />
          <span className="viewMoreBtn" onClick={() => viewSingleApplicant(record)}>
            View
          </span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getApplicants({ pageNumber: page }) as any);
  }, [dispatch, page]);

  const { isLoading, data: applicants } = useGetApplicantsQuery({ page });
  const { applicant } = useAppSelector((state) => state.singleApplicantSlice);
  useEffect(() => {
    const applicantsData: DataType[] = [];
    applicants?.applicants?.map((item: any) => {
      const tableData = {
        position: item?.position,
        applicantName: `${item?.fullName}`,
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

  const openUdateModal = (applicantIds: string) => {
    setUpdateStatus(true);
    setApplicantId(applicantIds);
  };

  const handleUpdateStatus = async (values: any) => {
    try {
      const res = await apis.updateApplicantStatus(values, applicantId);
      if (res.status === 201) {
        message.success('Status Updated');
        form.resetFields();
        dispatch(getApplicants({ pageNumber: page }) as any);
      }
    } catch (err) {
      message.error(`${err}`);
    } finally {
      setUpdateStatus(false);
    }
  };
  const handleCancel = () => {
    setUpdateStatus(false);
    form.resetFields();
  };
  useEffect(() => {
    if (!searchText) {
      setFilterApplicantArary(applicantArray);
    } else {
      const filteredArray = applicantArray?.filter((element) => {
        const applicantName = element?.[filterType]?.toLowerCase();
        const lowercaseSearchText = searchText.toLowerCase();
        return applicantName?.includes(lowercaseSearchText);
      });

      setFilterApplicantArary(filteredArray);
    }
  }, [searchText, applicantArray, filterType]);

  if (filterType === 'applicantName') {
    filterApplicantArary?.sort((a, b) => {
      const valueA = a.applicantName?.toLowerCase();
      const valueB = b.applicantName?.toLowerCase();
      return valueA.localeCompare(valueB);
    });
  } else if (filterType === '-applicantName') {
    filterApplicantArary?.sort((a, b) => {
      const valueA = a.applicantName?.toLowerCase();
      const valueB = b.applicantName?.toLowerCase();
      return valueB.localeCompare(valueA);
    });
  }

  const handlePaginationChange = (page: any) => {
    setPage(page);
  };
  console.log(filterApplicantArary, '<--- Status4u');
  return (
    <Layout>
      <Navbar />
      <div className="applicants-page padding">
        <hr />
        <BreadCrumbs imagesrc="/images/vacancy.svg" location="Vacancy Management" location1="Applicants" />
        <hr />

        <div className="d-flex align-items-start applicants-header">
          <Selects
            className="applicants-select"
            placeHolder="Filter by type"
            options={filterByType}
            onSelect={onSelect}
          />
          <input
            type="text"
            placeholder="Search"
            className="search-field"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          />
        </div>
        <Table
          columns={columns}
          className="table-container"
          dataSource={filterApplicantArary}
          pagination={{
            current: page,
            onChange: handlePaginationChange,
            total: applicants?.totalCount,
          }}
          loading={isLoading}
        />
        <ModalComponent
          openModal={applicantModal}
          //  handleCancel={handleCancel}
          closeModal={setApplicantModal}
        >
          <h3 className="modal-title">APPLICANTS DETAILS</h3>
          <table className="application-table">
            <tbody>
              <tr className="application-table-row">
                <th className="application-table-head">POSITION</th>
                <td className="application-table-body">{applicant?.applicant?.position}</td>
              </tr>
              <tr className="application-table-row">
                <th className="application-table-head">APPLICANT NAME</th>
                <td className="application-table-body">{`${applicant?.applicant?.fullName} `}</td>
              </tr>
              <tr className="application-table-row">
                <th className="application-table-head">EMAIL</th>
                <td className="application-table-body">{applicant?.applicant?.email}</td>
              </tr>
              <tr className="application-table-row">
                <th className="application-table-head">PHONE</th>
                <td className="application-table-body">{applicant?.applicant?.phone}</td>
              </tr>
              <tr>
                <th className="application-table-head">ADDRESS</th>
                <td className="application-table-body">{applicant?.applicant?.address}</td>
              </tr>
              <tr className="application-table-row">
                <th className="application-table-head">CITY</th>
                <td className="application-table-body">{applicant?.applicant?.city}</td>
              </tr>
              <tr className="application-table-row">
                <th className="application-table-head">LINKEDIN</th>
                <td className="application-table-body">
                  <Link
                    to={applicant?.applicant?.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                  >
                    {/* {applicant?.applicant?.linkedIn} */}
                    {/* View LinkedIn */}
                    <BsLinkedin fontSize={'18px'} />
                  </Link>
                </td>
              </tr>
              <tr className="application-table-row">
                <th className="application-table-head">RESUME</th>
                <td className="application-table-body ">
                  <Link
                    to={`${API_URL1}public/resume/${applicant?.applicant?.resume}`}
                    target="_blank"
                    className="link-button"
                  >
                    View Resume
                  </Link>
                </td>
              </tr>
              {applicant?.applicant?.coverletter ? (
                <tr className="application-table-row">
                  <th className="application-table-head">COVERLETTER</th>
                  <td className="application-table-body ">
                    <Link
                      to={`${API_URL1}public/coverletter/${applicant?.applicant?.coverletter}`}
                      target="_blank"
                      className="link-button"
                    >
                      View CoverLetter
                    </Link>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </ModalComponent>
        <ModalComponent openModal={updateStatus} closeModal={setUpdateStatus}>
          <Form onFinish={handleUpdateStatus} form={form} autoComplete="off" className="p-2">
            <Form.Item
              className="form-input col "
              name="status"
              label="Status *"
              rules={[{ required: true, message: 'Status is Required' }]}
            >
              <Select
                options={[
                  { value: 'selected', label: 'Selected' },
                  { value: 'confirmed', label: 'Confirmed' },
                  { value: 'rejected', label: 'Rejected' },
                  { value: 'pending', label: 'Pending' },
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
      </div>
    </Layout>
  );
};

export default Applicants;
