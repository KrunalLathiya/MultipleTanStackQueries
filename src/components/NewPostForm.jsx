// src/components/NewPostForm.jsx

import { useCreatePost } from '../hooks/useApi';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

const NewPostForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const mutation = useCreatePost();

    const onSubmit = async (data) => {
        await mutation.mutateAsync(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Title" {...register('title', { required: true })} fullWidth margin="normal" />
            <TextField label="Body" {...register('body', { required: true })} fullWidth margin="normal" multiline rows={4} />
            <Button type="submit" variant="contained" color="primary" disabled={mutation.isLoading}>
                {mutation.isLoading ? <CircularProgress size={24} /> : 'Create Post'}
            </Button>
            {mutation.isError && <Typography color="error">An error occurred: {mutation.error.message}</Typography>}
        </form>
    );
};

export default NewPostForm;
