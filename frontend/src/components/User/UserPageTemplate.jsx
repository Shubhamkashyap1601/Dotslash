import React, { useEffect, useRef } from 'react'
import './user.css'
import { useState } from 'react';
import { useLoginContext } from '../../context/LoginContext';

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
  
  const updateLeetcodeProgressBar = async(currentValue,maxValue=3000)=>{ 
    const response = await fetch(`/api/leetcode/${user.leetcode}`,{method:'GET'});
    if(response.ok)
    {
      const res = await response.json();
      setUser((prev)=>
        ({
          ...prev,
          leetcodeRating : res.data,
        })
      )
      currentValue=res.data
    }
    const progressBar = document.querySelector('.leetcode-bar');
    const progressPercentage = (currentValue / maxValue) * 100;
    progressBar.style.width = progressPercentage + '%';
  }

  const updateCodeforcesProgressBar = async(currentValue,maxValue=3000)=>{  
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${user.codeforces}`,{method:'GET'});
    if(response.ok)
    {
      const res = await response.json();
      setUser((prev)=>
        ({
          ...prev,
          codeforcesRating : res.result[0].rating,
        })
      )
      currentValue=res.result[0].rating
    }
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
    const response = await fetch(`/api/codechef/${user.codechef}`,{method:'GET'});
    if(response.ok)
    {
      const res = await response.json();
      console.log(res);
      setUser((prev)=>
        ({
          ...prev,
          codechefRating : res.data,
        })
      )
      currentValue=res.data;
    }
    const progressBar = document.querySelector('.codechef-bar');
    const progressPercentage = (currentValue / maxValue) * 100;
    progressBar.style.width = progressPercentage + '%';
    if(currentValue>=1200 && currentValue < 1400) progressBar.style.backgroundColor = '#FFFFFF'
    else if(currentValue>=1400 && currentValue < 1600) progressBar.style.backgroundColor = '#IE7D22'
    else if(currentValue>=1600 && currentValue < 1800) progressBar.style.backgroundColor = '#3366CC'
    else if(currentValue>=1800 && currentValue < 2000) progressBar.style.backgroundColor = '#684273'
    else if(currentValue >= 2000) progressBar.style.backgroundColor = '#FFBF00'  

  }

  const unSetImage = ()=>{

  }
  useEffect(()=>{
    if(user.pfp == undefined)
    {
      user.pfp = 'https://wallpapers.com/images/hd/cool-profile-picture-1ecoo30f26bkr14o.jpg'
    }
    if(isLoggedIn && user.username === username) setIsOwner(true);
    else setIsOwner(false);
    updateCodeforcesProgressBar();
    updateCodechefProgressBar();
    updateLeetcodeProgressBar();  
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
                        <span className={`list-item-content${linkInputVisibility}`}><a href={`https://codeforces.com/profile/${user.codeforces}`}target='_blank'>Codeforces link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}`} name='codeforces' onChange={handleChange} />

                      </div>
                    </li>
                    <hr/>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>Leetcode</span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href={`https://leetcode.com/${user.leetcode}/`}target='_blank'>Leetcode link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}` } name='leetcode' onChange={handleChange} />

                      </div>
                    </li>
                    <hr/>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>CodeChef</span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href={`https://www.codechef.com/users/${user.codechef}`} target='_blank'>Codechef link</a></span>
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
                <div className="user-details-container">
                    <ul>
                      <li>
                        <div className="feild">
                          <span className='feild-name'>
                            Name
                          </span>
                          <span className={`feild-value${deatailInputVisibility}`}>
                              Full Name
                          </span>
                          <input type='text' name='name' className={`feild-input${deatailInputVisibility}`}/>
                        </div>
                      </li>
                      <hr/>
                      <li>
                        <div className="feild">
                          <span className='feild-name'>
                            Name
                          </span>
                          <span className={`feild-value${deatailInputVisibility}`}>
                              Full Name
                          </span>
                          <input type='text' name='name' className={`feild-input${deatailInputVisibility}`}/>
                        </div>
                      </li>
                      <hr/>
                      <li>
                        <div className="feild">
                          <span className='feild-name'>
                            Name
                          </span>
                          <span className={`feild-value${deatailInputVisibility}`}>
                              Full Name
                          </span>
                          <input type='text' name='name' className={`feild-input${deatailInputVisibility}`}/>
                        </div>
                      </li>
                      <hr/>
                      <li>
                        <div className="feild">
                          <span className='feild-name'>
                            Name
                          </span>
                          <span className={`feild-value${deatailInputVisibility}`}>
                              Full Name
                          </span>
                          <input type='text' name='name' className={`feild-input${deatailInputVisibility}`}/>
                        </div>
                      </li>
                      <hr/>
                      <li>
                        <div className="feild">
                          <span className='feild-name'>
                            Name
                          </span>
                          <span className={`feild-value${deatailInputVisibility}`}>
                              Full Name
                          </span>
                          <input type='text' name='name' className={`feild-input${deatailInputVisibility}`}/>
                        </div>
                      </li>
                      <hr/>
                    </ul>
                    {isOwner? <button onClick={changeDetailInputVisibility}>{detailButtonText}</button>:""}
                </div>
                <div className="user-ratings-container">
                    <div className='bar-container'>
                      <div className='platform-name'>
                        
                        leetcode -{user.leetcodeRating} rating
                      </div>
                      <div className="full-length-bar">
                        <div className='leetcode-bar'>
                        </div>
                      </div>                      
                    </div>
                    <div className='bar-container'>
                      <div className='platform-name'>
                        Codeforces - {user.codeforcesRating} rating
                      </div>
                      <div className="full-length-bar">
                        <div className='codeforces-bar'>
                        </div>
                      </div>                      
                    </div>
                    <div className='bar-container'>
                      <div className='platform-name'>
                        Codechef - {user.codechefRating} rating
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