import React, { Component, useEffect, useState } from 'react'
import './App.css';

function App() {
  const [grid, setGrid] = useState(new Array(100).fill(Array(10).fill('')));
  const [query, setQuery] = useState('');
  const [filtergrid, setFiltergrid] = useState([])



  const handleInputChange = (e, rowIndex, colIndex) => {
    const newGrid = grid.map((row, rind) =>
      row.map((cell, cind) =>
        rind === rowIndex && cind === colIndex ? e.target.value : cell
      )
    );
    setGrid(newGrid);
   
  };
  useEffect(()=>{
    localStorage.setItem('grid', JSON.stringify(grid));
  },[grid])

  const handlesearch = (querytype) => {
    setQuery(querytype)
    if (querytype) {
      let matchcell = grid.filter(row =>
        row.some(cell => cell.includes(query))
      );
      setFiltergrid(matchcell)
    } else {
      setFiltergrid([])
    }
  }

  useEffect(() => {
    if (localStorage.getItem('grid')) {
      setGrid(JSON.parse(localStorage.getItem('grid')))
    }
  }, []);



  return (
    <div className="app">
      <div className="searchbar p-3">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => handlesearch(e.target.value)}
        />

      </div>
      <div className="container">
        {query.length>0?(filtergrid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div className="col border p-0" key={colIndex}>
                <input 
                  type="text"
                  value={cell} 
                  className={`cell-input ${rowIndex%2===0?'changecolor':'sdfa'}`}
                />
              </div>
            ))}
          </div>
        ))):(grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div className="col border p-0" key={colIndex}>
                <input 
                  type="text"
                  value={cell}
                  onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                  className={`cell-input ${rowIndex%2===0?'changecolor':'sdfa'}`}
                />
              </div>
            ))}
          </div>
        )))}
        
      </div>
    </div>
  );
};


export default App;
