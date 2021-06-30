import axios from 'axios';

const baseUrl = '/api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

const usersService = {
  getAll,
  create,
};

export default usersService;
