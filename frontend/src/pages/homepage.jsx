import { React, useState } from 'react';
import DownloadForm from '../components/DownloadForm';
import Header from '../components/Header';
import youtube_logo from '../assets/youtube-red.png'

const HomePage = () => {
  
  return (
    <>
      <div style={{backgroundColor: '#f5f5f5', width: '100vw', height: '100vh'}}>
        <div style={{height: '15rem', backgroundColor: '#ff0000', textAlign: 'center'}}>
          <img src = {youtube_logo} style={{width: '80rem', marginTop: '1rem'}}></img>
        </div>
        <div style={{textAlign: 'center', marginTop: '10rem', backgroundColor: '#f5f5f5'}}>
          <DownloadForm></DownloadForm>
        </div>
      </div>
    </>
  )

}

export default HomePage;