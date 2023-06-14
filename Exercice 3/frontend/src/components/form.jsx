import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('description', description);
      formData.append('file', selectedFile);

      await axios.post('http://localhost:3001/candidate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setDescription('');
      setSelectedFile(null);

      alert('Candidate data submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error submitting candidate data.');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">Job Candidate Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            File:
          </label>
          <input
            type="file"
            className="form-control"
            id="file"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p className="mt-2">Selected File: {selectedFile.name}</p>
          )}
          {!selectedFile && <p className="mt-2">No file chosen</p>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Form;


