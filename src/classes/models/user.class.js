class User {
  constructor(id, playerId, latency, socket) {
    this.id = id;
    this.playerId = playerId;
    this.latency = latency;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.lastUpdateTime = Date.now();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  // 추측항법을 사용하여 위치를 추정하는 메서드
  calculatePosition() {
    const timeDiff = this.latency / 1000; // 레이턴시를 초 단위로 계산
    const speed = 1; // 속도 고정
    const distance = speed * timeDiff;

    // x, y 축에서 이동한 거리 계산
    return {
      x: this.x + distance,
      y: this.y,
    };
  }
}

export default User;
