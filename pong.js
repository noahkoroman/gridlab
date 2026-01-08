// Pong Game Logic for Max for Live
autowatch = 1;

// Game state
var ball = {x: 250, y: 150, vx: 3, vy: -2, size: 10};
var paddle1 = {x: 10, y: 125, width: 10, height: 50};
var paddle2 = {x: 480, y: 125, width: 10, height: 50};
var score1 = 0;
var score2 = 0;
var gameWidth = 500;
var gameHeight = 300;

// Game update function
function update() {
	// Move ball
	ball.x += ball.vx;
	ball.y += ball.vy;

	// Ball collision with top/bottom walls
	if (ball.y <= 0 || ball.y >= gameHeight) {
		ball.vy *= -1;
		outlet(3, "bang"); // Sound trigger
	}

	// Ball collision with paddles
	// Left paddle
	if (ball.x <= paddle1.x + paddle1.width &&
	    ball.y >= paddle1.y &&
	    ball.y <= paddle1.y + paddle1.height &&
	    ball.vx < 0) {
		ball.vx *= -1;
		var hitPos = (ball.y - paddle1.y) / paddle1.height;
		ball.vy = (hitPos - 0.5) * 6; // Angle depends on hit position
		outlet(3, "bang"); // Sound trigger
	}

	// Right paddle
	if (ball.x >= paddle2.x - ball.size &&
	    ball.y >= paddle2.y &&
	    ball.y <= paddle2.y + paddle2.height &&
	    ball.vx > 0) {
		ball.vx *= -1;
		var hitPos = (ball.y - paddle2.y) / paddle2.height;
		ball.vy = (hitPos - 0.5) * 6;
		outlet(3, "bang"); // Sound trigger
	}

	// Scoring
	if (ball.x < 0) {
		score2++;
		resetBall();
		outlet(2, score1, score2); // Score update
		outlet(4, "bang"); // Score sound
	}
	if (ball.x > gameWidth) {
		score1++;
		resetBall();
		outlet(2, score1, score2);
		outlet(4, "bang");
	}

	// Clamp ball position
	ball.y = Math.max(0, Math.min(gameHeight, ball.y));

	// Output ball position
	outlet(0, ball.x, ball.y);

	// Output paddle positions for rendering
	outlet(1, paddle1.y, paddle2.y);
}

function resetBall() {
	ball.x = gameWidth / 2;
	ball.y = gameHeight / 2;
	ball.vx = (Math.random() > 0.5 ? 3 : -3);
	ball.vy = (Math.random() - 0.5) * 4;
}

// Paddle control
function paddle1_move(val) {
	paddle1.y += val;
	paddle1.y = Math.max(0, Math.min(gameHeight - paddle1.height, paddle1.y));
}

function paddle2_move(val) {
	paddle2.y += val;
	paddle2.y = Math.max(0, Math.min(gameHeight - paddle2.height, paddle2.y));
}

// Reset game
function reset() {
	score1 = 0;
	score2 = 0;
	resetBall();
	paddle1.y = 125;
	paddle2.y = 125;
	outlet(2, score1, score2);
}

// Initialize
function loadbang() {
	reset();
}
