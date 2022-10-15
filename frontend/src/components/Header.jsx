import React from "react";
import PropTypes from 'prop-types';
import { fontBold, headerColor } from '../inlineStyles.js';

const DefaultHeader = (props) => {
  return (
    <div>
      <h1
        style={{color:"white" }}
      >
        <span> 
          YouTube Downloader 📺
        </span>
        {props.children}
      </h1>
    </div>
  );
};

DefaultHeader.propTypes = {
  children: PropTypes.object,
};

export default DefaultHeader;