// document.addEventListener('DOMContentLoaded', function() {
//     // Sound effects
//     // Sound effects setup
//     const sounds = {
//         click: new Howl({
//             src: ['sounds/mouse-click.mp3'],
//             volume: 0.5
//         }),
//         startEnd: new Howl({
//             src: ['sounds/start_end.mp3'],
//             volume: 0.7
//         }),
//         emptyGunshot: new Howl({
//             src: ['sounds/empty_gunshot.mp3'],
//             volume: 0.8
//         }),
//         gunshot: new Howl({
//             src: ['sounds/gun_shot.mp3'],
//             volume: 1.0
//         }),
//         revolverSpin: new Howl({
//             src: ['sounds/revolver_spin.mp3'],
//             volume: 0.7,
//             loop: true
//         }),
//         backgroundMusic: new Howl({
//             src: ['sounds/while_shooting.mp3'],
//             volume: 0.5,
//             loop: true
//         })
//     };

//     // Sound control functions
//     function playSound(sound) {
//         if (sounds[sound]) {
//             sounds[sound].play();
//         }
//     }

//     function stopSound(sound) {
//         if (sounds[sound]) {
//             sounds[sound].stop();
//         }
//     }
//     // const sounds = {
//     //     spin: new Howl({
//     //         src: ['sounds/spin.mp3'],
//     //         volume: 0.7,
//     //         loop: true
//     //     }),
//     //     click: new Howl({
//     //         src: ['sounds/click.mp3'],
//     //         volume: 0.8
//     //     }),
//     //     gunshot: new Howl({
//     //         src: ['sounds/gunshot.mp3'],
//     //         volume: 0.9
//     //     })
//     // };
    
//     // Game state
//     const gameState = {
//         players: [],
//         currentPlayerIndex: 0,
//         chamber: [], // 6 chambers, one with bullet
//         isGameOver: false,
//         vsComputer: false
//     };
    
//     // DOM Elements
//     const trailerScreen = document.getElementById('trailer-screen');
//     const gameContainer = document.getElementById('game-container');
//     const introScreen = document.getElementById('intro-screen');
//     const setupScreen = document.getElementById('setup-screen');
//     const gameScreen = document.getElementById('game-screen');
//     const gameOverScreen = document.getElementById('game-over');
//     const exitScreen = document.getElementById('exit-screen');
    
//     const player1Input = document.getElementById('player-1');
//     const player2Input = document.getElementById('player-2');
//     const currentPlayerDisplay = document.getElementById('current-player');
//     const resultMessage = document.getElementById('result-message');
//     const winnerText = document.getElementById('winner-text');
    
//     const revolverSpin = document.getElementById('revolver-spin');
//     const gunFacingComputer = document.getElementById('gun-facing-computer');
//     const gunFacingHuman = document.getElementById('gun-facing-human');
//     const gunShotComputer = document.getElementById('gun-shot-computer');
//     const gunShotHuman = document.getElementById('gun-shot-human');
    
//     const spinButton = document.getElementById('spin-button');
//     const stopSpinButton = document.getElementById('stop-spin');
//     const triggerButton = document.getElementById('trigger-button');
    
//     // Show trailer for 3 seconds
//     setTimeout(() => {
//         trailerScreen.classList.add('hidden');
//         gameContainer.classList.remove('hidden');
//     }, 3000);
    
//     // Button event listeners
//     document.getElementById('play-friends').addEventListener('click', () => {
//         gameState.vsComputer = false;
//         player2Input.value = '';
//         player2Input.placeholder = "Friend's Name";
//         player2Input.disabled = false;
//         showScreen(setupScreen);
//     });
    
//     document.getElementById('play-computer').addEventListener('click', () => {
//         gameState.vsComputer = true;
//         player2Input.value = 'Computer';
//         player2Input.disabled = true;
//         showScreen(setupScreen);
//     });
    
//     document.getElementById('start-game').addEventListener('click', startGame);
//     document.getElementById('play-again').addEventListener('click', resetGame);
//     document.getElementById('exit-game').addEventListener('click', exitGame);
    
//     spinButton.addEventListener('click', () => {
//         // Start spinning animation
//         const revolverImg = document.querySelector('#revolver-spin img');
//         revolverImg.classList.add('spin-animation');
//         sounds.spin.play();
        
//         // Show stop button
//         spinButton.classList.add('hidden');
//         stopSpinButton.classList.remove('hidden');
//     });
    
