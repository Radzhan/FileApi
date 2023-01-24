import React from 'react';
import '../../App.css';

interface Props {
    message: string;
    author: string;
}

const Message: React.FC<Props> = ({ message, author }) => {
    return (
        <div>
            <div className='message-block'>
                <span>{author}</span>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Message;