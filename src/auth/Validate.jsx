import React, { useContext, useState } from 'react'
import { Form, Input, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Contextariable from '../context/AppContext';
import { motion } from 'framer-motion';

const Validate = () => {
  let {setValidate , showcap , setShowcap , showcap2 , setShowcap2} = useContext(Contextariable)
  let navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  let validateNum = Math.floor(Math.random() * 900000).toString()


  const onFinish = async (values) => {
    console.log(values)
    let PostData = await axios('https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId')
    PostData.data.map(user => {
      if(values.username === user.UserName & values.password === user.Password){
        sessionStorage.setItem('UserName' , user.UserName)
        sessionStorage.setItem('userID' , user.id);
        console.log('object')
        messageApi.open({
          type: 'success',
          content: `wellcome ${user.Name_Fname} Please Confirm the code`,
        });
        setShowcap('block')
        setShowcap2('none')
      }
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    messageApi.open({
        type: 'error',
        content: 'Please Fill the Inputs!',
      });
  };


    const { Title } = Typography;
    const onChange = (text) => {
        console.log('onChange:', text);
        if(text === validateNum){
          generateCaptcha()
          messageApi.open({
            type: 'success',
            content: 'Validate done!',
        });

        setTimeout(() => navigate('/MainContent') , 2000)
        }else{
          messageApi.open({
            type: 'error',
            content: 'Code is not true try again!',
          });
        }
        
      };
      // const onInput = (value) => {
      //   console.log('onInput:', value);
      // };
      const sharedProps = {
        onChange,
        // onInput,
    };

    function generateCaptcha() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      let captcha = '';
      for (let i = 0; i < 100; i++) {
          const randomIndex = Math.floor(Math.random() * 6);
          captcha += characters[randomIndex];
      }
      sessionStorage.setItem('token' , captcha);
      return sessionStorage.getItem('token');
  }

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
                className="bg-[#1e293b] rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-lg bg-opacity-90 border border-[#334155] relative"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/loginpage')}
                    className="absolute top-4 left-4 text-[#94a3b8] hover:text-[#60a5fa] transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </motion.button>

                {contextHolder}

                <div className="form" style={{display: showcap2}}>
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold text-[#f8fafc] mb-2">Welcome Back</h2>
                        <p className="text-[#94a3b8]">Sign in to your account</p>
                    </motion.div>

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

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white py-2 px-4 rounded-lg hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all duration-200 font-medium shadow-lg hover:shadow-[#3b82f6]/20 transform hover:-translate-y-0.5"
                        >
                            Sign In
                        </motion.button>
                    </Form>
                </div>

                <div className='inputs' style={{display: showcap}}>
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold text-[#f8fafc] mb-2">Verification</h2>
                        <p className="text-[#94a3b8]">Enter the verification code sent to your device</p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#0f172a] p-6 rounded-xl border border-[#334155] mb-6"
                    >
                        <Typography.Title level={5} className="text-center text-[#f8fafc] mb-4">
                            Your verification code is: <span className="text-[#60a5fa] font-mono">{validateNum}</span>
                        </Typography.Title>
                        <div className="flex justify-center">
                            <Input.OTP 
                                formatter={(str) => str.toUpperCase()} 
                                {...sharedProps}
                                className="space-x-2"
                                inputClassName="w-12 h-12 text-center text-lg font-semibold border-2 border-[#334155] bg-[#1e293b] text-[#f8fafc] rounded-lg focus:border-[#60a5fa] focus:ring-2 focus:ring-[#60a5fa]/20 transition-all"
                            />
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-sm text-[#94a3b8]"
                    >
                        <p>Didn't receive the code? 
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-[#60a5fa] hover:text-[#3b82f6] font-medium ml-1"
                            >
                                Resend
                            </motion.button>
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    </motion.div>
  )
}

export default Validate