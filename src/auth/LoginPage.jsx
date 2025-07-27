import React, { useContext, useState } from 'react'
import { Form, Input, InputNumber, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Contextariable from '../context/AppContext';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    let navigate = useNavigate()
    let {setValidate  , setShowcap  , setShowcap2} = useContext(Contextariable)
    let [validType , setValidType] = useState(false)



  const onFinish = async (values) => {
    console.log('Success:', values);
    let GetData = await axios('https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId')
    let validateUser = GetData.data.some(item => item.UserName === values.username || item.Email === values.Email)
    setValidType(false)
    if (!validateUser) {
      console.log('come')
      let PostData = await axios('https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId' , {
        method:"POST",
        data:{
          UserName: values.username,
          Name_Fname: values.Name_Fname,
          Email: values.Email,
          Phone: values.Phone,
          Password: values.password,
          inventory: 0,
          IdNational:0,
          Phone: 0,
          BirthDay:"",
          Adderss:"",
          ZipCode: 3,
          CardNumber: 0,
          Shaba: 0,
          CardOwner: "",
          Authentication: false,
          PickUp: 0,
        }
      })
      if(PostData.status === 201){
        messageApi.open({
            type: 'success',
            content: 'Login is Complitly',
          });
        setTimeout(() => setValidate(true) , 2000)
      }
    }else{
      messageApi.open({
        type: 'error',
        content: 'There is user with this profile',
      });
    }
  };

  const handleSuccess = async(credentialResponse) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 15; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Login Success:', decoded.email);
    let GetData = await axios('https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId')
    // let validateUser = GetData.data.some(item => item.UserName === values.username || item.Email === values.Email)
    let validateUser = GetData.data.some(item => item.Email === decoded.email)
    if(!validateUser){
      let PostData = await axios('https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId' , {
        method:"POST",
        data:{
          UserName: decoded.email.split('@')[0],
          Name_Fname: decoded.name,
          Email: decoded.email,
          Password: password,
          inventory: 0,
          IdNational:0,
          Phone: 0,
          BirthDay:"",
          Adderss:"",
          ZipCode: 3,
          CardNumber: 0,
          Shaba: 0,
          CardOwner: "",
          Authentication: false,
          PickUp: 0,
        }
      })
      // let GetData = await axios('https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId')
      let CurrentUser = GetData.data.filter(item => item.Email === decoded.email)
      console.log(CurrentUser)
      if(PostData.status === 201){
        sessionStorage.setItem('UserName' , CurrentUser[0].UserName)
          sessionStorage.setItem('userID' , CurrentUser[0].id);
        messageApi.open({
            type: 'success',
            content: 'Login is Complitly',
          });
        setTimeout(() => {
          navigate('/Validate')
          setShowcap('block')
          setShowcap2('none')
        } , 2000)
      }
    }else{
      // let GetData = await axios('https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId')
      let CurrentUser = GetData.data.filter(item => item.Email === decoded.email)
      sessionStorage.setItem('UserName' , CurrentUser[0].UserName)
        sessionStorage.setItem('userID' , CurrentUser[0].id);
      messageApi.open({
          type: 'success',
          content: 'Login is Complitly',
        });
      setTimeout(() => {
        navigate('/Validate')
        setShowcap('block')
        setShowcap2('none')
      } , 2000)
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    messageApi.open({
        type: 'error',
        content: 'Please Fill the Inputs!',
      });
  };

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4"
    >
        <div className="w-full max-w-md">
            <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1e293b] rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg bg-opacity-90 border border-[#334155]"
            >
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold text-[#f8fafc] mb-2">Welcome to Crypto</h2>
                    <p className="text-[#94a3b8]">Create your account or sign in</p>
                </motion.div>
                
                {contextHolder}
                
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                    className="space-y-4"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Form.Item 
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            className="mb-4"
                        >
                            <Input 
                                className="w-full px-4 py-2 rounded-lg border border-[#334155] bg-[#0f172a] text-[#f8fafc] focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all placeholder-[#64748b]"
                                placeholder="Username"
                            />
                        </Form.Item>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Form.Item 
                            name="Name_Fname"
                            rules={[{ required: true, message: 'Please input your Name-Fname!' }]}
                            className="mb-4"
                        >
                            <Input 
                                className="w-full px-4 py-2 rounded-lg border border-[#334155] bg-[#0f172a] text-[#f8fafc] focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all placeholder-[#64748b]"
                                placeholder="Full Name"
                            />
                        </Form.Item>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Form.Item 
                            name="Email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                            className="mb-4"
                        >
                            <Input 
                                className="w-full px-4 py-2 rounded-lg border border-[#334155] bg-[#0f172a] text-[#f8fafc] focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all placeholder-[#64748b]"
                                placeholder="Email"
                                type="email"
                            />
                        </Form.Item>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Form.Item 
                            name="Phone"
                            rules={[{ required: true, message: 'Please input your Phone!' }]}
                            className="mb-4"
                        >
                            <InputNumber 
                                className="w-full px-4 py-2 rounded-lg border border-[#334155] bg-[#0f172a] text-[#f8fafc] focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all placeholder-[#64748b]"
                                placeholder="Phone Number"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Form.Item 
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            className="mb-6"
                        >
                            <Input.Password 
                                className="w-full px-4 py-2 rounded-lg border border-[#334155] bg-[#0f172a] text-[#f8fafc] focus:ring-2 focus:ring-[#60a5fa] focus:border-transparent transition-all placeholder-[#64748b]"
                                placeholder="Password"
                            />
                        </Form.Item>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col space-y-3"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white py-2 px-4 rounded-lg hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-200 font-medium shadow-lg hover:shadow-[#3b82f6]/20 transform hover:-translate-y-0.5"
                        >
                            Sign Up
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={() => navigate('/Validate')}
                            className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white py-2 px-4 rounded-lg hover:from-[#7c3aed] hover:to-[#6d28d9] transition-all duration-200 font-medium shadow-lg hover:shadow-[#8b5cf6]/20 transform hover:-translate-y-0.5"
                        >
                            Sign In
                        </motion.button>
                    </motion.div>
                </Form>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="relative my-6"
                >
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#334155]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-[#1e293b] text-[#94a3b8]">Or continue with</span>
                    </div>
                </motion.div>

                <GoogleOAuthProvider clientId="1004266058067-1ebg7sphgongomjrufqlpv1pdt4mlsai.apps.googleusercontent.com">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex justify-center"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="transform transition-transform duration-200"
                        >
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleError}
                                theme="filled_blue"
                                shape="rectangular"
                                text="signin_with"
                                size="large"
                            />
                        </motion.div>
                    </motion.div>
                </GoogleOAuthProvider>
            </motion.div>
        </div>
    </motion.div>
  );
};

export default LoginPage;