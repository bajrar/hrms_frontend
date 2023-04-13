import { FaStarOfLife } from 'react-icons/fa';
import { Form, Input, Select, Button } from 'antd';
import { apis } from '../../apis/constants/ApisService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ImLocation, ImLocation2 } from 'react-icons/im';

type Props = {
  // jobId: any;
};
interface JobData {
  title: string;
  employmentType: string;
  minExperience: string;
  descriptions: string;
  qnrs: string;
  status: string;
  location: string;
}

const Updatejob = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const jobId = id;

  const [formData, setFormData] = useState<JobData>();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        if (jobId !== undefined) {
          const res = await apis.getJobsById(jobId);
          setFormData(res?.data?.job);
          // console.log(res.data.job);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobData();
  }, []);
  // console.log('formdata',formData?.title);

  const onFinish = async (values: any) => {
    // console.log("Success:", values);
    try {
      const res = await apis.updateJob(jobId, values);
      if (res.status === 200) {
        toast.success('Job Updated Sucesfully', {
          position: 'top-center',
          autoClose: 5000,
        });
        window.location.reload();
      }
    } catch {
      toast.error('Something Went Wrong', {
        position: 'top-center',
        autoClose: 5000,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <ToastContainer />
      <h1 className='essential'>
        <span>
          {' '}
          <FaStarOfLife />
        </span>{' '}
        ESSENTIALS
      </h1>
      {formData && (
        <Form
          layout='vertical'
          initialValues={formData ? formData : {}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <div className='row'>
            <Form.Item
              className='form-input col'
              name='title'
              label='Job Title'
              rules={[{ required: true, message: 'Job Title is Required!' }]}
            >
              <Input name='title' value={formData?.title}></Input>
            </Form.Item>
          </div>
          <div className='row'>
            <Form.Item
              className='form-input col'
              name='employmentType'
              label='Employment Type'
              rules={[
                { required: true, message: 'Employment Type is Required!' },
              ]}
            >
              <Select placeholder='Select a Type'>
                <Select.Option value='Full Time'>Full Time</Select.Option>
                <Select.Option value='Part Time'>Part Time</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              className='form-input col'
              name='minExperience'
              label='Minimum Experience'
              rules={[
                {
                  required: true,
                  message: 'Minimum Experience is Required ',
                },
              ]}
            >
              <Input name='minExperience' />
            </Form.Item>
          </div>

          <div className='job-description'>
            <h3>Job Description*</h3>
            <div className='description-box'>
              <div className='row'>
                <div className='col'>
                  <Form.Item
                    name='descriptions'
                    rules={[
                      {
                        required: true,
                        message: 'Description is Required!',
                      },
                    ]}
                  >
                    <ReactQuill theme='snow' />
                  </Form.Item>
                </div>
              </div>
              <hr />
            </div>
          </div>
          <div className='row'>
            <Form.Item
              className='form-input col'
              name='qnrs'
              label='Quality and Requirements'
              rules={[
                {
                  required: true,
                  message: 'Quality and Requirements are Required!',
                },
              ]}
            >
              <ReactQuill theme='snow' />
            </Form.Item>
          </div>
          <div className='row'>
            <Form.Item
              className='form-input col'
              name='status'
              label='Job Status'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder='Select a Status'>
                <Select.Option value='open'>Open</Select.Option>
                <Select.Option value='closed'>Closed</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className='row'>
            <Form.Item
              className='form-input col'
              name='jobType'
              label='Job type'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder='Select a Job Type'>
                <Select.Option value='onsite'>Onsite</Select.Option>
                <Select.Option value='hyrbid'>Hybrid</Select.Option>
                <Select.Option value='remote'>Remote</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <h1 className='essential'>
            <span>
              {' '}
              <ImLocation2 />
            </span>{' '}
            LOCATION
          </h1>
          <div className='row'>
            <Form.Item
              className='form-input col'
              name='country'
              label='Country'
              rules={[{ required: true, message: 'Country is Required!' }]}
            >
              <Select placeholder='Select a Country'>
                <Select.Option value='Nepal'>Nepal</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className='row'>
            <Form.Item
              className='form-input col col-sm-12'
              name='city'
              label='City or Town'
              rules={[{ required: true, message: 'City or Town is Required!' }]}
            >
              <Input name='city' />
            </Form.Item>
          </div>

          <div className='form-footer'>
            <Button type='primary' htmlType='submit'>
              Update Job
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default Updatejob;
