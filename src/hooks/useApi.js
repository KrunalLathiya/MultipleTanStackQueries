// src/hooks/useApi.js

import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, fetchPost, fetchUsers, createPost, updatePost } from '../api';

export const usePosts = () => useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, pages) => (lastPage.length ? pages.length + 1 : undefined),
});

export const usePost = (id) => useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
});

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
});

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updatePost,
        onMutate: async (newPost) => {
            await queryClient.cancelQueries({ queryKey: ['post', newPost.id] });

            const previousPost = queryClient.getQueryData(['post', newPost.id]);
            queryClient.setQueryData(['post', newPost.id], newPost);

            return { previousPost };
        },
        onError: (err, newPost, context) => {
            queryClient.setQueryData(['post', newPost.id], context.previousPost);
        },
        onSettled: (newPost) => {
            queryClient.invalidateQueries({ queryKey: ['post', newPost.id] });
        },
    });
};