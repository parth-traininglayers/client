import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { TodoProvider } from './context/TodoContext';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TodoList from './components/TodoList';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TodoProvider>
          <CssBaseline />
          <Navbar />
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <TodoList />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Container>
        </TodoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
