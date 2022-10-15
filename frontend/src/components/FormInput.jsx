import { React } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const FormInput = (props) => {
  return (
    <Form.Group className="mb-3 text-start" controlId={props.id}>
      <Form.Label style={{fontSize:'bold'}}>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        defaultValue={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        accept={props.accept}
        placeholder={" Paste your URL here..."}
        style={{width:"50vw", borderRadius:"5px", height:"4.5rem", borderStyle:"solid", fontSize: '2rem'}}
      />
    </Form.Group>
  );
};

FormInput.propTypes = {
  url: PropTypes.string
};

export default FormInput;