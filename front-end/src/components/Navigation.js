import './Navigation.scss';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <div>
        <Link to='/'>Sports</Link>
      </div>
      <ul className="menu">
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Signup</Link></li>
      </ul>
    </nav>
  );
}