import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import confetti from 'canvas-confetti';

import './Game.css'
const choices = ["ROCK", "PAPER", "SCISSORS"];
const winSound = new Audio('/sounds/win.mp3');
const loseSound = new Audio('/sounds/lose.mp3');
const tieSound = new Audio('/sounds/tie.mp3');

const Game = () => {
    const [userChoice, setUserChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [userScore, setUserScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [history, setHistory] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [finalResult, setFinalResult] = useState('');

    const resetGame = () => {
        setUserScore(0);
        setComputerScore(0);
        setUserChoice('');
        setComputerChoice('');
        setHistory([]);
        setGameOver(false);
        setFinalResult('');
    }

    const winnerCondition = (user, computer) => {
        if (user === computer) {
            return -1;
        } else if (
            (user === 'ROCK' && computer === 'SCISSORS') ||
            (user === 'PAPER' && computer === 'ROCK') ||
            (user === 'SCISSORS' && computer === 'PAPER')
        ) {
            return 1;
        }
        else {
            return 2;
        }
    }
    const handleUserChoice = (playerchoice) => {
        if (gameOver) return;

        setUserChoice(playerchoice);
        setComputerChoice('');

        setTimeout(() => {
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            setComputerChoice(computerChoice);
            
            const result = winnerCondition(playerchoice, computerChoice);
            if (result === 1) {
                const newUserScore = userScore + 1;
                setUserScore(newUserScore);
                winSound.play();
                confetti();
                toast.success('You win!');
                if (newUserScore === 5) {
                    setGameOver(true);
                    setFinalResult('🎉 You won the game!');
                }
            } else if (result === 2) {
                const newComputerScore = computerScore + 1;
                setComputerScore(newComputerScore);
                loseSound.play();
                toast.error('You lose!');
                if (newComputerScore === 5) {
                    setGameOver(true);
                    setFinalResult('💀 Computer won the game!');
                }
            } else {
                tieSound.play();
                toast.info('You tied!');
            }

            setHistory(prev => [
                ...prev,
                `You: ${playerchoice} | Computer: ${computerChoice} → ${result === 1 ? 'Win' : result === 2 ? 'Lose' : 'Tie'}`
            ]);
        }, 500);
    }
  return (
    <div className='Game-container'>
        <div className='Game'>
            <div className='button-group'>
                <button 
                    className='button' 
                    disabled={gameOver}
                    onClick={() => handleUserChoice('ROCK')}
                >🪨 Rock</button>
                <button 
                    className='button' 
                    disabled={gameOver}
                    onClick={() => handleUserChoice('PAPER')}
                >📄 Paper</button>
                <button 
                    className='button' 
                    disabled={gameOver}
                    onClick={() => handleUserChoice('SCISSORS')}
                >✂️ Scissors</button>
            </div>
            <h3>Your Choice: {userChoice}</h3>
            <h3>Computer's Choice: {computerChoice || '🤔 Thinking...'} </h3>
            {finalResult && <h2 className="final-result">{finalResult}</h2>}
            <ToastContainer 
                position="bottom-right" 
                autoClose={5000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
                theme="light" 
            />
            <button className='reset-button' onClick={() => resetGame()}>Reset Game</button>
        </div>
        <div className="history-container">
            <div className="history">
                <h3>Scoreboard</h3>
                <ul>
                    <li className='score-entry'>
                        <div className='score-title'>Player Scrore</div>
                        <div className='score-result'>{userScore}</div>
                    </li>
                    <li className='score-entry'>
                        <div className='score-title'>Computer Score</div>
                        <div className='score-result'>{computerScore}</div>
                    </li>                    
                </ul>
            </div>
            <div className="history">
                <h3>Round History</h3>
                <ul>
                    {history.slice(-5).reverse().map((entry, idx) => (
                        <li key={idx} className='history-entry'>{entry}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Game;