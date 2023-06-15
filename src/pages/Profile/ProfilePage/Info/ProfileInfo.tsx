import ProfileForm from '../../../../Components/Profile/ProfileForm';
import { Col, Row } from 'antd';
import { useAppSelector } from '../../../../hooks/useTypedSelector';
import { useGetUserProfileQuery } from '../../../../redux/features/profileSlice';

import Spinner from '../../../../Components/Spinner/Spinner';
import Projects from '../../../../Components/Profile/Projects/Projects';
import './profileInfo.css';

const ProfileInfo = () => {
  const { tokenData } = useAppSelector((state: any) => state.verifyTokenSlice);
  const { data, isLoading } = useGetUserProfileQuery(tokenData.userSn || '');


  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Row>
            <Col span={16}>
              <ProfileForm
                isDisable={false}
                employeeId={tokenData.userSn}
                defaultValue={{ ...data.employee }}
              />
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
