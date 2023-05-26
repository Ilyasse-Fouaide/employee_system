import React from 'react'

function Loading() {
  return (
    <div style={{ height: "80vh" }} className="d-flex justify-content-center align-items-center">
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}

export default Loading