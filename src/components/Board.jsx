import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from './Card';
import InputContainer from './Input/InputContainer'
import { boardManager } from '../services/BoardManager';
import { idGenerator } from '../utils/idGenerator';

function Board({ id, title, cards = [], onUpdate }) {
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

  // Kart ekleme fonksiyonu
  const handleCardAdd = async (cardData) => {
    const newCard = {
      id: idGenerator.generateId('card'),
      title: cardData.title,
      content: cardData.content,
      comments: cardData.comments
    };

    const updatedBoard = {
      id,
      title,
      cards: [...cards, newCard]
    };

    await boardManager.updateBoard(updatedBoard);
    onUpdate();
  };

  // Kart silme fonksiyonu
  const handleCardDelete = async (cardId) => {
    const updatedBoard = {
      id,
      title,
      cards: cards.filter(card => card.id !== cardId)
    };

    await boardManager.updateBoard(updatedBoard);
    onUpdate();
  };

  // Kart güncelleme fonksiyonu
  const handleCardUpdate = async (updatedCard) => {
    const updatedCards = cards.map(card =>
      card.id === updatedCard.id ? updatedCard : card
    );

    const updatedBoard = {
      id,
      title,
      cards: updatedCards
    };

    await boardManager.updateBoard(updatedBoard);
    onUpdate();
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        width: 300,
        minHeight:'50vh',
        maxHeight: '80vh',
        overflowY: 'auto',
        p: 2,
        backgroundColor: '#EBECF0',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>

      {cards.map(card => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          content={card.content}
          comments={card.comments}
          onDelete={handleCardDelete}
          onUpdate={handleCardUpdate}
        />
      ))}

      <InputContainer onAddTask={handleCardAdd} />
    </Paper>
  );
}

export default Board;