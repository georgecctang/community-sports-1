import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';


export default function Test(props) {
  const location = useLocation();
  
  useEffect(() => {
    console.log('props.location.id', location.pathname);
    console.log('props.location.state.first_name', location.state.first_name);
    console.log('props.location.state.last_name', location.state.last_name);
  },[location])

  return (
    <h1>Test</h1>
  )

}