import React, {
  useState, useImperativeHandle, forwardRef,
} from 'react';
import PropTypes from 'prop-types';

const Toggleable = forwardRef(({
  button,
  children,
}, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <>
      {visible ? (
        <>
          {children}
        </>
      ) : (
        <>
          {button}
        </>
      )}
    </>
  );
});

Toggleable.propTypes = {
  button: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

Toggleable.displayName = 'Toggleable';

export default Toggleable;
