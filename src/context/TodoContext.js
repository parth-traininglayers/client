import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Fetch all todos
    const fetchTodos = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const response = await api.get('/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTodos(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Error fetching todos');
        } finally {
            setLoading(false);
        }
    };

    // Add todo
    const addTodo = async (text, listId) => {
        try {
            const response = await api.post('/todos', { text, list: listId }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTodos([response.data, ...todos]);
        } catch (error) {
            setError(error.response?.data?.message || 'Error adding todo');
            throw error;
        }
    };

    // Toggle todo completion
    const toggleTodo = async (id, completed) => {
        try {
            const response = await api.put(`/todos/${id}`, { completed }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTodos(todos.map(todo => 
                todo._id === id ? response.data : todo
            ));
        } catch (error) {
            setError(error.response?.data?.message || 'Error updating todo');
            throw error;
        }
    };

    // Edit todo
    const editTodo = async (id, text) => {
        try {
            const response = await api.put(`/todos/${id}`, { text }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTodos(todos.map(todo => 
                todo._id === id ? response.data : todo
            ));
        } catch (error) {
            setError(error.response?.data?.message || 'Error updating todo');
            throw error;
        }
    };

    // Delete todo
    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todos/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            setError(error.response?.data?.message || 'Error deleting todo');
            throw error;
        }
    };

    return (
        <TodoContext.Provider value={{
            todos,
            error,
            loading,
            fetchTodos,
            addTodo,
            toggleTodo,
            editTodo,
            deleteTodo
        }}>
            {children}
        </TodoContext.Provider>
    );
}; 