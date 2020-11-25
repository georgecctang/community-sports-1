// import  { useState, useEffect } from "react";
// import axios from 'axios';

// const useAppData = function () {
//   const [state, setState] = useState("")

   
//   useEffect(() => {
//     const first = axios.get('http://localhost:8001/api/events')
//     const second = axios.get('http://localhost:8001/api/checkdb/users')
//     Promise.all([
//       first,
//       second
//     ]).then(all => {
//        return setState(prev => ({...prev, events : all[0].data, users: all[1].data}))
//     })
//   },[])
  
//   return state;
// }
// export default useAppData;