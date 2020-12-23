const info = (...params) => {
  // eslint-disable-next-line no-console
  console.log(...params);
};

const error = (...params) => {
  // eslint-disable-next-line no-console
  console.error(...params);
};

const logger = {
  info,
  error,
};

export default logger;
