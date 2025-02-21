const API_URL = 'http://localhost:3000';

export const getBoards = async () => {
  try {
    const response = await fetch(`${API_URL}/boards`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Boards fetch error:', error);
    return [];
  }
};

export const updateBoard = async (board) => {
  try {
    const response = await fetch(`${API_URL}/boards/${board.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(board),
    });
    return await response.json();
  } catch (error) {
    console.error('Board update error:', error);
    throw error;
  }
};

export const createBoard = async (board) => {
  try {
    const response = await fetch(`${API_URL}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(board),
    });
    return await response.json();
  } catch (error) {
    console.error('Board creation error:', error);
    throw error;
  }
};