//     stopSpinButton.addEventListener('click', () => {
//         // Stop spinning animation
//         const revolverImg = document.querySelector('#revolver-spin img');
//         revolverImg.classList.remove('spin-animation');
//         sounds.spin.stop();
//         stopSpinButton.classList.add('hidden');
        
//         // Show revolver in random position for 2 seconds
//         const randomRotation = Math.floor(Math.random() * 360);
//         revolverImg.style.transform = `rotate(${randomRotation}deg)`;
        
//         setTimeout(() => {
//             // Hide revolver and continue game
//             revolverSpin.classList.add('hidden');
            
//             // Start with first player
//             updateCurrentPlayer();
//             continueToNextTurn();
//         }, 2000);
//     });
    
//     triggerButton.addEventListener('click', pullTrigger);
    
//     // Functions
//     function showScreen(screen) {
//         // Hide all screens
//         introScreen.classList.add('hidden');
//         setupScreen.classList.add('hidden');
//         gameScreen.classList.add('hidden');
//         gameOverScreen.classList.add('hidden');
        
//         // Show the requested screen
//         screen.classList.remove('hidden');
//     }
    
//     function startGame() {
//         // Get player names
//         let player1Name = player1Input.value.trim();
//         let player2Name = player2Input.value.trim();
        
//         // Set default names if empty
//         if (!player1Name) player1Name = "Player 1";
//         if (!player2Name) player2Name = gameState.vsComputer ? "Computer" : "Player 2";
        
//         // Set players
//         gameState.players = [
//             { name: player1Name, isEliminated: false },
//             { name: player2Name, isEliminated: false }
//         ];
        
//         // Reset game state
//         gameState.isGameOver = false;
        
//         // For computer game, computer always goes first
//         // For friends game, random first player
//         if (gameState.vsComputer) {
//             gameState.currentPlayerIndex = 1; // Computer goes first
//         } else {
//             gameState.currentPlayerIndex = Math.floor(Math.random() * 2); // Random first player
//         }
        
//         // Load the revolver (1 bullet in random chamber)
//         loadRevolver();
        
//         // Show game screen
//         showScreen(gameScreen);
        
//         // Show the revolver for spinning
//         revolverSpin.classList.remove('hidden');
//         gunFacingComputer.classList.add('hidden');
//         gunFacingHuman.classList.add('hidden');
//         gunShotComputer.classList.add('hidden');
//         gunShotHuman.classList.add('hidden');
//         triggerButton.classList.add('hidden');
        
//         resultMessage.textContent = `${gameState.players[0].name}, spin the revolver.`;
//     }
    
//     function loadRevolver() {
//         // Create 6 chambers with one bullet (true)
//         gameState.chamber = Array(6).fill(false);
//         const bulletPosition = Math.floor(Math.random() * 6);
//         gameState.chamber[bulletPosition] = true;
//         console.log("Bullet loaded in chamber", bulletPosition); // for debugging
//     }
    
//     function updateCurrentPlayer() {
//         const currentPlayer = gameState.players[gameState.currentPlayerIndex];
//         currentPlayerDisplay.textContent = `${currentPlayer.name}'s Turn`;
//     }
    
//     function continueToNextTurn() {
//         const isComputerTurn = gameState.vsComputer && gameState.currentPlayerIndex === 1;
        
//         // Show appropriate gun image
//         if (isComputerTurn || gameState.currentPlayerIndex === 1) {
//             // Left player (or computer) turn - show Adobe Express - file.png
//             gunFacingComputer.classList.remove('hidden');
//             gunFacingHuman.classList.add('hidden');
//         } else {
//             // Right player turn - show Adobe Express2 - file.png
//             gunFacingComputer.classList.add('hidden');
//             gunFacingHuman.classList.remove('hidden');
//         }
        
//         // Show trigger button
//         triggerButton.classList.remove('hidden');
        
//         // If computer's turn, auto-pull after delay
//         if (isComputerTurn) {
//             resultMessage.textContent = "Computer is pulling the trigger...";
            
//             setTimeout(() => {
//                 pullTrigger();
//             }, 2000);
//         } else {
//             resultMessage.textContent = `${gameState.players[gameState.currentPlayerIndex].name}, pull the trigger.`;
//         }
//     }
    
//     function pullTrigger() {
//         // Disable trigger button during animation
//         triggerButton.classList.add('hidden');
        
