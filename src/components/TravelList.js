import React,{ useState, useRef,useEffect } from 'react';
import { useTravelContext } from '../context/TravelContext';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './TravelList.css';

function TravelList() {
  const { dispatch } = useTravelContext();
  const { state } = useTravelContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
   const showConfirm = (id) => {
      confirmAlert({
        title: 'confirm',
        message: 'sure to delete？',
        buttons: [
          {
            label: 'yes',
            onClick: () => { dispatch({ type: 'DEL_ENTRY', payload: id });}
          },
          {
            label: 'no',
            onClick: () => {}
          }
        ]
      });
    };
	
	const editRecord = (id)=>{
		navigate('/add?id='+id);
	}
  
  return (
    <div className="travel-list">
      <h2>Travel History</h2>
      <div className="entries">
        {state.entries.map(entry => (
          <div key={entry.id} className="entry-card">
            {entry.photo && (
              <img src={entry.photo} alt={entry.title} className="entry-photo" />
            )}
            <div className="entry-details">
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              <p className="location">
                Location: {entry.location.latitude}, {entry.location.longitude}
              </p>
              <p className="timestamp">
                {new Date(entry.timestamp).toLocaleString()}
              </p>
			  <button className="edit-button" onClick={()=>editRecord(entry.id)}>edit</button>
			  <button className="del-button" onClick={()=>showConfirm(entry.id)}>delete</button>
			  
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelList; 