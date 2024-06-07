import React from 'react'

const ResourcesDetails = ({resources}) => {
    return(
        <>
        <table className="resource-table">
            <thead>
                <tr>
                    <th>Resource</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody className="table-body">
                {resources.map((resource, index) => (
                    <tr key={index}>
                        <td className="resource-data">
                            <div className="resource-title">{resource.title}</div>
                            <div className="resource-description">{resource.description}</div>
                        </td>
                        <td className="resource-link"><a href={resource.link}>{resource.type}</a></td>
                    </tr>))}
            </tbody>
        </table>
        </>
    )
}

export default ResourcesDetails