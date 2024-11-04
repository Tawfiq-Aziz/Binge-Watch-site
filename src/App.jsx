import {useEffect, useState} from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

const API_URL = 'http://www.omdbapi.com?apikey=732e24ca'

const movie1 = {
  "Title": "The Ice Age Adventures of Buck Wild",
  "Year": "2022",
  "imdbID": "tt13634480",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMmE0N2YwZGItNDk5Mi00ZWM4LTkyMWUtNGNmYjk5YzhiMjVlXkEyXkFqcGc@._V1_SX300.jpg"
}

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  } 

  useEffect(() => {
    searchMovies('Ice Age')
  },[])

  return (
    <div className='app'>
      <h1>Binge Watch</h1>
      <h4>By incursio</h4>

      <div className='search'>
        <input 
          placeholder='Search For movies'
          value = {searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
        src={SearchIcon}
        alt = 'search'
        onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length>0 
        ? (
            <div className='container'>
              {movies.map((movie) => (
              <MovieCard movie={movie} />
             ))}
            </div>
        )   : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div> 
        )
      }
    </div>
  )
}


export default App
