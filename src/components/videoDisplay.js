import React from "react";
import VideoComponent from "./videoComponent";

const VideoDisplay = ( {data, actionAddDelete, icon, color, addIcon, handleAddClick} )=>{
    return(
    <div className="video-display">
      <h2>Videos: </h2>
      
      <ul className="video-container-component" >
        {data.map((item, index) => (
            <VideoComponent key={index} item={item} index={index} actionAddDelete={actionAddDelete} icon={icon} color={color}/>
        ))}
      </ul>
      <div onClick={handleAddClick}>
        {addIcon}
      </div>
    </div>
    )
}

export default VideoDisplay;