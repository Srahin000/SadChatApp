import { useToast, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    
    const handleClick = ()=>setShow(!show)
    const submitHandler = async()=>{

        setLoading(true);
        if (!name || !email || !password || !confirmpassword){
            console.log('name:', name);
        console.log('email:', email);
        console.log('password:', password);
        console.log('confirmpassword:', confirmpassword);
            toast({      
                title: 'Please Fill all the Fields',
                status: 'warning',
                duration: 5000,     
                isClosable: true,   
                position: 'bottom',
            });
            setLoading(false)
            return;
        }
        if (password !== confirmpassword){
            toast({      
                title: 'Passwords do not match',
                status: 'warning',
                duration: 5000,     
                isClosable: true,   
                position: 'bottom',
            });
            return;
    }
    try {
        const config ={
            headers:{
                "Content-type":"application/json"
            }
        }
        const {data} = await axios.post("api/user", {name, email, password, pic}, config)
        toast({
            title: 'Registration Successful',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
        });
        localStorage.setItem("userInfo", JSON.stringify(data));

        setLoading(false);
        history.push('/chats')
        history.go(0)
        
    } catch (error) {
        toast({
            title: 'Error Occured!',
            description: error.response.data.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
        })
    }
}
    const postDetails = (pics)=>{
        if (pics === undefined){
            console.log("No image selected");
            toast({
                title: 'Please Select an Image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            setLoading(false);
            return;
        }
        if (pics.type === "image/jpeg"||pics.type === "image/png"){
            console.log("got the image")
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "sad_chat_app");
            data.append("cloud_name", "dr2j0yzln");
            fetch("https://api.cloudinary.com/v1_1/dr2j0yzln/image/upload",{
                method: "post",
                body: data,
            })
            .then((res)=>res.json())
            .then((data)=>{
                setPic(data.url.toString());
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
            });
        }
            else{
                toast({
                    title: 'Please Select an Image!',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                })
                setLoading(false);
                return;
            }
            }
            
    

    
  return (
    <VStack spacing={"5px"}>
        <FormControl  id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
            placeholder='Enter Your Name' 
            onChange={(e)=>{setName(e.target.value)}}
            ></Input>
        </FormControl>

        <FormControl  id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
            placeholder='Enter Your Email' 
            onChange={(e)=>{setEmail(e.target.value)}}
            ></Input>
        </FormControl>

        <FormControl  id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                type={show ? "text":"password" }
                placeholder='Enter Your Password' 
                onChange={(e)=>{setPassword(e.target.value)}}
                ></Input>
                <InputRightElement width={"4.5rem"}>
                    <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                        {show ? "Hide":"Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl  id='confirmPassword' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input
                type={show ? "text":"password" }
                placeholder='Enter Your Password' 
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                ></Input>
                <InputRightElement width={"4.5rem"}>
                    <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                        {show ? "Hide":"Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='pic'>
            <FormLabel>Upload your Picture</FormLabel>
            <Input 
            type='file'
            p={1.5}
            accept="image/*"
            onChange={(e)=>postDetails(e.target.files[0])}
            ></Input>
        </FormControl>

        <Button colorScheme='green' width={"100%"} style={{marginTop:15}} onClick={submitHandler} isLoading = {loading}>
            Sign Up
        </Button>
       
    </VStack>
  )
}


export default Signup
