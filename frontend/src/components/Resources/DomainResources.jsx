import React, { useState, useEffect } from 'react'
import "./Resources.css";
import ResourcesDetails from './ResourcesDetails';


const DomainResources = ({ domainTitle, domain }) => {
    const [type, setType] = useState("websites");
    const [resources, setResources] = useState([]);
    
    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const fetchResources = async () => {
        let data;
        data = await fetch(`/api/resources?domain=${domain}&type=${type}`, {
            method: "GET",
        });
        if(data.ok){
            const dataInJson = await data.json();
            setResources(dataInJson); 
        }
    }

    useEffect(() => {
        fetchResources();
    }, [type]);

    return (
        <>
            <div className="menu">
                <div className="menu-title">
                    {domainTitle}
                </div>
                <div className="resources-menu">
                    <input type="radio" name="resource" id="books" value="books" onChange={handleTypeChange} />
                    <label htmlFor="books">Books</label>

                    <input type="radio" name="resource" id="websites" value="websites" onChange={handleTypeChange} defaultChecked />
                    <label htmlFor="websites">Websites</label>

                    <input type="radio" name="resource" id="videos" value="videos" onChange={handleTypeChange} />
                    <label htmlFor="videos">Playlists</label>
                </div>
            </div>
            
            <ResourcesDetails resources={resources} />
        </>
    )
}

export default DomainResources