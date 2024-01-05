import React from 'react'
import './user.css'
import { useState } from 'react';
import { useLoginContext } from '../../context/LoginContext';

function UserPage() {
  const [visibility,setvisibility] = useState('-hidden');
  const [buttonText,setButtonText] = useState('Change Image')

  const [linkInputVisibility,setLinkInputVisibility] = useState('-hidden');
  const [linkButtonText,setLinkButtonText] = useState('edit');
  
  const [deatailInputVisibility,setDetailInputVisibility] = useState('-hidden');
  const [detailButtonText,setDetailButtonText] = useState('edit');

  const {isLoggedIn} = useLoginContext(); 

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

  const changeLinkInputVisibility = ()=>{
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
  const updateLeetcodeProgressBar = (maxValue,currentValue)=>{
    const progressBar = document.getElementById('leetcode-bar');
    const progressPercentage = (currentValue / maxValue) * 100;
    progressBar.style.width = progressPercentage + '%';
  }

  const unSetImage = ()=>{

  }
  return (
        <div className='user-page-container'>
            <div className='user-left-container'>
                <div className="user-image-container">
                    <img src='https://bootdey.com/img/Content/avatar/avatar7.png' className='user-image'/>
                    {isLoggedIn? <label type= "button"className="changeButton" onClick={changeVisibility}>{buttonText}</label>:" "}
                    <input type="file" className={`upload-image${visibility}`} accept="image/*"/>
                    <button className={`submit-image${visibility}`}>Upload</button>
                    <div className={`text-container${visibility}`}>  
                      <div className='custom-text1'>uname</div>
                      <div className='custom-text2'>real-name</div>
                      <div className='custom-text3'>sample@gmail.com</div>
                    </div>
                </div>
                <div className="user-profile-links-container">
                  <ul>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>Github</span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href='#'>Github link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}`} name='githubLink'/>
                      </div>
                    </li>
                    <hr/>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>Codeforces</span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href='#'>Codeforces link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}`} name='codeforcesLink'/>

                      </div>
                    </li>
                    <hr/>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>Leetcode</span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href='#'>Leetcode link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}`} name='leetcodeLink'/>

                      </div>
                    </li>
                    <hr/>
                    <li>
                      <div className='list-item'>
                        <span className='list-item-name'>CodeChef</span>
                        <span className={`list-item-content${linkInputVisibility}`}><a href='#'>Codechef link</a></span>
                        <input type='text' className={`list-item-input${linkInputVisibility}`} name='codechefLink'/>

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
                  {isLoggedIn? <button onClick={changeLinkInputVisibility}>{linkButtonText}</button>:""}
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
                    {isLoggedIn? <button onClick={changeDetailInputVisibility}>{detailButtonText}</button>:""}
                </div>
                <div className="user-ratings-container">
                    <div className='bar-container'>
                      <div className='platform-name'>
                        leetcode - rating
                      </div>
                      <div className="full-length-bar">
                        <div className='leetcode-bar'>
                        </div>
                      </div>                      
                    </div>
                    <div className='bar-container'>
                      <div className='platform-name'>
                        Codeforces - rating
                      </div>
                      <div className="full-length-bar">
                        <div className='codeforces-bar'>
                        </div>
                      </div>                      
                    </div>
                    <div className='bar-container'>
                      <div className='platform-name'>
                        Codechef - rating
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

export default UserPage