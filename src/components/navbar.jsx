import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BASE_URL from '../utils/base_url';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeuser} from '../utils/userslice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const hasValidUser = user && typeof user === 'object' && Object.keys(user).length > 0;
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL+'/logout', {}, { withCredentials: true });
      dispatch(removeuser()); // Clear user data from Redux store
       return navigation('/login'); // Redirect to login page
    }
    catch (error) {
      console.error('Error logging out:', error);
    }
  }
  return (
    <div className="navbar bg-neutral text-amber-50 shadow-sm">
      <div className="flex-1">
       <Link to="/" className="btn btn-ghost text-xl">
        <span className="btn btn-ghost text-xl">DevTinder</span>
        </Link>
      </div>

      {hasValidUser ? (
        <div className="flex items-center gap-4">
          <div className="font-semibold">Welcome, {user.name}</div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="w-10 rounded-full">
                <img
                  alt={`Profile picture of ${user.name}`}
                  src={user.photourl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral rounded-box z-50 mt-3 w-52 p-2 shadow"
              role="menu"
            >
              <li role="menuitem">
               <Link to="/" className="flex items-center gap-2"> 
                  Feed
                  </Link>
                
              </li>
              <li role="menuitem">
               <Link to="/profile" className="flex items-center gap-2"> 
                  Profileedit
                  </Link>
                
              </li>
              <li role="menuitem">
                <Link  to="/connections">Connections</Link>
                
              </li>
              <li role="menuitem">
                <Link  to="/requests">Requests</Link>
                
              </li>
              <li role="menuitem">
                <a onClick={handleLogout} className="flex items-center gap-2">
                  Logout
                  </a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
