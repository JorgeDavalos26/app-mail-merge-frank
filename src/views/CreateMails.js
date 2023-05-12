import React, { useState, useEffect } from 'react';
import { Table, Button, Toast, Container, Card, Row, Col } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

const CreateMails = () => {

  const notify = () =>
    toast.success('Usuario seleccionado', {
      duration: 750,
    });

  const notify2 = () =>
    toast('Todos los usuarios seleccionados', {
      duration: 1000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/myapp/users/');
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        } else {
          console.error('Failed to fetch users:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user) => {
    const newSelectedUsers = new Set(selectedUsers);

    if (newSelectedUsers.has(user)) {
      newSelectedUsers.delete(user);
    } else {
      newSelectedUsers.add(user);
      notify();
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handleGenerateTextFiles = async () => {
    const selectedUserIds = Array.from(selectedUsers, (user) => user.id);
    const userQueryParams = selectedUserIds.join(',');
  
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/myapp/texts/download/?user_ids=${userQueryParams}`
      );
  
      if (response.ok) {
        let fileBlob;
        let fileName;
  
        if (selectedUserIds.length === 1) {
          // Single user ID returns a txt or pdf file
          fileBlob = await response.blob();
          fileName = `user_${selectedUserIds[0]}.${fileBlob.type.split('/')[1]}.txt`;
        } else {
          // Multiple user IDs return a zip file
          const blob = await response.blob();
          fileBlob = new Blob([blob], { type: 'application/zip' });
          fileName = 'text_files.zip';
        }
  
        const downloadUrl = URL.createObjectURL(fileBlob);
  
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.click();
  
        URL.revokeObjectURL(downloadUrl);
      } else {
        console.error('Failed to generate text files:', response.status);
      }
    } catch (error) {
      console.error('Failed to generate text files:', error);
    }
  };
  
  const handleGeneratePdfFiles = async () => {
    const selectedUserIds = Array.from(selectedUsers, (user) => user.id);
    const userQueryParams = selectedUserIds.join(',');
  
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/myapp/pdfs/download/?user_ids=${userQueryParams}`
      );
  
      if (response.ok) {
        let fileBlob;
        let fileName;
  
        if (selectedUserIds.length === 1) {
          // Single user ID returns a txt or pdf file
          fileBlob = await response.blob();
          fileName = `user_${selectedUserIds[0]}.${fileBlob.type.split('/')[1]}.pdf`;
        } else {
          // Multiple user IDs return a zip file
          const blob = await response.blob();
          fileBlob = new Blob([blob], { type: 'application/zip' });
          fileName = 'pdf_files.zip';
        }
  
        const downloadUrl = URL.createObjectURL(fileBlob);
  
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.click();
  
        URL.revokeObjectURL(downloadUrl);
      } else {
        console.error('Failed to generate PDF files:', response.status);
      }
    } catch (error) {
      console.error('Failed to generate PDF files:', error);
    }
  };
  
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    const newSelectedUsers = new Set(isChecked ? users : []);

    if (isChecked) {
      notify2();
    }

    setSelectedUsers(newSelectedUsers);
  };

  return (
    <div>
      <Toaster />
      <Card className="template-card p-4">
        <Card.Body>
          <h2 className="text-center mb-4">Generar correspondencias</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === users.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user)}
                      onChange={() => handleUserSelect(user)}
                    />
                  </td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {selectedUsers.size > 0 && (
            <div className="text-center my-4 d-flex justify-content-around">
              <Button variant="primary" onClick={handleGenerateTextFiles}>
                Generate Text Files
              </Button>{' '}
              <Button variant="primary" onClick={handleGeneratePdfFiles}>
                Generate PDF Files
              </Button>
            </div>
          )}
          <Toast
            show={showToast}
            style={{
              position: 'fixed',
              top: 20,
              right: 20,
              minWidth: '200px',
              zIndex: 9999,
            }}
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="mr-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>User selected successfully!</Toast.Body>
          </Toast>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateMails;
