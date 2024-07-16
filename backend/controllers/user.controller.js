import User from "../models/user.model.js";
import protectRoute from "../middleware/protectRoute.js";

export const  getUsersForSidebar= async(req,res) =>{
    try {
        const loggedInUserId=req.user._id;

        const filteredUsers= await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error('Error in getMessages  controller ::', error.message);
        if (error.code === 11000) {
          return res.status(409).json({ error: 'Username already does  exists' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
}