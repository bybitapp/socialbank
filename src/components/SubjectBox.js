import React from 'react'

export default ({title, description, headerStyle, bodyStyle, icon}) => {
  const defaultHeaderStyle = {color: "white", margin:"0px", padding:"10px"}
  const defaultBodyStyle = {color: "#767777", margin:"0px", padding:"10px"}
  icon = icon ? icon : "error"
  headerStyle = Object.assign({}, defaultHeaderStyle, headerStyle)
  bodyStyle = Object.assign({}, defaultBodyStyle, bodyStyle)
  // TODO: Extract mdl-cell mdl-cell--3-col classes (should not be inside this component)
  return (
    <div className="mdl-cell mdl-cell--3-col content__item content__item--subject mdl-shadow--2dp">
    <div className="subject__header" style={headerStyle}>
      <div style={{margin:"5px", display:"inline-block", "vertical-align":"middle"}}>
        <i className="material-icons">{icon}</i>
      </div>
      <div style={{display:"inline-block"}}>
        <h5>
          {title}
        </h5>
      </div>
    </div>
    <div className="subject__body" style={bodyStyle}>
    {description}
    <br/><br/>
    </div>
    </div>
  )
}
