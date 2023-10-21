const gameContainer = document.getElementById('gameContainer');
const scoreDisplay = document.getElementById('score');
let score = 0;

// Initialize the game grid
for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 40; j++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.id = `pixel${i * 40 + j}`;
        gameContainer.appendChild(pixel);
    }
}

// Initialize the snake
const snake = [
    { x: 20, y: 1 },
    { x: 20, y: 2 },
];
snake.forEach(segment => {
    const pixel = document.getElementById(`pixel${segment.x * 40 + segment.y}`);
    pixel.classList.add('snakeBodyPixel');
});

// Initialize food
let food = { x: 10, y: 10 };
const foodPixel = document.getElementById(`pixel${food.x * 40 + food.y}`);
foodPixel.classList.add('food');

// Initial direction of the snake
let dx = 0;
let dy = 1;

// Game loop
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        score += 10;
        scoreDisplay.innerText = score;
        generateFood();
    } else {
        // Remove the tail
        const tail = snake.pop();
        const tailPixel = document.getElementById(`pixel${tail.x * 40 + tail.y}`);
        tailPixel.classList.remove('snakeBodyPixel');
        
        snake.unshift(head);
    }

    // Check for collision with walls
    if (head.x < 0 || head.x >= 40 || head.y < 0 || head.y >= 40) {
        clearInterval(gameInterval);
        alert('Game over!');
    }

    // Check for collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(gameInterval);
            alert('Game over!');
        }
    }

    // Update the snake's appearance
    snake.forEach(segment => {
        const pixel = document.getElementById(`pixel${segment.x * 40 + segment.y}`);
        pixel.classList.add('snakeBodyPixel');
    });
}

function generateFood() {
    const x = Math.floor(Math.random() * 40);
    const y = Math.floor(Math.random() * 40);
    const foodPixel = document.getElementById(`pixel${x * 40 + y}`);

    // Check if the randomly generated position is occupied by the snake
    if (foodPixel.classList.contains('snakeBodyPixel')) {
        generateFood();
    } else {
        food = { x, y };
        foodPixel.classList.add('food');
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'ArrowDown':
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
        case 'ArrowLeft':
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'ArrowRight':
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
    }
});

generateFood(); // Initial food generation
const gameInterval = setInterval(moveSnake, 100); // Game loop
