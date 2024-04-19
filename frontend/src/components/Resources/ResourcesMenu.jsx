import React from 'react'
import { Link } from 'react-router-dom';

const ResourcesMenu = ({domain}) => {
    const books = domain + "books";
    const websites = domain + "websites";
    const playlists = domain + "playlists";

    return (
        <>
        <div className="menu">
            <div className="menu-title">
                {domain}
            </div>
            <div className="resources-menu">
                <input type="radio" name="resource" id="books" value="books" />
                <label for="books">Books</label>
                
                <input type="radio" name="resource" id="websites" value="websites" defaultChecked/>
                <label for="websites">Websites</label>
                
                <input type="radio" name="resource" id="videos" value="videos" />
                <label for="videos">Playlists</label>
            </div>
        </div>
        </>
  )
}

export default ResourcesMenu