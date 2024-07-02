import { createLocationPacket } from '../../utils/notification/game.notification.js';

const MAX_PLAYERS = 2;

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.state = 'waiting'; // 'waiting', 'inProgress'
  }

  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error('Game session is full');
    }
    this.users.push(user);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  getAllLocation(userId) {
    const locationData = this.users
      .filter((user) => user.id !== userId)
      .map((user) => {
        // const { x, y } = user.calculatePosition();
        const { x, y } = user.getPosition();
        return { id: user.id, x, y };
      });
    return createLocationPacket(locationData);
  }
}

export default Game;
