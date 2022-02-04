import { Link } from "react-router-dom";

export default function Header({ authenticated, handleNotAuthenticated }) {
  const handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    window.open("/auth/twitter", "_self");
  };

  const handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage component
    window.open("/auth/logout", "_self");
    handleNotAuthenticated();
  };

  return (
    <ul className='menu'>
      <li>
        <Link to='/'>Home</Link>
      </li>
      {authenticated ? (
        <li onClick={handleLogoutClick}>Logout</li>
      ) : (
        <li onClick={handleSignInClick}>Login</li>
      )}
    </ul>
  );
}
