import React from 'react';
import Tilt from 'react-tilt'
// https://www.npmjs.com/package/react-tilt
import './Logo.css';
import icon from './eye-solid-square.png';

const Logo = (props) =>  {
    return (
        <div>
            <Tilt className="Tilt shadow-5" options={{ max : 65 }} style={{ height: 90, width: 90 }} >
                <div className="Tilt-inner pa3"> <img src={icon} alt='icon'/></div>
            </Tilt>
        </div>
    );
}

export default Logo;