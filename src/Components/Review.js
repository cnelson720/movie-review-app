import Card from 'react-bootstrap/Card';
import {FaStar} from 'react-icons/fa';

const Review = ({reviewData}) => {

    const style = {
        width: '100%',
        color: '#0A1626',
        height: 'auto',
        maxWidth: '500px'
    }

    return(
        <Card style={style}>
            <Card.Body>
                <Card.Title>{reviewData.username}</Card.Title>
                <Card.Subtitle>
                    {[...Array(reviewData.rating)].map((star, index) => {
                        return(
                            <FaStar key={index}/>
                        )
                    })}
                </Card.Subtitle>

                <Card.Text>{reviewData.thoughts}</Card.Text>

                <Card.Text>{new Date(reviewData.date).toLocaleDateString('en-US')}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Review;