import { addUser, getUserById } from '../../session/user.session.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { createUser, findUserByDeviceID, updateUserLogin } from '../../db/user/user.db.js';
import { getAllGameSessions } from '../../session/game.session.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency, frame } = payload;
    let user = await findUserByDeviceID(deviceId);

    if (!user) {
      user = await createUser(deviceId);
    } else {
      await updateUserLogin(user.id);
    }

    const { x, y } = user;
    addUser(deviceId, playerId, latency, frame, socket);

    user = getUserById(deviceId);
    const gameSession = getAllGameSessions()[0];
    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, '게임 세션을 찾을 수 없습니다.');
    }

    const existUser = gameSession.getUser(user.id);
    if (!existUser) {
      gameSession.addUser(user);
    }

    const newX = x ? x : 0;
    const newY = y ? y : 0;

    user.updatePosition(newX, newY);

    // 유저 정보 응답 생성
    const initialResponse = createResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userI: user.id, x: newX, y: newY },
      deviceId,
    );

    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default initialHandler;
