import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import './Coin.css';

import imgRefresh from './arrow-clockwise.svg';
import imgSell from './dash-square.svg';
import imgBuy from './plus-square.svg';
import imgInfo from './info-square.svg';

import Popup from 'reactjs-popup';

 

const Td = styled.td`
  border: 1px solid #cccccc;
  padding: .25rem;
`;

const Img = styled.img`
    max-width: 1.75rem;
    margin: .2rem;
    `

export default function Coin(props) {

    const handleRefreshClick = (event) => {
        //prevent the default action of submitting the form
        event.preventDefault();
        props.handleRefresh(props.tickerId);
    }

    const handleBuyClick = (event) => {
        //prevent the default action of submitting the form
        event.preventDefault();
        
        props.handleTransaction(true, props.tickerId);
    
    }

    const handleSellClick = (event) => {
        //prevent the default action of submitting the form
        event.preventDefault();
        
        props.handleTransaction(false, props.tickerId);
    }


    const handleInfoClick = (event) => {
        //prevent the default action of submitting the form
        event.preventDefault();
        props.handleInfoPopup(props.tickerId);
    }

    const h24 = (props.price_change_percentage_24h).toLocaleString(undefined, { maximumFractionDigits: 2 });
    const d7 = (props.price_change_percentage_7d).toLocaleString(undefined, { maximumFractionDigits: 2 });
    const d30 = (props.price_change_percentage_30d).toLocaleString(undefined, { maximumFractionDigits: 2 });


    return (
        <tr>
            
            <Td>{props.rank}</Td>
            <Td><Img src={props.image} alt="Crypto Logo" /></Td>
            <Td className="Cap">{props.ticker}</Td>
            <Td>${(props.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Td>
            {props.showBalance ? <Td>{props.balance}</Td> : <Td>******</Td>}
            <Td>
                <form action="#" method="POST">
                    <img className="BuyIcon" src={imgBuy} 
                        onClick={handleBuyClick} alt="Buy" title="Buy">
                    </img>
                    <img className="SellIcon" src={imgSell} 
                        onClick={props.balance > 0 ? handleSellClick : handleInfoClick} alt="Sell" title="Sell">
                    </img>
                    <br/>
                    <img className="RefreshIcon" src={imgRefresh} 
                        onClick={handleRefreshClick} alt="Refresh" title="Refresh">
                    </img>

                    <Popup trigger={<img className="InfoIcon" src={imgInfo}
                        onClick={handleInfoClick}  
                         alt="More Info" title="More Info">
                        </img>} position="left center">
                            <div>
                                <img src={props.image} />
                                <p><b>Rank: </b>{props.rank}</p>
                                <p><b>Name: </b>{props.name}</p>
                                <p><b>Ticker: </b><b className="Cap2">{props.ticker}</b></p>
                                <p><b>Current Price: </b>${(props.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                <p><b>Market Cap: </b>${(props.market_cap).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                                
                                <p><b>24h Price Change: </b><b className={
                                    props.price_change_percentage_24h < 0 ? "Red" : "Green"}>{h24} % </b></p>
                                <p><b>7d Price Change: </b><b className={
                                    props.price_change_percentage_7d < 0 ? "Red" : "Green"}>{d7} % </b></p>
                                <p><b>30d Price Change: </b><b className={
                                    props.price_change_percentage_30d < 0 ? "Red" : "Green"}>{d30} % </b></p>


                            </div>

                    </Popup>

                </form>
            </Td>
        </tr>
    );
}

Coin.propTypes = {
    rank: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,

    
    
}