import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/myapp/users/${id}/delete/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('User deleted:', id);
          navigate('/view-users');
        } else {
          console.error('Failed to delete user:', response.status);
        }
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    };

    deleteUser();
  }, [id, navigate]);

  return (
    <div>
      <h1>User Deleted</h1>
    </div>
  );
};

export default DeleteUser;

