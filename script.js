// Canvas setup
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Mouse position
const mouse = {
    x: null,
    y: null,
    radius: 150
};

// Track mouse movement
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 1 + 1; // Very small dots (1-2px)
        this.density = (Math.random() * 30) + 10;
        this.vx = Math.random() * 0.5 - 0.25; // Gentle floating velocity
        this.vy = Math.random() * 0.5 - 0.25;
    }

    draw() {
        ctx.fillStyle = '#000000'; // Black dots
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        // Gentle floating animation
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Wrap around screen edges
        if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseX > canvas.width) this.baseX = 0;
        if (this.baseY < 0) this.baseY = canvas.height;
        if (this.baseY > canvas.height) this.baseY = 0;

        // Mouse interaction - attract to cursor
        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let maxDistance = mouse.radius;

            if (distance < maxDistance) {
                // Attract towards mouse
                let force = (maxDistance - distance) / maxDistance;
                let directionX = dx / distance;
                let directionY = dy / distance;

                // Add orbital motion
                let angle = Math.atan2(dy, dx);
                let orbitalForce = force * 0.3;

                this.x += directionX * force * 3 + Math.cos(angle + Math.PI / 2) * orbitalForce;
                this.y += directionY * force * 3 + Math.sin(angle + Math.PI / 2) * orbitalForce;
            } else {
                // Return to base position smoothly
                let returnSpeed = 0.05;
                this.x += (this.baseX - this.x) * returnSpeed;
                this.y += (this.baseY - this.y) * returnSpeed;
            }
        } else {
            // No mouse interaction - stay at base position
            let returnSpeed = 0.05;
            this.x += (this.baseX - this.x) * returnSpeed;
            this.y += (this.baseY - this.y) * returnSpeed;
        }

        this.draw();
    }
}

// Create particle array
let particleArray = [];

function init() {
    particleArray = [];
    // Create a grid of particles with higher density
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 3000); // Higher density

    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particleArray.push(new Particle(x, y));
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }

    requestAnimationFrame(animate);
}

// Initialize and start animation
init();
animate();

// Reinitialize on window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    init();
});

// Reset mouse position when cursor leaves window
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Email notification functionality
document.getElementById('notifyBtn').addEventListener('click', () => {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();

    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Simple email validation
        alert('Thank you! We\'ll notify you when we launch.');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
});
