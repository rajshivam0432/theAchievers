import {Router} from "express"
import { loginUser, registerUser } from "../controllers/user.controllers.js"
// import { verifyJWT } from "../middlewares/auth.middlewares.js"


const router=Router()

router.route('/register').post(registerUser)  // http://localhost:4000/api/v1/users/register
router.route('/login').post(loginUser)  // http://localhost:4000/api/v1/users/login
// router.route('/logout').post(logoutUser)  // http://localhost:4000/api/v1/users/logout

let tokenStore = [];

router.route('/logout').post((req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  console.log("Token received on server:", token,tokenStore); // Debugging statement

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Remove token from in-memory store
  // tokenStore = tokenStore.filter(t => t !== token);
  console.log("tokenstore",tokenStore)
  res.json({ message: 'Logged out successfully' });
});
export default router;