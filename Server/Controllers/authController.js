const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}


let signupPost = async (req,res)=>{
  const {email,password} = req.body;

  if(await User.exists({email:email})) return res.status(400).send({message:"Email Already Exists"});

  bcrypt.hash(password,10,async (err,hashPassword) => {
      if(err) return res.status(500).send({message: err});

      req.body.password = hashPassword;
      await  User.create(req.body) 
          .then(result=> res.status(200).send({message:"User has been Added",result}))
          .catch(err=> res.status(500).send(err))
  })
}

let loginPost  = async (req,res)=>{
  if(User.exists(req.body.email) == false) return res.status(400).send({message:"User not exist"});

  const {email,password} = req.body;

  await User.findOne({email})
  .then(user=> {
      bcrypt.compare(password ,user.password,(err,isMatch)=>{
      if(err) return res.status(400).send({message:"error in pas"})
      if(!isMatch) return res.status(403).send({message:"Password incorrect"})

      jwt.sign({email : user.email,id : user._id,role: user.role},process.env.SECRET_KEY,{expiresIn:'30m'},(err,accessToken)=>{
          if(err) return res.status(400).send({Error:`${err}`})
          res.status(200).send({message:"Login Sucssefuly",accessToken});
          user.isLogin = true;
          user.save();
      })
  })
  })
  .catch((err)=>{res.status(400).send({message:`${err}`})})
  
}


let logout = async (req, res) => {

    await User.findOne({ _id : req.params.id}).then((user) => {
      user.isLogin = false;
      user.save();
      console.log(user);
    })

     res.send({message:'The Token removed successfully'});
}

module.exports = {
  signupPost,
  loginPost,
  logout
};