import React from 'react';
import ReactDOM from 'react-dom';
import { BeerList } from './BeerList'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <BeerList />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
