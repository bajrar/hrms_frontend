import { Button, Modal } from 'antd';
interface IDeleteModal {
  openModal: boolean;
  setOpenModal: any;
  deleteItem?: any;
}

const DeleteModal = ({ openModal, setOpenModal, deleteItem }: IDeleteModal) => {
  const handleCancel = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      open={openModal}
      footer={null}
      closable={true}
      onCancel={handleCancel}
    >
      <h3 className='modal-title'>Confirm Deletion</h3>
      <p>
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <div className='form-btn-container'>
        <Button onClick={handleCancel} className='cancel-button'>
          Cancel
        </Button>
        <Button type='default' htmlType='submit' onClick={deleteItem}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
