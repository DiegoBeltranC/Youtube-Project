import React, { useEffect, useState } from 'react';
import VideoDisplay from './components/videoDisplay';
import SearchBar from './components/SearchBar';
import './App.css';

const API_KEY = 'AIzaSyD3gW8hM4kAzdHAQIhDgZicHsE-nEdjbHQ'; // Reemplaza con tu clave API de YouTube
const BASE_URL = 'https://www.googleapis.com/youtube/v3/';

const componentAddSyles = {
  backgroundColor: '#d0f0f1'
}


const YouTubeVideos = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState(['']);
  const [favorites, setFavorites] = useState([])
  const [indexElements, setIndexElements] = useState(0)
  
  const addFavoriteHandler = (e) => {
    setIndexElements(indexElements+1)
    setFavorites((prevFavorites) => [
      ...prevFavorites,
      { ...e, index: indexElements }
    ]);
    console.log(favorites)
  };
  

  const deleteFavorites = (e)=>{
    setFavorites(()=>favorites.filter( item => item.index !== e.index))
  }

  // Función para manejar la búsqueda cuando el usuario presiona 'Enter'
  const handleSearchSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch(`${BASE_URL}search?part=snippet&q=${search}&type=video&maxResults=10&key=${API_KEY}`);
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleAddClick = ()=>{
    setFavorites([]);
  }

  const onFavorites = ()=>{
    if(favorites.length <= 0){
      const element = document.querySelector('.add-icon');
      element.style.display = 'none'; 
    }else{
      const element = document.querySelector('.add-icon');
      element.style.display = 'block'; 
    }
  }

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${BASE_URL}videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=10&key=${API_KEY}`);
        const data = await response.json();
        console.log(data)
        setVideos(data.items); 
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    onFavorites();
  }, [favorites]);

  const deleteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" className='icon-delete'>
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
    </svg>)

  const addIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16" className='add-icon'>
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
    </svg>
  )
  return (
    <div className='div-container'>
      <SearchBar search={search} setSearch={setSearch} handleSearchSubmit={handleSearchSubmit}/>
      <div className='video-container'>
        <VideoDisplay data={videos} actionAddDelete={addFavoriteHandler} />
        <VideoDisplay data={favorites} actionAddDelete={deleteFavorites} 
        icon={deleteIcon} color={componentAddSyles} addIcon={addIcon} 
        handleAddClick={handleAddClick} onFavorites={onFavorites}/>
      </div>
    </div>
  );
};

export default YouTubeVideos;

