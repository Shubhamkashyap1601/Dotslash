import React from 'react'
import "./Resources.css";
import ResourcesMenu from './ResourcesMenu';
import ResourcesDetails from './ResourcesDetails';


const DomainResources = ({ domain }) => {
    const resources = [
        {
            title: "Resource 1",
            description: "Description 1",
            link: "Link 1",
        },
        {
            title: "Resource 2",
            description: "Description 2",
            link: "Link 2",
        },
        {
            title: "Resource 3",
            description: "Description 3",
            link: "Link 3",
        },
        {
            title: "Resource 4",
            description: "Description 4",
            link: "Link 4",
        },
        {
            title: "Resource 5",
            description: "Description 5",
            link: "Link 5",
        },
    ]
    return (
        <>
            <div className="menu">
                <div className="menu-title">
                    {domain}
                </div>
                <div className="resources-menu">
                    <input type="radio" name="resource" id="books" value="books" />
                    <label for="books">Books</label>

                    <input type="radio" name="resource" id="websites" value="websites" defaultChecked />
                    <label for="websites">Websites</label>

                    <input type="radio" name="resource" id="videos" value="videos" />
                    <label for="videos">Playlists</label>
                </div>
            </div>
            
            <ResourcesDetails resources={resources} />
        </>
    )
}

export default DomainResources