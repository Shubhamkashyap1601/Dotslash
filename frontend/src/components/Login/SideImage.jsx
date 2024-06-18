import React from "react";
import './SideImage.css';
import dostslashLogo from "../../assets/dotslashLogo.png";
import dotslashName from "../../assets/dotslashName.png";
const SideImage = () => {
    return (
        <>
            <div className="side-image">
                <img src={dostslashLogo} alt="" id="dotSlashLogo" />
                <img src={dotslashName} alt="" id="dotSlashName" />
            </div>
        </>
    );
}

export default SideImage;