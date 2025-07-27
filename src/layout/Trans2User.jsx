import React from 'react'
import { Button, Form, Input , InputNumber, message, Select } from 'antd';
import axios from 'axios';

const Trans2User = () => {
  const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async(values) => {
        console.log(values.UName)
        let userID = sessionStorage.getItem('userID')
        let GetUser = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId`)
        let GetUser2 = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}`)
        let findUser = GetUser.data.filter(user => user.UserName === values.UName)
        console.log(findUser[0].id)
      let IncreaseInventoryUser = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${findUser[0].id}` , {
        method:"PUT", 
        data:{
            inventory : findUser[0].inventory + values.GetInventory
        }
      })
      let DecreaseInventoryUser = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}` , {
        method:"PUT", 
        data:{
            inventory : GetUser2.data.inventory - values.GetInventory
        }
      })
      if(IncreaseInventoryUser.status === 200){
        messageApi.open({
            type: 'success',
            content: 'Mony Transfer Successfuly',
          });
      }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

  return (
    <div>
         <div className='WalletContainer'>  
    {contextHolder}
       <Form
       className='TransitionToken'
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
      <Form.Item
        label="User Name"
        name="UName"
        rules={[
          {
            required: true,
            message: 'Please input your User Name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Withdrawal amount"
        name="GetInventory"
        rules={[
          {
            required: true,
            message: 'Please input your Withdrawal amount!',
          },
        ]}
      >
        <InputNumber/>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">Transfer</Button>
      </Form.Item>
      </Form> 
    </div>
    </div>
  )
}

export default Trans2User