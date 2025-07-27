import React, { useEffect, useState } from 'react'
import { data, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaWallet, FaExchangeAlt, FaCreditCard, FaHistory } from 'react-icons/fa'
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  message,
  Form,
  Input,
  InputNumber,
  Typography,
  Select,
} from 'antd';
const { Text } = Typography;

// import '../../assets/scss/main.css'

const Wallet = () => {

  let navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage();
  const [makeHistory , setMakeHistory] = useState({})
  const [currentCurrency , setCurrentCurrency] = useState([])
  const [currentUser , setcurrentUser] = useState({})
  const [tabItem1 , setTabItem1] = useState("active")
  const [tabItem2 , setTabItem2] = useState("DeActive")
  const [tabItem3 , setTabItem3] = useState("DeActive")
  const [tabItem4 , setTabItem4] = useState("DeActive")
  const [subTabItem1 , setSubTabItem1] = useState("SubActive")
  const [subTabItem2 , setSubTabItem2] = useState("SubDeActive")
  let ButCrypto = 'https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto'
  let CurrentUser = 'https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId'
  let SeUserName = sessionStorage.getItem('UserName')
  let userID = sessionStorage.getItem('userID')

  const GetData = async() => {
    let Cryproes = await axios.get(ButCrypto)
    let User = await axios.get(CurrentUser+'/'+userID)
    setcurrentUser(User.data)
    let FindUserCurrency = Cryproes.data.filter(item => item.UserName === SeUserName)
    setCurrentCurrency(FindUserCurrency)
  }
  const Finish_OnChainTransfer = async(values) => {
    console.log(values)
    
    let Cryproes = await axios.get(ButCrypto + "/" + values.Currency)
    let ValidateNumber = false;
    if (values.Number <= Cryproes.data.TokenNumber) {
      ValidateNumber = true
    }else{
        messageApi.open({
      type: 'error',
      content: 'You can not pick up more than Crypto Number',
      });
    }
    if (ValidateNumber) {
      let PutTokenNumber = await axios(ButCrypto + "/" + values.Currency , {
        method:"PUT",
        data:{
          TokenNumber : values.Number - Cryproes.data.TokenNumber
        }
      })
      if (PutTokenNumber.data.TokenNumber < 1) {
        let Cryproes = await axios.delete(ButCrypto + "/" + values.Currency)
        console.log(Cryproes)
      }
      MakeTransitionHistory(Cryproes.data.TokenName , values.Number - 0.01 , values.UserName , values.NetWork)
      if(PutTokenNumber.status === 200){
        let DeleteCryproes = await axios.delete(ButCrypto + "/" + values.Currency)
        console.log(DeleteCryproes)
        messageApi.open({
          type: 'success',
          content: 'Transition is Successfuly',
        });
      }
    }
  }
  const Internal_OnChainTransfer = async(values) => {
    console.log(values)
    let CurrentCurrency = await axios(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto/${values.Currency}`)

    let ValidateNumber = false
      if (values.Number <= CurrentCurrency.data.TokenNumber) {
        ValidateNumber = true
      }else{
          messageApi.open({
        type: 'error',
        content: 'You can not pick up more than Crypto Number',
        });
      }
      if(ValidateNumber){
        let IncreaseInventoryUser = await axios(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto` , {
          method:"POST", 
          data:{
            TokenName: CurrentCurrency.data.TokenName,
            TokenNumber: values.Number,
            Price: CurrentCurrency.data.Price,
            UserName: values.UserName,
            TokenImage: CurrentCurrency.data.TokenImage
          }
        })
        let DecreaseInventoryUser = await axios(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto/${values.Currency}` , {
          method : "PUT",
          data:{
            TokenNumber: CurrentCurrency.data.TokenNumber - values.Number
          }
        })
        MakeTransitionHistory(CurrentCurrency.data.TokenName , values.Number , values.UserName , "")
        if(CurrentCurrency.data.TokenNumber <= 1){
          let Cryproes = await axios.delete(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto/${values.Currency}`)
          console.log(Cryproes)
        }
        if(IncreaseInventoryUser.status === 201 && DecreaseInventoryUser.status === 200){
          
          messageApi.open({
              type: 'success',
              content: 'Transfer Successfuly',
            });
        }
      }
  }
  const Finish_BankTransfer = async(values) => {
    console.log(values)
    let CurrentCurrency = await axios(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto/${values.Currency}`)
    let ValidateNumber = false
      if (values.Number <= CurrentCurrency.data.TokenNumber) {
        ValidateNumber = true
      }else{
          messageApi.open({
        type: 'error',
        content: 'You can not pick up more than Crypto Number',
        });
      }
      if(ValidateNumber){
        let DecreaseInventoryUser = await axios(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto/${values.Currency}` , {
          method : "PUT",
          data:{
            TokenNumber: CurrentCurrency.data.TokenNumber - values.Number
          }
        })
        MakeTransitionHistory2(CurrentCurrency.data.TokenName , values.CardNumber , values.BranchCode , values.Number)
        if(CurrentCurrency.data.TokenNumber <= 1){
          let Cryproes = await axios.delete(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto/${values.Currency}`)
          console.log(Cryproes)
        }
        if( DecreaseInventoryUser.status === 200){
          
          messageApi.open({
              type: 'success',
              content: 'Transfer Successfuly',
            });
        }
      }
  }
  const Finish_Credit = async(values) => {
    console.log(values)
    let CurrentCurrency = await axios(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto/${values.Currency}`)
    let ValidateNumber = false
      if (values.Number <= CurrentCurrency.data.TokenNumber) {
        ValidateNumber = true
      }else{
          messageApi.open({
        type: 'error',
        content: 'You can not pick up more than Crypto Number',
        });
      }
      if(ValidateNumber){
        let DecreaseInventoryUser = await axios(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto/${values.Currency}` , {
          method : "PUT",
          data:{
            TokenNumber: CurrentCurrency.data.TokenNumber - values.Number
          }
        })
        MakeTransitionHistory2(CurrentCurrency.data.TokenName , values.CardNumber , values.Expiration , values.CCV)
        if(CurrentCurrency.data.TokenNumber <= 1){
          let Cryproes = await axios.delete(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto/${values.Currency}`)
          console.log(Cryproes)
        }
        if( DecreaseInventoryUser.status === 200){
          
          messageApi.open({
              type: 'success',
              content: 'Transfer Successfuly',
            });
        }
      }
  }

  const CheckValid = async () => {
    let userID = sessionStorage.getItem('userID')
    let PostData = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}`)
    if (!PostData.data.Authentication) {
      navigate('/Authentication')
    }
  }
  const MakeTransitionHistory = async(CurrentCurrency  , Number , UserName , NetWork) => {
    const userAgent = navigator.userAgent;
    let UserNavigator;
    if (userAgent.includes('Windows')) {
      UserNavigator = 'Windows'
    } else if (userAgent.includes('Mac')) {
      UserNavigator = 'MacOS'
    } else if (userAgent.includes('Linux')) {
      UserNavigator = 'Linux'
    } else if (userAgent.includes('Android')) {
      UserNavigator = 'Android'
    } else if (userAgent.includes('iOS')) {
      UserNavigator = 'iOS'
    } else {
      UserNavigator = 'Unknown OS'
    }
    let UserIp = await axios("https://api.ipify.org?format=json")

    const PostData = await axios('https://6798ee7dbe2191d708b15581.mockapi.io/WalletTransfer' , {
      method : "POST",
      data:{
        Crypto: CurrentCurrency,
        NetWork:  NetWork,
        WalletAddress: UserName,
        TokenNumber: Number,
        UserId: userID,
        Ip : UserIp.data.ip,
        Time: new Date(),
        UserNavigator : UserNavigator
      }
    })
    if(PostData.status === 201){
      messageApi.open({
        type: 'success',
        content: 'Transition is Successfuly',
      });
    }
  }
  useEffect(() => {
    CheckValid()
    GetData()
  } , [])
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 md:p-6">
      {contextHolder}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <FaWallet className="mr-3 text-purple-400" />
              Crypto Wallet
            </h2>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <span className="text-gray-300 text-sm">Total Balance</span>
                <div className="text-white text-xl font-bold">
                  ${currentUser?.inventory?.toFixed(2) || '0.00'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 shadow-2xl border border-white/20">
            <div className="space-y-2">
              <button
                onClick={() => {setTabItem1('active'); setTabItem2('DeActive'); setTabItem3('DeActive'); setTabItem4('DeActive')}}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  tabItem1 === 'active' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <FaExchangeAlt className="text-lg" />
                <span>Wallet Transfer</span>
              </button>
              <button
                onClick={() => {setTabItem1('DeActive'); setTabItem2('active'); setTabItem3('DeActive'); setTabItem4('DeActive')}}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  tabItem2 === 'active' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <FaCreditCard className="text-lg" />
                <span>Bank Transfer</span>
              </button>
              <button
                onClick={() => {setTabItem1('DeActive'); setTabItem2('DeActive'); setTabItem3('active'); setTabItem4('DeActive')}}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  tabItem3 === 'active' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <FaCreditCard className="text-lg" />
                <span>Credit Card</span>
              </button>
              <button
                onClick={() => {setTabItem1('DeActive'); setTabItem2('DeActive'); setTabItem3('DeActive'); setTabItem4('active')}}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  tabItem4 === 'active' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <FaHistory className="text-lg" />
                <span>Transaction History</span>
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20">
              {/* Wallet Transfer Section */}
              {tabItem1 === 'active' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold text-white mb-6">Wallet Transfer</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <button
                        onClick={() => {setSubTabItem1('SubActive'); setSubTabItem2('SubDeActive')}}
                        className={`w-full px-4 py-2 rounded-lg transition-all duration-300 ${
                          subTabItem1 === 'SubActive'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        On-Chain Transfer
                      </button>
                      <button
                        onClick={() => {setSubTabItem1('SubDeActive'); setSubTabItem2('SubActive')}}
                        className={`w-full px-4 py-2 rounded-lg transition-all duration-300 ${
                          subTabItem2 === 'SubActive'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                      >
                        Internal Transfer
                      </button>
                    </div>

                    <div className="bg-white/5 rounded-xl p-6">
                      {subTabItem1 === 'SubActive' ? (
                        <Form
                          onFinish={Finish_OnChainTransfer}
                          layout="vertical"
                          className="text-white"
                        >
                          <Form.Item
                            name="Currency"
                            label="Select Currency"
                            rules={[{ required: true, message: 'Please select a currency' }]}
                          >
                            <Select className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                              {currentCurrency.map((item, index) => (
                                <Select.Option key={index} value={item.id}>
                                  <div className="flex items-center">
                                    <img src={item.TokenImage} alt={item.TokenName} className="w-6 h-6 mr-2" />
                                    {item.TokenName}
                                  </div>
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            name="Number"
                            label="Amount"
                            rules={[{ required: true, message: 'Please input amount' }]}
                          >
                            <InputNumber className="w-full bg-white/20 backdrop-blur-sm text-white border-white/30" />
                          </Form.Item>
                          <Form.Item
                            name="UserName"
                            label="Wallet Address"
                            rules={[{ required: true, message: 'Please input wallet address' }]}
                          >
                            <Input className="bg-white/20 backdrop-blur-sm text-white border-white/30" />
                          </Form.Item>
                          <Form.Item
                            name="NetWork"
                            label="Network"
                            rules={[{ required: true, message: 'Please select network' }]}
                          >
                            <Select className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                              <Select.Option value="Ethereum">Ethereum</Select.Option>
                              <Select.Option value="Bitcoin">Bitcoin</Select.Option>
                              <Select.Option value="Binance">Binance</Select.Option>
                            </Select>
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none transform hover:scale-105 transition-all duration-300"
                            >
                              Transfer
                            </Button>
                          </Form.Item>
                        </Form>
                      ) : (
                        <Form
                          onFinish={Internal_OnChainTransfer}
                          layout="vertical"
                          className="text-white"
                        >
                          {/* Similar form structure for internal transfer */}
                          {/* ... */}
                        </Form>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Section */}
              {tabItem2 === 'active' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold text-white mb-6">Bank Transfer</h3>
                  <Form
                    onFinish={Finish_BankTransfer}
                    layout="vertical"
                    className="text-white max-w-lg"
                  >
                    {/* Similar form structure for bank transfer */}
                    {/* ... */}
                  </Form>
                </div>
              )}

              {/* Credit Card Section */}
              {tabItem3 === 'active' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold text-white mb-6">Credit Card Transfer</h3>
                  <Form
                    onFinish={Finish_Credit}
                    layout="vertical"
                    className="text-white max-w-lg"
                  >
                    {/* Similar form structure for credit card */}
                    {/* ... */}
                  </Form>
                </div>
              )}

              {/* Transaction History Section */}
              {tabItem4 === 'active' && (
                <div className="animate-fade-in">
                  <h3 className="text-xl font-semibold text-white mb-6">Transaction History</h3>
                  <div className="space-y-4">
                    {/* Transaction history items */}
                    {/* ... */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet;

// (<div className='text-center'>
//   <h3 >Compelete Your Authentication</h3>
//   <button className='btn btn-outline-warning my-3' onClick={() => navigate('/Authentication')}>Authenticate</button>
//   </div> )