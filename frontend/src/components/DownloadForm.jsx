import { React, useState } from 'react';
import FormInput from './FormInput';
import Button from 'react-bootstrap/Button';
import {apiCall} from '../fetch_api';
import Helpers from '../helpers.js';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from './LoadingSpinner'
import '../App.css'

const DownloadForm = (props) => {

  const handleClose = () => {
    if (!isDownloading) {
      setShow(false);
    }
  }
  const handleShow = () => setShow(true);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoThumbnail, setVideoThumbnail] = useState('');
  
  const fetch = async() => {
    setError(false);
    setIsLoading(true);
    const res = await apiCall('fetch/video/details', 'POST', {
      url: url
    });
    setIsLoading(false);
    console.log(res);
    if('error' in res) {
      setError(true);
    } else {
      handleShow();
      setVideoTitle(res.title);
      setVideoThumbnail(res.thumbnail)
    }
  }
  
  
  const downloadMP4 = async() => {
    setIsDownloading(true)
   
   Helpers.httpRequest(
    `http://localhost:5000/api/download/mp4?url=${url}`,
    'get'
   ).then((response) => response.blob())
   .then((blob) => {
      // 2. Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', videoTitle + '.mp4');
      // 3. Append to html page
      document.body.appendChild(link);
      // 4. Force download
      link.click();
      // 5. Clean up and remove the link
      link.parentNode.removeChild(link);
      setIsDownloading(false);
      handleClose();
      apiCall('clean/up', 'DELETE');
   });
  }
  
  const downloadMP3 = async() => {
    setIsDownloading(true);
    Helpers.httpRequest(
      `http://localhost:5000/api/download/mp4?url=${url}`,
      'get'
     ).then((response) => response.blob())
     .then((blob) => {
        // 2. Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', videoTitle + '.mp3');
        // 3. Append to html page
        document.body.appendChild(link);
        // 4. Force download
        link.click();
        // 5. Clean up and remove the link
        link.parentNode.removeChild(link);
        setIsDownloading(false);
        handleClose();
        apiCall('clean/up', 'DELETE');
     })
  }
  
  return (
  <>
    <FormInput onChange={(e) => {
      setUrl(e.target.value);
    }}></FormInput>
    <Button className="buttonCust" style={{marginTop: '1.3rem' }} onClick={fetch}>
      Fetch!
    </Button>
    <div style={{marginTop: '2rem' }}>
      {isLoading ? <LoadingSpinner />:undefined}
      {error ? <p style={{color:'red', fontSize: '2rem'}}>Failed to fetch video!</p>:undefined}
    </div>
    
    <Modal show = {show} onHide = {handleClose} disabled={isDownloading}>
        <Modal.Header closeButton>
            <Modal.Title>Download Video</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img className="img-responsive" src={videoThumbnail} style={{width:'100%', height: 'auto', marginBottom: '0.7rem'}}></img>
          <p style={{textAlign: 'center', fontSize: '2rem'}}>{videoTitle}</p>
          {isDownloading ? <LoadingSpinner />:undefined}
        </Modal.Body>

        <Modal.Footer className="justify-content-between">
        <Button className="buttonCust" style={{marginTop: '1.3rem', fontWeight: 'bold' }} onClick={downloadMP4} disabled={isDownloading}>
          Download MP4
        </Button>
        <Button className="buttonCust" style={{marginTop: '1.3rem', fontWeight: 'bold' }} onClick={downloadMP3} disabled={isDownloading}>
          Download MP3
        </Button>
        </Modal.Footer>

      </Modal>
  </>
  )
}

export default DownloadForm;