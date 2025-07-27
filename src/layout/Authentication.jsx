import React, { useEffect } from 'react'
import { Button, Form, Input, InputNumber , message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
    const [messageApi, contextHolder] = message.useMessage();
    let navigate = useNavigate()

  const onFinish = async (values) => {
    console.log('Success:', values);
    let userID = sessionStorage.getItem('userID')
    let PostData = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}` , {
      method:"PUT",
      data:{
        IdNational: values.IdNational,
        BirthDay: values.BirthDay,
        Adderss: values.Adderss,
        ZipCode: values.ZipCode,
        CardNumber: values.CardNumber,
        Shaba: values.Shaba,
        CardOwner: values.CardOwner,
        Authentication: true
      }
    })
    if(PostData.status === 200){
      messageApi.open({
          type: 'success',
          content: 'Authentication is Complitly',
        });
      setTimeout(() => {
        navigate('/Wallet')
      } , 2000)
    }
  };

  useEffect( () => {
    // let userID = sessionStorage.getItem('userID')
    // let PostData = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}`)
    
  } , [])


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    messageApi.open({
        type: 'error',
        content: 'Please Fill the Inputs!',
      });
  };

  return (
    <div className='' >
        {contextHolder}
      <Form
        className=''
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
      <Form.Item label="IdNational" name="IdNational"
          rules={[
            {
              required: true,
              message: 'Please input your IdNational!',
            },
          ]}
        >
        <InputNumber width='100%' />
      </Form.Item>

      <Form.Item label="BirthDay" name="BirthDay"
          rules={[
            {
              required: true,
              message: 'Please input your BirthDay!',
            },
          ]}
        >
        <Input />
      </Form.Item>

      <Form.Item label="Adderss" name="Adderss"
          rules={[
            {
              required: true,
              message: 'Please input your Adderss!',
            },
          ]}
        >
        <Input />
      </Form.Item>

      <Form.Item label="ZipCode" name="ZipCode"
          rules={[
            {
              required: true,
              message: 'Please input your ZipCode!',
            },
          ]}
        >
        <InputNumber width='100%' />
      </Form.Item>

      <Form.Item label="CardNumber" name="CardNumber"
        rules={[
          {
            required: true,
            message: 'Please input your CardNumber!',
          },
        ]}
      >
        <InputNumber width='100%' />
      </Form.Item>  

      <Form.Item label="Shaba" name="Shaba"
        rules={[
          {
            required: true,
            message: 'Please input your Shaba!',
          },
        ]}
      >
        <InputNumber width='100%' />
      </Form.Item> 

      <Form.Item label="CardOwner" name="CardOwner"
          rules={[
            {
              required: true,
              message: 'Please input your CardOwner!',
            },
          ]}
        >
        <Input />
      </Form.Item> 

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">Submit Full Specification</Button>
      </Form.Item>
    </Form> 
    </div>
  )
}

export default Authentication