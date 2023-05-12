import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file
import { ReactComponent as UserIcon } from './user_icon.svg'; // Import your SVG

const Home = () => {
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate('/create-user');
  };

  return (
    <div className="bg-light py-5 home-container">
      <Container>
        <h1 className="home-title">Plataforma de administración de envíos Lenovo</h1>
        <p className="home-description">
          This application allows you to create, read, update, and delete users. Use the
          menu to navigate through different sections or click the button below to start
          creating a new user.
        </p>
        <div className='d-flex justify-content-center'>
        <Button variant="primary" className="home-button mt-5" onClick={handleCreateUser}>
          Ir a crear un usuario
        </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
