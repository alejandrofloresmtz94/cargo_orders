import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import angle from '../../assets/Header/angle-small-down.svg';
import bell from '../../assets/Header/bell.svg';

const Header = () => {
    return (
        <Fragment>
            <div className="flex flex-row justify-between min-w-full">
                <Link to="/">
                    <img src={angle} alt="angle small down"/>
                </Link>
                <span className='text-lg leading-5 text-white font-GothamMedium'>Cargo Orders</span>
                <img src={bell} alt="bell" />
            </div>
            <Outlet/>
        </Fragment>
    );
}

export default Header;