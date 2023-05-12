import React, { useState, useEffect } from 'react';
import { Table, Button, Collapse, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BsPencil, BsTrash } from 'react-icons/bs';

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/myapp/users/")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleRowClick = (userId) => {
    if (expandedRow === userId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(userId);
    }
  };

  return (
    <div>
      <Card className="template-card p-4">
        <Card.Body>
          <h2 className='mb-4'>Usuarios</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Producto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <React.Fragment  key={`${user.id}-details`}>
                  <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.product}</td>
                    <td>
                      <div className='d-flex justify-content-around'>
                        <LinkContainer to={`/update-user/${user.id}`}>
                          <Button variant="outline-primary" size="sm" className="mr-2">
                            <BsPencil />
                          </Button>
                        </LinkContainer>
                        <LinkContainer to={`/delete-user/${user.id}`}>
                          <Button variant="outline-danger" size="sm">
                            <BsTrash />
                          </Button>
                        </LinkContainer>
                      </div>
                    </td>
                  </tr>
                  <Collapse in={expandedRow === user.id}>
                    <div>
                      <div className='details-section'>
                        <p><strong>Apellidos:</strong> {user.last_name}</p>
                        <p><strong>Producto:</strong> {user.product}</p>
                        <p><strong>Municipio:</strong> {user.municipality}</p>
                        <p><strong>Colonia:</strong> {user.neighborhood}</p>
                        <p><strong>Calle:</strong> {user.street}</p>
                        <p><strong>Código Postal:</strong> {user.zip_code}</p>
                        <p><strong>Número de guía:</strong> {user.tracking_number}</p>
                        <p><strong>Teléfono:</strong> {user.phone}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Días de garantía:</strong> {user.warranty_days}</p>
                        <p><strong>Teléfono de soporte:</strong> {user.support_phone}</p>
                        <p><strong>Email de soporte:</strong> {user.support_email}</p>
                        <p><strong>Compañia:</strong> {user.company}</p>
                      </div>
                    </div>
                  </Collapse>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ViewUsers;
