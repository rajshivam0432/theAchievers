import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ComplaintPage = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [complaint, setComplaint] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleComplaintChange = (e) => {
    setComplaint(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('category', category);
    formData.append('complaint', complaint);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4000/api/v1/profile/complaint', formData, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Complaint submitted:', response.data);
      alert('Complaint submitted successfully!');

      setCategory('');
      setComplaint('');
    } catch (error) {
      console.error('Error submitting complaint:', error.response?.data);
      setError('Error submitting complaint: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetFeedback = () => {
    navigate('/complaintlist');
  };

  return (
    <Container>
      <Content>
        <Header>Share Your Complaint with Us</Header>
        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Category:</Label>
            <StyledSelect value={category} onChange={handleCategoryChange}>
              <option value="">Select category</option>
              <option value="wifi">WiFi</option>
              <option value="electricity">Electricity</option>
              <option value="carpenter">Carpenter</option>
              <option value="sweeper">Sweeper</option>
            </StyledSelect>
          </FormGroup>
          <FormGroup>
            <Label>Write your complaint:</Label>
            <StyledTextArea
              placeholder="Write complaint here"
              value={complaint}
              onChange={handleComplaintChange}
            />
          </FormGroup>
          <SubmitButton disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </StyledForm>
      </Content>
      <FeedbackButton onClick={handleGetFeedback}>View Feedback</FeedbackButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #3498db, #1abc9c); /* Faded background gradient */
`;

const Content = styled.div`
  max-width: 600px;
  width: 80%;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Header = styled.h1`
  font-size: 28px;
  color: #333; /* Dark grey font color */
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 18px;
  color: #333; /* Dark grey font color */
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 150px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 20px;
  color: #fff;
  background-color: #3498db; /* Blue submit button */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9; /* Darker shade of blue */
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const FeedbackButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 16px 24px;
  font-size: 18px;
  color: #fff;
  background-color: #27ae60; /* Green view feedback button */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #219d53; /* Darker shade of green */
  }
`;

const ErrorMessage = styled.div`
  font-size: 16px;
  color: red;
  margin-top: 10px;
`;

export default ComplaintPage;