//         // Take the first chamber from the array (and remove it)
//         const isBullet = gameState.chamber.shift();
        
//         if (isBullet) {
//             // Shot! Player is eliminated
//             sounds.gunshot.play();
            
//             // Determine which player was shot and show appropriate death image
//             if (gameState.currentPlayerIndex === 0) {
//                 // Left player (or human in single player) dies - show shoot2.png
//                 gunShotComputer.classList.remove('hidden');
//             } else {
//                 // Right player dies - show shoot1.webp
//                 gunShotHuman.classList.remove('hidden');
//             }
            
//             // Update game state
//             gameState.players[gameState.currentPlayerIndex].isEliminated = true;
            
//             resultMessage.textContent = `BANG! ${gameState.players[gameState.currentPlayerIndex].name} is eliminated!`;
            
//             // Game over after a delay
//             setTimeout(() => {
//                 // Hide death screens before showing game over
//                 gunShotComputer.classList.add('hidden');
//                 gunShotHuman.classList.add('hidden');
//                 endGame();
//             }, 3000);
//         } else {
//             // Click - empty chamber
//             sounds.click.play();
            
//             resultMessage.textContent = `Click! ${gameState.players[gameState.currentPlayerIndex].name} survived.`;
            
//             // Hide gun images after a delay
//             setTimeout(() => {
//                 gunFacingComputer.classList.add('hidden');
//                 gunFacingHuman.classList.add('hidden');
                
//                 // Next player's turn
//                 nextPlayer();
                
//                 // If no more chambers, reload
//                 if (gameState.chamber.length === 0) {
//                     loadRevolver();
                    
//                     // Show revolver for spinning again
//                     revolverSpin.classList.remove('hidden');
//                     spinButton.classList.remove('hidden');
//                     resultMessage.textContent = `${gameState.players[gameState.currentPlayerIndex].name}, spin the revolver.`;
//                 } else {
//                     // Continue to next turn
//                     continueToNextTurn();
//                 }
//             }, 1500);
//         }
//     }
    
//     function nextPlayer() {
//         // Toggle between 0 and 1
//         gameState.currentPlayerIndex = 1 - gameState.currentPlayerIndex;
//         updateCurrentPlayer();
//     }
    
//     function endGame() {
//         // Find winner (the player who is not eliminated)
//         const winnerIndex = gameState.players[0].isEliminated ? 1 : 0;
//         const winner = gameState.players[winnerIndex];
        
//         // Show game over screen
//         winnerText.textContent = `${winner.name} Wins!`;
//         showScreen(gameOverScreen);
//     }
    
//     function resetGame() {
//         // Reset gun images
//         gunFacingComputer.classList.add('hidden');
//         gunFacingHuman.classList.add('hidden');
//         gunShotComputer.classList.add('hidden');
//         gunShotHuman.classList.add('hidden');
        
//         // Go back to intro screen
//         showScreen(introScreen);
//     }
    
//     function exitGame() {
//         // Hide game container
//         gameContainer.classList.add('hidden');
        
//         // Show exit screen
//         exitScreen.classList.remove('hidden');
        
//         // Optional: Could add a timeout to close the window
//         // setTimeout(() => window.close(), 3000);
//     }
    
// });

