import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const socket = io("http://localhost:3000"); // Connect to backend

interface Order {
  _id: string;
  orderName: string;
  orderItems: string[];
  status: string;
}

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("http://localhost:3000/api/orders");
      setOrders(response.data);
      console.log(response.data);
    };
    fetchOrders();

    socket.on("newOrder", (newOrder: Order) => {
      setOrders((prevOrders) => [...prevOrders, newOrder]);
    });

    // Listen for order updates
    socket.on("orderUpdated", (updatedOrder: Order) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    // Listen for order deletions
    socket.on("orderDeleted", (deletedOrderId: string) => {
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== deletedOrderId)
      );
    });

    // Cleanup 
    return () => {
      socket.off("newOrder");
      socket.off("orderUpdated");
      socket.off("orderDeleted");
    };
  }, []);

  return (
    <Box sx={{ padding: 2, width: "100%", overflowX: "auto" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 2 }}
      >
        Orders Dashboard
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          marginBottom: 2,
          padding: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Order Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Order Items
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order._id}
                component={Link}
                to={`/orders/${order._id}`}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    backgroundColor: "#f5f5f5", 
                  },
                }}
                style={{ cursor: "pointer" }} 
              >
                <TableCell sx={{ padding: "16px", fontSize: "0.9rem" }}>
                  <Link
                    to={`/orders/${order._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {order.orderName}
                  </Link>
                </TableCell>
                <TableCell sx={{ padding: "16px", fontSize: "0.9rem" }}>
                  {order.orderItems.join(", ")}
                </TableCell>
                <TableCell sx={{ padding: "16px", fontSize: "0.9rem" }}>
                  {order.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTable;
