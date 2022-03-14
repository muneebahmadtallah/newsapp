
import React from 'react';
import loading from './loading.gif'

const Loading =()=> {
    return (
      <div className='text-center'>
      <img className='text-center' src={loading} alt="spinner"/>
    </div>
    )
  }


export default Loading