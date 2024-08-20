import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 

interface Order {
  _id: string;
  orderName: string;
  orderItems: string[];
  status: string;
}

function OrderDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetailOrder = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/orders/${id}`
        );
        setOrder(response.data);
      } catch (error) {
        setError("Error fetching order details" + error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetailOrder();
    }
  }, [id]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (!order) {
    return <Typography variant="h6">No order found</Typography>;
  }

  return (
    <Box>
         <Box sx={{ display: "flex", alignItems: "center", mb: 2, p: 2}}>
          <ArrowBackIcon
            onClick={() => navigate("/orders")}
            sx={{ cursor: "pointer", mr: 1,  }}
          />
          <Typography
            variant="button"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/orders")}
          >
            Back to Orders
          </Typography>
        </Box>
      <Box
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Order Details
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: 3, borderRadius: 2, maxWidth: 800, width: "100%" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Field
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
                <TableCell>{order._id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Order Name</TableCell>
                <TableCell>{order.orderName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Order Items</TableCell>
                <TableCell>{order.orderItems.join(", ")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default OrderDetails;
