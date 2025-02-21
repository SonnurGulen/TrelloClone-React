// components/Input/InputCard.jsx
import React, { useState } from 'react';
import { Paper, InputBase, Button, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const InputCard = ({ setOpen, onAddTask }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if (!title.trim()) return;
        onAddTask({
            title: title.trim(),
            content: content.trim(),
        });
        setTitle('');
        setContent('');
        setOpen(false);
    };

    return (
        <Paper 
            sx={{
                p: '0.5rem',
                margin: '0 1px',
                backgroundColor: '#fff',
            }}
        >
            <InputBase
                multiline
                fullWidth
                placeholder="Görev başlığı..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                    mb: 2,
                    p: 1,
                    backgroundColor: '#fff',
                    borderRadius: 1,
                }}
            />
            <InputBase
                multiline
                fullWidth
                placeholder="Görev içeriği..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{
                    mb: 2,
                    p: 1,
                    backgroundColor: '#fff',
                    borderRadius: 1,
                }}
                rows={3}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ 
                        mr: 1,
                        backgroundColor: '#5AAC44',
                        '&:hover': {
                            backgroundColor: '#519839',
                        },
                    }}
                >
                    Ekle
                </Button>
                <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default InputCard;