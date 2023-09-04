import React, { useState } from 'react'
import { useQuery, gql,useMutation } from '@apollo/client';

const getData= gql`
        query{
            stores{
            storename,
            address
            }
        }`
const create_store = gql`
        mutation CreateStore($storename: String!, $address: String!) {
          createStore(storename: $storename, address: $address) {
            storename
            address
          }
        }
      `;
const store = () => {

  const [name,setName]=useState();
  const [address,setAddress]=useState();
  const {  loading,error,data } = useQuery(getData);
  const [createStore, { load, err }] = useMutation(create_store);

  const sendData=async(e)=>{
     e.preventDefault();
     console.log(address,name);
     try{
        const { data } = await createStore({
            variables: {
              storename:name,
              address:address,
            },
          });
    
          console.log(data.createStore);
     }
    
     catch(err){
        console.log(err);
     }
  }
  const getquery=async()=>{
    try{
      
     
      console.log(data);
    }
    catch(err){
            console.log(err);
    }
  }
  return (
    <div>
        store
        <form >
        <input type="text" placeholder='name' value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input type="address" placeholder='address' value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
        <button onClick={sendData}>Submit</button>
        </form>
        <button onClick={getquery}>Get</button>
    </div>
  )
}

export default store