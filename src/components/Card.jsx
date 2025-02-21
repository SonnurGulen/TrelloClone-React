import React, { useState } from 'react';
import { Card as MuiCard, CardContent, Typography, IconButton, Box, Collapse } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Card({ id, title, content, onDelete, onUpdate }) {
  const [showDetails, setShowDetails] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Başlık ve içerik için kısaltma fonksiyonu
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <MuiCard
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{ 
        mb: 1,
        cursor: 'grab',
        '&:active': { cursor: 'grabbing' },
        backgroundColor: '#fff'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {truncateText(title, 30)}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => setShowDetails(!showDetails)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {!showDetails && content && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {truncateText(content, 50)}
          </Typography>
        )}

        <Collapse in={showDetails}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Tam Başlık:
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {title}
            </Typography>

            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Tam İçerik:
            </Typography>
            <Typography variant="body2">
              {content}
            </Typography>
          </Box>
        </Collapse>
      </CardContent>
    </MuiCard>
  );
}

export default Card;