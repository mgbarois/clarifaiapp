import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    console.log('Passed boxes: ', boxes);
    return (
        <div className='center ma'>
            <div className='mt2 absolute'>
                {
                    boxes.map((box, i) => {
                        return <div className='bounding-box' key={i} style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }} />
                    })
                }
                {/*<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} />*/}
                <img className="shadow-5" id='inputImage' src={imageUrl} alt='For recognition' width='500px' height='auto' />
            </div>
        </div>
    );
}

export default FaceRecognition;