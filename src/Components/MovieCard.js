import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
import '../CSS/MovieCard.css';
import image_error from '../img/image_error.png';
import {useState} from 'react';

const MovieCard = ({movie}) => {

    const [imageError, setImageError] = useState(false);

    const nav = useNavigate();

    const onClick = () => {
        nav(`/movies/${movie.id}`);
    }


    const handleImageError = () => {
        setImageError(true);
    }
    

    return(
        <Card className='movieCard' key={movie.id} onClick={onClick}>
            <Card.Img variant='top' src={!imageError ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : image_error}
            alt={movie.title} onError={handleImageError}/>
            <Card.Body>
                <Card.Title style={movie.title.length < 10 ? {fontSize: '1.5rem'} : {fontSize: '0.9rem'}}>{movie.title}</Card.Title>
                <Card.Text style={{fontSize: '0.85rem'}}>
                    Released: {movie.release_date}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MovieCard;