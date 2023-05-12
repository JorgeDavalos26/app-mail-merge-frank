import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Card, Accordion } from 'react-bootstrap';
import './ViewMailTemplate.css';

const colorizePlaceholders = (template) => {
  const regex = /{.*?}/g;
  const parts = template.split(regex);
  const placeholders = Array.from(template.matchAll(regex)).map((m) => m[0]);
  const coloredTemplate = [];

  for (let i = 0; i < parts.length; i++) {
    coloredTemplate.push(<span key={`part-${i}`}>{parts[i]}</span>);
    if (placeholders[i]) {
      coloredTemplate.push(
        <span key={`placeholder-${i}`} className="colored-placeholder">
          {placeholders[i]}
        </span>
      );
    }
  }
  return coloredTemplate;
};

const ViewMailTemplate = () => {
  const [template, setTemplate] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/myapp/template/') // Update this to your Django endpoint URL for fetching the template text
      .then((response) => response.json())
      .then((data) => setTemplate(data.template));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/myapp/template/update', { // Update this to your Django endpoint URL for updating the template text
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ new_text: template }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Template updated successfully.');
    }).catch((error) => {
      console.error('Error:', error);
      alert('Failed to update template.');
    });
  };

  return (
    <Container>
      <Card className="template-card">
        <Card.Body>
          <h2 className="text-center mb-4">Plantilla de Correspondencia</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="template">
              <Form.Label>Puedes modificar la plantilla y luego clic en 'Guardar'</Form.Label>
              <Form.Control
                as="textarea"
                rows={22}
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                required
                className="template-textarea"
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit" style={{ width: "160px" }} className="save-template-btn">
                Guardar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Card className="template-card">
        <Card.Body>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Vista Previa de la Plantilla</Accordion.Header>
                    <Accordion.Body>
                    <div className="template-preview mt-4">
                        <pre>{colorizePlaceholders(template)}</pre>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewMailTemplate;