// Main game script
document.addEventListener('DOMContentLoaded', function() {
    // Sound effects setup
    const sounds = {
        click: new Howl({
            src: ['sounds/mouse-click.mp3'],
            volume: 0.5
        }),
        startEnd: new Howl({
            src: ['sounds/start_end.mp3'],
            volume: 0.7
        }),
        emptyGunshot: new Howl({
            src: ['sounds/empty_gunshot.mp3'],
            volume: 0.8
        }),
        gunshot: new Howl({
            src: ['sounds/gun_shot.mp3'],
            volume: 1.0
        }),
        revolverSpin: new Howl({
            src: ['sounds/revolver_spin.mp3'],
            volume: 0.7,
            loop: true
        }),
        backgroundMusic: new Howl({
            src: ['sounds/while_shooting.mp3'],
            volume: 0.5,
            loop: true
        })
    };

    // Sound control functions
    function playSound(sound) {
        if (sounds[sound]) {
            sounds[sound].play();
        }
    }

    function stopSound(sound) {
        if (sounds[sound]) {
            sounds[sound].stop();
        }
    }
    
    // Game state
    const gameState = {
        players: [],
        currentPlayerIndex: 0,
        chamber: [], // 6 chambers, one with bullet
        isGameOver: false,
        vsComputer: false
    };
    
    // DOM Elements
    const trailerScreen = document.getElementById('trailer-screen');
    const gameContainer = document.getElementById('game-container');
    const introScreen = document.getElementById('intro-screen');
    const setupScreen = document.getElementById('setup-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameOverScreen = document.getElementById('game-over');
    const exitScreen = document.getElementById('exit-screen');
    
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const currentPlayerDisplay = document.getElementById('current-player');
    const resultMessage = document.getElementById('result-message');
    const winnerText = document.getElementById('winner-text');
    
    const revolverSpin = document.getElementById('revolver-spin');
    const gunFacingComputer = document.getElementById('gun-facing-computer');
    const gunFacingHuman = document.getElementById('gun-facing-human');
    const gunShotComputer = document.getElementById('gun-shot-computer');
    const gunShotHuman = document.getElementById('gun-shot-human');
    
    const spinButton = document.getElementById('spin-button');
    const stopSpinButton = document.getElementById('stop-spin');
    const triggerButton = document.getElementById('trigger-button');
    
    // Add click sound to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            // Don't play click sound for trigger button (will play gunshot sounds instead)
            if (button.id !== 'trigger-button') {
                playSound('click');
            }
        });
    });
    
    // Show trailer for 3 seconds and play start sound
    setTimeout(() => {
        trailerScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        playSound('startEnd');
    }, 3000);
    
    // Button event listeners
    document.getElementById('play-friends').addEventListener('click', () => {
        gameState.vsComputer = false;
        player2Input.value = '';
        player2Input.placeholder = "Friend's Name";
        player2Input.disabled = false;
        showScreen(setupScreen);
    });
    
    document.getElementById('play-computer').addEventListener('click', () => {
        gameState.vsComputer = true;
        player2Input.value = 'Computer';
        player2Input.disabled = true;
        showScreen(setupScreen);
    });
    
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('play-again').addEventListener('click', resetGame);
    document.getElementById('exit-game').addEventListener('click', exitGame);
    
    spinButton.addEventListener('click', () => {
        // Start spinning animation
        const revolverImg = document.querySelector('#revolver-spin img');
        revolverImg.classList.add('spin-animation');
        playSound('revolverSpin');
        
        // Show stop button
        spinButton.classList.add('hidden');
        stopSpinButton.classList.remove('hidden');
    });
    
    stopSpinButton.addEventListener('click', () => {
        // Stop spinning animation
        const revolverImg = document.querySelector('#revolver-spin img');
        revolverImg.classList.remove('spin-animation');
        stopSound('revolverSpin');
        stopSpinButton.classList.add('hidden');
        
        // Show revolver in random position for 2 seconds
        const randomRotation = Math.floor(Math.random() * 360);
        revolverImg.style.transform = `rotate(${randomRotation}deg)`;
        
        setTimeout(() => {
            // Hide revolver and continue game
            revolverSpin.classList.add('hidden');
            
            // The player who spun gets to pull the trigger first
            updateCurrentPlayer();
            continueToNextTurn();
        }, 2000);
    });
    
    triggerButton.addEventListener('click', pullTrigger);
    
    // Functions
    function showScreen(screen) {
        // Hide all screens
        introScreen.classList.add('hidden');
        setupScreen.classList.add('hidden');
        gameScreen.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        
        // Show the requested screen
        screen.classList.remove('hidden');
        
        // Start background music when game begins
        if (screen === gameScreen) {
            playSound('backgroundMusic');
        }
        
        // Stop background music when game ends
        if (screen === gameOverScreen) {
            stopSound('backgroundMusic');
        }
    }
    
    function startGame() {
        // Get player names
        let player1Name = player1Input.value.trim();
        let player2Name = player2Input.value.trim();
        
        // Set default names if empty
        if (!player1Name) player1Name = "Player 1";
        if (!player2Name) player2Name = gameState.vsComputer ? "Computer" : "Player 2";
        
        // Set players
        gameState.players = [
            { name: player1Name, isEliminated: false },
            { name: player2Name, isEliminated: false }
        ];
        
        // Reset game state
        gameState.isGameOver = false;
        
        // Choose random first player
        if (gameState.vsComputer) {
            // In computer mode, human spins first
            gameState.currentPlayerIndex = 0;
        } else {
            // In friend mode, random first player
            gameState.currentPlayerIndex = Math.floor(Math.random() * 2);
        }
        
        // Load the revolver (1 bullet in random chamber)
        loadRevolver();
        
        // Show game screen
        showScreen(gameScreen);
        
        // Show the revolver for spinning
        revolverSpin.classList.remove('hidden');
        gunFacingComputer.classList.add('hidden');
        gunFacingHuman.classList.add('hidden');
        gunShotComputer.classList.add('hidden');
        gunShotHuman.classList.add('hidden');
        triggerButton.classList.add('hidden');
        
        // Update message to show who spins
        updateCurrentPlayer();
        resultMessage.textContent = `${gameState.players[gameState.currentPlayerIndex].name}, spin the revolver.`;
    }
    
    function loadRevolver() {
        // Create 6 chambers with one bullet (true)
        gameState.chamber = Array(6).fill(false);
        const bulletPosition = Math.floor(Math.random() * 6);
        gameState.chamber[bulletPosition] = true;
        console.log("Bullet loaded in chamber", bulletPosition); // for debugging
    }
    
    function updateCurrentPlayer() {
        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        currentPlayerDisplay.textContent = `${currentPlayer.name}'s Turn`;
    }

    function continueToNextTurn() {
        const isComputerTurn = gameState.vsComputer && gameState.currentPlayerIndex === 1;
        
        // Show appropriate gun image based on which player's turn it is
        if (isComputerTurn || gameState.currentPlayerIndex === 1) {
            // Left player (or computer) turn - show Adobe Express - file.png
            gunFacingComputer.classList.remove('hidden');
            gunFacingHuman.classList.add('hidden');
        } else {
            // Right player turn - show Adobe Express2 - file.png
            gunFacingComputer.classList.add('hidden');
            gunFacingHuman.classList.remove('hidden');
        }
        
        // Show trigger button (except for computer's turn)
        if (!isComputerTurn) {
            triggerButton.classList.remove('hidden');
        }
        
        // If computer's turn, auto-pull after delay
        if (isComputerTurn) {
            resultMessage.textContent = "Computer is pulling the trigger...";
            
            setTimeout(() => {
                pullTrigger();
            }, 2000);
        } else {
            resultMessage.textContent = `${gameState.players[gameState.currentPlayerIndex].name}, pull the trigger.`;
        }
    }

    function loadRevolver() {
    // Create 6 chambers with one bullet (true)
    gameState.chamber = Array(6).fill(false);
    const bulletPosition = Math.floor(Math.random() * 6);
    gameState.chamber[bulletPosition] = true;
    console.log("Bullet loaded in chamber", bulletPosition); // for debugging
}

    function pullTrigger() {
        // Disable trigger button during animation
        triggerButton.classList.add('hidden');
        
        // Take the first chamber from the array (and remove it)
        const isBullet = gameState.chamber.shift();
        
        // Update round counter in UI (optional)
        const remainingRounds = gameState.chamber.length;
        console.log(`Remaining chambers: ${remainingRounds}`);
        
        if (isBullet) {
            // Shot! Player is eliminated
            playSound('gunshot');
            
            // Determine which player was shot and show appropriate death image
            if (gameState.currentPlayerIndex === 0) {
                // Left player dies - show shoot2.png
                gunShotComputer.classList.remove('hidden');
            } else {
                // Right player dies - show shoot1.webp
                gunShotHuman.classList.remove('hidden');
            }
            
            // Update game state
            gameState.players[gameState.currentPlayerIndex].isEliminated = true;
            
            resultMessage.textContent = `BANG! ${gameState.players[gameState.currentPlayerIndex].name} is eliminated!`;
            
            // Game over after a delay
            setTimeout(() => {
                // Play end game sound
                playSound('startEnd');
                
                // Hide death screens before showing game over
                gunShotComputer.classList.add('hidden');
                gunShotHuman.classList.add('hidden');
                
                // Stop background music
                stopSound('backgroundMusic');
                
                endGame();
            }, 3000);
            
        } else {
            // Click - empty chamber
            playSound('emptyGunshot');
            
            resultMessage.textContent = `Click! ${gameState.players[gameState.currentPlayerIndex].name} survived.`;
            
            // Hide gun images after a delay
            setTimeout(() => {
                gunFacingComputer.classList.add('hidden');
                gunFacingHuman.classList.add('hidden');
                
                // Next player's turn
                nextPlayer();
                
                // If no more chambers, reload
                if (gameState.chamber.length === 0) {
                    // All 6 rounds used - reload the revolver
                    loadRevolver();
                    
                    // Show message about reloading
                    resultMessage.textContent = `All chambers empty. Reloading the revolver.`;
                    
                    // Show revolver for spinning again after a short delay
                    setTimeout(() => {
                        revolverSpin.classList.remove('hidden');
                        spinButton.classList.remove('hidden');
                        resultMessage.textContent = `${gameState.players[gameState.currentPlayerIndex].name}, spin the revolver.`;
                    }, 1500);
                    
                } else {
                    // Continue to next turn - chambers remaining
                    continueToNextTurn();
                }
            }, 1500);
        }
    }
        
    // function pullTrigger() {
    //     // Disable trigger button during animation
    //     triggerButton.classList.add('hidden');
        
    //     // Take the first chamber from the array (and remove it)
    //     const isBullet = gameState.chamber.shift();
        
    //     if (isBullet) {
    //         // Shot! Player is eliminated
    //         playSound('gunshot');
            
    //         // Determine which player was shot and show appropriate death image
    //         if (gameState.currentPlayerIndex === 0) {
    //             // Left player dies - show shoot2.png
    //             gunShotComputer.classList.remove('hidden');
    //         } else {
    //             // Right player dies - show shoot1.webp
    //             gunShotHuman.classList.remove('hidden');
    //         }
            
    //         // Update game state
    //         gameState.players[gameState.currentPlayerIndex].isEliminated = true;
            
    //         resultMessage.textContent = `BANG! ${gameState.players[gameState.currentPlayerIndex].name} is eliminated!`;
            
    //         // Game over after a delay
    //         setTimeout(() => {
    //             // Play end game sound
    //             playSound('startEnd');
                
    //             // Hide death screens before showing game over
    //             gunShotComputer.classList.add('hidden');
    //             gunShotHuman.classList.add('hidden');
                
    //             // Stop background music
    //             stopSound('backgroundMusic');
                
    //             endGame();
    //         }, 3000);
            
    //     } else {
    //         // Click - empty chamber
    //         playSound('emptyGunshot');
            
    //         resultMessage.textContent = `Click! ${gameState.players[gameState.currentPlayerIndex].name} survived.`;
            
    //         // Hide gun images after a delay
    //         setTimeout(() => {
    //             gunFacingComputer.classList.add('hidden');
    //             gunFacingHuman.classList.add('hidden');
                
    //             // Next player's turn
    //             nextPlayer();
                
    //             // If no more chambers, reload
    //             if (gameState.chamber.length === 0) {
    //                 loadRevolver();
                    
    //                 // Show revolver for spinning again
    //                 revolverSpin.classList.remove('hidden');
    //                 spinButton.classList.remove('hidden');
    //                 resultMessage.textContent = `${gameState.players[gameState.currentPlayerIndex].name}, spin the revolver.`;
    //             } else {
    //                 // Continue to next turn
    //                 continueToNextTurn();
    //             }
    //         }, 1500);
    //     }
    // }
    
    function nextPlayer() {
        // Toggle between 0 and 1
        gameState.currentPlayerIndex = 1 - gameState.currentPlayerIndex;
        updateCurrentPlayer();
    }
    
    function endGame() {
        // Find winner (the player who is not eliminated)
        const winnerIndex = gameState.players[0].isEliminated ? 1 : 0;
        const winner = gameState.players[winnerIndex];
        
        // Show game over screen
        winnerText.textContent = `${winner.name} Wins!`;
        showScreen(gameOverScreen);
    }
    
    function resetGame() {
        // Reset gun images
        gunFacingComputer.classList.add('hidden');
        gunFacingHuman.classList.add('hidden');
        gunShotComputer.classList.add('hidden');
        gunShotHuman.classList.add('hidden');
        
        // Stop all sounds
        Object.keys(sounds).forEach(sound => stopSound(sound));
        
        // Go back to intro screen
        showScreen(introScreen);
    }
    
    function exitGame() {
        // Stop all sounds
        Object.keys(sounds).forEach(sound => stopSound(sound));
        
        // Play exit sound
        playSound('startEnd');
        
        // Hide game container
        gameContainer.classList.add('hidden');
        
        // Show exit screen
        exitScreen.classList.remove('hidden');
    }
});