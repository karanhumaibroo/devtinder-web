import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((store) => store.user);

  const hasValidUser = user && typeof user === 'object' && Object.keys(user).length > 0;

  return (
    <div className="navbar bg-neutral text-amber-50 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              role="menu"
            >
              <li role="menuitem">
                <a className="justify-between" href="/profile">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li role="menuitem">
                <a href="/settings">Settings</a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
