import { updateUserLocation } from '../db/user/user.db.js';
import { getAllGameSessions } from '../session/game.session.js';
import { getUserBySocket, removeUser } from '../session/user.session.js';

export const onEnd = (socket) => async () => {
  console.log('클라이언트 연결이 종료되었습니다.');

  const user = getUserBySocket(socket);

  const { x, y } = user.getPosition();
  await updateUserLocation(user.id, x, y);

  const gameSession = getAllGameSessions()[0];
  gameSession.removeUser(user.id);
  removeUser(socket);
};
