import React, { useContext } from 'react';
import { Empty, Card } from 'antd';
import { FaStar } from 'react-icons/fa';
import Contextariable from '../../context/AppContext';

const Intresting = () => {
  let { dataIntresting } = useContext(Contextariable);

  if (dataIntresting.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] dark:bg-secondary-800 rounded-xl p-8 shadow-crypto">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="text-secondary-600 dark:text-secondary-400">
              No cryptocurrencies in your watchlist yet
            </span>
          }
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {dataIntresting.map((item, index) => (
        <div
          key={index}
          className=" text-secondary-800 dark:bg-secondary-800 rounded-xl shadow-crypto hover:shadow-crypto-lg transition-all duration-200"
        >
          <div className="p-6 text-secondary-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white">
                {item.canonical_symbol}
              </h3>
              <FaStar className="w-5 h-5 text-crypto-warning" />
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">Full Name</p>
                  <p className="font-medium text-secondary-500 dark:text-white">{item.name}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">Contract Size</p>
                  <p className="font-medium text-secondary-900 dark:text-white">{item.contractSize}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">Unit Price</p>
                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                  ${item.unitPrice}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">Long Swap Points</p>
                  <p className="font-medium text-crypto-success">{item.longSwapPoints}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">Short Swap Points</p>
                  <p className="font-medium text-crypto-danger">{item.shortSwapPoints}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">Margin</p>
                  <p className="font-medium text-secondary-900 dark:text-white">{item.margin}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">Venue</p>
                  <p className="font-medium text-secondary-900 dark:text-white">{item.venue}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">Trading Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.tradingStatus === 'ACTIVE'
                      ? 'bg-crypto-success/10 text-crypto-success'
                      : 'bg-crypto-danger/10 text-crypto-danger'
                  }`}
                >
                  {item.tradingStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Intresting;