// components/Input/InputContainer.jsx
import { Collapse, Paper, Typography, Box } from '@mui/material'
import React, { useState } from 'react'
import InputCard from './InputCard'

const InputContainer = ({ onAddTask }) => {
    const [open, setOpen] = useState(false)

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Collapse in={open}>
                <InputCard 
                    setOpen={setOpen} 
                    onAddTask={onAddTask} 
                />
            </Collapse>

            <Collapse in={!open}>
                <Paper 
                    onClick={() => setOpen(true)}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: "start",
                        borderRadius: 1,
                        px: 2,
                        py: 1,
                        fontSize: "1rem", 
                        cursor: "pointer",
                        backgroundColor: '#ffffff3d',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: '#ffffff52',
                        }
                    }}
                >
                    <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                        + Yeni görev ekle
                    </Typography>
                </Paper>
            </Collapse>
        </Box>
    )
}

export default InputContainer;