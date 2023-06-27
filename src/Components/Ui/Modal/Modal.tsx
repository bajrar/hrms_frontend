import { Modal } from 'antd';
import './modal.css';

interface IModal {
  children: any;
  openModal?: boolean;
  handleOk?: any;
  closeModal?: any;
  classNames?: string;
  okText?: string;
  destroyOnClose?: boolean;
  maskClosable?: boolean;
}

const ModalComponent = ({
  children,
  openModal,
  handleOk,
  closeModal,
  classNames,
  okText,
  destroyOnClose = false,
  maskClosable = true,
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
        destroyOnClose={destroyOnClose}
        closable
        className={`${classNames}`}
        okText={okText}
        footer={null}
        maskClosable={maskClosable}
      >
        {openModal && children}
      </Modal>
    </div>
  );
};

export default ModalComponent;
