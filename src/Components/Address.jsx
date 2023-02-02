import React from 'react'
import { useState } from 'react';
import {Box, Button, Center, Container, FormLabel, Grid, Input, Modal, ModalContent, SimpleGrid, Text, useDisclosure} from "@chakra-ui/react"
import { useEffect } from 'react';
import axios from "axios"

function Address() {
  const { isOpen, onOpen, onClose } = useDisclosure()

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

    const handleSumbit = () => {
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    }
    

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
      alert("Deleted")
      setTimeout(() => {
        window.location.reload()
      }, 3000);
     
    }

    

    const handleEdit = (event,id) => {
     
   let x = axios.get(`https://ishanmehta.onrender.com/users/${id}`).then((res)=>res.data)
   
   let y = {...x,event}
    axios.patch(`https://ishanmehta.onrender.com/users/${id}`,y)
    .then((res)=>res.data)
    getData()
    //  setTimeout(() => {
    //    window.location.reload()
    //  }, 3000);
    
   }
  return (
    <Container width={"50%"} margin="auto">
      <marquee> Json is deployed on reder so it may take time load </marquee>
      <Box backgroundColor={"teal"} border={"1px solid"} padding="15px" borderRadius={"10px"}>
      <form onSubmit={handleSave}>
        <FormLabel fontWeight={"bold"}  textAlign={"center"}>Name</FormLabel>
        
       <Input 
       fontWeight={"bold"}
       placeholder='Enter Name'
       type="text"
       name="Name"
       required={"true"}
       onChange={handleChange}
        />
       

       <FormLabel fontWeight={"bold"} textAlign={"center"}>Age</FormLabel>
       <Input  type="number"
        fontWeight={"bold"}
        required={"true"}
        placeholder='Enter Age'
        name = "Age"
        onChange={handleChange}/>

       <FormLabel fontWeight={"bold"} textAlign={"center"}>City</FormLabel>
       <Input
        type="text"
        fontWeight={"bold"}
        placeholder='Enter City'
        name = "City"
        required={"true"}
        onChange={handleChange}
       />

       <FormLabel fontWeight={"bold"} textAlign={"center"}>State</FormLabel>
       <Input 
       type="text"
       fontWeight={"bold"} 
       placeholder='Enter State'
       name = "State"
       required={"true"}
       onChange={handleChange}
       />

       <FormLabel fontWeight={"bold"} textAlign={"center"}>House No</FormLabel>
       <Input 
       type="number"
       fontWeight={"bold"} 
       placeholder='Enter House Number'
       name = "HouseNo"

       required={"true"}
       onChange={handleChange}
       />

       <FormLabel fontWeight={"bold"} textAlign={"center"}>Country</FormLabel>
       <Input 
       type={"text"}
       fontWeight={"bold"} 
       placeholder='Enter Country Name'
       name = "Country"
       required={"true"}
       onChange={handleChange}
       />
       
       <br/>
       <br/>
  
       <Button color={"white"} fontWeight="bold" background={"green"} padding={"10px"} width="50%" borderRadius="10px" cursor="pointer" onClick={handleSumbit} type={"submit"}> Submit </Button>
       </form>
       </Box>
      
<br/>

       <SimpleGrid margin={"auto"} height={'fit-content'} gridGap={"10px"} columns={[1,2,2]}>
         {
          user?.map((data) => (
            <Box borderRadius={"10px"} backgroundColor={"teal"}>
              <h4 key={data.id}>{data.Name} </h4>
              <h4 >{data.Age} </h4>
              <h4 >{data.City} </h4>
              <h4>{data.HouseNo}</h4>
              <h4>{data.State}</h4>
              <h4>{data.Country}</h4>

              
              <Button cursor={"pointer"} onClick={()=>handleDelete(data.id)}>Delete</Button>
              <Button onClick={onOpen} cursor={"pointer"} >Edit</Button>
              
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalContent>        
    <Box margin={"auto"} width={"50%"} backgroundColor={"teal"} border={"1px solid"} padding="15px">
      <form onSubmit={handleSave}>
        <FormLabel fontWeight={"bold"}  textAlign={"center"}>Name</FormLabel>
      <Center>
       <Input 
       fontWeight={"bold"}
       placeholder='Enter Name'
       type="text"
       name="Name"
       onChange={handleChange}
        />
      </Center>

       <FormLabel fontWeight={"bold"} textAlign={"center"}>Age</FormLabel>
       <Center>
       <Input  type="text"
        fontWeight={"bold"}
        placeholder='Enter City'
        name = "Age"
        onChange={handleChange}/>
        </Center>

       <FormLabel fontWeight={"bold"} textAlign={"center"}>City</FormLabel>
      <Center>
       <Input
        type="text"
        fontWeight={"bold"}
        placeholder='Enter City'
        name = "City"
        onChange={handleChange}
       />
      </Center>

       <FormLabel fontWeight={"bold"} textAlign={"center"}>State</FormLabel>
       <Center>
       <Input 
       type="text"
       fontWeight={"bold"} 
       placeholder='Enter State'
       name = "State"
       onChange={handleChange}
       />
      </Center>

       <FormLabel fontWeight={"bold"} textAlign={"center"}>House No</FormLabel>
       <Center>
       <Input 
       type="text"
       fontWeight={"bold"} 
       placeholder='Enter House Number'
       name = "HouseNo"
       onChange={handleChange}
       />
      </Center>

       <FormLabel fontWeight={"bold"} textAlign={"center"}>Country</FormLabel>
      <Center>
       <Input 
       type={"text"}
       fontWeight={"bold"} 
       placeholder='Enter Country Name'
       name = "Country"
       onChange={handleChange}
       />
       </Center>
       <br/>
       <Center>
       <Button onClick={()=> handleEdit(address,data.id)} type={"submit"}> Submit </Button>
       </Center>
       </form>
       <Center>
       <Button  fontWeight={"bold"} fontSize="large" colorScheme='blue' mr={4} onClick={onClose}>
              Close
        </Button>
            </Center>
       </Box>

      

              </ModalContent>
              </Modal>
              {/* onClick={()=>handleEdit(data.id)} */}
              
            </Box>
           ))
          
         }
          
         
       </SimpleGrid>
    </Container>

    
  )
}

export default Address