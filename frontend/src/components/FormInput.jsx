import { React } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import '../App.css'

function changeBackgroundFocus(e) {
  e.target.style.borderColor = '#ff0000';
}
function changeBackgroundBlur(e) {
  e.target.style.borderColor = '#bdc3c7';
}

const FormInput = (props) => {
  return (
    <Form.Group className="mb-3 text-start no-outline" controlId={props.id}>
      <Form.Label style={{fontSize:'bold'}}>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        defaultValue={props.value}
        onBlur={changeBackgroundBlur}
        onFocus={changeBackgroundFocus}
        onChange={props.onChange}
        accept={props.accept}
        placeholder={" Enter a youtube link..."}
        style={{width:"50rem", height:"4.5rem", maxWidth: "99vw", 
                borderStyle:"solid", fontSize: '2rem', 
                borderTop: 'none', borderLeft: 'none', borderRight: 'none', 
                backgroundColor: '#f5f5f5', outline: 'none',
                borderWidth: '0.2rem', borderColor: '#bdc3c7',
                fontFamily: 'inherit', fontWeight: 'lighter',
                transitionDuration: '0.5s', borderRadius: '0px',
                boxShadow: 'none', margin: 'auto'
                }}
      />
    </Form.Group>
  );
};

FormInput.propTypes = {
  url: PropTypes.string
};

export default FormInput;