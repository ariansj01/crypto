import { Button, Form , Input, InputNumber, message } from 'antd';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChangeInfo = () => {
    const [messageApi, contextHolder] = message.useMessage();
    let [currentUser , setCurrentUser] = useState()
    let userID = sessionStorage.getItem('userID')

    const onFinish = async (values) => {
        console.log('Success:', values);
        let PutData = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}` , {
          method:"PUT",
          data:{
            UserName: values.UserName,
            Name_Fname: values.Name_Fname,
            Email: values.Email,
            Phone: values.Phone,
            Password: values.password,
            inventory: values.inventory,
            IdNational: values.IdNational,
            Phone: values.Phone,
            BirthDay: values.BirthDay,
            Adderss: values.Adderss,
            ZipCode: values.ZipCode,
            CardNumber: values.CardNumber,
            Shaba: values.Shaba,
            CardOwner: values.CardOwner,
            Authentication: true,
            PickUp: 0,
          }
        })
        if(PutData.status === 200){
            messageApi.open({
                type: 'success',
                content: 'Change your information is Complitly',
              });
          }
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        messageApi.open({
            type: 'error',
            content: 'Please Fill the Inputs!',
          });
      };
    const GetUser = async() => {
        console.log(userID)
        let GetData = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}`)
        setCurrentUser(GetData.data)
    }
    useEffect(() => {
        GetUser()
    } , [])
  return (
        // <p>srd</p>
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
            // maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
            <div className='ProfileCountainer'>
            {contextHolder}
                <p className='titleSec h3 text-center'>General Information</p>
                <div className="GeneralInfo row">
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>Name</p>
                        <Form.Item label="Name" name="Name"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your Name!',
                        },
                        ]}
                        >
                        <Input />
                        </Form.Item>
                    </div>
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>User Name</p>
                        <Form.Item label="Username" name="username"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your username!',
                        },
                        ]}
                        >
                        <Input  />
                        </Form.Item>
                    </div>
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>Email</p>
                        <Form.Item label="Email" name="Email"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your Email!',
                        },
                        ]}
                        >
                        <Input  />
                        </Form.Item>
                    </div>
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>Phone</p>
                        <Form.Item label="Phone" name="Phone"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your Phone!',
                        },
                        ]}
                        >
                        <InputNumber />
                        </Form.Item>
                    </div>
                </div>
                <p className='titleSec h3 text-center my-4'>Accounting Information</p>
                <div className="AccountingInfo row">
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>inventory</p>
                        <Form.Item label="inventory" name="inventory"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your inventory!',
                        },
                        ]}
                        >
                        <InputNumber/>
                        </Form.Item>
                    </div>
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>CardOwner</p>
                        <Form.Item label="CardOwner" name="CardOwner"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your CardOwner!',
                        },
                        ]}
                        >
                        <Input />
                        </Form.Item>
                    </div>
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>CardNumber</p>
                        <Form.Item label="CardNumber" name="CardNumber"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your CardNumber!',
                        },
                        ]}
                        >
                        <InputNumber/>
                        </Form.Item>
                    </div>
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>Shaba</p>
                        <Form.Item label="Shaba" name="Shaba"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your Shaba!',
                        },
                        ]}
                        >
                        <InputNumber/>
                        </Form.Item>
                    </div>
                </div>
                <p className='titleSec h3 text-center my-4'>Personal Information</p>
                <div className="PersonalInfo row">
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>Password</p>
                        <Form.Item label="Password" name="Password"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your Password!',
                        },
                        ]}
                        >
                        <Input/>
                        </Form.Item>
                    </div>
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>IdNational</p>
                        <Form.Item label="IdNational" name="IdNational"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your IdNational!',
                        },
                        ]}
                        >
                        <InputNumber/>
                        </Form.Item>
                    </div>
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>BirthDay</p>
                        <Form.Item label="BirthDay" name="BirthDay"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your BirthDay!',
                        },
                        ]}
                        >
                        <Input />
                        </Form.Item>
                    </div>
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>Adderss</p>
                        <Form.Item label="Adderss" name="Adderss"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your Adderss!',
                        },
                        ]}
                        >
                        <Input/>
                        </Form.Item>
                    </div>
                    <div className="col border border-warning rounded-3 text-center mx-2 py-2">
                        <p className='title'>ZipCode</p>
                        <Form.Item label="ZipCode" name="ZipCode"
                        rules={[
                        {
                            required: false,
                            message: 'Please input your ZipCode!',
                        },
                        ]}
                        >
                        <InputNumber />
                        </Form.Item>
                    </div>
                </div>
                <Form.Item label={null}>
                <Button className='my-3' type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </div>
        </Form>
  )
}

export default ChangeInfo