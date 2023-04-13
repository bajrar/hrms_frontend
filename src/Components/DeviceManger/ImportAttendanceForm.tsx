import { Button, UploadProps } from 'antd';
import { message, Upload } from 'antd';
import './addDeviceForm.css';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const ImportAttendanceForm = () => {
  return (
    <div>
      <Dragger {...props}>
        <p className='ant-upload-hint'>
          <div className='upload-icon'>
            <img src='/images/uploadfile.svg' alt='' />
          </div>
          Drag & Drop or <span color='#3333F1'>Choose file</span> to upload .dat
        </p>
      </Dragger>

      <div className='form-btn-container import-form-btn'>
        <Button type='default'>Cancel</Button>
        <Button type='primary' htmlType='submit'>
          Add
        </Button>
      </div>
    </div>
  );
};

export default ImportAttendanceForm;
