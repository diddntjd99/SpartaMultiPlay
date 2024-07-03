import { createLocationPacket } from '../../utils/notification/game.notification.js';

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.state = 'waiting'; // 'waiting', 'inProgress'
  }

  addUser(user) {
    this.users.push(user);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
  }

  getAllLocation() {
    const locationData = this.users.map((user) => {
      const { x, y } = user.calculatePosition();
      return { id: user.id, x, y };
    });

    return createLocationPacket(locationData);
  }
}

export default Game;
