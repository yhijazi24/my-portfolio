import React from 'react'
import './css/name.css'
import { Link } from 'react-router-dom'

const Name = () => {
  return (
    <div className='name-container'>
      <Link Navigate to={'/'}>
        <h1 className='name'>Y.HIJAZI</h1>
      </Link>
      <div className='line'></div>
    </div>
  )
}

export default Name
