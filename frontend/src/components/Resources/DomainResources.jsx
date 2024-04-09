import React from 'react'
import "./Resources.css";
import ResourcesMenu from './ResourcesMenu';


const DomainResources = ({domain}) => {
    

    return (
        <>
            <ResourcesMenu domain={domain}/>
            {/* <ResourcesDetails /> */}
        </>
    )
}

export default DomainResources