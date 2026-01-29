const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

// Game constants
const GRAVITY = 0.5;
const FLAP_STRENGTH = -8;
const PIPE_SPEED = 3;
const PIPE_GAP = 150;
const PIPE_WIDTH = 60;

// Game state
let bird = {
    x: 50,
    y: canvas.height / 2,
    radius: 15,
    velocity: 0,
    color: '#ffff00'
};

let pipes = [];
let score = 0;
let gameRunning = false;
let animationId;

// 8-bit color palette
const colors = {
    background: '#000000',
    bird: '#ffff00',
    pipe: '#00ff00',
    score: '#00ff00'
};

// Draw functions
function drawBird() {
    ctx.fillStyle = bird.color;
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Add simple wing animation
    if (gameRunning) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(bird.x - 8, bird.y - 2, 4, 4);
    }
}

function drawPipe(pipe) {
    ctx.fillStyle = colors.pipe;
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, PIPE_WIDTH, canvas.height - pipe.bottom);
}

function drawScore() {
    ctx.fillStyle = colors.score;
    ctx.font = '24px Courier New';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawBackground() {
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Game logic
function updateBird() {
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;
    
    // Keep bird in bounds
    if (bird.y - bird.radius < 0) {
        bird.y = bird.radius;
        bird.velocity = 0;
    }
    if (bird.y + bird.radius > canvas.height) {
        bird.y = canvas.height - bird.radius;
        bird.velocity = 0;
    }
}

function updatePipes() {
    pipes = pipes.filter(pipe => {
        pipe.x -= PIPE_SPEED;
        return pipe.x + PIPE_WIDTH > 0;
    });
}

function checkCollisions() {
    // Check bird bounds
    if (bird.y - bird.radius < 0 || bird.y + bird.radius > canvas.height) {
        return true;
    }
    
    // Check pipe collisions
    for (let pipe of pipes) {
        if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + PIPE_WIDTH) {
            if (bird.y - bird.radius < pipe.top || bird.y + bird.radius > pipe.bottom) {
                return true;
            }
        }
        
        // Score increment
        if (bird.x === pipe.x + PIPE_WIDTH) {
            score++;
            scoreElement.textContent = score;
        }
    }
    
    return false;
}

function generatePipes() {
    const top = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
    const bottom = top + PIPE_GAP;
    pipes.push({
        x: canvas.width,
        top: top,
        bottom: bottom
    });
}

function gameLoop() {
    if (!gameRunning) return;
    
    drawBackground();
    drawScore();
    
    // Generate new pipes
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        generatePipes();
    }
    
    // Update and draw pipes
    updatePipes();
    pipes.forEach(drawPipe);
    
    // Update and draw bird
    updateBird();
    drawBird();
    
    // Check collisions
    if (checkCollisions()) {
        endGame();
        return;
    }
    
    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    gameRunning = true;
    score = 0;
    scoreElement.textContent = score;
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes = [];
    gameOverElement.style.display = 'none';
    gameLoop();
}

function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    finalScoreElement.textContent = score;
    gameOverElement.style.display = 'block';
}

function flap() {
    if (gameRunning) {
        bird.velocity = FLAP_STRENGTH;
    }
}

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        flap();
    }
});

canvas.addEventListener('click', flap);

restartBtn.addEventListener('click', startGame);

// Start the game initially
startGame();