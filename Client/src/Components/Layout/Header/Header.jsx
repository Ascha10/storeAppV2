import {useContext} from 'react'
import { authContext } from '../../../Context/AuthProvider/AuthProvider';


export default function Header() {

  const {auth} = useContext(authContext);
  console.log(auth);
  return (
    <header className='header'>
      <h1>Header</h1>
      <h1 style={{width: "8%",height: "75%",backgroundColor: "#000",clipPath: "circle(50%)",color:"red"}}>{auth.email}</h1>
      {/* <h1>{auth.email}</h1> */}
    </header>
  )
}
