import React from 'react';
import Logo from './Logo/Logo'

const Navigation = ({onRouteChange, isSignedIn}) => {
    return (
        <nav className='ma4 mt0' style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 120}} width='100%'>
            <Logo/>
            { isSignedIn 
                ? <span className='f5 link dim br1 ba ph3 pv2 mb2 dib black' onClick={() => onRouteChange('signin')}>Sign Out</span>                 
                : <div className="f5 link dim br1 ba ph3 pv2 mb2 dib black">
                    <span className='f5 link br1 dim black pa1 pointer' onClick={() => onRouteChange('signin')}>Sign In </span>| 
                    <span className='f5 link dim black pa1 pointer' onClick={() => onRouteChange('register')}>Register</span>
                  </div>
            }             
        </nav>
    );
}

export default Navigation;