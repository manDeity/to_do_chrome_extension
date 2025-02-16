function startConfetti() {
    let duration = 3 * 1000; // 3 seconds
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            spread: 100,
            origin: { y: 0.6 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
