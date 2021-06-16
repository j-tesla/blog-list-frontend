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
    <div>
      {!visible && (
        <div>
          {button}
        </div>
      )}

      {visible && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
});

Toggleable.propTypes = {
  button: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

Toggleable.displayName = 'Toggleable';

export default Toggleable;
