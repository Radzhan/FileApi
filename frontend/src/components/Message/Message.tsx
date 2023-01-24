import { Alert, AlertTitle } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
    message: string;
    author: string;
    date: string;
}

const Message: React.FC<Props> = ({ message, author, date }) => {
    return (
        <Alert severity="info" sx={{my: 3}}>
            <AlertTitle><strong>{author}</strong> {dayjs(date).format('DD.MM.YYYY HH:mm:ss')}</AlertTitle>
            <strong>{message}</strong>
        </Alert>
    );
};

export default Message;