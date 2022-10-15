import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { primaryButton } from '../inlineStyles';

const ButtonGeneric = () => {
  return (
    <Button style={primaryButton}>asdas</Button>
  )
}

ButtonGeneric.propTypes = {
  title: PropTypes.string,
  
};

export default ButtonGeneric;