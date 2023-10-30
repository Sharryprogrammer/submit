import React, { useState, useEffect } from 'react';
import KanbanBoard from './KanbanBoard';
import './App.css';
import sliderImage from './img/slider.png';

function App() {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleGroupingChange = (option) => {
    // Save the grouping option to Local Storage
    localStorage.setItem('groupingOption', option);
    setGroupingOption(option);
  };

  const handleSortingChange = (option) => {
    // Save the sorting option to Local Storage
    localStorage.setItem('sortingOption', option);
    setSortingOption(option);
  };

  // Load grouping and sorting options from Local Storage
  useEffect(() => {
    const savedGroupingOption = localStorage.getItem('groupingOption');
    const savedSortingOption = localStorage.getItem('sortingOption');

    if (savedGroupingOption) {
      setGroupingOption(savedGroupingOption);
    }

    if (savedSortingOption) {
      setSortingOption(savedSortingOption);
    }
  }, []);

  const toggleOverlayVisibility = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="overlay-button">
          <button className="display-button" onClick={toggleOverlayVisibility}>
            <img className="small-image rotated-image" src={sliderImage} alt="Application" /> Display
          </button>
          <div className="dropdown-content" style={{ display: isOverlayVisible ? 'block' : 'none' }}>
            <div className="grp">
              <label className="grp-tit">Grouping:</label>
              <div className="grp-se">
                <select onChange={(e) => handleGroupingChange(e.target.value)} className='grp-on'>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
            <div className='sor'>
              <label className='sor-tit'>Sorting:</label>
              <div className='sor-se'>
                <select onChange={(e) => handleSortingChange(e.target.value)} className='sor-on'>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <KanbanBoard tickets={tickets} groupingOption={groupingOption} sortingOption={sortingOption} />
    </div>
  );
}

export default App;
