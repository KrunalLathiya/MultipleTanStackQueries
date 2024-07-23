// src/router.jsx

import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';

import App from './App';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import NewPostForm from './components/NewPostForm';
import UserList from './components/UserList';

const rootRoute = createRootRoute({
    component: App,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: PostList,
});

const postRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'posts/$id',
    component: PostDetails,
});

const newPostRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'new-post',
    component: NewPostForm,
});

const usersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: 'users',
    component: UserList,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    postRoute,
    newPostRoute,
    usersRoute,
]);

const router = createRouter({ routeTree });

export default router;