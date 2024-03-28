const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
  
    email: {
        type: String,
        require: true,
        unique: true
    },
    
    password: {
        type: String,
        require: true,
    },
})

const users =mongoose.model('users',userSchema);

module.exports=users;


// app.post('/signup', async (req, res) => {
//     try {
//       // Data received from the API request
//       const data = req.body;
  
//       // Shape the data according to your schema
//       const user = new User(data);
  
//       // Store the data in the database
//       const result = await user.save();
  
//       console.log("signup");
//       // res.status(201).json(result);
  
//       Jwt.sign({ user }, jwtkey, (err, token) => {
//         if (err) {
//           res.send({ result: "something went wrong ,please try after some time" })
//         }
//         res.send({ user, auth: token })
//       })
  
//     } catch (error) {
//       console.error('Error saving person:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });
  
  
//   app.post('/login', async (req, res) => {
//     try {
//       // Data received from the API request
//       const data = req.body;
  
//       const user = await User.findOne(data)
  
  
  
  
//       if (user) {
//         Jwt.sign({ user }, jwtkey, (err, token) => {
//           if (err) {
//             res.send({ result: "something went wrong ,please try after some time" })
//           }
//           res.send({ user, auth: token })
//         })
//       } else {
//         res.status(201).json({ result: "User not found" });
//       }
  
  
//       console.log("login");
  
//     } catch (error) {
//       console.error('Error saving person:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });