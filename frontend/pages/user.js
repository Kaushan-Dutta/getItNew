import React,{useState} from 'react'
const user = () => {
  const [name,setName]=useState();
  const [address,setAddress]=useState();
  return (
    <div>
        user
        <input type="text" placeholder='name' onChange={(e)=>{setName(e.target.value)}}/>
        <input type="address" placeholder='address' onChange={(e)=>{setAddress(e.target.value)}}/>
    </div>

  )
}

export default user