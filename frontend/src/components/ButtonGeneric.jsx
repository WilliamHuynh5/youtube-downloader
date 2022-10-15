import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const ButtonGeneric = () => {
  return (
    <Button style={{
      'backgroundColor': 'red'
    }}>title</Button>
  )
}

ButtonGeneric.propTypes = {
  title: PropTypes.string,
  
};

export default ButtonGeneric;