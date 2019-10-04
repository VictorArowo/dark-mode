import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import Navbar from './Navbar';

const Coin = () => {
  const [coinList, setCoinList] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/list')
      .then(res => setCoinList(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      let coinId = coinList.find(item => item.name === selectedCoin).id;
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coinId}?vs_currency=usd&order=market_cap_desc&sparkline=true`
        )
        .then(res => setCoinData(res.data))
        .catch(err => console.log(err));
    }
  }, [selectedCoin]);

  const handleChange = e => {
    setSelectedCoin(e.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Navbar />
      <select
        onChange={handleChange}
        value={selectedCoin}
        placeholder="Select a Currency"
      >
        {coinList.map(item => (
          <option key={item.id}>{item.name}</option>
        ))}
      </select>
      {!coinData ? (
        <p style={{ fontSize: '30px' }}>Select a currency to view the data</p>
      ) : (
        <div className="chart__container" key={coinData.name}>
          <h2 className="coin__title">{coinData.name}</h2>
          <h4 className="coin__symbol">{coinData.symbol}</h4>
          <div className="coin__logo">
            <img src={coinData.image.large} height="40" alt={coinData.name} />
          </div>
          <Chart sparklineData={coinData.market_data.sparkline_7d.price} />
        </div>
      )}
    </div>
  );
};

export default Coin;
