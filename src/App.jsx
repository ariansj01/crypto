import React, { useEffect, useState } from 'react'
import './assets/scss/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Crypto } from './layout/Requests';
import Dashboard from './view/Dashboard';
import AppRouters from './router/AppRouters';
import { RouterProvider, useNavigate } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import Validate from './auth/Validate';
import io from 'socket.io-client';
import Contextariable from './context/AppContext';
const socket = io('https://crypto-2-gf95.onrender.com');
// const socket = io('http://localhost:3001');


const App = () => {
  const [marketPrice , setMarketPrice] = useState('usd')
  const [validate , setValidate] = useState(false)
  const [prices, setPrices] = useState(null);
  const [currency, setCurrency] = useState([]);
  const [deepCurrency, setDeepCurrency] = useState([]);

  const [dataIntresting , setDataIntresting] = useState([])
  const [currencyItem , setCurrencyItem] = useState([])
  const [validateLogin , setValidateLogin] = useState(false)
  let [authenticate , setAuthenticate] = useState(false)
  let [showcap , setShowcap] = useState('none')
  let [showcap2 , setShowcap2] = useState('block')  
  const [answer, setAnswer] = useState({});
  
  // let navigate = useNavigate()
  // setInterval(() => {
  //   console.log(currency)
  //   console.log(deepCurrency)
  // }, 2000);
  useEffect(() => {
    let GoDash = sessionStorage.getItem('token')
    if(GoDash){
      socket.on('cryptoData', (data) => {
        setPrices(data);
        let CurrencyNames = []
        let Instruments = Object.values(data.instruments)
        let Depths = Object.values(data.depths)
        console.log(Instruments)
        console.log(Depths)
        let fillInstruments = Instruments.filter(item => item.assetClass === 'CURRENCY') // filter instruments Data
        setCurrency(fillInstruments) // set in state
        currency.map(item => CurrencyNames.push(item.canonical_symbol))  // state map for push Currency names in Array

        const filteredItems = Depths.filter(item => CurrencyNames.includes(item[0])); // find Currency by name in depths
        setDeepCurrency(filteredItems)
      });            
        return () => {
          socket.off('cryptoData');
        };
        
    }else{
      setValidate(false)
      // validate ? navigate('/Validate') : navigate('/LoginPage')
    }
      }, [currency , deepCurrency]);
  return (
    <div className=''>
      <Contextariable.Provider value={{answer:answer , setAnswer:setAnswer , marketPrice: marketPrice ,setMarketPrice: setMarketPrice , validate: validate , setValidate: setValidate , prices: prices , setPrices: setPrices , currency: currency , setCurrency: setCurrency , deepCurrency: deepCurrency , setDeepCurrency: setDeepCurrency , dataIntresting : dataIntresting, setDataIntresting : setDataIntresting, currencyItem : currencyItem, setCurrencyItem : setCurrencyItem, validateLogin : validateLogin,setValidateLogin : setValidateLogin,authenticate : authenticate,setAuthenticate : setAuthenticate,showcap : showcap,setShowcap : setShowcap,showcap2 : showcap2,setShowcap2 : setShowcap2,}}>
        {/* <AppRouters /> */}
      <RouterProvider router={AppRouters} />
      </Contextariable.Provider>
        
      
    </div>
  )
}

export default App;