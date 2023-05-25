import React from 'react'
import PropTypes from 'prop-types';
import './AccountBalance.css'; 

export default function AccountBalance (props) {
        const buttonText = props.showBalance ? 'HIDE BALANCE' : 'SHOW BALANCE';
        const addToBalanceText = 'ADD FUNDS';
        let balanceToggle = null;
        if (props.showBalance) {
            balanceToggle = <>BALANCE: ${(props.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}</>;
        }

        const handleAddToBalanceClick = (event) => {
            event.preventDefault();
            props.handleAddToBalance();
        }

        return (
            <section className="AccountBalance"> 

                    <span className="BalanceColor">{balanceToggle}</span>  

                    <button className="BalanceButton" alt="Hide Balance" title="Hide Balance" 
                        onClick={props.handleChangeBalance}> 
                        {buttonText} 
                    </button>
                    
                    <button className="AddToBalanceButton" alt="Add Funds to Balance" title="Add Funds to Balance" 
                        onClick={handleAddToBalanceClick}> 
                        {addToBalanceText} 
                    </button>

                    

            </section>
        );
}

AccountBalance.propTypes = {
    amount: PropTypes.number.isRequired
}