import React from 'react';
import { Routes, Route,BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import TravelMap from './components/TravelMap';
import TravelList from './components/TravelList';
import AddEntry from './components/AddEntry';
import { TravelProvider } from './context/TravelContext';
import './App.css';

function App() {
  return (
    <TravelProvider>
         <div className="App">
		 <Navigation />
				<Routes className="content">
					<Route path="/" element={<TravelList />} />
					<Route path="/map" element={<TravelMap />} />
					<Route path="/add" element={<AddEntry />} />
				</Routes>
				
				
         </div>
       </TravelProvider>
  );
}

export default App;
