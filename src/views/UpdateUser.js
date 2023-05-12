import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';

const UpdateUser = () => {
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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user data based on the id and set the userData
    const fetchUserData = async () => {
      const response = await fetch(`http://127.0.0.1:8000/myapp/users/${id}`);
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = JSON.stringify(userData);

    const response = await fetch(`http://127.0.0.1:8000/myapp/users/${id}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    if (response.ok) {
      console.log('User updated:', await response.json());
      navigate('/view-users');
    } else {
      console.error('Error:', response.status, response.statusText);
    }
  };

  // Your form code remains the same, just replace the handleSubmit and handleChange
  // Also, add the Card component to make the UI similar

  return (
    <div>
      <Card className="template-card p-4">
        <Card.Body>
          <h2 className='mb-4'>Actualizar usuario</h2>
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
            <Button variant="primary" type="submit" style={{ width: "160px" }} className='mt-4'>
              Guardar cambios
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UpdateUser;
