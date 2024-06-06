import React from 'react'

const ResourcesDetails = ({resources}) => {
    return(
        <>
        <table>
            <thead>
                <tr>
                    <th>Resource</th>
                    <th>Author/<br/> Creator</th>
                </tr>
            </thead>
            <tbody>
                {resources.map((resource, index) => (
                    <tr key={index}>
                        <td className="resource">
                            <a href={resource.link} target="_blank">
                            <div className="resource-title">{resource.title}</div>
                            <div className="resource-description">{resource.description}</div>
                            </a>
                        </td>
                        <td className="resource-owner">{resource.owner}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default ResourcesDetails