import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchPosts = async ({ pageParam = 1 }) => {
    const { data } = await api.get('/posts', { params: { _page: pageParam } });
    return data;
};

export const fetchPost = async (id) => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
};

export const fetchUsers = async () => {
    const { data } = await api.get('/users');
    return data;
};

export const createPost = async (newPost) => {
    const { data } = await api.post('/posts', newPost);
    return data;
};

export const updatePost = async (updatedPost) => {
    const { data } = await api.put(`/posts/${updatedPost.id}`, updatedPost);
    return data;
};
