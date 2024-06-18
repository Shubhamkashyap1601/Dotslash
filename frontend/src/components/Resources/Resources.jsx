import React from "react";
import DomainCard from "./DomainCard";
import "./Resources.css";
import cpdsa from "../../assets/cpdsa.png";
import webd from "../../assets/webd.jpeg";
import appd from "../../assets/appd.jpg";
import ml from "../../assets/ml.jpeg";
const Resources = () => {
    const domainCards = [
        {
            title: "CP/DSA",
            imgSrc: cpdsa,
            target: "cpdsa",
        },
        {
            title: "Web Development",
            imgSrc: webd,
            target: "webdev",
        },
        {
            title: "App Development",
            imgSrc: appd,
            target: "appdev",
        },
        {
            title: "Machine Learning",
            imgSrc: ml,
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