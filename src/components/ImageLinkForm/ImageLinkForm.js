import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({onInputChange, onPictureSubmit}) =>  {
    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='center'>
                <div className='br3 pa4 shadow-5 center form'>
                    <input 
                        className='f4 pa2 w-70 center'                         
                        type='text'
                        placeholder='Insert image link here...'
                        onChange={onInputChange}
                    />
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-black'
                        onClick={onPictureSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;