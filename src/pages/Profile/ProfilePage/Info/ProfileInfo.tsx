import ProfileForm from '../../../../Components/Profile/ProfileForm';
import { Col, Row } from 'antd';
import { useGetUserProfileQuery } from '../../../../redux/features/profileSlice';
import Spinner from '../../../../Components/Spinner/Spinner';
import Projects from '../../../../Components/Profile/Projects/Projects';
import './profileInfo.css';
import { useTokenData } from '../../../../hooks/userTokenData';

const ProfileInfo = () => {
  const { userSn } = useTokenData();
  const { data, isLoading } = useGetUserProfileQuery(userSn);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Row>
            <Col span={16}>
              <ProfileForm isDisable={false} employeeId={userSn} defaultValue={{ ...data?.employee }} />
            </Col>

            <Col span={8}>
              <Projects projectTeam={data?.employee?.projectTeam} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProfileInfo;
