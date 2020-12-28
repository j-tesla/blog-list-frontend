import React, { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Toggleable = forwardRef(({ buttonLabel, children, cancelButton = true }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible} className="toggleable">
        {children}
        {cancelButton && (<button type="button" onClick={toggleVisibility}>cancel</button>)}
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelButton: PropTypes.bool,
};

Toggleable.defaultProps = { cancelButton: true };

Toggleable.displayName = 'Toggleable';

export default Toggleable;
