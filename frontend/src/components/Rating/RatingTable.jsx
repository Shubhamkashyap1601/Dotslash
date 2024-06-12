import React from "react";
import "./Rating.css";

function RatingTable({ users }) {
  return (
    <>
        <table>
          <thead className="rating-thead">
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Current Rating</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td className="rating-table-data">{user.rank}</td>
                  <td className="rating-table-data">{user.name}</td>
                  <td className="rating-table-data">{parseInt(user.rating)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
    </>
  );
}

export default RatingTable;
