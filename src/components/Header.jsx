import React from 'react';
import videoBg from '../assets/donuts.mp4'

export const Header = () => {
  return (
    <div>
        <div id="video">
            <video src={videoBg} autoPlay loop muted>
            </video>
        </div>
        
    </div>
  )
}
