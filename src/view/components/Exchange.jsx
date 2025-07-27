import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Form, message, InputNumber, Slider } from 'antd';
import { FaWallet, FaExchangeAlt, FaChartLine } from 'react-icons/fa';

import '../../assets/scss/main.css'
import { useState } from 'react';
import Sell from '../../layout/ActionExchange/Sell';
import axios from 'axios';
import { useEffect } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      className="animate-fade-in"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Exchange() {
  const [messageApi, contextHolder] = message.useMessage();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [calcPrice, setCalcPrice] = useState(0);
  const [getPrice, setGetPrice] = useState(0);
  const [wallet, setWallet] = useState();
  const [dataCurrency, setDataCurrency] = useState([]);
  const [selldata , setSellData] = useState([])
  const [CurrencyItem, setTokenNumber] = useState({
      name: '',
      user:'',
      img : '',
      price: 1,
      numberforSell : 1,
      id:0
  });


  const onFinish = (values) => {
    if(wallet >= (values.token * CurrencyItem.price)){
      setWallet(wallet - (values.token * CurrencyItem.price))
      let walletInv = wallet - (values.token * CurrencyItem.price)
      let user = sessionStorage.getItem('UserName')
      // let FilterData = dataCurrency.filter(item => item.userName !== CurrencyItem.user) // remove currency from table
      // setDataCurrency(FilterData)
      decreaseInventoryCurrency(CurrencyItem.numberforSell - values.token , walletInv)
      let x = CurrencyItem.numberforSell - values.token
      setTokenNumber(prev => ({
        ...prev,
        numberforSell : x
      }))
      IncreaseInventoryUser(values.token * CurrencyItem.price , CurrencyItem.user)
      postData(CurrencyItem.name , values.token , CurrencyItem.price , user , CurrencyItem.img)
      messageApi.open({
        type: 'success',
        content: 'your buying is successful.',
      });
    }else{
      messageApi.open({
        type: 'error',
        content: 'Please increase your Wallet',
      });
  }};
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onFinishIncrease = async (values) => {
    console.log('Success:', values);
    let userID = sessionStorage.getItem('userID')
    let UserInv = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}`)
    let CurrentUser = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}` , {
      method:"PUT", 
      data:{
        inventory: (UserInv.data.inventory + values.increase)
      }
    })
    console.log(CurrentUser.status)
    if (values.increase > 0 && CurrentUser.status === 200) {
      setWallet(wallet + values.increase)
      InventoryWallet()
      messageApi.open({
        type: 'success',
        content: 'your wallet Increased!',
      });
    }else{
      messageApi.open({
        type: 'error',
        content: 'you Cant Add Negeative Number!',
      });
    }
  };
  const onFinishFailedIncrease = (errorInfo) => {
    console.log('Failed:', errorInfo);
    messageApi.open({
      type: 'error',
      content: 'Opration faild!',
    });
  };
  const Send2Buy = (item) => {
    setTokenNumber({
      name: item.TokenName,
      user:item.UserName,
      img : item.TokenImage,
      price: item.Price,
      numberforSell : item.TokenNumber,
      id : item.id,
    })
    setTokenPrice(CurrencyItem.price)
  }
  const getData_SellCrypto = async () => {
    let UserNameLocal = sessionStorage.getItem('UserName')
    let dataItem = await axios('https://677eb03c94bde1c1252d0f3e.mockapi.io/SellCrypto')
    let FilterData = dataItem.data.filter(c => c.TokenNumber >= 1  && c.UserName !== UserNameLocal)
    setDataCurrency(FilterData)
    console.log(dataItem.data)
  }
  const getData_BuyCrypto = async () => {
    let dataItem = await axios('https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto')
    let Uname = sessionStorage.getItem('UserName')
    let FilterData = dataItem.data.filter(c => c.UserName === Uname && c.TokenNumber >= 1 )
    setSellData(FilterData)
    console.log(dataItem.data)
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
      GetPrice(dataItem.data.TokenNumber * dataItem.data.Price)
      messageApi.open({
        type: 'success',
        content: 'buy is successfuly!',
      });
    }
  }
  const InventoryWallet = async () => {
    let userID = sessionStorage.getItem('userID')
    let dataItem = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}`)
    setWallet(dataItem.data.inventory)
  }
  const IncreaseInventoryUser = async (result , user) => {
    let Users = await axios('https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId')
    let GetUser = Users.data.filter(item => item.UserName === user)
    // let UserLocal = sessionStorage.getItem('userID')
    console.log("Users" , Users)
    let increaseInv = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${GetUser[0].id}`, {
      method:"PUT",
      data:{
        inventory: (GetUser[0].inventory + result)
      }
    })
    console.log('increaseInv' , increaseInv)
    if(increaseInv.status === 201){
      messageApi.open({
        type: 'success',
        content: 'Mony Transfer Successfuly!',
      });
    }
  }
  const decreaseInventoryCurrency = async (result , walletInv) => {
    let userID = sessionStorage.getItem('userID')
    let CurrentUser = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${userID}` , {
      method:"PUT", 
      data:{
        inventory: walletInv
      }
    })
    let dataItem = await axios(`https://677eb03c94bde1c1252d0f3e.mockapi.io/SellCrypto/${CurrencyItem.id}`, {
      method:"PUT",
      data:{
        TokenNumber: result
      }
    })
    console.log(walletInv)
    console.log(CurrentUser)
    if(dataItem.status === 201 && CurrentUser.status === 200){
      messageApi.open({
        type: 'warning',
        content: 'decrease is successfuly!',
      });
    }
  }
  const onFinishSell = async (values) => {
    console.log(CurrencyItem.numberforSell - values.token)
    console.log(values.Price)
    
    let SelldataItem = await axios('https://677eb03c94bde1c1252d0f3e.mockapi.io/SellCrypto',{
      method:"POST",
      data:{
        TokenName: CurrencyItem.name,
        TokenNumber: values.token,
        Price: values.Price,
        UserName: CurrencyItem.user,
        TokenImage: CurrencyItem.img,
      }
    })
    let BuyDataItem = await axios(`https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto/${CurrencyItem.id}`,{
      method:"PUT",
      data:{
        "TokenNumber": CurrencyItem.numberforSell - values.token,
        "Price": values.Price,
      }
    })

    if(BuyDataItem.status === 200 && SelldataItem.status === 201){
      messageApi.open({
        type: 'success',
        content: `the ${CurrencyItem.name} sell Successfuly`,
      });
    }else{
      messageApi.open({
        type: 'error',
        content: `the ${CurrencyItem.name} is not Sell`,
      });
    }

    
  }
  const onFinishFailedSell = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  const GetPrice = async (result) => {
    // console.log(CurrencyItem.user)
    // let UserNameLocal = sessionStorage.getItem('UserName')
    // let GetUserInventory = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId`)
    // let filterItem = GetUserInventory.data.filter(user => user.UserName === UserNameLocal)
    // console.log(filterItem[0].inventory)
    // // let userID = sessionStorage.getItem('userID')
    // // console.log(GetUserInventory.data.inventory)

    // let dataItem = await axios(`https://6730d3d37aaf2a9aff0f0995.mockapi.io/UserId/${filterItem[0].id}`, {
    //   method:"PUT",
    //   data:{
    //     inventory: filterItem[0].inventory + result
    //   }
    // })
    // if(dataItem.status === 200){
    //   console.log(dataItem)
    //   messageApi.open({
    //     type: 'success',
    //     content: 'incredcssssscs is successfuly!',
    //   });
    // }
  }

  useEffect(() => {
    getData_SellCrypto()
    getData_BuyCrypto()
    InventoryWallet()
    // onFinishSell , onFinish
  } , [])

  const DefultIncreaseValue = 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 md:p-6">
      {contextHolder}
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <FaExchangeAlt className="mr-3 text-purple-400" />
              Crypto Exchange
            </h2>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <span className="text-gray-300 text-sm">Wallet Balance</span>
                <div className="text-white text-xl font-bold flex items-center">
                  <FaWallet className="mr-2 text-green-400" />
                  ${wallet?.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <Box sx={{ bgcolor: 'transparent' }}>
            <AppBar position="static" className="bg-white/10 backdrop-blur-sm rounded-lg">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
                className="text-white"
              >
                <Tab 
                  icon={<FaChartLine className="mr-2" />} 
                  label="Buy Crypto" 
                  {...a11yProps(0)} 
                  className="text-white hover:text-purple-300 transition-colors"
                />
                <Tab 
                  icon={<FaExchangeAlt className="mr-2" />} 
                  label="Sell Crypto" 
                  {...a11yProps(1)} 
                  className="text-white hover:text-purple-300 transition-colors"
                />
                <Tab 
                  icon={<FaWallet className="mr-2" />} 
                  label="Increase Wallet" 
                  {...a11yProps(2)} 
                  className="text-white hover:text-purple-300 transition-colors"
                />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} dir={theme.direction}>
              <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 shadow-lg border border-white/20">
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  className="text-white"
                >
                  <Form.Item
                    label="Token Amount"
                    name="token"
                    rules={[{ required: true, message: 'Please input your token amount!' }]}
                  >
                    <InputNumber 
                      min={1} 
                      className="w-full bg-white/20 backdrop-blur-sm text-white border-white/30"
                    />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none transform hover:scale-105 transition-all duration-300"
                    >
                      Buy Now
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
              <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 shadow-lg border border-white/20">
                <Sell />
              </div>
            </TabPanel>

            <TabPanel value={value} index={2} dir={theme.direction}>
              <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 shadow-lg border border-white/20">
                <Form
                  name="increase"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinishIncrease}
                  onFinishFailed={onFinishFailedIncrease}
                  autoComplete="off"
                  className="text-white"
                >
                  <Form.Item
                    label="Amount"
                    name="increase"
                    rules={[{ required: true, message: 'Please input amount!' }]}
                  >
                    <InputNumber 
                      min={1} 
                      className="w-full bg-white/20 backdrop-blur-sm text-white border-white/30"
                    />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-none transform hover:scale-105 transition-all duration-300"
                    >
                      Increase Balance
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </TabPanel>
          </Box>
        </div>

        {/* Market Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FaChartLine className="mr-2 text-purple-400" />
              Available Tokens
            </h3>
            <div className="space-y-4">
              {dataCurrency.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                  onClick={() => Send2Buy(item)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={item.TokenImage} alt={item.TokenName} className="w-8 h-8 rounded-full mr-3" />
                      <span className="text-white font-medium">{item.TokenName}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">${item.Price}</div>
                      <div className="text-gray-400 text-sm">Available: {item.TokenNumber}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <FaWallet className="mr-2 text-green-400" />
              Your Portfolio
            </h3>
            <div className="space-y-4">
              {selldata.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={item.TokenImage} alt={item.TokenName} className="w-8 h-8 rounded-full mr-3" />
                      <span className="text-white font-medium">{item.TokenName}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-400 font-semibold">${item.Price}</div>
                      <div className="text-gray-400 text-sm">Owned: {item.TokenNumber}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
