import {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import {Form, Container, Button} from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa';

import '../CSS/SearchBar.css';

const SearchBar = () => {

    const [input, setInput] = useState('');
    const onChange = (e) => {setInput(e.target.value.toLowerCase())};
    const nav = useNavigate();

    const passAlongSearch = (e) => {
        e.preventDefault();
        if (input === ''){return};

        nav('/search-results', {state: {input}})
    }

    return(
        <Form onSubmit={(e)=>{passAlongSearch(e)}}>
            <Container className="d-flex align-items-center search">
            <Button className="main-button" type='submit'><FaSearch /></Button>
            <Form.Control type="text" placeholder="Search for a movie" name='search' id='search-input' onChange={onChange}/>
            </Container>
        </Form>
    )
}

export default SearchBar;