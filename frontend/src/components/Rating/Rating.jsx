import React, { useEffect, useState } from "react";
import RatingTable from "./RatingTable";

import cf from '../../assets/cf_img.webp'
import leetcode from '../../assets/leetcode_img.png'
import codechef from '../../assets/codechef_img.jpg'

function Rating() {
  const [selectedPlatform, setSelectedPlatform] = useState("CodeForces");
  const [usersCodeForces, setUsersCodeForces] = useState([]);
  const [users, setUsers] = useState(usersCodeForces);
  const [usersLeetCode, setUsersLeetCode] = useState([]);
  const [usersCodeChef, setUsersCodeChef] = useState([]);

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
    if (event.target.value === "CodeForces") {
      setUsers(usersCodeForces);
    } else if (event.target.value === "LeetCode") {
      setUsers(usersLeetCode);
    } else if (event.target.value === "CodeChef") {
      setUsers(usersCodeChef);
    }
  };

  const fetchRankings = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/fetchRankings`, {credentials: 'include'});
      const res = await response.json();
      // console.log(res);
      setUsersCodeForces(res.data.codeforceRanking);
      setUsers(res.data.codeforceRanking);
      setUsersCodeChef(res.data.codechefRanking);
      setUsersLeetCode(res.data.leetcodeRanking);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchRankings();
  }, []);

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={
            selectedPlatform === "CodeForces"
              ? cf
              : selectedPlatform === "LeetCode"
              ? leetcode
              : codechef
          }
          alt="platform"
          style={{ width: "50px", height: "50px" }}
        />
        <select
          value={selectedPlatform}
          onChange={handlePlatformChange}
          style={{
            backgroundColor: "black",
            color: "Orange",
            border: "2px solid orange",
            marginLeft: "10px",
            fontSize: "24px",
          }}
        >
          <option value="CodeForces">CodeForces</option>
          <option value="LeetCode">LeetCode</option>
          <option value="CodeChef">CodeChef</option>
        </select>
      </div>
      <br />
      <br />
      {users?.length > 0 && (
        <RatingTable
          platform={selectedPlatform}
          platform_img={
            selectedPlatform === "CodeForces"
              ? cf
              : selectedPlatform === "LeetCode"
              ? leetcode
              : codechef
          }
          users={users}
        />
      )}
      <br />
      <br />
    </>
  );
}

export default Rating;
