import { Link } from "react-router-dom"
import "./header_admin.css";
import { FiLogOut } from "react-icons/fi";
import logo from '../logo/header.png'

function Header_admin() {
    return(
        <div className="header">
            <div className='container'>
                <div className="header-buay">
                    <div className='logobuay'>
                        <Link to="/"><img src={logo} height="80" alt="not found"/></Link>
                    </div>
                    <ul className="menu">
                        <li className="menu-link-admin">
                            <Link to="/">ออกจากระบบ</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Header_admin;