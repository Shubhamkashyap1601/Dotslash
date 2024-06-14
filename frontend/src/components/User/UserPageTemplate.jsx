import React, { useEffect, useRef } from 'react'
import './user.css'
import { useState } from 'react';
import { useLoginContext } from '../../context/LoginContext';
import edit from '../../assets/edit.png'


function UserPageTemplate({User}) {
  
  const [visibility,setvisibility] = useState('-hidden');
  const [buttonText,setButtonText] = useState('Change Image')

  const [linkInputVisibility,setLinkInputVisibility] = useState('-hidden');
  const [linkButtonText,setLinkButtonText] = useState('edit');
  
  const [deatailInputVisibility,setDetailInputVisibility] = useState('-hidden');
  const [detailButtonText,setDetailButtonText] = useState('edit');

  const {isLoggedIn,username} = useLoginContext();
  const [isOwner,setIsOwner] = useState(false)

  const [user,setUser] = useState(User);
  const [formData, setFormData] = useState({});

  const pfpRef = useRef();

  const problemSolvedLeetcode = 200;
  const problemSolvedCodeChef = 200;
  const problemSolvedCodeforces = 200;
  const aboutMeText = "I am a competitive programmer and a web developer. I love to solve problems and learn new things. I am a 3 star coder at codeforces and a 4 star coder at codechef. I have solved 200 problems on leetcode.";
  const languagesList = "C++, Python, Javascript, Java, C#";
  const [totalProblemsSolved, setTotalProblemsSolved] = useState(0);


  const changeVisibility = ()=>{
    setvisibility((pre)=>{
      if(pre === '-hidden') return '';
      else return '-hidden';
    })  
    setButtonText((pre)=>{
      if(pre=='Change Image') return 'Back?';
      else return 'Change Image';
    })
  }

  const updateHandles = async()=>{
    try {
      const response = await fetch('/api/updateHandles',{
        method : 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(formData)})
      if(response.ok)
      {
        const res = await response.json();
        const url = res.data;
        setUser((prev)=>
          ({...prev,
            pfp : url
          })
        )
      }
    } catch (error) {
      console.error("Something went wrong :",error);
    }
  }

  const changeLinkInputVisibility = ()=>{
    if(linkButtonText === 'submit') updateHandles();
    setLinkInputVisibility((pre)=>{
      if(pre === '-hidden') return '';
      else return '-hidden';
    })
    setLinkButtonText((pre)=>{
      if(pre === 'edit') return 'submit';
      else return 'edit';
    })
  }

  const changeDetailInputVisibility = ()=>{
    setDetailInputVisibility((pre)=>{
      if(pre === '-hidden') return '';
      else return '-hidden';
    })
    setDetailButtonText((pre)=>{
      if(pre === 'edit') return 'submit';
      else return 'edit';
    })
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updatePfp = async()=>{
    const formData = new FormData();
    formData.append('pfp', pfpRef.current.files[0]);
    try {
      const response = await fetch('/api/updatePfp',{method : 'POST',body : formData})
      if(response.ok)
      {
        setUser((prev)=>
          ({...prev,
            codeforces : formData.codeforces,
            leetcode : formData.leetcode,
            codechef : formData.codechef,
            github : formData.github
          })
        )
      }
    } catch (error) {
      console.error("Something went wrong :",error);
    }
  }
  const updateRating = async()=>{
    try {
      const response = await fetch(`/api/updateRating/${user.username}`)
      if(response.ok)
      {
        const res = await response.json();
        setUser((prev)=>
          ({...prev,
            codingPlatforms : res.data
          })
        )
      }
    } catch (error) {
      console.error("Something went wrong :",error);
    }
  }
  const updateLeetcodeProgressBar = async(currentValue,maxValue=3000)=>{ 
    currentValue = user.codingPlatforms.leetcode.rating || 0;
    const progressBar = document.querySelector('.leetcode-bar');
    const progressPercentage = (currentValue / maxValue) * 100;
    progressBar.style.width = progressPercentage + '%';
  }
  const updateCodeforcesProgressBar = async(currentValue,maxValue=3000)=>{  
    currentValue = user.codingPlatforms.codeforces.rating || 0;
    const progressBar = document.querySelector('.codeforces-bar');
    const progressPercentage = (currentValue / maxValue) * 100;
    progressBar.style.width = progressPercentage + '%';
    if(currentValue < 1200) progressBar.style.backgroundColor = 'grey'
    else if(currentValue>=1200 && currentValue < 1400) progressBar.style.backgroundColor = '#00C700'
    else if(currentValue>=1400 && currentValue < 1600) progressBar.style.backgroundColor = '#01BDB2'
    else if(currentValue>=1600 && currentValue < 1900) progressBar.style.backgroundColor = '#757DFF'
    else if(currentValue>=1900 && currentValue < 2100) progressBar.style.backgroundColor = '#CE8AFF'
  }
  const updateCodechefProgressBar = async(currentValue,maxValue=3000)=>{  
    currentValue = user.codingPlatforms.codechef.rating || 0;
    const progressBar = document.querySelector('.codechef-bar');
    const progressPercentage = (currentValue / maxValue) * 100;
    progressBar.style.width = progressPercentage + '%';
    if(currentValue>=1200 && currentValue < 1400) progressBar.style.backgroundColor = '#FFFFFF'
    else if(currentValue>=1400 && currentValue < 1600) progressBar.style.backgroundColor = '#IE7D22'
    else if(currentValue>=1600 && currentValue < 1800) progressBar.style.backgroundColor = '#3366CC'
    else if(currentValue>=1800 && currentValue < 2000) progressBar.style.backgroundColor = '#684273'
    else if(currentValue >= 2000) progressBar.style.backgroundColor = '#FFBF00'  

  }

  const updateProgressBar = async()=>{
    updateCodeforcesProgressBar();
    updateCodechefProgressBar();
    updateLeetcodeProgressBar();

  }
  const unSetImage = ()=>{

  }
  useEffect(()=>{
    if(user.pfp == "")
    {
      console.log("hello")
      setUser((prev)=>
          ({...prev,
            pfp : '../../../src/assets/table-back.jpeg'
          })
        )
    }
    if(isLoggedIn && user.username === username) setIsOwner(true);
    else setIsOwner(false);
    updateRating();
    updateProgressBar();

  },[user.pfp,username])
  return (
      <div className='user-page-container'>
            <div className='user-left-container'>
                <div className="user-image-container">
                    <img src={`${user.pfp}`} alt='' className='user-image'/>
                    {isOwner? <label type= "button"className="changeButton" onClick={changeVisibility}>{buttonText}</label>:" "}
                    <input type="file" className={`upload-image${visibility}`} name ='pfp'ref={pfpRef}/>
                    <button className={`submit-image${visibility}`} onClick={updatePfp}>Upload</button>
                    <div className={`text-container${visibility}`}>  
                      <div className='custom-text1'>{user.username}</div>
                      <div className='custom-text2'>{user.name}</div> 
                      <div className='custom-text3'>{user.email}</div>
                    </div>
                </div>
                <div className="user-profile-links-container">
                  <ul>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>Github</span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href='#'>Github link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}`} name='github' onChange={handleChange}/>
                      </div>
                    </li>
                    <hr/>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>Codeforces
                        </span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href={`https://codeforces.com/profile/${user.codingPlatforms.codeforces.username}`}target='_blank'>Codeforces link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}`} name='codeforces' onChange={handleChange} />

                      </div>
                    </li>
                    <hr/>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>Leetcode</span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href={`https://leetcode.com/${user.codingPlatforms.leetcode.username}/`}target='_blank'>Leetcode link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}` } name='leetcode' onChange={handleChange} />

                      </div>
                    </li>
                    <hr/>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>CodeChef</span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href={`https://www.codechef.com/users/${user.codingPlatforms.codechef.username}`} target='_blank'>Codechef link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}`} name='codechef' onChange={handleChange}/>

                      </div>
                    </li>
                    <hr/>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>Website</span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href='#'>Website link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}`} name='websiteLink'/>
                      </div>
                    </li>
                    <hr/>
                  </ul>
                  {isOwner? <button onClick={changeLinkInputVisibility}>{linkButtonText}</button>:""}
                </div>
            </div>
            <div className="user-right-container">
            <div class="user-details-container">
              {isOwner && (<img src={edit} alt="Edit" class="edit-about-me" onClick={changeDetailInputVisibility}></img>)}
              <div class="user-details-title">About Me:</div>
              <div class="user-details-content" contenteditable="false">{aboutMeText}</div>

              <div class="user-details-title">Languages:</div>
              <div class="user-details-content">{languagesList}</div>

              <table>
                <thead>
                  <tr>
                    <th>Platform</th>
                    <th>Solved</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Leetcode</th>
                    <td>{problemSolvedLeetcode}</td> </tr>
                  <tr>
                    <th>CodeChef</th>
                    <td>{problemSolvedCodeChef}</td>
                  </tr>
                  <tr>
                    <th>Codeforces</th>
                    <td>{problemSolvedCodeforces}</td>
                  </tr>
                </tbody>
              </table>
            </div>


                <div className="user-ratings-container">
                    <div className='bar-container'>
                      <div className='platform-name'>
                        
                        Leetcode - {user.codingPlatforms.leetcode.rating?.toFixed(1) || 0} rating
                      </div>
                      <div className="full-length-bar">
                        <div className='leetcode-bar'>
                        </div>
                      </div>                      
                    </div>
                    <div className='(bar-container)'>
                      <div className='platform-name'>
                        Codeforces - {user.codingPlatforms.codeforces.rating || 0} rating
                      </div>
                      <div className="full-length-bar">
                        <div className='codeforces-bar'>
                        </div>
                      </div>                      
                    </div>
                    <div className='bar-container'>
                      <div className='platform-name'>
                        Codechef - {user.codingPlatforms.codechef.rating || 0} rating
                      </div>
                      <div className="full-length-bar">
                        <div className='codechef-bar'>
                        </div>
                      </div>                      
                    </div>
                </div>
            </div>
        </div>
    )
  }

export default UserPageTemplate