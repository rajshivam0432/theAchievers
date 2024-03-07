// Feedback.jsx
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const enlargeShrinkAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

const FeedbackContainer = styled.div`
  height: 100vh;
  display: flex;
`;

const BackgroundContainer = styled.div`
  width: 58%;
  background: url('/images/service-feedback2.jpg') no-repeat center center fixed;
  background-size: cover;
`;

const ContentContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const FeedbackHeader = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Star = styled.span`
  font-size: 24px;
  color: ${(props) => (props.selected ? '#FFD700' : '#ccc')};
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
  margin-top: 20px;
`;

const EnlargingLink = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  color: #4caf50;
  margin-top: 20px;
  display: inline-block;
  animation: ${enlargeShrinkAnimation} 3s infinite; /* Adjust the animation duration as needed */
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background:slateblue;
  border-radius: 50px;
  textColor:orange;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleSubmit = () => {
    setShowPopup(true);
      };

  const getGreeting = () => {
    if (rating > 3) {
      return 'Thank you for your positive feedback!';
    } else {
      return 'We appreciate your feedback.';
    }
  };

  return (
    <FeedbackContainer>
      <BackgroundContainer />
      <ContentContainer>
        <FeedbackHeader>{getGreeting()}</FeedbackHeader>
        <StarContainer>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              selected={star <= rating}
              onClick={() => handleStarClick(star)}
            >
              &#9733;
            </Star>
          ))}
        </StarContainer>
        <TextArea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        <EnlargingLink to="/home">Go to home</EnlargingLink>
      </ContentContainer>
      {showPopup && (
        <Popup>
          <h3>Greeting Message</h3>
          <p>{getGreeting()}</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </Popup>
      )}
    </FeedbackContainer>
  );
}

export default Feedback;
