import React from "react";
import { Link } from 'react-router-dom';
import "./Resources.css"


const DomainCard = ({ domainCard }) => {
    console.log(domainCard.imgSrc);
    
    const cardStyle = {
        backgroundImage: `url(${domainCard.imgSrc})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        borderRadius: '25px',
        margin: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <>
            <div className="domain-card" >
                <Link to={domainCard.target}>
                <img src={domainCard.imgSrc} className="domain-card-image"/>
                <div className="domain-title">
                    <h3>{domainCard.title}</h3>
                </div>
                </Link>
            </div>
        </>
    )
}

export default DomainCard