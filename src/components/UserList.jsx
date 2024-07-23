// src/components/UserList.jsx

import { useUsers } from '../hooks/useApi';
import { CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';

const UserList = () => {
    const { data, isLoading, isError, error } = useUsers();

    if (isLoading) return <CircularProgress />;
    if (isError) return <Typography color="error">An error occurred: {error.message}</Typography>;

    return (
        <List>
            {data.map((user) => (
                <ListItem key={user.id}>
                    <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
            ))}
        </List>
    );
};

export default UserList;
