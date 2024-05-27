document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('button-container');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const positions = [
        {row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}, {row: 0, col: 3}, {row: 0, col: 4}, {row: 0, col: 5}, {row: 0, col: 6}, {row:, // Top row
        {row: 1, col: 7}, {row: 2, col: 7}, {row: 3, col: 7}, {row: 4, col: 7}, {row: 5, col: 7}, {row: 6, col: 7}, // Right column
        {row: 7, col: 7}, {row: 7, col: 6}, {row: 7, col: 5}, {row: 7, col: 4}, {row: 7, col: 3}, {row: 7, col: 2}, {row: 7, col: 1}, {row: 7, col: 0}, // Bottom row
        {row: 6, col: 0}, {row: 5, col: 0}, {row: 4, col: 0}, {row: 3, col: 0}, {row: 2, col: 0}, {row: 1, col: 0}  // Left column
    ];

    const clickSound = document.getElementById('click-sound');
    const countdownTimer = document.getElementById('countdown-timer');
    let countdown = 15;
    let countdownInterval;

    const resetButtons = () => {
        const buttons = container.getElementsByTagName('button');
        for (let button of buttons) {
            button.classList.remove('pressed');
        }
    };

    const startCountdown = () => {
        countdown = 15;
        countdownTimer.textContent = countdown;
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            countdown -= 1;
            countdownTimer.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                resetButtons();
                startCountdown();
            }
        }, 1000);
    };

    alphabet.split('').forEach((letter, index) => {
        const button = document.createElement('button');
        button.textContent = letter;
        if (index < positions.length) {
            button.style.gridRowStart = positions[index].row + 1;
            button.style.gridColumnStart = positions[index].col + 1;
        }
        button.addEventListener('click', () => {
            if (!button.classList.contains('pressed')) {
                button.classList.add('pressed');
                clickSound.play();
            }
        });
        container.appendChild(button);
    });

    startCountdown();
});
