import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { logoutUser } from '../apis/constants/Api';
import { DownOutlined, LogoutOutlined, UserOutlined, SwapOutlined } from '@ant-design/icons';
import type { MenuProps, TabsProps } from 'antd';
import { Badge, Button, Dropdown, Image, Modal, Space, Tabs, Typography } from 'antd';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useTypedSelector';
import { toggelRole } from '../../redux/features/role/userRoleSlice';
import { useTokenData } from '../../hooks/userTokenData';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

/* ASSETS */
import './navbar.css';
import FlexBetween from './FlexBetween';
import { getBase64 } from '../../utils/file';

type NotificationItemProps = {
  title: string;
  image: string;
  content: string;
  date: string;
  time: string;
};

type TabLabelProps = {
  label: string;
  count: number;
};

const NotificationItem = ({ title, image, content, date, time }: NotificationItemProps) => {
  return (
    <FlexBetween style={{ flexDirection: 'column', gap: '1.2rem' }}>
      <Space size="middle">
        <Image
          height="40px"
          width="40px"
          src={image}
          fallback="fallback.png"
          preview={false}
          style={{ background: `var(--bg-gray-400)`, padding: '0.25rem', borderRadius: '50%', objectFit: 'contain' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', justifyContent: 'flex-start' }}>
          <Typography.Title level={5}>{title} </Typography.Title>
          <div style={{ border: `1px solid var(--border-light)`, borderRadius: '4px', padding: '0.75rem 0.5rem' }}>
            <Typography.Paragraph>{content}</Typography.Paragraph>
          </div>
          <FlexBetween>
            <Typography.Text>{date}</Typography.Text>
            <Typography.Text>{time}</Typography.Text>
          </FlexBetween>
        </div>
      </Space>
    </FlexBetween>
  );
};

const TabLabel = ({ label, count }: TabLabelProps) => {
  return (
    <Space>
      <Typography.Text style={{ position: 'relative' }}>{label}</Typography.Text>
      <Badge count={count} style={{ position: 'absolute', top: '-1.5rem', left: '-0.25rem' }} />
    </Space>
  );
};

const tabItems: TabsProps['items'] = [
  {
    key: '1',
    label: <TabLabel label="All" count={2} />,
    children: (
      <NotificationItem
        title="HR Virtuosway"
        content="Please be informed that WORK FROM OFFICE will....."
        image="/logo.png"
        date="May 20, 2023"
        time="Friday 2:20pm"
      />
    ),
  },
  {
    key: '2',
    label: <TabLabel label="Leave Alerts" count={2} />,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: <TabLabel label="Notification Events" count={2} />,
    children: `Content of Tab Pane 3`,
  },
  {
    key: '4',
    label: <TabLabel label="Event Alerts" count={2} />,
    children: `Content of Tab Pane 3`,
  },
];

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

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const { isAdminTemp, isAdmin } = useTokenData();
  console.log({ isAdminTemp }, 'YOYO');
  const currentRole = isAdminTemp ? 'user' : 'admin';
  // const currentRole = userRoleData.role === 'admin' ? 'user' : 'admin';

  const showModal = () => {
    setIsNotification(true);
  };

  const handleModalCancel = () => {
    setIsNotification(false);
  };

  const logOut = () => {
    // localStorage.clear();
    // login();
    logoutUser();
  };

  const onTabChange = (key: string) => {
    console.log(key);
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
    <>
      <div className="navbar-dash padding">
        <div className="navbar-dash__left">
          <div className="navbar-dash__left-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} fontSize="14px" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="navbar-dash__right">
          <Badge count={1}>
            <Button type="text" className="navbar__notification" onClick={showModal}>
              <FontAwesomeIcon icon={faBell} />
            </Button>
          </Badge>
          <Dropdown menu={menuProps}>
            <Button type="text">
              <Space>
                {userName}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* NOTIFICATOIN MODEL */}
      <Modal
        title={
          <Typography.Title
            level={5}
            style={{
              color: 'var(--text-color-100, #000)',
              fontFamily: 'Helvetica',
              fontSize: '20px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: 'normal',
              textTransform: 'uppercase',
            }}
          >
            Notifications
          </Typography.Title>
        }
        open={isNotification}
        onCancel={handleModalCancel}
        footer={null}
        className="navbar__notification-model"
      >
        <Tabs defaultActiveKey="1" items={tabItems} onChange={onTabChange} />
      </Modal>
    </>
  );
};

export default Navbar;
