import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import ProfileInfo from './ProfilePage/Info/ProfileInfo';

import './profile.css';

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-container__info">
          <ProfileInfo />
        </div>
      </div>
    </div>
  );
};

export default Profile;
