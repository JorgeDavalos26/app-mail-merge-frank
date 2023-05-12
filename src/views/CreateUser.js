import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    product: '',
    municipality: '',
    neighborhood: '',
    street: '',
    zip_code: '',
    tracking_number: '',
    phone: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fillUserData = () => {
    setUserData({
      name: 'Carlos',
      last_name: 'Hernández López',
      product: 'Yoga 9i',
      municipality: 'México D.F.',
      neighborhood: 'Narvarte',
      street: 'Eje Central 789',
      zip_code: '03020',
      tracking_number: 'I9J0K1L2',
      phone: '5512345678',
      email: 'carlos.hernandez@gmail.com',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert the userData state to JSON
    /* const data = JSON.stringify(userData);

    // Send a POST request to the endpoint
    const response = await fetch('http://127.0.0.1:8000/myapp/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    }); */

    const warranty_days = Math.floor(Math.random() * (40 - 10 + 1)) + 10;

    // Create a new object that includes all properties from userData, as well as the additional properties
    const dataObject = {
      ...userData,
      warranty_days,
      support_phone: "800-123-4567",
      support_email: "soporte@lenovo.com",
      company: "Lenovo"
    };

    // Convert the dataObject to JSON
    const data = JSON.stringify(dataObject);

    // Send a POST request to the endpoint
    const response = await fetch('http://127.0.0.1:8000/myapp/users/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });





    // If the request was successful, log the response and clear the form
    if (response.ok) {
      console.log('User created:', await response.json());
      setUserData({
        name: '',
        last_name: '',
        product: '',
        municipality: '',
        neighborhood: '',
        street: '',
        zip_code: '',
        tracking_number: '',
        phone: '',
        email: '',
      });
      navigate('/view-users');
    } else {
      // Otherwise, log an error
      console.error('Error:', response.status, response.statusText);
    }
  };

  return (
    <div>
      <Card className="template-card p-4">
        <Card.Body>
          <h2 className='mb-4'>Alta de Usuario</h2>
          <Form onSubmit={handleSubmit}>
            <Row className='my-3'>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="last_name">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className='my-3'>
              <Col md={6}>
                <Form.Group controlId="product">
                  <Form.Label>Producto</Form.Label>
                  <Form.Control
                    type="text"
                    name="product"
                    value={userData.product}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="municipality">
                  <Form.Label>Municipio</Form.Label>
                  <Form.Control
                    type="text"
                    name="municipality"
                    value={userData.municipality}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className='my-3'>
              <Col md={6}>
                <Form.Group controlId="neighborhood">
                  <Form.Label>Colonia</Form.Label>
                  <Form.Control
                    type="text"
                    name="neighborhood"
                    value={userData.neighborhood}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="street">
                  <Form.Label>Calle</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    value={userData.street}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className='my-3'>
              <Col md={6}>
                <Form.Group controlId="zip_code">
                  <Form.Label>Código Postal</Form.Label>
                  <Form.Control
                    type="text"
                    name="zip_code"
                    value={userData.zip_code}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tracking_number">
                  <Form.Label>Número de Seguimiento</Form.Label>
                  <Form.Control
                    type="text"
                    name="tracking_number"
                    value={userData.tracking_number}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className='my-3'>
              <Col md={6}>
                <Form.Group controlId="phone">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className='d-flex justify-content-between'>
              <Button variant="primary" type="submit" style={{ width: "160px" }} className='mt-4'>
                Dar de alta
              </Button>
              <Button variant="secondary" style={{ width: "160px" }} className='mt-4' onClick={fillUserData}>Llenar formulario</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateUser;

