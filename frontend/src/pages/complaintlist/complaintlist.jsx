import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled components
const Container = styled.div`
  height: calc(100vh - 100px);
  margin-top: 100px;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #e6eef7;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-right: 20px;
`;

const Tab = styled.button`
  background-color: ${(props) => (props.$active ? '#3498db' : '#fff')};
  color: ${(props) => (props.$active ? '#fff' : '#3498db')};
  border: 1px solid #3498db;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #2980b9;
    color: #fff;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ComplaintContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ComplaintItem = styled.div`
  position: relative;
  width: 90%;
  padding: 20px;
  margin: 15px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${slideIn} 0.5s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryTitle = styled.div`
  font-size: 24px;
  color: #3498db;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`;

const ComplaintMessage = styled.div`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 10px;
`;

const Email = styled.div`
  font-size: 14px;
  color: #777;
`;

const HostelNumber = styled.div`
  font-size: 14px;
  color: #777;
`;

const CreatedAt = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  color: #777;
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  color: #333;
  text-align: center;
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  color: red;
  text-align: center;
`;

const SummarySection = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SummaryTitle = styled.h2`
  font-size: 28px;
  color: #3498db;
  margin-bottom: 20px;
  text-align: center;
`;

const SummaryItem = styled.div`
  font-size: 20px;
  color: #333;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const ComplaintList = () => {
  const [complaintsByCategory, setComplaintsByCategory] = useState({});
  const [activeCategory, setActiveCategory] = useState('summary');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch complaint data from backend
    const fetchComplaintData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        };
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/profile/complaints`, config);
        if (response.status === 200) {
          const groupedComplaints = groupComplaintsByCategory(response.data.data);
          setComplaintsByCategory(groupedComplaints);
          setActiveCategory('summary');
        } else {
          console.error('Failed to fetch complaint data');
          setError('Failed to fetch complaint data');
        }
      } catch (error) {
        if (error.response) {
          console.log('Response data:', error.response.data);
        }
        console.error('Error fetching complaint data:', error.message);
        setError('Error fetching complaint data');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintData();
  }, []); // Empty dependency array ensures useEffect runs only once

  // Function to group complaints by category
  const groupComplaintsByCategory = (complaints) => {
    const grouped = {};
    complaints.forEach((complaint) => {
      const { category, complaint: problem, email, createdAt, hostelNumber } = complaint;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      // Push a new object with spread operator to avoid closure issue
      grouped[category].push({ ...complaint, problem, email, createdAt, hostelNumber });
    });
    return grouped;
  };

  const handleTabClick = (category) => {
    setActiveCategory(category);
  };

  if (loading) {
    return <LoadingMessage>Loading complaints...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Container>
      <TabContainer>
        <Tab $active={activeCategory === 'summary'} onClick={() => handleTabClick('summary')}>
          Summary
        </Tab>
        {Object.keys(complaintsByCategory).map((category) => (
          <Tab
            key={category}
            $active={activeCategory === category}
            onClick={() => handleTabClick(category)}
          >
            {category}
          </Tab>
        ))}
      </TabContainer>
      <ContentSection>
        {activeCategory === 'summary' ? (
          <SummarySection>
            <SummaryTitle>Complaint Summary</SummaryTitle>
            {Object.keys(complaintsByCategory).map((category) => (
              <SummaryItem key={category}>
                <span>{category}</span>
                <span>{complaintsByCategory[category].length}</span>
              </SummaryItem>
            ))}
          </SummarySection>
        ) : (
          <ComplaintContainer>
            <CategoryTitle>{activeCategory}</CategoryTitle>
            {complaintsByCategory[activeCategory]?.map((complaint, index) => (
              <ComplaintItem key={index}>
                <Email>From: {complaint.email}</Email>
                <HostelNumber>Hostel Number: {complaint.hostelNumber}</HostelNumber>
                <CreatedAt>Created At: {new Date(complaint.createdAt).toLocaleString()}</CreatedAt>
                <ComplaintMessage>{complaint.problem}</ComplaintMessage>
              </ComplaintItem>
            ))}
          </ComplaintContainer>
        )}
      </ContentSection>
    </Container>
  );
};

export default ComplaintList;
