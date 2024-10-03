import './App.css';
import WeatherApp from './containers/WeatherApp/WeatherApp';
import icon from '/icon.png';

function App() {

  return (
    <>
      <header>
        <img src={icon} alt='Weather logo app' />
        <span>Exo 07 - App Météo</span>
      </header>
      <main>
        <WeatherApp />
      </main>
    </>
  )
}

export default App
