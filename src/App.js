import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Home from './views/Home';
import CreateUser from './views/CreateUser';
import UpdateUser from './views/UpdateUser';
import ViewUsers from './views/ViewUsers';
import DeleteUser from './views/DeleteUser';
import ViewMailTemplate from './views/ViewMailTemplate';
import CreateMails from './views/CreateMails';

function App() {
  return (
    <Router>
      <Navigation />
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
        </Routes>
      </div>
      <Container>
        <Routes>
            <Route path="/create-user" element={<CreateUser/>} />
            <Route path="/update-user/:id" element={<UpdateUser/>} />
            <Route path="/view-users" element={<ViewUsers/>} />
            <Route path="/delete-user/:id" element={<DeleteUser/>} />
            <Route path="/view-mail-template" element={<ViewMailTemplate/>} />
            <Route path="/create-mails" element={<CreateMails/>} />
          </Routes>
      </Container>
    </Router>
  );
}

export default App;
