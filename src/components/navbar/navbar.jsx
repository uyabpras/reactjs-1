import { useState, useRef, useEffect } from 'react';
import { RiMenuLine, RiSearchEyeLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <nav className="border flex flex-row items-center p-2 bg-teal-900 rounded-sm">
      <div className="flex-col md:block hidden">
        <p className="text-sm text-white">Final Project | Bayu Prasetyo</p>
        <a href="/" className="text-3xl my-3 ml-3 text-white">Job Finder</a>
      </div>

      <div className="relative mx-auto text-gray-800 lg:block">
        <form action="submit" className="flex">
          <input type="text" placeholder="Search by id" className="md:w-80 border text-lg rounded-lg" />
          <button type="submit" className="text-3xl border rounded-lg bg-slate-400">
            <RiSearchEyeLine />
          </button>
        </form>
      </div>

      <div className="relative md:hidden">
        <button
          id="dropdownButton"
          onClick={toggleDropdown}
          className="text-4xl text-teal-500"
        >
          <RiMenuLine />
        </button>

        <div
          ref={dropdownRef}
          className={`absolute right-0 mt-2 px-5 bg-white border rounded-lg shadow-md shadow-gray-300 z-50 ${isDropdownOpen ? 'block' : 'hidden'}`}
        >
          {isAuthenticated ? (
            <div className="flex flex-col items-center p-2">
              <div className="w-10 h-10 bg-gray-500 rounded-full mb-3"></div>
              <span className="text-lg ml-3 text-center">{user.name || "quest"}</span>
              <Link to="/change-password">
                <button className="block px-4 py-2 text-lg text-teal-500 border my-2 rounded-md">Change Password</button>
              </Link>
              <button onClick={handleLogout} className="block p-4 text-lg text-teal-500 border my-2 rounded-md">Logout</button>
            </div>
          ) : (
            <>
              <Link to={'/login'}>
                <button type='button' className="block px-4 py-2 text-lg text-teal-500 border-b">Login</button>
              </Link>
              <Link to={'/register'}>
                <button className="block px-4 py-2 text-lg text-teal-500">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="hidden w-full md:flex md:w-auto items-center space-x-4">
      {isAuthenticated ? (
        <>
          <Link to="/create-job">
            <button className="border rounded-2xl px-3 py-3 mb-3 text-md text-white bg-teal-500 mt-3">
              Create Job
            </button>
          </Link>
          <div className="container flex items-center content-center w-auto mr-10 mb-1 px-3 pb-2 border border-emerald-700 rounded-md shadow-md shadow-teal-950">
            <button 
              id="dropdownButton"
              onClick={toggleDropdown}
              className="flex items-center text-4xl text-teal-500 mt-2">
              <div className="mx-auto w-10 h-10 bg-gray-500 rounded-full"></div>
              <span className="text-lg text-white ml-3 mr-3">{user.name}</span>
            </button>
          </div>
          <div
            ref={dropdownRef}
            className={`flex flex-col content-center absolute w-34 top-20 right-0 px-5 bg-teal-100 border rounded-lg shadow-lg z-50 ${isDropdownOpen ? 'block' : 'hidden'}`}
          >
            <Link to="/change-password">
              <button className="border rounded-2xl px-3 py-3 text-md text-white bg-teal-500 mt-3">
                Change Password
              </button>
            </Link>
            <button onClick={handleLogout} className="border rounded-2xl px-3 py-3 text-md text-white bg-teal-500 my-3">
              Logout
            </button>
          </div>
        </>
        ) : (
          <>
            <Link to={'/login'}>
              <button className="border rounded-xl p-2 text-xl text-white bg-teal-500">Login</button>
            </Link>
            <Link to={'/register'}>
              <button className="border rounded-xl p-2 text-xl text-white bg-teal-500 ml-2">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
