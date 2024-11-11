import React, { useState } from 'react';
import {
  Paper,
  Checkbox,
  Typography,
  IconButton,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { Edit, Delete, Event } from '@mui/icons-material';
import { format } from 'date-fns';
import { useTodo } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { toggleTodo, editTodo, deleteTodo } = useTodo();

  const handleToggle = () => {
    toggleTodo(todo._id, !todo.completed);
  };

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      editTodo(todo._id, editText);
    }
    setEditDialogOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      deleteTodo(todo._id);
    }
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          mb: 1,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: todo.completed ? 'action.hover' : 'background.paper'
        }}
      >
        <Checkbox checked={todo.completed} onChange={handleToggle} />
        <Box sx={{ flex: 1, ml: 2 }}>
          <Typography
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'text.secondary' : 'text.primary'
            }}
          >
            {todo.text}
          </Typography>
          {todo.dueDate && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Event fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                Due: {format(new Date(todo.dueDate), 'PPP')}
              </Typography>
            </Box>
          )}
        </Box>
        <Box>
          <IconButton onClick={() => setEditDialogOpen(true)}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Box>
      </Paper>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoItem; 