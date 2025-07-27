import React, { useContext, useEffect, useState } from 'react'
import '../../assets/scss/main.css'
import { UserOutlined } from '@ant-design/icons';
import { FaArrowTrendDown, FaArrowTrendUp, FaStar, FaMagnifyingGlass, FaBars } from 'react-icons/fa6';
import TableCurrency from '../../layout/TableCurrency';
import { Button, Modal, Select, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import Contextariable from '../../context/AppContext';

const MainContent = () => {
  let {validate , currency  , deepCurrency , setData , setMarketPrice , setDataIntresting , dataIntresting , setCurrencyItem , setValidate} = useContext(Contextariable)
  const [lowTransaction , setLowTransaction] = useState([])
  const [hightTransaction , setHightTransaction] = useState([])
  const [profit , setProfit] = useState([])
  const [loss , setLos] = useState([])
  const [lowTrustedSpread , setLowTrustedSpread] = useState([])
  const [hightTrustedSpread , setHightTrustedSpread] = useState([])
  const [searchBox , setSearchBox] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [resultSearch, setResultSearch] = useState([]);
  const navigate = useNavigate()

  const transaction = () => {
    let transaction = []
    let profit_loss = []
    let trustedSpread = []
    currency.forEach(item => {
      transaction.push(+item.longSwapPoints)
      profit_loss.push(+item.shortSwapPoints)
      trustedSpread.push(item.trustedSpread)
    })    
    // findClosestPair(lastUpdate)
    // fintDate(lastUpdate)

    
    
    let hight = Math.max(...transaction)
    let low = Math.min(...transaction)
    let heightItem = currency.filter(item => +item.longSwapPoints === hight)
    let lowItem = currency.filter(item => +item.longSwapPoints === low)
    setHightTransaction(heightItem)
    setLowTransaction(lowItem)
    
    let hightSSP = Math.max(...profit_loss)
    let lowSSP = Math.min(...profit_loss)
    let heightItemSSP = currency.filter(item => +item.shortSwapPoints === hightSSP)
    let lowItemSSP = currency.filter(item => +item.shortSwapPoints === lowSSP)
    setProfit(heightItemSSP)
    setLos(lowItemSSP)

    let hightTS = Math.max(...trustedSpread)
    let lowTS = Math.min(...trustedSpread)
    let heightItemTS = currency.filter(item => item.trustedSpread === hightTS)
    let lowItemTS = currency.filter(item => item.trustedSpread === lowTS)
    setHightTrustedSpread(heightItemTS)
    setLowTrustedSpread(lowItemTS)

    
  }


  function fintDate (dates){
    
  const referenceDate = new Date("2025-01-04T06:22:37.585Z");

  function findTwoClosestDates(datesArray, referenceDate) {
    const differences = datesArray.map(date => ({
      date,
      diff: Math.abs(new Date(date) - referenceDate) // اختلاف زمانی
    }));

    differences.sort((a, b) => a.diff - b.diff);
    return differences.slice(0, 2).map(item => item.date);
  }

  const closestDates = findTwoClosestDates(dates, referenceDate);

  // let x = closestDates.map(date => new Date(date))
  // console.log("Two closest dates:", x);

  let x = []
  closestDates.map(item => {
    let FillDate = data.filter(dateItem => dateItem.last_updated === item)
    x.push(FillDate)
    // console.log(FillDate)
    setDateClose(x)
  })

  // setDateClose

    // let closeDate = closestDates.map(item => {
    //   const hours = item.getHours().toString().padStart(2, '0');
    //   const minutes  = item.getMinutes().toString().padStart(2, '0');
    //   const secound = item.getSeconds().toString().padStart(2, '0');
    //   return `${hours} : ${minutes} : ${secound}`
    // })

    // setDateClose(closeDate)
  }

  const onChange = (value) => {
    setMarketPrice(value)
  };
  const Currency = (item) => {
    setCurrencyItem(item)
    navigate('/Currency')
  }
  const showModal = () => {
    setIsModalOpen(true);
    if(searchBox !== ''){
      const CopyData = [...currency]
      console.log(CopyData)
      let ResultSearch = CopyData.filter(item => item.canonical_symbol.includes(searchBox.toLocaleUpperCase()))
      setResultSearch(ResultSearch)      
    }else{
      console.log('empty')
    }
  };

  const LogOut = () => {
    sessionStorage.clear()
    navigate('/LoginPage')
    // setValidate(false)
  }
  
  useEffect(() => {
    let GoDash = sessionStorage.getItem('token')
    // GoDash ? navigate('/MainContent') : navigate('/LoginPage')
    if(!GoDash){
      navigate('/LoginPage')
    }
    const interval = setInterval(transaction , 5000)
    return () => clearInterval(interval)
  } , [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Mobile Header */}
      <div className="md:hidden backdrop-blur-lg bg-white/10 rounded-2xl p-4 shadow-2xl border border-white/20">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Crypto Dashboard</h2>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <FaBars className="text-xl" />
          </button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2 animate-fade-in">Crypto Dashboard</h2>
            <p className="text-gray-300">Monitor and analyze cryptocurrency markets in real-time</p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              showSearch
              placeholder="Select Currency"
              optionFilterProp="label"
              onChange={onChange}
              className="w-40 backdrop-blur-sm bg-white/20 text-white"
              options={[
                { value: 'USD', label: 'USD' },
                { value: 'EUR', label: 'EUR' },
                { value: 'GBP', label: 'GBP' },
                { value: 'JPY', label: 'JPY' },
                { value: 'CNY', label: 'CNY' },
                { value: 'RUB', label: 'RUB' },
                { value: 'CAD', label: 'CAD' },
                { value: 'AUD', label: 'AUD' },
                { value: 'INR', label: 'INR' },
              ]}
            />
            <button
              onClick={LogOut}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Longest Swap Points */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-[1.02] animate-fade-in">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center">
            <FaArrowTrendUp className="mr-2 text-green-400" />
            Longest Swap Points
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-red-400">
                <FaArrowTrendDown className="mr-2 animate-pulse" />
                <span className="text-sm font-medium">Lowest</span>
              </div>
              {lowTransaction.map((item, key) => (
                <div key={key} className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  {item.canonical_symbol}: {item.longSwapPoints}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-green-400">
                <FaArrowTrendUp className="mr-2 animate-pulse" />
                <span className="text-sm font-medium">Highest</span>
              </div>
              {hightTransaction.map((item, key) => (
                <div key={key} className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  {item.canonical_symbol}: {item.longSwapPoints}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shortest Swap Points */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-[1.02] animate-fade-in">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center">
            <FaArrowTrendDown className="mr-2 text-red-400" />
            Shortest Swap Points
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-red-400">
                <FaArrowTrendDown className="mr-2 animate-pulse" />
                <span className="text-sm font-medium">Lowest</span>
              </div>
              {loss.map((item, key) => (
                <div key={key} className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  {item.canonical_symbol}: {item.shortSwapPoints}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-green-400">
                <FaArrowTrendUp className="mr-2 animate-pulse" />
                <span className="text-sm font-medium">Highest</span>
              </div>
              {profit.map((item, key) => (
                <div key={key} className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  {item.canonical_symbol}: {item.shortSwapPoints}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trusted Spread */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-[1.02] animate-fade-in">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center">
            <FaStar className="mr-2 text-yellow-400" />
            Trusted Spread
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-red-400">
                <FaArrowTrendDown className="mr-2 animate-pulse" />
                <span className="text-sm font-medium">Lowest</span>
              </div>
              {lowTrustedSpread.map((item, key) => (
                <div key={key} className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  {item.canonical_symbol}: {item.trustedSpread}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-green-400">
                <FaArrowTrendUp className="mr-2 animate-pulse" />
                <span className="text-sm font-medium">Highest</span>
              </div>
              {hightTrustedSpread.map((item, key) => (
                <div key={key} className="text-sm text-gray-300 hover:text-white transition-colors duration-200">
                  {item.canonical_symbol}: {item.trustedSpread}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchBox}
              onChange={(e) => setSearchBox(e.target.value)}
              placeholder="Search cryptocurrencies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 outline-none transition-all duration-200"
            />
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={showModal}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            Search
          </button>
        </div>

        <Modal
          title="Search Results"
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          width="90%"
          className="custom-modal"
          bodyStyle={{ maxHeight: '70vh', overflow: 'auto' }}
        >
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Symbol</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last/Open</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contract Size</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Swap Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {resultSearch.map((item, key) => (
                      <tr
                        key={key}
                        className="hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item._rank}</td>
                        <td
                          className="px-4 py-3 whitespace-nowrap text-sm text-purple-400 cursor-pointer hover:underline"
                          onClick={() => Currency(item)}
                        >
                          {item.canonical_symbol}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">${item.unitPrice}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                          {item._lastClose}, {item._open}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                            {item.contractSize}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{item.tradingStatus}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                              {item.longSwapPoints}
                            </span>
                            <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs">
                              {item.shortSwapPoints}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      {/* Table Section */}
      <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 animate-fade-in overflow-x-auto">
        <div className="min-w-[800px]">
          <TableCurrency />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        className="custom-drawer"
      >
        <div className="flex flex-col gap-4">
          <Select
            showSearch
            placeholder="Select Currency"
            optionFilterProp="label"
            onChange={onChange}
            className="w-full"
            options={[
              { value: 'USD', label: 'USD' },
              { value: 'EUR', label: 'EUR' },
              { value: 'GBP', label: 'GBP' },
              { value: 'JPY', label: 'JPY' },
              { value: 'CNY', label: 'CNY' },
              { value: 'RUB', label: 'RUB' },
              { value: 'CAD', label: 'CAD' },
              { value: 'AUD', label: 'AUD' },
              { value: 'INR', label: 'INR' },
            ]}
          />
          <button
            onClick={LogOut}
            className="w-full px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </Drawer>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-modal .ant-modal-content {
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
        }
        .custom-modal .ant-modal-header {
          background: transparent;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .custom-modal .ant-modal-title {
          color: white;
        }
        .custom-modal .ant-modal-close {
          color: white;
        }
        .custom-drawer .ant-drawer-content {
          background: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(10px);
        }
        .custom-drawer .ant-drawer-header {
          background: transparent;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .custom-drawer .ant-drawer-title {
          color: white;
        }
        .custom-drawer .ant-drawer-close {
          color: white;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default MainContent