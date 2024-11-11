import React, { useState } from 'react';
import { Box, TextField, Button, Alert, Grid } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useTodo } from '../context/TodoContext';

const AddTodo = () => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [error, setError] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Todo text cannot be empty');
      return;
    }
    try {
      await addTodo(text, dueDate);
      setText('');
      setDueDate(null);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new todo..."
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePicker
            selected={dueDate}
            onChange={date => setDueDate(date)}
            placeholderText="Select due date"
            dateFormat="MMMM d, yyyy"
            className="form-control"
            customInput={
              <TextField
                fullWidth
                variant="outlined"
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ height: '100%' }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddTodo; 