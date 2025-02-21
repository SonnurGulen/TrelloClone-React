import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme, Typography } from '@mui/material';
import { boardManager } from './services/BoardManager';
import { idGenerator } from './utils/idGenerator';
import { 
  DndContext, 
  PointerSensor, 
  MouseSensor, 
  TouchSensor, 
  useSensor, 
  useSensors, 
  pointerWithin 
} from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import Board from './components/Board';

const theme = createTheme({
  palette: {
    background: {
      default: '#f4f5f7'
    }
  }
});

function App() {
  const [boards, setBoards] = useState([]);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Press delay of 0 makes the mouse sensor more responsive
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms makes the touch sensor more responsive
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    const fetchedBoards = await boardManager.getBoards();
    if (fetchedBoards.length > 0) {
      setBoards(fetchedBoards);
    } else {
      createDefaultBoards();
    }
  };

  const createDefaultBoards = async () => {
    const defaultBoards = [
      { id: idGenerator.generateId('board'), title: 'To Do', cards: [] },
      { id: idGenerator.generateId('board'), title: 'In Progress', cards: [] },
      { id: idGenerator.generateId('board'), title: 'Done', cards: [] }
    ];

    const createdBoards = await Promise.all(defaultBoards.map(board => boardManager.updateBoard(board)));
    setBoards(createdBoards);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    try {
      setBoards((currentBoards) => {
        const newBoards = [...currentBoards];

        const sourceBoardIndex = newBoards.findIndex(board => board.cards.some(card => card.id === activeId));
        let destinationBoardIndex = newBoards.findIndex(board => board.id === overId);

        if (destinationBoardIndex === -1) {
          destinationBoardIndex = newBoards.findIndex(board => board.cards.some(card => card.id === overId));
        }

        if (sourceBoardIndex === -1) return currentBoards;

        const sourceBoard = newBoards[sourceBoardIndex];
        const destinationBoard = newBoards[destinationBoardIndex];
        const draggedCard = sourceBoard.cards.find(card => card.id === activeId);

        sourceBoard.cards = sourceBoard.cards.filter(card => card.id !== activeId);

        if (sourceBoardIndex === destinationBoardIndex) {
          const overCardIndex = destinationBoard.cards.findIndex(card => card.id === overId);
          if (overCardIndex !== -1) {
            destinationBoard.cards.splice(overCardIndex, 0, { ...draggedCard, id: idGenerator.generateId('card') });
          } else {
            destinationBoard.cards.push({ ...draggedCard, id: idGenerator.generateId('card') });
          }
        } else {
          if (overId === destinationBoard.id) {
            destinationBoard.cards.push({ ...draggedCard, id: idGenerator.generateId('card') });
          } else {
            const overCardIndex = destinationBoard.cards.findIndex(card => card.id === overId);
            if (overCardIndex !== -1) {
              destinationBoard.cards.splice(overCardIndex, 0, { ...draggedCard, id: idGenerator.generateId('card') });
            } else {
              destinationBoard.cards.push({ ...draggedCard, id: idGenerator.generateId('card') });
            }
          }
        }

        // Update boards in database
        Promise.all([boardManager.updateBoard(sourceBoard), boardManager.updateBoard(destinationBoard)]);

        return newBoards;
      });
    } catch (error) {
      console.error('Card movement error:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100vw', overflowX: 'hidden', px: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
          <Typography variant="h4">React-Trello Clone</Typography>
        </Box>
        <DndContext 
          sensors={sensors} 
          collisionDetection={pointerWithin} 
          onDragEnd={handleDragEnd}
          autoScroll={true}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', width: '100%', py: 4, position: 'relative' }}>
            <SortableContext items={boards.map((board) => board.id)} strategy={horizontalListSortingStrategy}>
              {boards.map(
                (board) =>
                  board &&
                  board.id && (
                    <Board key={board.id} id={board.id} title={board.title} cards={board.cards} onUpdate={fetchBoards} />
                  )
              )}
            </SortableContext>
          </Box>
        </DndContext>
      </Box>
    </ThemeProvider>
  );
}

export default App;