class User {
  constructor(id, playerId, latency, frame, socket) {
    this.id = id;
    this.playerId = playerId;
    this.latency = latency;
    this.frame = 1 / frame;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.speed = 3;
    this.lastUpdateTime = Date.now();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  updateDirection(x, y) {
    this.directionX = x;
    this.directionY = y;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  // 추측항법을 사용하여 위치를 추정하는 메서드
  calculatePosition() {
    const timeDiff = this.latency / 1000; // 레이턴시를 초 단위로 계산
    const distance = this.speed * this.frame + this.speed * this.frame * timeDiff;

    this.x = this.x + distance * this.directionX;
    this.y = this.y + distance * this.directionY;

    // x, y 축에서 이동한 거리 계산
    return {
      x: this.x,
      y: this.y,
    };
  }
}

export default User;
