import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'antd';
import BreadCrumbs from '../../Components/Ui/BreadCrumbs/BreadCrumbs';
import Selects from '../../Components/Ui/Selects/Selects';
import type { ColumnsType } from 'antd/es/table';
import './jobSummary.css';
import { jobStatus } from '../../utils/Constants';
import { CSSProperties, useEffect, useState } from 'react';
import ModalComponent from '../../Components/Ui/Modal/Modal';
import AddJobsForm from '../../Components/Jobs/AddJobsForm';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { getJobs } from '../../redux/features/getJobsSlice';
import { getSingleJob } from '../../redux/features/singleJobSlice';
import DeleteModal from '../../Components/Ui/DeleteModal/DeleteModal';
import { apis } from '../../Components/apis/constants/ApisService';
import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import { EmployeeStats } from '../Attendance/Attendance';
import { CompareFunction } from '../../Components/Ui/Tables/AttendaceReport';

export interface DataType {
  jobTitle?: string;
  jobsStatus?: string;
  action?: string;
  view?: any;
}

const JobSummary = () => {
  const [jobStat, setJobStats] = useState<string>('allStatus');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isResumeModalOpen, setResumeIsModalOpen] = useState<boolean>(false);
  const [jobsArray, setJobsArray] = useState<any[]>([]);
  const [openUpdateJob, setOpenUpdateJob] = useState<boolean>(false);
  const [jobId, setJobId] = useState<string>('');
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs() as any);
  }, [dispatch]);

  const { jobs } = useAppSelector((state) => state.jobsSlice);
  const { job } = useAppSelector((state) => state.singleJobSlice);

  const viewSingleJob = (jobId: any) => {
    dispatch(
      getSingleJob({
        jobId,
      }) as any
    );
    setResumeIsModalOpen(true);
  };

  const updateJobModal = (id: string) => {
    setOpenUpdateJob(true);
    setJobId(id);
  };

  const openDeleteJobs = (id: string) => {
    setOpenDeleteModal(true);
    setJobId(id);
  };

  const deleteJobs = async () => {
    try {
      const res = await apis.deleteJob(jobId);
      if (res.status === 200) {
        dispatch(getJobs() as any);
      }
    } catch {
      console.log('error');
    } finally {
      setOpenDeleteModal(false);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'JOB TITLE',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: 'JOBS STATUS',
      dataIndex: 'jobsStatus',
      key: 'jobsStatus',
      render: (item) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.split('-').map((ite: any, i: number) => {
              return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {item.split('-').map((ite: any, i: number) => {
                    return (
                      <EmployeeStats
                        key={i}
                        status={ite}
                        color={
                          CompareFunction(ite) === 'open'
                            ? '#22BB33'
                            : CompareFunction(ite) === 'closed'
                            ? '#BB2124'
                            : 'transparent'
                        }
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      },
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
            onClick={() => updateJobModal(record)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            color='#35639F'
            onClick={() => openDeleteJobs(record)}
          />
          <span className='viewMoreBtn' onClick={() => viewSingleJob(record)}>
            View
          </span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const shifts: DataType[] = [];
    jobs?.map((job: any) => {
      if (job.title.toLowerCase().includes(searchText)) {
        const tableData = {
          jobTitle: job?.title,
          jobsStatus: job?.status,
          action: job?._id,
          view: job?._id,
        };
        shifts.push(tableData);
      }
    });

    setJobsArray(shifts);
  }, [jobs, searchText]);
  // const getRowClassName = (record: any) => {
  //   if (record.status == 'closed') {
  //     return 'closed-row';
  //   } else if (record.status === 'open') {
  //     return 'open-row';
  //   } else {
  //     return '';
  //   }
  // };

  const onSelect = (e: any) => {
    setJobStats(e);
  };
  return (
    <Layout>
      <Navbar />
      <div className='job-summary-page padding'>
        <hr />
        <BreadCrumbs
          imagesrc='/images/vacancy.svg'
          location='Vacancy Management'
          location1='Job Summary'
        />
        <hr />
        <div className='d-flex justify-content-between job-summary-header'>
          <input
            type='text'
            className='search-field'
            placeholder='Search positions'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          />
          <div className='d-flex job-summary-header__right'>
            <Selects
              className='job-summary-selects'
              options={jobStatus}
              value={jobStat}
              onSelect={onSelect}
            />
            <button
              className='primary-btn'
              onClick={() => setIsModalOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Jobs
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          className='table-container'
          dataSource={
            jobStat === 'allStatus'
              ? jobsArray
              : jobsArray.filter((job) => job.jobsStatus === jobStat)
          }
        />
        <ModalComponent
          openModal={isModalOpen}
          closeModal={setIsModalOpen}
          classNames='add-jobs-modal'
        >
          <h3 className='modal-title'>ADD JOBS</h3>
          <AddJobsForm setIsModalOpen={setIsModalOpen} />
        </ModalComponent>
        <ModalComponent
          openModal={isResumeModalOpen}
          classNames='add-jobs-modal'
          // handleCancel={handleApplicationCancel}
          closeModal={setResumeIsModalOpen}
        >
          <h3 className='modal-title'>VIEW DETAILS</h3>
          <table className='application-table'>
            <tbody>
              <tr className='application-table-row'>
                <th className='application-table-head'>JOB TITLE</th>
                <td className='application-table-body'>{job?.job?.title}</td>
              </tr>
              <tr className='application-table-row'>
                <th className='application-table-head'>EMPLOYMENT TYPE</th>
                <td className='application-table-body'>
                  {job?.job?.employmentType}
                </td>
              </tr>
              <tr className='application-table-row'>
                <th className='application-table-head'>MINIMUM EXPERIENCE</th>
                <td className='application-table-body'>
                  {job?.job?.minExperience}
                </td>
              </tr>
              <tr className='application-table-row'>
                <th className='application-table-head'>JOB STATUS</th>
                <td className='application-table-body'>{job?.job?.status}</td>
              </tr>
              {/* <tr>
              <th className='application-table-head'>ADDRESS</th>
              <td className='application-table-body'>{job?.job?.device}</td>
            </tr> */}
              <tr className='application-table-row'>
                <th className='application-table-head'>JOB DESCRIPTION</th>
                <td
                  className='application-table-body'
                  dangerouslySetInnerHTML={{ __html: job?.job?.descriptions }}
                ></td>
              </tr>
              <tr className='application-table-row'>
                <th className='application-table-head'>
                  QUALITY AND REQUIREMENTS
                </th>
                <td
                  className='application-table-body'
                  dangerouslySetInnerHTML={{ __html: job?.job?.qnrs }}
                ></td>
              </tr>
            </tbody>
          </table>
        </ModalComponent>
        <ModalComponent
          openModal={openUpdateJob}
          classNames='add-jobs-modal'
          closeModal={setOpenUpdateJob}
        >
          <h3 className='modal-title'>UPDATE JOBS</h3>
          <AddJobsForm
            setIsModalOpen={setOpenUpdateJob}
            fromUpdateJobs
            jobId={jobId}
          />
        </ModalComponent>
        <DeleteModal
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          deleteItem={deleteJobs}
        />
      </div>
    </Layout>
  );
};

export default JobSummary;
