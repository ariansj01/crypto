import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Sell = () => {
  const [selldata , setSellData] = useState([])

  const getData = async () => {
    let dataItem = await axios('https://677eb03c94bde1c1252d0f3e.mockapi.io/BuyCrypto')
    let Uname = sessionStorage.getItem('UserName')
    let FilterData = dataItem.data.filter(c => c.UserName === Uname)
    setSellData(FilterData)
  }
  useEffect(() => {
    getData()
  } , [])

  return (
    <div className="row content">
        <div className="col">
          {
            selldata.map((item , key) => (
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
      </div>
  )
}

export default Sell