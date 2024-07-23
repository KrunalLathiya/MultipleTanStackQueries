// src/components/PostList.jsx

import { usePosts } from '../hooks/useApi';
import {
    CircularProgress, List, ListItemButton,
    ListItemText, Button, Typography
} from '@mui/material';
import { Link } from '@tanstack/react-router';

const PostList = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = usePosts();

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography color="error">An error occurred: {error.message}</Typography>;

    return (
        <div>
            <List>
                {data.pages.map((page) =>
                    page.map((post) => (
                        <ListItemButton component={Link} to={`/posts/${post.id}`} key={post.id}>
                            <ListItemText primary={post.title} />
                        </ListItemButton>
                    ))
                )}
            </List>
            <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'No more posts'}
            </Button>
        </div>
    );
};

export default PostList;
