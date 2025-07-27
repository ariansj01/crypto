import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Contextariable from '../context/AppContext';

// ثبت کامپوننت‌های مورد نیاز Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  let {currencyItem , deepCurrency} = useContext(Contextariable)
  let deepData = deepCurrency.filter(item => item[0] === currencyItem.canonical_symbol)
  console.log(deepData)
  console.log(deepCurrency)
  const [chartData, setChartData] = useState({
    labels: [], // محور X (قیمت)
    datasets: [
      {
        label: 'Buy', // سفارش‌های خرید
        data: [], // حجم سفارش‌های خرید
        borderColor: 'rgba(75, 192, 192, 1)', // رنگ خرید
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
      {
        label: 'Sell', // سفارش‌های فروش
        data: [], // حجم سفارش‌های فروش
        borderColor: 'rgba(255, 99, 132, 1)', // رنگ فروش
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = deepData[0] || deepData[1] // داده‌های مربوط به XPBUSD
        const bids = data[11]; // سفارش‌های خرید
        const asks = data[12]; // سفارش‌های فروش
        console.log(data)
        // تبدیل داده‌ها به فرمت مناسب برای Chart.js
        const bidPrices = bids.map((bid) => bid[1]); // قیمت‌های خرید
        const bidQuantities = bids.map((bid) => bid[0]); // حجم خرید
        const askPrices = asks.map((ask) => ask[1]); // قیمت‌های فروش
        const askQuantities = asks.map((ask) => ask[0]); // حجم فروش
        setChartData({
          labels: [...bidPrices, ...askPrices], // محور X (قیمت‌ها)
          datasets: [
            {
              ...chartData.datasets[0],
              data: [...bidQuantities, ...Array(askQuantities.length).fill(0)], // حجم خرید
            },
            {
              ...chartData.datasets[1],
              data: [...Array(bidQuantities.length).fill(0), ...askQuantities], // حجم فروش
            },
          ],
        });

        setLoading(false); // پایان لودینگ
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // نمایش پیام لودینگ
  }

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `${deepData[0][0]} Market Depth`,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Price',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Quantity',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;