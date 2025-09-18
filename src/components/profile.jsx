import { useSelector } from 'react-redux';
import Editprofile from './Editprofile';
import NewEditProfile from './newedit';

const Profile = () => {
  const user=useSelector((store) => store.user);
  return (
    <div>
      <NewEditProfile user={user} />
    </div>
  )
}

export default Profile