import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

export const BeerList = () => {
  const [beerList, setBeerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/beers/ale');
        // Filtrar cervezas que no tienen imagen
        const filteredData = response.data.filter(beer => beer.image);
        setBeerList(filteredData);
        setError(null);
      } catch (error) {
        setError('Error al recuperar los datos de la cerveza');
        console.log('Error al recuperar los datos de la cerveza: ', error);
      }
    };
    fetchData();
  }, []);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReset = () => {
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = beerList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(beerList.length / itemsPerPage);

  return (
    <div className="container my-4 beer-list">
      <h1 className="text-center mb-4">Beer List</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row">
        {currentItems.length > 0 ? (
          currentItems.map((beer) => (
            <div className="col-md-3 mb-4" key={beer.id}>
              <div className="card h-100 border-black">
                <img
                  src={beer.image}
                  className="card-img-top"
                  alt={beer.name}
                  onError={(e) => e.target.parentElement.style.display = 'none'} // Oculta la card si la imagen no se carga
                />
                <div className="card-body">
                  <h5 className="card-title text-green">{beer.name}</h5>
                  <p className="card-text text-green">{beer.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No beers available.</p>
        )}
      </div>
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handleClick(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-black" onClick={handleReset}>Volver al inicio</button>
      </div>
    </div>
  );
};
