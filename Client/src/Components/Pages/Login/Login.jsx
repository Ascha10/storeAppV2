import { useContext,useState } from 'react';
import { authContext } from '../../../Context/AuthProvider/AuthProvider';
import { getUser } from '../../../Services/usersService';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function Login() {

  const {auth,setAuth} = useContext(authContext);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate()

  let submitForm = async (e) => {
    e.preventDefault();
    setEmail(email);
    setPassword(password);

    await getUser({email,password})
    .then((data) => {
      console.log(data);
      if(data.accessToken){
          localStorage.setItem('jwtToken', data.accessToken);
          const decodedUserInfo = jwt_decode(data.accessToken);
          setAuth(decodedUserInfo)
          console.log(decodedUserInfo);
          console.log(auth);

        navigate('/shirts');
      }

    }).catch((err) => {
      console.log(err);
    })

    console.log(email);
    console.log(password);
  }

  let emailHendler = (e) => {
    email = e.target.value;
  }
  let passwordHendler = (e) => {
    password = e.target.value;
  }

  return (
    <section>
      <h1>Login</h1>

      <form action="" onSubmit={(e) => { submitForm(e) }}>

        <label>Email</label>
        <input type="text" onChange={emailHendler} required />
        <div className='emailError'></div>

        <label>Password</label>
        <input type="password" onChange={passwordHendler} required />
        <div className='passwordError'></div>

        <button>Submit</button>
      </form>

    </section>
  )
}
