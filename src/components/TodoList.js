import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useTodo } from '../context/TodoContext';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, loading, error, fetchTodos } = useTodo();
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: {
      start: null,
      end: null
    },
    search: ''
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    if (filters.status === 'completed' && !todo.completed) return false;
    if (filters.status === 'active' && todo.completed) return false;

    if (filters.dateRange.start && new Date(todo.createdAt) < filters.dateRange.start) return false;
    if (filters.dateRange.end && new Date(todo.createdAt) > filters.dateRange.end) return false;

    if (filters.search && !todo.text.toLowerCase().includes(filters.search.toLowerCase())) return false;

    return true;
  });

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>Filters</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              selected={filters.dateRange.start}
              onChange={(date) => setFilters({
                ...filters,
                dateRange: { ...filters.dateRange, start: date }
              })}
              placeholderText="Start date"
              dateFormat="MMMM d, yyyy"
              className="form-control"
              customInput={
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Start Date"
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              selected={filters.dateRange.end}
              onChange={(date) => setFilters({
                ...filters,
                dateRange: { ...filters.dateRange, end: date }
              })}
              placeholderText="End date"
              dateFormat="MMMM d, yyyy"
              className="form-control"
              customInput={
                <TextField
                  fullWidth
                  variant="outlined"
                  label="End Date"
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search todos"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </Grid>
        </Grid>
      </Paper>

      <AddTodo />

      <Box sx={{ mt: 2 }}>
        {filteredTodos.length === 0 ? (
          <Typography>No todos found</Typography>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))
        )}
      </Box>
    </Box>
  );
};

export default TodoList; 