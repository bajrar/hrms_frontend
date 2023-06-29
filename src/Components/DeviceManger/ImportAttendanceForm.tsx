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
        <div className="d-flex flex-column gap-4 justify-content-center align-align-items-center">
          <div className="align-self-center ">
            <img src="/images/uploadfile.svg" className="upload-icon" alt="" />
          </div>
          <p className="fs-5">
            Drag & Drop or <span style={{ color: '#3333F1' }}>Choose file</span> to upload .dat
          </p>
        </div>
      </Dragger>
      <div className="import-form-btn d-flex gap-3 justify-content-end ">
        <Button type="default">Cancel</Button>
        <Button type="primary" htmlType="submit">
          Import
        </Button>
      </div>
    </div>
  );
};

export default ImportAttendanceForm;
