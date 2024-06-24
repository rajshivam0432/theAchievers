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

// Styled components
const Container = styled.div`
  height: calc(100vh - 100px); /* Adjust the height to account for navbar height and additional gap */
  margin-top: 100px; /* More gap from the navbar, adjust as necessary */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f0f4f8; /* Light background color */
`;

const SplitContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  background-color: #ffffff;
  border-radius: 20px; /* Softer border radius */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const FeedbackSection = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid #ddd;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const SummarySection = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FeedbackItem = styled.div`
  width: 90%;
  padding: 20px;
  margin: 15px 0;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.5s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const StarRating = styled.div`
  font-size: 24px;
  color: #ffa41b; /* Orange color for stars */
  margin-bottom: 10px;
`;

const FeedbackMessage = styled.div`
  font-size: 18px;
  color: #333; /* Darker color for better readability */
  line-height: 1.6;
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  color: red;
`;

const SummaryContent = styled.div`
  text-align: center;
  color: #333;
`;

const SummaryItem = styled.div`
  margin: 10px 0;
  font-size: 18px;
`;

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch feedback data from backend
    const fetchFeedbackData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        };
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/feedback/get`, config);
        if (response.status === 200) {
          setFeedbackList(response.data.feedback);
        } else {
          console.error('Failed to fetch feedback data');
          setError('Failed to fetch feedback data');
        }
      } catch (error) {
        if (error.response) {
          console.log("Response data:", error.response.data);
        }
        console.error('Error fetching feedback data:', error.message);
        setError('Error fetching feedback data');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackData();
  }, []); // Empty dependency array ensures useEffect runs only once

  if (loading) {
    return <LoadingMessage>Loading feedback...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const totalFeedback = feedbackList.length;
  const averageRating = totalFeedback > 0 
    ? (feedbackList.reduce((sum, feedback) => sum + feedback.stars, 0) / totalFeedback).toFixed(1)
    : 0;

  return (
    <Container>
      <SplitContainer>
        <FeedbackSection>
          <FeedbackContainer>
            {feedbackList.length > 0 ? (
              feedbackList.map((feedback) => (
                <FeedbackItem key={feedback._id}>
                  <StarRating>
                    Rating: {'★'.repeat(feedback.stars)}
                  </StarRating>
                  <FeedbackMessage>
                    {feedback.feedbackMessage}
                  </FeedbackMessage>
                </FeedbackItem>
              ))
            ) : (
              <div>No feedback available</div>
            )}
          </FeedbackContainer>
        </FeedbackSection>
        <SummarySection>
          <SummaryContent>
            <h2>Feedback Summary</h2>
            <SummaryItem>
              <strong>Average Rating:</strong> {averageRating} / 5
            </SummaryItem>
            <SummaryItem>
              <strong>Total Feedback:</strong> {totalFeedback}
            </SummaryItem>
            <SummaryItem>
              We value your feedback and strive to improve based on your suggestions.
            </SummaryItem>
          </SummaryContent>
        </SummarySection>
      </SplitContainer>
    </Container>
  );
};

export default FeedbackList;
