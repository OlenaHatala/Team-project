import React from 'react'

import classes from "./BoardHeader.module.css";

const BoardHeader = ({ label, servname, description, addres, link }) => {
  return (
    <div className={classes['board-header']}>
    <div className={classes['titles']}>
      <h1 className={classes['label']}>Board name</h1>
      <h2 className={classes['servname']}>Service name</h2>
      <p className={classes['description']}>This is a description of the amazing board full of tickets</p>
    </div>
    <div className={classes['header-right-block']}>
      <p className={classes['address']}>This is a address, 12, 123213</p>
      <div className={classes['link-btn-container']}>
      <button className={classes['link-btn']}></button>
      </div>
    </div>
  </div>
  )
}

export default BoardHeader