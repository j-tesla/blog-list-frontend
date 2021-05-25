import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useField = (name, type = 'text') => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    type,
    name,
    value,
    onChange,
    reset,
  };
};
