import React from 'react'
import { Link } from 'react-router-dom';

const ResourcesMenu = ({domain}) => {
    const books = domain + "books";
    const websites = domain + "websites";
    const playlists = domain + "playlists";

    return (
        <>
        <div className="menu-title">
            {domain}
        </div>
        <div className="resources-menu">
            <button>
                Books
            </button>
            <button>
                Videos
            </button>
            <button>
                Youtube Playlists
            </button>
        </div>
        </>
  )
}

export default ResourcesMenu