import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AddResourceForm: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const newResource = { name, description };

        // Send POST request to add a new resource
        axios
            .post('http://localhost:5000/resources', newResource)
            .then((response) => {
                alert('Resource added successfully!');
                setName('');
                setDescription('');
            })
            .catch((error) => {
                console.error('Error adding resource:', error);
                alert('Failed to add resource.');
            });
    };

    return (
        <div className="container mt-5 w-50">
            <h3 className="text-center mb-4">Add New Resource</h3>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Resource Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Resource Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Add Resource
                </button>
            </form>
        </div>
    );
};

export default AddResourceForm;
