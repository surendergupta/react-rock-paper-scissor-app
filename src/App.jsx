import './App.css'
import Game from './Components/Game/Game';

const App = () => {
  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <h1>Welcome to Rock, Paper, Scissors Game!</h1>
        </header>
        <main className='App-main'>
          <Game />
        </main>
        <footer className='App-footer'>
          <p>&copy; 2025 Rock, Paper, Scissors Game. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

export default App;
