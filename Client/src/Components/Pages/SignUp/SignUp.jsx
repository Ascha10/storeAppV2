import { useState,useContext } from 'react'
import { addUser } from '../../../Services/usersService';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {

    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [error,setError] = useState("");

    const navigate = useNavigate()


    let submitForm = async (e) => {
        e.preventDefault();
        setEmail(email);
        setPassword(password);
        await addUser({email,password})
        .then((data) => {
            console.log(data);
            navigate('/login');

        }).catch((err) => {
                setError(err);
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
