document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('button-container');
    const alphabet = 'ABCDEFGHIJKLMNOPRSTW'; // Excluding Q, U, V, X, Y, Z
    const positions = [
        {row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}, {row: 0, col: 3}, {row: 0, col: 4}, {row: 0, col: 5}, // Top row
        {row: 1, col: 5}, {row: 2, col: 5}, {row: 3, col: 5}, {row: 4, col: 5}, {row: 5, col: 5}, // Right column
        {row: 5, col: 4}, {row: 5, col: 3}, {row: 5, col: 2}, {row: 5, col: 1}, {row: 5, col: 0}, // Bottom row
        {row: 4, col: 0}, {row: 3, col: 0}, {row: 2, col: 0}, {row: 1, col: 0}  // Left column
    ];

    const clickSound = document.getElementById('click-sound');
    let notimeSound = document.getElementById('next-sound');
    // Placeholder for real sound (iOS workaround)
    notimeSound.volume = 0.50;
    const nextSound = document.getElementById('next-sound');
    nextSound.volume = 0.30;
    const countdownTimer = document.getElementById('countdown-timer');
    const resetButton = document.getElementById('reset-button');
    const nextButton = document.getElementById('next-button');
    let countdown = 15;
    let countdownInterval;
    let countdownStarted = false;
    let firstTime = true

    const resetButtons = () => {
        const buttons = container.getElementsByTagName('button');
        for (let button of buttons) {
            button.classList.remove('pressed');
        }
        countdown = 15;
        countdownTimer.textContent = countdown;
        countdownStarted = false;
    };

    const startCountdown = () => {
        countdown = 15;
        countdownTimer.textContent = countdown;
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            if (countdownStarted) {
                countdown -= 1;
            }
            countdownTimer.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                notimeSound.play()
                countdownStarted = false;
            }
        }, 1000);
    };

    resetButton.addEventListener('click', resetButtons);

    nextButton.addEventListener('click', () => {
        nextSound.play();
        if (firstTime == true) {
            notimeSound.play();
            firstTime = false;
        }
        countdownStarted = true;
        // No assign real time over sound (iOS workaround)
        notimeSound = document.getElementById('notime-sound');
        startCountdown();
    });

    alphabet.split('').forEach((letter, index) => {
        const button = document.createElement('button');
        button.textContent = letter;
        if (index < positions.length) {
            button.style.gridRowStart = positions[index].row + 1;
            button.style.gridColumnStart = positions[index].col + 1;
        }
        button.addEventListener('click', () => {
            if (!button.classList.contains('pressed')) {
                if (countdown > 0) {
                    button.classList.add('pressed');
                    clickSound.play();
                }
            }
        });
        container.appendChild(button);
    });

    startCountdown();
});