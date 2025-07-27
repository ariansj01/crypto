import React, { useContext } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Contextariable from '../context/AppContext';

const TableCurrency = () => {
  const [messageApi, contextHolder] = message.useMessage();
  let { currency, deepData, setDataIntresting, dataIntresting, setCurrencyItem, currencyItem } = useContext(Contextariable);
  let navigate = useNavigate();

  const Currency = (item) => {
    setCurrencyItem(item);
    navigate('/Currency');
  };

  const Intresting = (item) => {
    setCurrencyItem(item);
    const CartState = [...dataIntresting];

    let fillterPR = CartState.filter(pro => pro._rank === item._rank);
    if (fillterPR.length === 0) {
      setDataIntresting([...dataIntresting, item]);
    } else {
      messageApi.open({
        type: 'warning',
        content: `${item.canonical_symbol} is already in your watchlist!`,
      });
    }
  };

  return (
    <div className="relative">
      {contextHolder}
      <div className="overflow-x-auto rounded-xl border border-secondary-200 dark:border-secondary-700">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary-50 dark:bg-secondary-800/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">Currency Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">Current Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">Close & Open Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">Contract Size</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">Trading Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">Long & Short Swap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
            {currency.map((item, key) => (
              <tr
                key={key}
                className="bg-white dark:bg-secondary-800 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-secondary-600 dark:text-secondary-400">
                  #{item._rank}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => Intresting(item)}
                      className="text-crypto-warning hover:text-crypto-warning/80 transition-colors"
                      title="Add to watchlist"
                    >
                      <FaStar className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => Currency(item)}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                    >
                      {item.canonical_symbol}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-secondary-600 dark:text-secondary-400">
                  ${item.unitPrice}
                </td>
                <td className="px-6 py-4 text-sm text-secondary-600 dark:text-secondary-400">
                  <div className="flex flex-col">
                    <span>Close: {item._lastClose}</span>
                    <span>Open: {item._open}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                    {item.contractSize}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.tradingStatus === 'ACTIVE'
                        ? 'bg-crypto-success/10 text-crypto-success'
                        : 'bg-crypto-danger/10 text-crypto-danger'
                    }`}
                  >
                    {item.tradingStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-crypto-success/10 text-crypto-success">
                      Long: {item.longSwapPoints}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-crypto-danger/10 text-crypto-danger">
                      Short: {item.shortSwapPoints}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableCurrency;