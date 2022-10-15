import { React, useState } from 'react';
import FormInput from './FormInput';
import Button from 'react-bootstrap/Button';
import {apiCall} from '../fetch_api';
import Helpers from '../helpers.js';
import ButtonGeneric from './ButtonGeneric';

const DownloadForm = (props) => {
  const [url, setUrl] = useState('');
  
  const fetch = async() => {
    const res = await apiCall('fetch/video/details', 'POST', {
      url: url
    })
  }
  
  const downloadMP4 = async() => {
   console.log("start")
   Helpers.httpRequest(
    `http://localhost:5000/api/download/mp4?url=${url}`,
    'get'
   ).then((response) => response.blob())
   .then((blob) => {
      console.log("hi")
      // 2. Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `url.mp4`);
      // 3. Append to html page
      document.body.appendChild(link);
      // 4. Force download
      link.click();
      // 5. Clean up and remove the link
      link.parentNode.removeChild(link);
   })
  }
  
  const downloadMP3 = async() => {
    const res = await apiCall('download/mp3?url=' + url, 'GET')
    console.log(res);
  }
  
  return (
  <>
    <FormInput onChange={(e) => {
      setUrl(e.target.value);
    }}></FormInput>
    <Button variant="outline-primary" onClick={fetch}>
      Fetch!
    </Button>
    {/* <Button variant="danger" onClick={downloadMP4}>
      Download MP4!
    </Button>
    <Button onClick={downloadMP3}>
      Download MP3!
    </Button> */}
  </>

  )
}

export default DownloadForm;