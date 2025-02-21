class BoardManager {
  static instance = null;
  
  constructor() {
    if (BoardManager.instance) {
      return BoardManager.instance;
    }
    this.boards = [];
    BoardManager.instance = this;
  }

  async getBoards() {
    try {
      const response = await fetch('http://localhost:3000/boards');
      return await response.json();
    } catch (error) {
      console.error('Error fetching boards:', error);
      return [];
    }
  }

  async updateBoard(board) {
    try {
      const response = await fetch(`http://localhost:3000/boards/${board.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating board:', error);
      throw error;
    }
  }
}

export const boardManager = new BoardManager();