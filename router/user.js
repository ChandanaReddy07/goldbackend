var express = require("express");
const router = express.Router();

const User = require("../models/user");

const { default: axios, Axios } = require("axios");

router.get("/fetch-users", async (req, res) => {
  try {
    // Make a GET request to the external API
    const response = await axios.get(process.env.GOLDAPI, {});

    const userDataa = response.data.data; // Assuming the user data is in the 'result' field
    const users = userDataa.map((userData) => ({
      id: userData.id, // Map the 'Id' field to your 'id' field in the database schema
      name: userData.name,
      email: userData.email,
      gender: userData.gender,
      status: userData.status,
      created_at: userData.Created_at,
      updated_at: userData.Updated_at,
    }));

    // Store the users in the MongoDB database
    const storedUsers = await User.insertMany(users);

    res.json(storedUsers); // Return the stored users as the API response
  } catch (error) {
    console.error("Error fetching and storing users:", error);
    res.status(500).json({ error: "Failed to fetch and store users" });
  }
});

// Define the API endpoint to fetch all user data
router.get("/users", async (req, res) => {
  try {
    // Fetch all user records from the database
    const users = await User.find();

    // Return the user data as a JSON response
    res.json(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

router.put("/users/:id", async (req, res) => {

  try {
    const userId = req.params.id;
    const updatedData = req.body;
    

    // Find the user by ID in the database
    const user = await User.findOne({id:userId});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

     // Update the user details dynamically
     Object.assign(user, updatedData);

     // Save the updated user details to the database
     await user.save();
    //Response 
    res.json({ message: "User details updated successfully" ,user:user});
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Failed to update user details" });
  }
});

module.exports = router;
