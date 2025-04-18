import React, { useState, useEffect } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
}

// TODO: Fix the need for the props to change

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
    const [visible, setVisible] = useState(true);
    const style = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    useEffect(() => {
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [ message]);

    if (!visible) {
        return null;
    }

    return (
        <div id='notification' className={`fixed bottom-8 gap-5 flex right-5 md:right-10 border p-4 rounded-lg shadow-lg text-white ${style}`}>
            <p>{message}</p>
            <button onClick={() => setVisible(false)} className="float-right">X</button>
        </div>
    );
};

export default Notification;