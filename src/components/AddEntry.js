import React, { useState, useRef,useEffect } from 'react';
import { useNavigate,useSearchParams   } from 'react-router-dom';
import { useTravelContext } from '../context/TravelContext';
import './AddEntry.css';

function AddEntry() {
  const { dispatch } = useTravelContext();
  const { state } = useTravelContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraOpen,setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [edit,setEdit] = useState(false);
  
   let [searchParams] = useSearchParams()
   let id = searchParams.get('id');
   console.log(id);
   
  
   useEffect(() => {
          console.log('page loaded');
		  if(id){
			  setEdit(true);
			  let record = state.entries.filter(item=>item.id==id)[0];
			  setTitle(record.title);
			  setDescription(record.description);
			  setPhoto(record.photo);
		  }
		  getCurrentLocation();
		  startCamera();
      }, []);
	

  // Get current location
  const getCurrentLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
      setLoading(false);
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
	  setCameraOpen(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  // Take photo
  const takePhoto = () => {
    const video = videoRef.current;
    const photo = photoRef.current;
    const context = photo.getContext('2d');

    // Set canvas size to match video
    photo.width = video.videoWidth;
    photo.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, photo.width, photo.height);

    // Convert canvas to data URL
    const photoData = photo.toDataURL('image/jpeg');
    setPhoto(photoData);

    // Stop camera
    const stream = video.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    video.srcObject = null;
  };
  const clearPhoto = ()=>{
	  setPhoto(null);
	  setCameraOpen(false);
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location) {
      alert('Please get your location first');
      return;
    }

    const entry = {
      id: Date.now(),
      title,
      description,
      location,
      photo,
      timestamp: new Date().toISOString()
    };
	if(edit)
	{
		entry.id=id;
	}

    dispatch({ type: 'ADD_ENTRY', payload: entry });
    navigate('/');
  };

  return (
    <div className="add-entry">
      <h2>New Travel</h2>
      <form onSubmit={handleSubmit}>
       

        <div className="form-group">
          
          {location && (
            <p>
              Location: {location.latitude}, {location.longitude}
            </p>
          )}
        </div>

        <div className="form-group">
		
          
		  
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ display: photo ? 'none' : 'block' }}
          />
          <canvas
            ref={photoRef}
            style={{ display: 'none' }}
          />
          {!photo && cameraOpen  && (
            <button type="button" onClick={takePhoto}>
              Take Photo
            </button>
          )}
          {photo && (
            <div className="photo-preview">
              <img src={photo} alt="Captured" />
              <button type="button" onClick={() => clearPhoto()}>
                Retake Photo
              </button>
            </div>
          )}
        </div>
		<div className="form-group">
		  <label>Title:</label>
		  <input
		    type="text"
		    value={title}
		    onChange={(e) => setTitle(e.target.value)}
		    required
		  />
		</div>
		
		<div className="form-group">
		  <label>Description:</label>
		  <textarea
		    value={description}
		    onChange={(e) => setDescription(e.target.value)}
		    required
		  />
		</div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddEntry; 