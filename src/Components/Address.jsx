import React from 'react'
import { useState } from 'react';
import {Box, Button, Container, FormLabel, Grid, Input, SimpleGrid, Text} from "@chakra-ui/react"
import { useEffect } from 'react';
import axios from "axios"

function Address() {
    const [user, setUser] = useState([])
    let url = "https://ishanmehta.onrender.com/users"

    const getData  = async () => {
      const res = await fetch(url)
      let data = await res.json()
      console.log("data",data[0])
      setUser(data)
    }
  useEffect(() => {
    getData()
  },[])
   

    const [address,setAddress] = useState({
     Name : "",
     Age : "",
     City : "",
     State : "",
     HouseNo : "",
     Country : "",
    })

    const handleChange = (e) => {
      const {name,value} = e.target;
      setAddress({...address,[name]:value})
    };
    

    const handleSave = (e) => {
      e.preventDefault();
     axios.post("https://ishanmehta.onrender.com/users",address).then((res) => console.log("res",res))
    }

    const handleDelete = (id) => {
       axios({
        baseURL: "https://ishanmehta.onrender.com/users",
        url: `/${id}`,
        method: "DELETE"
      });
      setTimeout(() => {
        window.location.reload()
      }, 3000);
     
    }

    const handleEdit = (id) => {
     
      axios({
       baseURL: "https://ishanmehta.onrender.com/users",
       url: `/${id}`,
       method: "PATCH"
     });
    //  setTimeout(() => {
    //    window.location.reload()
    //  }, 3000);
    
   }

   

    
    
   
  


  return (
    <Container width={"50%"} margin="auto">
      <Box border={"1px solid"} padding="15px">
      <form onSubmit={handleSave}>
        <FormLabel fontWeight={"bold"}  textAlign={"center"}>Name</FormLabel>
       <Input 
       fontWeight={"bold"}
       placeholder='Enter Name'
       type="text"
       name="Name"
       onChange={handleChange}
        />

       <FormLabel fontWeight={"bold"} textAlign={"center"}>Age</FormLabel>
       <Input  type="text"
        fontWeight={"bold"}
        placeholder='Enter City'
        name = "Age"
        onChange={handleChange}/>

       <FormLabel fontWeight={"bold"} textAlign={"center"}>City</FormLabel>
       <Input
        type="text"
        fontWeight={"bold"}
        placeholder='Enter City'
        name = "City"
        onChange={handleChange}
       />

       <FormLabel fontWeight={"bold"} textAlign={"center"}>State</FormLabel>
       <Input 
       type="text"
       fontWeight={"bold"} 
       placeholder='Enter State'
       name = "State"
       onChange={handleChange}
       />

       <FormLabel fontWeight={"bold"} textAlign={"center"}>House No</FormLabel>
       <Input 
       type="text"
       fontWeight={"bold"} 
       placeholder='Enter House Number'
       name = "HouseNo"
       onChange={handleChange}
       />

       <FormLabel fontWeight={"bold"} textAlign={"center"}>Country</FormLabel>
       <Input 
       type={"text"}
       fontWeight={"bold"} 
       placeholder='Enter Country Name'
       name = "Country"
       onChange={handleChange}
       />
       <br/>
  
       <Button  type={"submit"}> Submit </Button>
       </form>
       </Box>

<br/>

       <SimpleGrid margin={"auto"} height={'fit-content'} border="1px solid" gridGap={"10px"} columns={[1,2,3,4]}>
         {
          user?.map((data) => (
            <Box border={"1px solid"} >
              <h4 key={data.id}>{data.Name} </h4>
              <h4 >{data.Age} </h4>
              <h4 >{data.City} </h4>
              <h4>{data.HouseNo}</h4>
              <h4>{data.State}</h4>
              <h4>{data.Country}</h4>

              
              <Button onClick={()=>handleDelete(data.id)}>Delete</Button>
              <Button onClick={()=>handleEdit(data.id)}>Edit</Button>
              
            </Box>
           ))
          
         }
          
         
       </SimpleGrid>
    </Container>

    
  )
}

export default Address