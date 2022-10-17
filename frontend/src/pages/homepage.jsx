import { React, useState } from 'react';
import DownloadForm from '../components/DownloadForm';
import Header from '../components/Header';
import youtube_logo from '../assets/youtube-red.png'
const HomePage = () => {
  
  return (
    <>
      <div style={{textAlign: 'center', backgroundColor: '#f5f5f5', width: '100vw', height: '100vh'}}>
        <div style={{backgroundColor: '#f5f5f5'}}>
          <div style={{paddingTop: '20rem'}}>
            <DownloadForm></DownloadForm>
            <h1 style={{fontFamily: 'inherit', fontWeight: 'lighter', paddingTop: '3rem'}}>Download anything, anytime</h1>
          </div>
        </div>
        
      </div>
    </>
  )

}

export default HomePage;