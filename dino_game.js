const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let score; // 현재 점수
let scoreText; // 현재 점수 텍스트
let highscore; // 최고 점수
let highscoreText; // 최고 점수 텍스트
let dino; // 공룡
let gravity; // 중력값
let obstacles = []; // 장애물
let gameSpeed; // 게임 속도
let keys = {}; // 키 값

//이벤트 리스너 추가
document.addEventListener("keydown", function (evt) {
  keys[evt.code] = true;
});
document.addEventListener("keyup", function (evt) {
  keys[evt.code] = false;
});

class Dino {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;

    this.dy = 0; //점프를 위한
    this.jumpForce = 15; //
    this.originalHeight = h; //숙이기 전 높이
    this.grounded = false; //땅에 있는지 판단
    this.jumpTimer = 0; //점프 시간 체크를 위한 타이머 추가
  }
  a;

  Draw() {
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }

  Jump() {
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.dy = -this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.dy = -this.jumpForce - this.jumpTimer / 50;
    }
  }

  Animte() {
    //키 입력
    if (keys["Space"] || keys["KeyW"]) {
      this.Jump();
    } else {
      this.jumpTimer = 0;
    }

    if (keys["ShiftLeft"] || keys["KetS"]) {
      //왼쉬프트 or 키도드 S 입력시
      this.h = this.originalHeight / 2; //h를 절반으로 줄여서 숙인 것과 같은 효과
    } else {
      this.h = this.originalHeight;
    }

    this.y += this.dy; //위치 변경

    //중력적용
    if (this.y + this.h < canvas.height) {
      this.dy += gravity; //중력만큼 dy++
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.h; //바닥에 딱 붙어 있게 해줌
    }

    this.Draw();
  }
}

function Start() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.font = "20px sans-serif";

  gameSpeed = 3;
  gravity = 1;

  score = 0;
  highscore = 0;

  dino = new Dino(25, canvas.height - 150, 50, 50, "pink");
  requestAnimationFrame(Update);
}
function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dino.Animte();
}
Start();
