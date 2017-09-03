import React from 'react'

export default () => {
  return (
    <div style={{margin: 'auto', textAlign: 'center', display: 'block', paddingTop: '150px'}}>
      <div >
        <span className='dark preloader' style={{widht: '28px', height: '28px'}} />
      </div>
      <span>Loading...</span>
    </div>
  )
}
