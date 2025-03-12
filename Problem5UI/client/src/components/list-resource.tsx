import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

interface Resource {
  _id: string;
  name: string;
  description: string;
}

const ResourcesList: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Fetch resources from backend
  useEffect(() => {
    axios.get('http://localhost:5000/resources')
      .then(response => {
        setResources(response.data);
      })
      .catch(error => {
        console.error('Error fetching resources:', error);
      });
  }, []);

  // Delete resource
  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:5000/resources/${id}`)
      .then(() => {
        setResources(resources.filter(resource => resource._id !== id));
        alert('Resource deleted');
      })
      .catch(error => {
        console.error('Error deleting resource:', error);
      });
  };

  // Handle update
  const handleUpdate = (id: string, updatedName: string, updatedDescription: string) => {
    axios.put(`http://localhost:5000/resources/${id}`, {
      name: updatedName,
      description: updatedDescription
    })
      .then(response => {
        setResources(resources.map(resource =>
          resource._id === id ? response.data : resource
        ));
        setEditingResource(null); // Close edit form
        alert('Resource updated');
      })
      .catch(error => {
        console.error('Error updating resource:', error);
      });
  };

  // Edit resource
  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Resources</h3>
      <ul className="list-group">
        {resources.map(resource => (
          <li key={resource._id} className="list-group-item shadow-sm rounded">
            {editingResource && editingResource._id === resource._id ? (
              <div className="edit-form">
                <input
                  type="text"
                  defaultValue={resource.name}
                  id="edit-name"
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  defaultValue={resource.description}
                  id="edit-description"
                  className="form-control mb-3"
                />
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleUpdate(
                      resource._id,
                      (document.getElementById('edit-name') as HTMLInputElement).value,
                      (document.getElementById('edit-description') as HTMLInputElement).value
                    )
                  }
                >
                  Update
                </button>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => setEditingResource(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="resource-details">
                <h3>{resource.name}</h3>
                <p>{resource.description}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(resource)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDelete(resource._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourcesList;
