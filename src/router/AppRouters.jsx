import React, { useContext, useEffect, useState } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Intresting from '../view/components/Intresting'
import Comparison from '../view/components/Comparison'
import Exchange from '../view/components/Exchange'
import ShowCustomeCurrency from '../view/components/ShowCustomeCurrency'
import Wallet from '../view/components/Wallet'
import App from '../App'
import Dashboard from '../view/Dashboard'
import MainContent from '../view/components/MainContent'
import LoginPage from '../auth/LoginPage'
import Validate from '../auth/Validate'
import Ai from '../view/components/Ai'
import Authentication from '../layout/Authentication'
import TransHistory from '../layout/TransHistory'
import Trans2User from '../layout/Trans2User'
import '../assets/scss/main.css'
import Contextariable from '../context/AppContext'
import AiChat from '../view/components/AiChat'
import Profile from '../view/components/Profile'
import ChangeInfo from '../layout/ChangeInfo'
import Page404 from '../view/AnotherPage/Page404'

// const AppRouters = () => {
  
//   const { validateLogin : validateLogin} = useContext(Contextariable)

//   let navigate = useNavigate()
  
//   useEffect(() => {
//     let GoDash = sessionStorage.getItem('token')
//     if(GoDash){
//       navigate('/MainContent')
//     }else{
//       validateLogin ? navigate('/Validate') : navigate('/LoginPage')
//     }
//   }, [validateLogin])
//   // console.log(data)

//   return (
//     // <div>
//     // <BrowserRouter>
//         <Routes>
//             <Route path='/' element={<Dashboard/>}>
//             <Route path='/MainContent' element={<MainContent />} />
//             <Route path='/Intresting' element={<Intresting />} />
//             <Route path='/Comparison' element={<Comparison />} />
//             <Route path='/Exchange' element={<Exchange  />} />
//             <Route path='/ShowCustomeCurrency' element={<ShowCustomeCurrency  />} />
//             <Route path='/Wallet' element={<Wallet />} />
//               <Route path='TransHistory' element={<TransHistory/>} />
//               <Route path='Trans2User' element={<Trans2User/>} />
//             <Route path='/Ai' element={<Ai/>} />
//             <Route path='/Authentication' element={<Authentication />} />
//             </Route>
//             <Route path='/LoginPage' element={<LoginPage /> } />
//             <Route path='/Validate' element={<Validate/>} />
//         </Routes>
//     // </BrowserRouter>
//     // </div>
//   )
// }

  // const { validateLogin : validateLogin} = useContext(Contextariable)

  // let navigate = useNavigate()
  
  // useEffect(() => {
  //   let GoDash = sessionStorage.getItem('token')
  //   if(GoDash){
  //     navigate('/MainContent')
  //   }else{
  //     validateLogin ? navigate('/Validate') : navigate('/LoginPage')
  //   }
  // }, [validateLogin])
  // // console.log(data)

//   i want change the ui of this pages,
// responsive design and minimal
// use tailwind - dark and yellow
// make diffrent and special design
// about currency

const AppRouters = createBrowserRouter([
  {
    path : "/", 
    element : <Dashboard/>,
    children: [ 
      {
        path : "/MainContent", 
        element : <MainContent />
      },
      {
        path : "/Intresting", 
        element : <Intresting/>
      },
      {
        path : "/Comparison", 
        element : <Comparison/>
      },
      {
        path : "/Exchange", 
        element : <Exchange/>
      },
      {
        path : "/Currency", 
        element : <ShowCustomeCurrency />
      },
      {
        path : "/Wallet", 
        element : <Wallet />,
        children:[
          
        ]
      },
      {
        path:"/TransHistory",
        element : <TransHistory/>
      },
      {
        path:"/Trans2User",
        element : <Trans2User/>
      },
      {
        path : "/Ai", 
        element : <Ai/>
      },
      {
        path : "/AiChat", 
        element : <AiChat/>
      },
      {
        path : "/Profile", 
        element : <Profile/>
      },
      {
        path : "/ChangeInformation", 
        element : <ChangeInfo/>
      },
      {
        path : "/Authentication", 
        element : <Authentication/>
      },
    ]
  },
  {
    path : "/LoginPage", 
    element : <LoginPage />
  },
  {
    path : "/Validate", 
    element : <Validate />
  },
  {
    path : "*", 
    element :  <Page404/>
  }
])
// export default AppRouters;
export default AppRouters;