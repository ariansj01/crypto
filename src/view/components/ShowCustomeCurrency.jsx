import React, { useContext, useEffect, useState } from 'react';
import Chart from '../../layout/Chart';
import Contextariable from '../../context/AppContext';
import { FaStar, FaChartLine, FaInfoCircle, FaExchangeAlt, FaWallet } from 'react-icons/fa';
import { message, Tooltip } from 'antd';

const ShowCustomeCurrency = () => {
  let { currencyItem, setDataIntresting, dataIntresting, setCurrencyItem } = useContext(Contextariable);
  const [messageApi, contextHolder] = message.useMessage();
  const [isFavorite, setIsFavorite] = useState(false);

  const GetData = () => {
    console.log(currencyItem.contractSize)
  }
  const Intresting = (item) => {
    setCurrencyItem(item);
    const CartState = [...dataIntresting];

    let fillterPR = CartState.filter(pro => pro._rank === item._rank);
    if (fillterPR.length === 0) {
      setDataIntresting([...dataIntresting, item]);
      setIsFavorite(true);
      messageApi.open({
        type: 'success',
        content: `${item.canonical_symbol} added to favorites!`,
      });
    } else {
      messageApi.open({
        type: 'warning',
        content: `${item.canonical_symbol} is already in favorites!`,
      });
    }
  };

  useEffect(() => {
    GetData()
    const isInFavorites = dataIntresting.some(item => item._rank === currencyItem._rank);
    setIsFavorite(isInFavorites);
  }, [currencyItem, dataIntresting]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4 md:p-6">
      {contextHolder}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl mr-4">
                <FaChartLine className="text-2xl text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {currencyItem.name}
                  <span className="text-gray-400 ml-2">({currencyItem.canonical_symbol})</span>
                </h2>
                <p className="text-gray-300 mt-1">Rank #{currencyItem._rank}</p>
              </div>
            </div>
            <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
              <button
                onClick={() => Intresting(currencyItem)}
                className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                  isFavorite 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                <FaStar className="text-xl" />
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 animate-fade-in">
            <div className="flex items-center mb-4">
              <FaWallet className="text-2xl text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Price Information</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Last Price</span>
                <span className="text-white font-semibold">${currencyItem._lastClose?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Open Price</span>
                <span className="text-white font-semibold">${currencyItem._open?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Price Multiplier</span>
                <span className="text-white font-semibold">{currencyItem._priceMultiplier}</span>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 animate-fade-in">
            <div className="flex items-center mb-4">
              <FaExchangeAlt className="text-2xl text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Swap Points</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Long Swap Points</span>
                <span className="text-green-400 font-semibold">{currencyItem.longSwapPoints}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Short Swap Points</span>
                <span className="text-red-400 font-semibold">{currencyItem.shortSwapPoints}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Swap Point Value</span>
                <span className="text-white font-semibold">{currencyItem.swapPointValue}</span>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 animate-fade-in">
            <div className="flex items-center mb-4">
              <FaInfoCircle className="text-2xl text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Trading Info</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Contract Size</span>
                <span className="text-white font-semibold">{currencyItem.contractSize}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Margin</span>
                <span className="text-white font-semibold">{currencyItem.margin}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Trusted Spread</span>
                <span className="text-white font-semibold">{currencyItem.trustedSpread}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 animate-fade-in">
          <Chart />
        </div>

        {/* Detailed Information */}
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 shadow-2xl border border-white/20 animate-fade-in">
          <h3 className="text-xl font-semibold text-white mb-6">Detailed Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Passive Commission Rate', value: currencyItem.passiveCommissionRate },
              { label: 'Minimum Commission', value: currencyItem.minimumCommission },
              { label: 'Contract Info Currency', value: currencyItem.contractInfoCurrency },
              { label: 'Minimum Order Quantity', value: currencyItem.minimumOrderQuantity },
              { label: 'Price Increment', value: currencyItem.priceIncrement },
              { label: 'Start Time', value: currencyItem.startTime },
              { label: 'Trading Forms', value: currencyItem.tradingFrom },
              { label: 'Trading Timezone', value: currencyItem.tradingTimezone },
              { label: 'Trading Status', value: currencyItem.tradingStatus },
              { label: 'Volatility Band Percentage', value: currencyItem.volatilityBandPercentage },
              { label: 'Venue', value: currencyItem.venue },
              { label: 'Source', value: currencyItem.source },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
              >
                <span className="text-gray-400 text-sm block mb-1">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ShowCustomeCurrency;