import React from 'react'

export default ({title, description, image}) => {
  return (
    <div className="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--3dp">
      <div className="mdl-card__media">
        <img src={'images/' + image} alt="{title}" />
      </div>
      <div className="mdl-card__title">
         <h4 className="mdl-card__title-text">{title}</h4>
      </div>
      <div className="mdl-card__supporting-text">
        <span className="mdl-typography--font-light mdl-typography--subhead">
          {description}
        </span>
      </div>
    </div>
  )
}
