import Layout from '../../Components/Layout';
import Navbar from '../../Components/Ui/Navbar';
import ProfileInfo from './ProfilePage/Info/ProfileInfo';

import './profile.css';

const Profile = () => {
  return (
    <div className='profile-page'>
      <div className='profile-container'>
        <Layout>
          <Navbar />
          <div className='profile-container__info'>
            <ProfileInfo />
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default Profile;
