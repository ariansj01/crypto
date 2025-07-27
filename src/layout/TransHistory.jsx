import { Card } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TransHistory = () => {

  let [hisData , setHisData] = useState([])
  let [hisData2 , setHisData2] = useState([])

  const GetHistory = async() => {
    let userID = sessionStorage.getItem('userID')
    let GetHistory = await axios('https://6798ee7dbe2191d708b15581.mockapi.io/WalletTransfer')
    let GetHistory2 = await axios(' https://6798ee7dbe2191d708b15581.mockapi.io/HistoryTransition')
    let dataFilter = GetHistory.data.filter(item => item.UserId === userID)
    let dataFilter2 = GetHistory2.data.filter(item => item.UserId === userID)
    setHisData(dataFilter)
    setHisData2(dataFilter2)
    console.log(dataFilter2);
  }
  useEffect(() => {
    GetHistory()
  } , [])
  return (
    <div className='row'>
      {
        hisData.map(item => (
          <Card
          className='col-12 m-2'
            title= {item.Crypto}
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <p>Time Transition : {item.Time}</p>
            <p>NetWork : {item.NetWork}</p>
            <p>WalletAddress : {item.WalletAddress}</p>
            <p>TokenNumber : {item.TokenNumber}</p>
            <p>IP : {item.Ip}</p>
            <p>Oprating System : {item.UserNavigator}</p>
            {/* <button className='btn btn-outline-warning' onClick={() => window.print()} >Print</button> */}
          </Card>
        ))
      }
      {
        hisData2.map(item => (
          <Card
          className='col-12 m-2'
            title= {item.Crypto}
            bordered={false}
            style={{
              width: 300,
            }}
          >
            <p>Time Transition : {item.Time}</p>
            <p>CardNumber : {item.CardNumber}</p>
            <p>BranchCode : {item.BranchCode}</p>
            <p>TokenNumber : {item.TokenNumber}</p>
            <p>IP : {item.Ip}</p>
            <p>Oprating System : {item.UserNavigator}</p>
            {/* <button className='btn btn-outline-warning' onClick={() => window.print()} >Print</button> */}
          </Card>
        ))
      }
    </div>
  )
}

export default TransHistory