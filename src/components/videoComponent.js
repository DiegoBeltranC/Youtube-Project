import React from "react";

const VideoComponent = ({item, actionAddDelete, icon, color})=>{

    return(
        <div>
            <li className="item-component" onClick={()=>actionAddDelete(item)} style={color}>
                <h3>{item.snippet.title}</h3>
                <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} />
            </li>
            {icon}
        </div>
    )

}

export default VideoComponent