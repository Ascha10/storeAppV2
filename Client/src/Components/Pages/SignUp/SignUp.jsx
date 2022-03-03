import { useState,useContext } from 'react'
import { addUser } from '../../../Services/usersService';
// import { authContext } from '../../../Context/AuthProvider/AuthProvider';
// import { useNavigate } from 'react-router-dom';


export default function SignUp() {

    // const {auth,setAuth} = useContext(authContext);

    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");

    // const navigate = useNavigate()


    let submitForm = async (e) => {
        e.preventDefault();
        setEmail(email);
        setPassword(password);
        await addUser({email,password})
        .then((data) => {
            console.log(data);

            // if(data.accessToken){
            // //   setAuth({email:data.email,role:data.role,accessToken :data.accessToken});
            //   setAuth({accessToken :data.accessToken});
            //   console.log(auth);
            // //   console.log(result);
            //   navigate('/');
            // }
        }).catch((err) => {
                console.log(err);
            })
            
            // if(data.accessToken){
            //   // setAuth(data.user.id,data.user.roles, data.user.accessToken);
            //   setAuth({email:data.email,role:data.role,accessToken :data.accessToken});
            //   console.log(auth);
            // //   console.log(result);
            //   navigate('/');
            // }

        // }).catch((err) => {
        //     console.log(err);
        // })
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
            <h1>SignUp</h1>

            <form action=""  onSubmit={(e) => {submitForm(e)}}>

                <label>Email</label>
                <input type="text" onChange={emailHendler} required/>
                <div className='emailError'></div>

                <label>Password</label>
                <input type="password" onChange={passwordHendler} required/>
                <div className='passwordError'></div>

                <button>Submit</button>
            </form>

        </section>
    )
}
