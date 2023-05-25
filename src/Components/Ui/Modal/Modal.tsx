import { Modal } from 'antd';
import './modal.css';

interface IModal {
  children: any;
  openModal?: boolean;
  handleOk?: any;
  closeModal?: any;
  classNames?: string;
  okText?: string;
}

const ModalComponent = ({
  children,
  openModal,
  handleOk,
  closeModal,
  classNames,
  okText,
}: IModal) => {
  const handleCancel = () => {
    closeModal(false);
  };

  return (
    <div className={`modal-component`}>
      <Modal
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        closable
        className={`${classNames}`}
        okText={okText}
        footer={null}
      >
        {openModal && children}
      </Modal>
    </div>
  );
};

export default ModalComponent;
