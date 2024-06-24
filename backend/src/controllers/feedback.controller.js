import { Feedback } from '../models/feedback.model.js'

// Function to submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { rating, feedbackMessage } = req.body;
    console.log("Received feedback:", req.body);
    
    const userId = req._id;
    console.log("User ID:", userId);

    // Save feedback to the database with associated user ID
    const newFeedback = new Feedback({
      rating,
      feedbackMessage, 
      // user: userId 
    });

    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Error submitting feedback. Please try again later.' });
  }
};
const getFeedback = async (req, res) => {
  try {
    // const userId = req.user._id; 

const token = req.headers.authorization;
console.log("request",req.body,"tokennnnnnnnn",token)
    const userFeedback = await Feedback.find({});
    console.log("userFeedback:", userFeedback);
    const get=userFeedback.forEach((feedback) => {
      const { _id, stars, feedbackMessage } = feedback;
      console.log(`Feedback ID: ${_id}`);
      console.log(`Stars: ${stars}`);
      console.log(`Feedback Message: ${feedbackMessage}`);
      console.log('---');
    });
    console.log("desired form",get);
    res.status(200).json({ feedback: userFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve feedback', error: error.message });
  }
};


export {
  submitFeedback,
  getFeedback,
}
