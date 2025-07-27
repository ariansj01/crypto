import React, { useContext, useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import Contextariable from '../../context/AppContext';

const Comparison = () => {
  let {currency , deepCurrency} = useContext(Contextariable)
  
  const [value, setValue] = useState([]);
  let treeData = []

  currency.map(i => {
    treeData.push({value : i.canonical_symbol , title:i.canonical_symbol},)
  })
  // useEffect(() => {} , [])

  const onChange = (newValue) => {
    const CopyDeepData = [...deepCurrency]
    // const CopyDeepData  = Object.values(CopyDeepData)
    const CopyInspData = [...currency]
    let FullData = []
    let FillData = {
      Depths : '',
      instroments : ''
    }
    let instroments = []
    let Depths = []
    newValue.map(name => {
      // FillData.Depths = CopyDeepData.filter(item => item[0] === name)
      // instroments.push(CopyInspData.filter(item => item.canonical_symbol === name))
      let x = CopyInspData.filter(item => item.canonical_symbol === name)
      // console.log(x)
      let y = CopyDeepData.filter(item => item[0] === name)
      // console.log(y)
      FullData.push({
        Depths : y,
        instroments : x
      })
    })
    // console.log(newValue);
    console.log('Data********************' , FullData)
    setValue(FullData);
  };
  // console.log(value)
  // value.map(data => data.instroments.map(item => console.log(item.canonical_symbol) ))
  value.map(data => data.Depths.map(item => console.log(item[2])))

  return (
    <>
      <TreeSelect
        showSearch
        style={{
          width: '100%',
        }}
        // value={value}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
        }}
        placeholder="Please select the Currency..."
        allowClear
        multiple
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
      />
      <div className="table">

        <table>
          <tr>
            <th>name</th>
            {
              value.map(data => data.instroments.map(item => (<td>{item.canonical_symbol}</td>)))
            }
          </tr>
          <tr>
            <th>Contract Size</th>
            {
              value.map(data => data.instroments.map(item => (<td>{item.contractSize}</td>)))
            }
          </tr>
          <tr>
            <th>Price</th>
            {
              value.map(data => data.Depths.map(item => (<td>{item[3] * item[4]}$</td>)))
            }
          </tr>
          <tr>
            <th>Price Increment</th>
            {
              value.map(data => data.instroments.map(item => (<td>{item.priceIncrement}</td>)))
            }
          </tr>
          <tr>
            <th>Minimum Order Quantity</th>
            {
              value.map(data => data.instroments.map(item => (<td>{item.minimumOrderQuantity}</td>)))
            }
          </tr>
          <tr>
            <th>Margin</th>
            {
              value.map(data => data.instroments.map(item => (<td>{item.margin}</td>)))
            }
          </tr>
          <tr>
            <th>Long Swap Points</th>
            {
              value.map(data => data.instroments.map(item => (<td>{item.longSwapPoints}</td>)))
            }
          </tr>
          <tr>
            <th>Short Swap Points</th>
            {
              value.map(data => data.instroments.map(item => (<td>{item.shortSwapPoints}</td>)))
            }
          </tr>
          <tr>
            <th>Trusted Spread</th>
            {
              value.map(data => data.instroments.map(item => (<td>{item.trustedSpread}</td>)))
            }
          </tr>
          <tr>
            <th>Best Bid</th>
            {
              value.map(data => data.Depths.map(item => (<td>{item[2]}</td>)))
            }
          </tr>
          <tr>
            <th>Best Ask</th>
            {
              value.map(data => data.Depths.map(item => (<td>{item[3]}</td>)))
            }
          </tr>
          <tr>
            <th>Bid Size</th>
            {
              value.map(data => data.Depths.map(item => (<td>{item[5]}</td>)))
            }
          </tr>
          <tr>
            <th>Order Depth (Buy)</th>
            {
              value.map(data => data.Depths.map(item => (<td>{item[6]}</td>)))
            }
          </tr>
          <tr>
            <th>Order Depth (Sell)</th>
            {
              value.map(data => data.Depths.map(item => (<td>{item[3]}</td>)))
            }
          </tr>
        </table>
      </div>
    </>
  );
};
export default Comparison;