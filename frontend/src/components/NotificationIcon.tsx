import React, { useState, useEffect } from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000"); // Ensure the backend URL is correct

const Notification: React.FC = () => {
  const [newOrders, setNewOrders] = useState<number>(0);

  useEffect(() => {

    socket.on('newOrder', () => {
      setNewOrders(prev => prev + 1);
    });

    return () => {
      socket.off('newOrder');
    };
  }, []);

  const handleClick = () => {
    setNewOrders(0);
  };

  return (
    <IconButton color="inherit" onClick={handleClick}>
      <Badge badgeContent={newOrders} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default Notification;
