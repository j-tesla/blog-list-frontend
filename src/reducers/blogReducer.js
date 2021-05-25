import blogsService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
        .sort((a, b) => (b.likes - a.likes));
    }
    case 'ADD_BLOG':
      return [...state, action.data].sort((a, b) => (b.likes - a.likes));
    case 'INCREMENT_LIKES': {
      const { id } = action.data;
      const blogToChange = state.find((a) => a.id === id);
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changedBlog))
        .sort((a, b) => (b.likes - a.likes));
    }
    case 'DELETE_BLOG': {
      const { id } = action.data;
      return state.filter((blog) => blog.id !== id);
    }
    case 'UPDATE_BLOG': {
      const { blog: savedBlog } = action.data;
      return state.map((blog) => ((blog.id === savedBlog.id) ? (savedBlog) : (blog)));
    }
    default: {
      return state.sort((a, b) => (b.likes - a.likes));
    }
  }
};

export const createBlog = (blog) => async (dispatch) => {
  const data = await blogsService.create(blog);
  dispatch({
    type: 'ADD_BLOG',
    data,
  });
};

export const likeBlog = (blog) => async (dispatch) => {
  await blogsService.update(blog.id,
    {
      ...blog,
      likes: blog.likes + 1,
    });
  dispatch({
    type: 'INCREMENT_LIKES',
    data: { id: blog.id },
  });
};

export const initialiseBlogs = () => async (dispatch) => {
  const data = await blogsService.getAll();
  dispatch({
    type: 'INIT_BLOGS',
    data,
  });
};

export const removeBlog = (blog) => async (dispatch) => {
  await blogsService.delete(blog.id);
  dispatch({
    type: 'DELETE_BLOG',
    data: { id: blog.id },
  });
};

export const commentBlog = (blog, comment) => async (dispatch) => {
  const updatedBlog = await blogsService.comment(blog, comment);
  dispatch({
    type: 'UPDATE_BLOG',
    data: { blog: updatedBlog },
  });
};

export default blogReducer;
