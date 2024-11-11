import React, { useState } from 'react';
import { Box, TextField, Button, Alert, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              label="Due Date"
              value={dueDate}
              onChange={setDueDate}
              slotProps={{ textField: { fullWidth: true } }}
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
    </LocalizationProvider>
  );
};

export default AddTodo; 