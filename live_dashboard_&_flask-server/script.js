function createMatrixGrid() {
            const matrices = document.querySelectorAll('.matrix');
            
            matrices.forEach(matrix => {
                for (let i = 0; i < 64; i++) {
                    const led = document.createElement('div');
                    led.className = 'led';
                    matrix.appendChild(led);
                }
            });
        }
        
        // Initialize the matrix visualization
        createMatrixGrid();
        
        // Connect to server function
       function checkServerConnection() {
    const host = document.getElementById('serverHost').value.trim();
    const port = document.getElementById('serverPort').value.trim();
    const serverUrl = `http://${host}:${port}`;
    const connectionStatus = document.getElementById('connectionStatus');

    fetch(`${serverUrl}/health_check`, { method: 'GET' })
        .then(response => {
            if (response.ok) {
                connectionStatus.textContent = 'Connected to server';
                connectionStatus.className = 'connection-status connected';
                return;
            }
            throw new Error('Server connection failed');
        })
        .catch(error => {
            connectionStatus.textContent = 'Disconnected from server';
            connectionStatus.className = 'connection-status disconnected';
        });
}

        // Check connection initially and every 10 seconds
        checkServerConnection();
        setInterval(checkServerConnection, 10000);
        
        // Handle preset buttons
        document.querySelectorAll('.preset-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.getElementById('message').value = button.dataset.text;
            });
        });
        
        // Font definition (5x7 pixels for each character within 8x8 grid)
        const font = {
            // Uppercase letters
            'A': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            'B': [
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0]
            ],
            'C': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            'D': [
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0]
            ],
            'E': [
                [1,1,1,1,1],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,1]
            ],
            'F': [
                [1,1,1,1,1],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0]
            ],
            'G': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,0],
                [1,0,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            'H': [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            'I': [
                [1,1,1],
                [0,1,0],
                [0,1,0],
                [0,1,0],
                [0,1,0],
                [0,1,0],
                [1,1,1]
            ],
            'J': [
                [0,0,1,1,1],
                [0,0,0,1,0],
                [0,0,0,1,0],
                [0,0,0,1,0],
                [1,0,0,1,0],
                [1,0,0,1,0],
                [0,1,1,0,0]
            ],
            'K': [
                [1,0,0,0,1],
                [1,0,0,1,0],
                [1,0,1,0,0],
                [1,1,0,0,0],
                [1,0,1,0,0],
                [1,0,0,1,0],
                [1,0,0,0,1]
            ],
            'L': [
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,1]
            ],
            'M': [
                [1,0,0,0,1],
                [1,1,0,1,1],
                [1,0,1,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            'N': [
                [1,0,0,0,1],
                [1,1,0,0,1],
                [1,0,1,0,1],
                [1,0,0,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            'O': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            'P': [
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0]
            ],
            'Q': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,1,0,1],
                [1,0,0,1,0],
                [0,1,1,0,1]
            ],
            'R': [
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
                [1,0,1,0,0],
                [1,0,0,1,0],
                [1,0,0,0,1]
            ],
            'S': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,0],
                [0,1,1,1,0],
                [0,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            'T': [
                [1,1,1,1,1],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0]
            ],
            'U': [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            'V': [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,1,0,1,0],
                [0,0,1,0,0]
            ],
            'W': [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,1,0,1],
                [1,1,0,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            'X': [
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,1,0,1,0],
                [1,0,0,0,1]
            ],
            'Y': [
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0]
            ],
            'Z': [
                [1,1,1,1,1],
                [0,0,0,0,1],
                [0,0,0,1,0],
                [0,0,1,0,0],
                [0,1,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,1]
            ],
            '0': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,1,1],
                [1,0,1,0,1],
                [1,1,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            '1': [
                [0,0,1,0,0],
                [0,1,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,1,1,1,0]
            ],
            '2': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [0,0,0,0,1],
                [0,0,1,1,0],
                [0,1,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,1]
            ],
            '3': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [0,0,0,0,1],
                [0,0,1,1,0],
                [0,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            '4': [
                [0,0,0,1,0],
                [0,0,1,1,0],
                [0,1,0,1,0],
                [1,0,0,1,0],
                [1,1,1,1,1],
                [0,0,0,1,0],
                [0,0,0,1,0]
            ],
            '5': [
                [1,1,1,1,1],
                [1,0,0,0,0],
                [1,1,1,1,0],
                [0,0,0,0,1],
                [0,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            '6': [
                [0,1,1,1,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            '7': [
                [1,1,1,1,1],
                [0,0,0,0,1],
                [0,0,0,1,0],
                [0,0,1,0,0],
                [0,1,0,0,0],
                [0,1,0,0,0],
                [0,1,0,0,0]
            ],
            '8': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            '9': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,1],
                [0,0,0,0,1],
                [0,0,0,0,1],
                [0,1,1,1,0]
            ],
            ' ': [
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            '.': [
                [0],
                [0],
                [0],
                [0],
                [0],
                [0],
                [1]
            ],
            ',': [
                [0],
                [0],
                [0],
                [0],
                [0],
                [1],
                [1]
            ],
            '!': [
                [1],
                [1],
                [1],
                [1],
                [1],
                [0],
                [1]
            ],
            '?': [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [0,0,0,1,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,0,0,0],
                [0,0,1,0,0]
            ],
            // Lowercase letters
            'a': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,1,0],
                [0,0,0,0,1],
                [0,1,1,1,1],
                [1,0,0,0,1],
                [0,1,1,1,1]
            ],
            'b': [
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0]
            ],
            'c': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,1,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            'd': [
                [0,0,0,0,1],
                [0,0,0,0,1],
                [0,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,1]
            ],
            'e': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,0,0,0],
                [0,1,1,1,0]
            ],
            'f': [
                [0,0,1,1,0],
                [0,1,0,0,0],
                [1,1,1,0,0],
                [0,1,0,0,0],
                [0,1,0,0,0],
                [0,1,0,0,0],
                [0,1,0,0,0]
            ],
            'g': [
                [0,0,0,0,0],
                [0,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,1],
                [0,0,0,0,1],
                [0,1,1,1,0]
            ],
            'h': [
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            'i': [
                [0,1,0],
                [0,0,0],
                [1,1,0],
                [0,1,0],
                [0,1,0],
                [0,1,0],
                [1,1,1]
            ],
            'j': [
                [0,0,1],
                [0,0,0],
                [0,1,1],
                [0,0,1],
                [0,0,1],
                [1,0,1],
                [0,1,0]
            ],
            'k': [
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,1,0],
                [1,0,1,0,0],
                [1,1,0,0,0],
                [1,0,1,0,0],
                [1,0,0,1,0]
            ],
            'l': [
                [1,1,0],
                [0,1,0],
                [0,1,0],
                [0,1,0],
                [0,1,0],
                [0,1,0],
                [1,1,1]
            ],
            'm': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,1,0,1,0],
                [1,0,1,0,1],
                [1,0,1,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            'n': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
            ],
            'o': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
            ],
            'p': [
                [0,0,0,0,0],
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
                [1,0,0,0,0],
                [1,0,0,0,0]
            ],
            'q': [
                [0,0,0,0,0],
                [0,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,1],
                [0,0,0,0,1],
                [0,0,0,0,1]
            ],
            'r': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,0,1,1,0],
                [1,1,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0]
            ],
            's': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,1,0],
                [1,0,0,0,0],
                [0,1,1,1,0],
                [0,0,0,0,1],
                [1,1,1,1,0]
            ],
            't': [
                [0,1,0,0,0],
                [0,1,0,0,0],
                [1,1,1,0,0],
                [0,1,0,0,0],
                [0,1,0,0,0],
                [0,1,0,0,1],
                [0,0,1,1,0]
            ],
            'u': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,1,1],
                [0,1,1,0,1]
            ],
            'v': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,0,1,0,0]
            ],
            'w': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,1,0,1],
                [1,0,1,0,1],
                [0,1,0,1,0]
            ],
            'x': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,0,1,0,0],
                [0,1,0,1,0],
                [1,0,0,0,1]
            ],
            'y': [
                [0,0,0,0,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,1],
                [0,0,0,0,1],
                [0,0,0,1,0],
                [0,1,1,0,0]
            ],
            'z': [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,1,1,1,1],
                [0,0,0,1,0],
                [0,0,1,0,0],
                [0,1,0,0,0],
                [1,1,1,1,1]
            ]
        };

        // Helper functions
        function clearMatrix(matrix) {
            const leds = matrix.querySelectorAll('.led');
            leds.forEach(led => {
                led.classList.remove('active');
            });
        }
        
        function setLedState(matrix, x, y, state) {
            if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                const index = y * 8 + x;
                const led = matrix.querySelectorAll('.led')[index];
                if (state) {
                    led.classList.add('active');
                } else {
                    led.classList.remove('active');
                }
            }
        }

        // Animation functions
        function scrollLeftAnimation(matrices, speed) {
            // Total width of all matrices (each 8 LEDs wide)
            const totalMatrixWidth = matrices.length * 8;
            let position = totalMatrixWidth; // Start just off the right edge
            
            return setInterval(() => {
                // Clear all matrices
                matrices.forEach(clearMatrix);
                
                const text = document.getElementById('message').value || "Hello World";
                let currentX = position;
                
                // Draw each character at its current position
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const charPattern = font[char] || font[' '];
                    const charWidth = charPattern[0].length;
                    
                    // If the character is within view of any matrix, draw it
                    if (currentX < totalMatrixWidth && currentX + charWidth > 0) {
                        for (let y = 0; y < 7; y++) {
                            for (let x = 0; x < charWidth; x++) {
                                // Calculate which matrix and position this pixel belongs to
                                const globalX = currentX + x;
                                if (globalX >= 0 && globalX < totalMatrixWidth && charPattern[y] && charPattern[y][x]) {
                                    const matrixIndex = Math.floor(globalX / 8);
                                    const matrixX = globalX % 8;
                                    
                                    if (matrixIndex >= 0 && matrixIndex < matrices.length) {
                                        setLedState(matrices[matrixIndex], matrixX, y, true);
                                    }
                                }
                            }
                        }
                    }
                    
                    currentX += charWidth + 1; // Add spacing between characters
                }
                
                // Move the text to the left
                position--;
                
                // Calculate total text width
                let textWidth = 0;
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const charPattern = font[char] || font[' '];
                    textWidth += charPattern[0].length + 1; // Width + spacing
                }
                
                // If the entire text has moved off screen to the left, reset position
                if (position < -textWidth) {
                    position = totalMatrixWidth;
                }
            }, speed);
        }
        
        function scrollRightAnimation(matrices, speed) {
            // Total width of all matrices (each 8 LEDs wide)
            const totalMatrixWidth = matrices.length * 8;
            let position = -getTextWidth(); // Start just off the left edge
            
            return setInterval(() => {
                // Clear all matrices
                matrices.forEach(clearMatrix);
                
                const text = document.getElementById('message').value || "Hello World";
                let currentX = position;
                
                // Draw each character at its current position
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const charPattern = font[char] || font[' '];
                    const charWidth = charPattern[0].length;
                    
                    // If the character is within view of any matrix, draw it
                    if (currentX < totalMatrixWidth && currentX + charWidth > 0) {
                        for (let y = 0; y < 7; y++) {
                            for (let x = 0; x < charWidth; x++) {
                                // Calculate which matrix and position this pixel belongs to
                                const globalX = currentX + x;
                                if (globalX >= 0 && globalX < totalMatrixWidth && charPattern[y] && charPattern[y][x]) {
                                    const matrixIndex = Math.floor(globalX / 8);
                                    const matrixX = globalX % 8;
                                    
                                    if (matrixIndex >= 0 && matrixIndex < matrices.length) {
                                        setLedState(matrices[matrixIndex], matrixX, y, true);
                                    }
                                }
                            }
                        }
                    }
                    
                    currentX += charWidth + 1; // Add spacing between characters
                }
                
                // Move the text to the right
                position++;
                
                // If the entire text has moved off screen to the right, reset position
                if (position > totalMatrixWidth) {
                    position = -getTextWidth();
                }
            }, speed);
            
            // Helper function to calculate text width
            function getTextWidth() {
                const text = document.getElementById('message').value || "Hello World";
                let textWidth = 0;
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    const charPattern = font[char] || font[' '];
                    textWidth += charPattern[0].length + 1; // Width + spacing
                }
                return textWidth;
            }
        }
        
        function scrollUpAnimation(text, matrices, speed) {
            const totalMatrixCount = matrices.length;
            
            // Display one character per matrix, scrolling up through all characters
            let charIndex = 0;
            let verticalPosition = 8; // Start at bottom (8 rows down)
            
            return setInterval(() => {
                // Clear all matrices
                matrices.forEach(clearMatrix);
                
                // Display current sequence of characters
                for (let m = 0; m < totalMatrixCount; m++) {
                    const charPos = (charIndex + m) % text.length;
                    const char = text[charPos];
                    const charPattern = font[char] || font[' '];
                    const charWidth = charPattern[0].length;
                    
                    // Center the character horizontally
                    const xOffset = Math.floor((8 - charWidth) / 2);
                    
                    // Draw the character at its current vertical position
                    for (let y = 0; y < 7; y++) { // 7 is height of our font
                        const displayY = y - verticalPosition;
                        if (displayY >= 0 && displayY < 8) {
                            for (let x = 0; x < charWidth; x++) {
                                if (charPattern[y] && charPattern[y][x]) {
                                    setLedState(matrices[m], xOffset + x, displayY, true);
                                }
                            }
                        }
                    }
                }
                
                // Move characters up
                verticalPosition--;
                
                // If a character has scrolled completely off the top, move to next char
                if (verticalPosition < -7) { // -7 because font height is 7
                    verticalPosition = 8; // Reset to bottom
                    charIndex = (charIndex + 1) % text.length; // Move to next character
                }
            }, speed);
        }
        
        function scrollDownAnimation(text, matrices, speed) {
            const totalMatrixCount = matrices.length;
            
            // Display one character per matrix, scrolling down through all characters
            let charIndex = 0;
            let verticalPosition = -7; // Start at top (-7 because font height is 7)
            
            return setInterval(() => {
                // Clear all matrices
                matrices.forEach(clearMatrix);
                
                // Display current sequence of characters
                for (let m = 0; m < totalMatrixCount; m++) {
                    const charPos = (charIndex + m) % text.length;
                    const char = text[charPos];
                    const charPattern = font[char] || font[' '];
                    const charWidth = charPattern[0].length;
                    
                    // Center the character horizontally
                    const xOffset = Math.floor((8 - charWidth) / 2);
                    
                    // Draw the character at its current vertical position
                    for (let y = 0; y < 7; y++) { // 7 is height of our font
                        const displayY = y + verticalPosition;
                        if (displayY >= 0 && displayY < 8) {
                            for (let x = 0; x < charWidth; x++) {
                                if (charPattern[y] && charPattern[y][x]) {
                                    setLedState(matrices[m], xOffset + x, displayY, true);
                                }
                            }
                        }
                    }
                }
                
                // Move characters down
                verticalPosition++;
                
                // If a character has scrolled completely off the bottom, move to next char
                if (verticalPosition > 8) {
                    verticalPosition = -7; // Reset to top
                    charIndex = (charIndex + 1) % text.length; // Move to next character
                }
            }, speed);
        }
        
        function fadeAnimation(text, matrices, speed) {
            const totalMatrixCount = matrices.length;
            const steps = 10; // Number of opacity steps
            
            // Display characters with fade in/out effect, cycling through text
            let charIndex = 0;
            let fadeDirection = true; // true = fade in, false = fade out
            let opacityStep = 0;
            
            return setInterval(() => {
                // Update opacity step
                if (fadeDirection) {
                    opacityStep++;
                    if (opacityStep >= steps) {
                        fadeDirection = false;
                    }
                } else {
                    opacityStep--;
                    if (opacityStep <= 0) {
                        fadeDirection = true;
                        // Move to next character when fully faded out
                        charIndex = (charIndex + 1) % text.length;
                    }
                }
                
                const opacity = opacityStep / steps;
                
                // Clear all matrices
                matrices.forEach(clearMatrix);
                
                // Display current sequence of characters with fade effect
                for (let m = 0; m < totalMatrixCount; m++) {
                    const charPos = (charIndex + m) % text.length;
                    const char = text[charPos];
                    const charPattern = font[char] || font[' '];
                    const charWidth = charPattern[0].length;
                    
                    // Center the character horizontally
                    const xOffset = Math.floor((8 - charWidth) / 2);
                    
                    // Draw the character with current opacity
                    for (let y = 0; y < 7; y++) {
                        for (let x = 0; x < charWidth; x++) {
                            if (charPattern[y] && charPattern[y][x]) {
                                const index = y * 8 + (xOffset + x);
                                const led = matrices[m].querySelectorAll('.led')[index];
                                if (opacityStep > 0) {
                                    led.classList.add('active');
                                    led.style.opacity = opacity;
                                } else {
                                    led.classList.remove('active');
                                }
                            }
                        }
                    }
                }
            }, speed);
        }
        
        function blinkAnimation(text, matrices, speed) {
            const totalMatrixCount = matrices.length;
            
            let visible = true;
            let charIndex = 0;
            let blinkCount = 0;
            const blinksPerChar = 3; // Number of blinks before moving to next character
            
            return setInterval(() => {
                visible = !visible;
                
                // Clear all matrices
                matrices.forEach(clearMatrix);
                
                if (visible) {
                    // Display current sequence of characters
                    for (let m = 0; m < totalMatrixCount; m++) {
                        const charPos = (charIndex + m) % text.length;
                        const char = text[charPos];
                        const charPattern = font[char] || font[' '];
                        const charWidth = charPattern[0].length;
                        
                        // Center the character horizontally
                        const xOffset = Math.floor((8 - charWidth) / 2);
                        
                        // Draw the character
                        for (let y = 0; y < 7; y++) {
                            for (let x = 0; x < charWidth; x++) {
                                if (charPattern[y] && charPattern[y][x]) {
                                    setLedState(matrices[m], xOffset + x, y, true);
                                }
                            }
                        }
                    }
                }
                
                // Count blinks and move to next character
                if (!visible) { // Count when turning off
                    blinkCount++;
                    if (blinkCount >= blinksPerChar) {
                        blinkCount = 0;
                        charIndex = (charIndex + 1) % text.length;
                    }
                }
            }, speed);
        }
        
        // Main animation controller
        let animationInterval = null;
        const matrices = Array.from(document.querySelectorAll('.matrix'));
        
        function startAnimation() {
            stopAnimation();
            
            const text = document.getElementById('message').value || "Hello World";
            const animationType = document.getElementById('effect').value;
            const speed = parseInt(document.getElementById('speed').value);
            
            switch (animationType) {
                case 'scroll-left':
                    animationInterval = scrollLeftAnimation(matrices, speed);
                    break;
                case 'scroll-right':
                    animationInterval = scrollRightAnimation(matrices, speed);
                    break;
                case 'scroll-up':
                    animationInterval = scrollUpAnimation(text, matrices, speed);
                    break;
                case 'scroll-down':
                    animationInterval = scrollDownAnimation(text, matrices, speed);
                    break;
                case 'fade':
                    animationInterval = fadeAnimation(text, matrices, speed);
                    break;
                case 'blink':
                    animationInterval = blinkAnimation(text, matrices, speed);
                    break;
                default:
                    animationInterval = scrollLeftAnimation(matrices, speed);
            }
        }
        
        function stopAnimation() {
            if (animationInterval !== null) {
                clearInterval(animationInterval);
                animationInterval = null;
                
                // Clear all matrices
                matrices.forEach(matrix => {
                    clearMatrix(matrix);
                });
            }
        }
        
        // Event listeners
        document.getElementById('startBtn').addEventListener('click', startAnimation);
        document.getElementById('stopBtn').addEventListener('click', stopAnimation);
        
        // Speed display update
        document.getElementById('speed').addEventListener('input', function() {
            document.getElementById('speed-value').textContent = this.value + ' ms';
        });
        
        // Send message to server
        document.getElementById('sendBtn').addEventListener('click', () => {
            const message = document.getElementById('message').value.trim();
            const effect = document.getElementById('effect').value;
            const speed = document.getElementById('speed').value;
            const brightness = document.getElementById('brightness').value;
            const serverUrl = document.getElementById('serverUrl').value;
            const statusPanel = document.getElementById('statusPanel');
            
            if (!message) {
                showStatus('Please enter a message to display', 'error');
                return;
            }
            
            // Create form data
            const formData = new FormData();
            formData.append('message', message);
            formData.append('effect', effect);
            formData.append('speed', speed);
            formData.append('brightness', brightness);
            
            // Send request to server
            fetch(`${serverUrl}/send_message`, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    showStatus(data.message, 'success');
                } else {
                    showStatus(data.message, 'error');
                }
            })
            .catch(error => {
                showStatus(`Error connecting to server: ${error.message}`, 'error');
            });
        });
        
        // Clear display button
        document.getElementById('clearBtn').addEventListener('click', () => {
            const serverUrl = document.getElementById('serverUrl').value;
            
            // Clear all LEDs in preview
            stopAnimation();
            
            // Send clear command to server
            fetch(`${serverUrl}/clear_display`, {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    showStatus('Display cleared', 'success');
                } else {
                    showStatus(data.message, 'error');
                }
            })
            .catch(error => {
                showStatus(`Error connecting to server: ${error.message}`, 'error');
            });
        });
        
        // Show status message
        function showStatus(message, type) {
            const statusPanel = document.getElementById('statusPanel');
            statusPanel.textContent = message;
            statusPanel.className = type === 'success' 
                ? 'status-panel status-success' 
                : 'status-panel status-error';
            statusPanel.style.display = 'block';
            
            // Hide after 5 seconds
            setTimeout(() => {
                statusPanel.style.display = 'none';
            }, 
            5000);
        }
        
        // Start initial animation
        setTimeout(() => {
            startAnimation();
        }, 500);