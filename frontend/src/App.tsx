import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderTable from './components/OrderTable';
import OrderDetails from './components/OrderDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/orders" element={<OrderTable />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
