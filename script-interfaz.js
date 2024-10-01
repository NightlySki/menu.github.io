// Referencias a los botones
const localModeButton = document.getElementById('local-mode');
const aiModeButton = document.getElementById('ai-mode');
const onlineModeButton = document.getElementById('online-mode');
const creditsButton = document.getElementById('credits');

// Almacenar partículas activas
let particles = [];

// Función para crear partículas
const createParticle = (x, y) => {
    const particle = {
        element: document.createElement('div'),
        size: Math.random() * 10 + 5,
        x,
        y,
        vx: (Math.random() - 0.5) * 2, // Velocidad en x
        vy: (Math.random() - 0.5) * 2, // Velocidad en y
    };

    particle.element.classList.add('particle');
    particle.element.style.width = `${particle.size}px`;
    particle.element.style.height = `${particle.size}px`;
    particle.element.style.left = `${particle.x}px`;
    particle.element.style.top = `${particle.y}px`;
    particle.element.style.backgroundColor = `rgba(255, 255, 0, ${Math.random()})`; // Color amarillo
    document.body.appendChild(particle.element);

    particles.push(particle);

    // Remover la partícula después de un tiempo
    setTimeout(() => {
        particle.element.remove();
        particles = particles.filter(p => p !== particle);
    }, 4000);
};

// Función para reproducir sonido
const playSound = () => {
    const confirmSound = document.getElementById('confirmSound');
    confirmSound.currentTime = 0; // Reiniciar el sonido
    confirmSound.play().catch(err => {
        console.error("Error al reproducir el sonido:", err);
    });
};

// Función para reproducir música de fondo
const playBackgroundMusic = () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play().catch(err => {
        console.error("Error al reproducir la música:", err);
    });
};

// Función para actualizar partículas
const updateParticles = () => {
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Colisiones con los bordes de la pantalla
        if (particle.x < 0 || particle.x > window.innerWidth) {
            particle.vx *= -1; // Invertir dirección
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
            particle.vy *= -1; // Invertir dirección
        }

        // Actualizar posición de la partícula
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
    });

    requestAnimationFrame(updateParticles); // Llamar a la función de actualización
};

// Funciones para cada modo de juego
const startLocalMode = () => {
    createParticle(event.clientX, event.clientY); // Crear partícula en la posición del clic
    playSound(); // Reproducir sonido
    window.location.href = 'https://nightlyski.github.io/local-mode.github.io/';
};

const startAIMode = () => {
    createParticle(event.clientX, event.clientY);
    playSound(); // Reproducir sonido
    console.log("Iniciando multijugador (IA)...");
};

const startOnlineMode = () => {
    createParticle(event.clientX, event.clientY);
    playSound(); // Reproducir sonido
    console.log("Buscando partida en línea...");
};

const showCredits = () => {
    createParticle(event.clientX, event.clientY);
    playSound(); // Reproducir sonido
    const creditsMessage = "Créditos:\nDesarrollado por [Tu Nombre]";
    alert(creditsMessage);
};

// Agregar eventos a los botones
localModeButton.addEventListener('click', () => {
    playBackgroundMusic(); // Reproducir música en el primer clic
    startLocalMode();
});

aiModeButton.addEventListener('click', () => {
    playBackgroundMusic(); // Reproducir música en el primer clic
    startAIMode();
});

onlineModeButton.addEventListener('click', () => {
    playBackgroundMusic(); // Reproducir música en el primer clic
    startOnlineMode();
});

creditsButton.addEventListener('click', () => {
    playBackgroundMusic(); // Reproducir música en el primer clic
    showCredits();
});

// Iniciar la actualización de partículas
requestAnimationFrame(updateParticles);

window.onload = function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.volume = 1.0; // Ajusta el volumen (0.0 a 1.0)
    backgroundMusic.play().catch(error => {
        console.error("Error al intentar reproducir la música:", error);
    });  }