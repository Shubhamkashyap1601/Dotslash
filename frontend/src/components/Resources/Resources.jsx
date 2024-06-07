import React from "react";
import DomainCard from "./DomainCard";
import "./Resources.css";

const Resources = () => {
    const domainCards = [
        {
            title: "CP/DSA",
            imgSrc: './src/assets/cpdsa.png',
            target: "cpdsa",
        },
        {
            title: "Web Development",
            imgSrc: './src/assets/webd.jpeg',
            target: "webdev",
        },
        {
            title: "App Development",
            imgSrc: './src/assets/appd.jpg',
            target: "appdev",
        },
        {
            title: "Machine Learning",
            imgSrc: './src/assets/ml.jpeg',
            target: "ml",
        }
    ]

    return (
        <>
        <div className="home-resources">
            {domainCards.map((domainCard) => (<DomainCard key={domainCard.title} domainCard={domainCard} />))}
        </div>
        </>
    )
}

export default Resources