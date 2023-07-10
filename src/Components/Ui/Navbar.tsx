import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';
import { logoutUser } from '../apis/constants/Api';
import { DownOutlined, LogoutOutlined, UserOutlined, SwapOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space, Upload, Modal } from 'antd';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useTypedSelector';
import { toggelRole } from '../../redux/features/role/userRoleSlice';
import { useTokenData } from '../../hooks/userTokenData';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAdminTemp, isAdmin } = useTokenData();
  console.log({ isAdminTemp }, 'YOYO');
  const currentRole = isAdminTemp ? 'user' : 'admin';
  // const currentRole = userRoleData.role === 'admin' ? 'user' : 'admin';
  const logOut = () => {
    // localStorage.clear();
    // login();
    logoutUser();
  };
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      navigate('/profile');
    } else if (e.key === '2') {
      logOut();
    } else if (e.key === '3') {
      dispatch(toggelRole());
    }
  };

  const items: MenuProps['items'] = [
    {
      label: 'Profile',
      key: '1',
      icon: <UserOutlined onClick={() => logoutUser()} />,
    },
    {
      label: 'Logout',
      key: '2',
      icon: <LogoutOutlined />,
    },
  ];

  if (isAdmin) {
    items.push({
      label: `View as ${currentRole}`,
      key: '3',
      icon: <SwapOutlined />,
    });
  }

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const [openDropdown, setOpenDropdown] = useState(true);
  const userDetails: any = localStorage.getItem('userDetails');
  const employeeDetails = JSON.parse(userDetails);
  const userName = employeeDetails?.employeeName;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handleImagePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div className="navbar-dash padding">
      <div className="navbar-dash__left">
        <div className="navbar-dash__left-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} fontSize="14px" />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="navbar-dash__right">
        <FontAwesomeIcon icon={faBell} />

        <Dropdown menu={menuProps}>
          <Button type="text">
            <Space>
              {userName}
              <BsPersonCircle />
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
