// src/components/PostDetails.jsx


import { useParams } from '@tanstack/react-router';
import { Container, Typography, CircularProgress } from '@mui/material';
import { usePost } from '../hooks/useApi';

const PostDetails = () => {
    const { id } = useParams({ from: '/posts/$id' });

    const { data, error, isLoading } = usePost(id);

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">An error occurred: {error.message}</Typography>;

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                {data?.title}
            </Typography>
            <Typography variant="body1">{data?.body}</Typography>
        </Container>
    );
};

export default PostDetails;
