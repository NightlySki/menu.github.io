// gamepad.js

// Lista de botones en el menú
const menuButtons = document.querySelectorAll('.menu-button');
let currentIndex = 0; // Índice del botón seleccionado

// Función para actualizar la selección en el menú
function updateMenuSelection() {
    menuButtons.forEach((button, index) => {
        if (index === currentIndex) {
            button.classList.add('selected'); // Agrega clase para indicar selección
        } else {
            button.classList.remove('selected');
        }
    });
}

// Función para manejar el input del gamepad
function handleGamepadInput() {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0]; // Suponemos que solo usamos el primer gamepad

    if (gamepad) {
        // Comprobar si se ha presionado el botón hacia arriba o hacia abajo
        if (gamepad.axes[1] < -0.5) { // Eje Y - hacia arriba
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : menuButtons.length - 1;
            updateMenuSelection();
        } else if (gamepad.axes[1] > 0.5) { // Eje Y - hacia abajo
            currentIndex = (currentIndex < menuButtons.length - 1) ? currentIndex + 1 : 0;
            updateMenuSelection();
        }

        // Comprobar si se ha presionado el botón "X" (normalmente el botón 0)
        if (gamepad.buttons[0].pressed) {
            confirmSelection();
        }
    }
}

// Función para confirmar la selección
function confirmSelection() {
    const selectedButton = menuButtons[currentIndex];
    selectedButton.click(); // Simula un clic en el botón seleccionado
}

// Configuración del bucle de actualización
function gameLoop() {
    handleGamepadInput();
    requestAnimationFrame(gameLoop);
}

// Iniciar el bucle de juego
gameLoop();

// Inicializar la selección
updateMenuSelection();
