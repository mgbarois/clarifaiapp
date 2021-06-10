import React from 'react';
import Tilt from 'react-tilt'
// https://www.npmjs.com/package/react-tilt
import './Logo.css';
import icon from './logo_circuit_blue.png';

const Logo = (props) =>  {
    return (
        <div>
            <Tilt className="Tilt" options={{ max : 65 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner pa3"> <img src={icon} alt='icon'/></div>
            </Tilt>
        </div>
    );
}

export default Logo;