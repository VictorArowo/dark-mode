import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Coin = () => {
  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/list')
      .then(res => setCoinList(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <select>
        {coinList.map(item => (
          <option>{item.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Coin;
