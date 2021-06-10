import React from 'react';
import Logo from './Logo/Logo'

const Navigation = ({onRouteChange, isSignedIn}) => {
    return (
        <nav className='ma4 mt0' style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 120}} width='100%'>
            <Logo/>
            { isSignedIn 
                ? <p className='f3 link dim black pa3 pointer' onClick={() => onRouteChange('signin')}>Sign Out</p>                 
                : <div>
                    <p className='f3 link dim black pa3 pointer' onClick={() => onRouteChange('signin')}>Sign In</p>
                    <p className='f3 link dim black pa3 pointer' onClick={() => onRouteChange('register')}>Register</p>
                  </div>
            }             
        </nav>
    );
}

export default Navigation;