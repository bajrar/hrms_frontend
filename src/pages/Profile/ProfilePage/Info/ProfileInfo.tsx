import ProfileForm from '../../../../Components/Profile/ProfileForm';
import { useAppSelector } from '../../../../hooks/useTypedSelector';
import { useGetUserProfileQuery } from '../../../../redux/features/profileSlice';

import './profileInfo.css';
import Spinner from '../../../../Components/Spinner/Spinner';

const ProfileInfo = () => {
  const { tokenData } = useAppSelector((state: any) => state.verifyTokenSlice);
  const { data, isLoading } = useGetUserProfileQuery(tokenData.userSn || '');

  console.log(data);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <ProfileForm
          isDisable={false}
          employeeId={tokenData.userSn}
          defaultValue={{ ...data.employee }}
        />
      )}
    </>
  );
};

export default ProfileInfo;
