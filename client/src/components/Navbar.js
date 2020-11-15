import { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <nav>
      <div className="nav-wrapper orange">
        <NavLink to="/" className="brand-logo">Short Link</NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink
              to="/create-link"
              className="waves-effect waves-light"
            >Create Link
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/links"
              className="waves-effect waves-light"
            >Links
            </NavLink></li>
          <li>
            <NavLink
              to="/"
              onClick={logoutHandler}
              className="darken-4 waves-effect waves-light black-text"
            >Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
