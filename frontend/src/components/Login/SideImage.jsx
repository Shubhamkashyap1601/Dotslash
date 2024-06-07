import React from "react";
import './SideImage.css';

const SideImage = () => {
    return (
        <>
            <div className="side-image">
                <img src="./src/assets/dotslashLogo.png" alt="" id="dotSlashLogo" />
                <img src="./src/assets/dotslashName.png" alt="" id="dotSlashName" />
            </div>
        </>
    );
}

export default SideImage;