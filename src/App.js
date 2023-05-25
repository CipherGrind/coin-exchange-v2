import './App.css';
import React, {useEffect, useState} from 'react';
import CoinList from './components/CoinList/CoinList';
import AccountBalance from'./components/AccountBalance/AccountBalance';
import AppHeader from './components/AppHeader/AppHeader';
import axios from 'axios';


const COIN_COUNT = 10;
const formatPrice = price => parseFloat(Number(price).toFixed(3));


function App (props) {

  const [balance, setBalance] = useState(100000);
  const [showBalance, setShowBalance] = useState(true);
  const [coinData, setCoinData] = useState([]);


  const componentDidMount = async () => {
    //const response = await axios.get('https://api.coinpaprika.com/v1/coins');
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/');
    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    //const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
    const tickerUrl = 'https://api.coingecko.com/api/v3/coins/';
    const promises = coinIds.map(id => axios.get(tickerUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function(response) {
      const coin = response.data;
      return {
        key: coin.id,
        //rank: coin.rank,
        rank: coin.market_cap_rank,
        image: coin.image.small,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        //price: formatPrice(coin.quotes.USD.price),
        price: formatPrice(coin.market_data.current_price.usd),

        //market_cap: coin.quotes.USD.market_cap,
        market_cap: coin.market_data.market_cap.usd,

        price_change_percentage_24h: coin.market_data.price_change_percentage_24h,
        price_change_percentage_7d: coin.market_data.price_change_percentage_7d,
        price_change_percentage_30d: coin.market_data.price_change_percentage_30d,

      };
    })
      //retrieve the price
      setCoinData(coinPriceData);
  }

  useEffect(function() {
    if (coinData.length === 0 ) {
      componentDidMount();
    }
  });


  const handleChangeBalance = () => {
    setShowBalance(oldValue => !oldValue);
  }

  const addToBalance = 5000;
  const handleAddToBalance = () => {
    let newBalance = balance + addToBalance;
    setBalance(newBalance);
  }


  const handleTransaction = (isBuy, valueChangeId) => {
    var balanceChange = isBuy ? 1 : -1;
    const newCoinData = coinData.map( function(values) {
      let newValues = {...values};
      if ( valueChangeId == values.key) {
        newValues.balance += balanceChange;
        setBalance( oldBalance => oldBalance - balanceChange * newValues.price );
      }
      return newValues;
    })
    setCoinData(newCoinData);
  }

  const handleInfoPopup = () => {

  }


  const handleRefresh = async (valueChangeId) => {
    //const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const tickerUrl = `https://api.coingecko.com/api/v3/coins/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    //const newPrice = formatPrice(response.data.quotes.USD.price);
    const newPrice = formatPrice(response.data.coin.market_data.current_price.usd);
    const newCoinData = coinData.map( function( values ) {
      let newValues = { ...values };
      if ( valueChangeId === values.key ) {
        newValues.price = newPrice;
      }
      return newValues;
    });
   
      setCoinData(newCoinData);
  }
    return (
      <div className="App">
        <AppHeader />
          <AccountBalance 
            amount={balance} 
            showBalance={showBalance} 
            handleChangeBalance={handleChangeBalance} 
            handleAddToBalance={handleAddToBalance}/>
          <CoinList 
            coinData={coinData} 
            handleRefresh={handleRefresh} 
            showBalance={showBalance}
            handleTransaction={handleTransaction} 
            handleInfoPopup={handleInfoPopup} />
      </div>
    );
}

export default App;