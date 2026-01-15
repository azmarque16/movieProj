import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import { searchMovies, getPopularMovies, getTopRatedMovies } from "../Services/Api";

import '../css/Home.css';


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to Load Movies...")
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return 
        if (loading) return //can't search if we are already loading
        setLoading(true)

        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults)
            setError(null) //if there was a previous error this will clear it. 

        } catch (err) {
            console.log(err)
            setError("Searching for Movies Failed...")
        } finally {
            setLoading(false)
        }
    }

    const handleTopRated = async () => {
        if (loading) return
        setLoading(true)
        setError(null)

        try{
            const topRatedMovies = await getTopRatedMovies()
            setMovies(topRatedMovies)

        } catch (err) {
            console.log(err)
            setError("Failed to Load Top Rated Movies...")

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movie..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">🔎</button>
            </form>
            
            <button onClick={handleTopRated} className="sort-button" disabled={loading}>
                Top Rated
            </button>

            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {movies?.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home




// {error && <div className="error-message">{error}</div>}
//             {loading ? (
//                 <div className="loading">Loading...</div>
//             ) : (
//                 <div className="movies-grid">
//                     {movies.map((movie) => (
//                         <MovieCard movie={movie} key={movie.id} />
//                     ))}
//                 </div>
//             )}