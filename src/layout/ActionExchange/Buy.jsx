import React from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Form, message, InputNumber , Slider } from 'antd';

import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const Buy = () => {

    const [messageApi, contextHolder] = message.useMessage();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [tokenPrice, setTokenPrice] = useState(0);
    const [wallet, setWallet] = useState(1500000);
    const [dataCurrency, setDataCurrency] = useState([]);
    const [tokenNumber, setTokenNumber] = useState({
        name: '',
        user:'',
        img : '',
        price: 1,
        numberforSell : 1
    });
  
  
    const onFinish = (values) => {
      console.log('Success:', values);
      if(wallet > (values.token * tokenNumber.price)){
        setWallet(wallet - (values.token * tokenNumber.price))
        let user = sessionStorage.getItem('UserName')
        let FilterData = dataCurrency.filter(item => item.user !== tokenNumber.user)
        setDataCurrency(FilterData)
        postData(tokenNumber.name , values.token , tokenNumber.price , user , tokenNumber.img)
      }else{
        messageApi.open({
          type: 'error',
          content: 'Please increase your wallet',
        });
      }
      
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const onFinishIncrease = (values) => {
      console.log('Success:', values);
      setWallet(wallet + values.increase)
      messageApi.open({
        type: 'success',
        content: 'your wallet Increased!',
      });
      
    };
    const onFinishFailedIncrease = (errorInfo) => {
      console.log('Failed:', errorInfo);
      messageApi.open({
        type: 'error',
        content: 'Opration faild!',
      });
    };
    const Send2Buy = (item) => {
      setTokenNumber(prev => ({
        ...prev,
        name: item.TokenName,
        user:item.UserName,
        img : item.TokenImage,
        price: item.Price,
        numberforSell : item.TokenNumber
      }))
      setTokenPrice(tokenNumber.price)
      console.log(tokenNumber)
    }
  
    const getData = async () => {
      let dataItem = await axios('https://677eb03c94bde1c1252d0f3e.mockapi.io/SellCrypto')
      setDataCurrency(dataItem.data)
    }
    const postData = async (TokenName , TokenNumber , Price , UserName , TokenImage) => {
      let dataItem = await axios('https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto' , {
  
        method:"POST",
        data:{
          TokenName:TokenName,
          TokenNumber:TokenNumber,
          Price:Price,
          UserName:UserName,
          TokenImage:TokenImage
        }
      })
      if(dataItem.status === 201){
        messageApi.open({
          type: 'success',
          content: 'buy is successfuly!',
        });
      }
    }
  
    useEffect(() => {
      getData()
    } , [])

  return (
    <div className="row content">
        {contextHolder}
        <div className="col">
          {
            dataCurrency.map((item , key) => (
              <div key={key} onClick={() => Send2Buy(item)} className='d-flex CurrencyItem rounded-2 p-2' >
                <small><img width='30px' src={item.TokenImage} alt="" /></small> 
                <span>{item.TokenName}</span>
                <span>{item.Price}</span>
                <small>{item.TokenNumber}</small>
                <small>{item.UserName}</small>
              </div>

            ))
          }
        </div>
        <div className="col mx-3">
          <h5 className='text-center'>Currency : <img width='30px' src={tokenNumber.img} alt="" /> {tokenNumber.name} </h5>
        <Form
        className='LoginForm'
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
          <Form.Item label="token" name="token"
              rules={[
                {
                  required: true,
                  message: 'Please input your token!',
                },
              ]}
            >
            <InputNumber width='100%' min={1} onChange={(value) => setTokenPrice((value * tokenNumber.price))} defaultValue={tokenNumber.numberforSell} max={tokenNumber.numberforSell} />
          </Form.Item>
          {/* <Slider defaultValue={1} min={1} max={tokenNumber.numberforSell} onChange={onChange} onChangeComplete={onChangeComplete} /> */}
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">Buy</Button>
          </Form.Item>
        </Form> 
        <p className='text-center' >{tokenPrice}</p>
        </div>
        </div>
  )
}

export default Buy