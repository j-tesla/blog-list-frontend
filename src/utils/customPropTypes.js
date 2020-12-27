import PropTypes from 'prop-types';

const user = PropTypes.shape({
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  blogs: PropTypes.arrayOf(PropTypes.string),
});

const blog = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  user,
});

const customPropTypes = {
  user,
  blog,
};

export default customPropTypes;
