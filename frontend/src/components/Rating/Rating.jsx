import React, { useState } from 'react';
import RatingTable from './RatingTable';

function Rating() {
  const [selectedPlatform, setSelectedPlatform] = useState('CodeForces');

  const handlePlatformChange = (event) => {
    setSelectedPlatform(event.target.value);
  };

  const usersCodeForces = [
    {
      rank: '1',
      name: 'binomanjesh',
      rating: 1918
    },
    {
      rank: '2',
      name: 'jmichael',
      rating: 1741
    },
    {
      rank: '3',
      name: 'vijay_panwar12',
      rating: 1686
    },
    {
      rank: '4',
      name: 'vinay_panwar',
      rating: 1651
    },
    {
      rank: '5',
      name: 'vasu52',
      rating: 1621
    },
  ];

  const usersLeetCode = [
    {
      rank: '1',
      name: 'user1',
      rating: 2000
    },
    {
      rank: '2',
      name: 'user2',
      rating: 1800
    },
    {
      rank: '3',
      name: 'user3',
      rating: 1600
    },
    {
      rank: '4',
      name: 'user4',
      rating: 1500
    },
    {
      rank: '5',
      name: 'user5',
      rating: 1400
    },
  ];

  const usersCodeChef = [
    {
      rank: '1',
      name: 'coder1',
      rating: 2100
    },
    {
      rank: '2',
      name: 'coder2',
      rating: 1950
    },
    {
      rank: '3',
      name: 'coder3',
      rating: 1850
    },
    {
      rank: '4',
      name: 'coder4',
      rating: 1750
    },
    {
      rank: '5',
      name: 'coder5',
      rating: 1700
    },
  ];

  let users;
  if (selectedPlatform === 'CodeForces') {
    users = usersCodeForces;
  } else if (selectedPlatform === 'LeetCode') {
    users = usersLeetCode;
  } else if (selectedPlatform === 'CodeChef') {
    users = usersCodeChef;
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={selectedPlatform === 'CodeForces' ? '../../src/assets/cf_img.webp' : selectedPlatform === 'LeetCode' ? '../../src/assets/leetcode_img.png' : '../../src/assets/codechef_img.jpg'} alt="platform" style={{ width: '50px', height: '50px' }} />
        <select value={selectedPlatform} onChange={handlePlatformChange} style={{ backgroundColor: 'black', color: 'Orange', border: '2px solid orange', marginLeft: '10px', fontSize: '24px' }}>
          <option value="CodeForces">CodeForces</option>
          <option value="LeetCode">LeetCode</option>
          <option value="CodeChef">CodeChef</option>
        </select>
      </div>
      <br />
      <br />
      <RatingTable platform={selectedPlatform} platform_img={selectedPlatform === 'CodeForces' ? '../../src/assets/cf_img.webp' : selectedPlatform === 'LeetCode' ? '../../src/assets/leetcode_img.png' : '../../src/assets/codechef_img.jpg'} users={users} />
      <br />
      <br />
    </>
  );
}

export default Rating;
