import { useState } from 'react';

import * as images from './assets/images';

import styled from 'styled-components';


const TradesWrapper = styled.main`
  grid-column: 2 / 6;
  margin-top: -1rem;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
  }
`;

const TradeFilterList = styled.li`
  border: 1px solid #7075e9;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 0.9rem;

  :hover {
    background-color: #7075e9;
    color: white;
  }  
  
  @media(max-width: 35.6rem) {
    letter-spacing: 0;
    font-size: 0.85rem;
    padding: 0.25rem 0.5rem;
  }
`;

const TradeList = styled.article`
  display: grid;
  grid-template-columns: 70px 140px 140px 140px 70px;
  align-items: center;
  margin-bottom: 2em;
  justify-content: space-between;
  @media(max-width: 35.6rem) {
    grid-template-columns: 55px minmax(100px, 1fr) 35px minmax(100px, 1fr) 55px;
  }
`;
const TradeListTitle = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  border: 1px solid #7075e9; 
  border-radius: 0 10px 0 10px; 
  padding: 8px;

  span {
    flex: 1 0 300px;
  }

  @media(max-width: 35.6rem) {
    flex-wrap: wrap;
    span {
      flex: 1 0 100%;
      order: 1;
      font-size: 0.8rem;
    }
    small {
      flex-grow: 1;
    }
  }
`;


const PageList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: space-between;
`;
const StyledList = styled.li`
  border: 1px solid #7075e9;
  padding: 10px;
  border-radius: 10px;
  width: 20px;
  text-align: center;
  cursor: pointer;
  @media(max-width: 29rem) {
    padding: 5px;
    font-size: 0.9rem;
  }
`;

export function Trades({ data }) {
  const [page, setPage] = useState(0);
  const [pool, setPool] = useState('all');
  let transactions = pool === 'all' ? data.transactions.exchange : pool === 'pool1' ? data.transactions.pool1 : pool === 'pool2' ? data.transactions.pool2 : pool === 'pool3' ? data.transactions.pool3 : pool === 'pool4' ? data.transactions.race : undefined;
  return (
    <TradesWrapper>
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0',
          marginBottom: '1rem',
          listStyle: 'none'
        }}
      >
        <TradeFilterList
          onClick={() => {
            setPool("all");
            setPage(0);
          }}
        >
          All
        </TradeFilterList>
        <TradeFilterList
          onClick={() => {
            setPool("pool1");
            setPage(0);
          }}
        >
          Farms 1
        </TradeFilterList>
        <TradeFilterList
          onClick={() => {
            setPool("pool2");
            setPage(0);
          }}
        >
          Farms 2
        </TradeFilterList>
        <TradeFilterList
          onClick={() => {
            setPool("pool3");
            setPage(0);
          }}
        >
          DeFi
        </TradeFilterList>
        <TradeFilterList
          onClick={() => {
            setPool("pool4");
            setPage(0);
          }}
        >
          Race
        </TradeFilterList>
      </ul>

      <div>
        {
          /*slice the tx into 25 per page*/
          transactions.slice(0+page*25, 25+page*25).map(transaction => {
            const date = new Date(transaction.timestamp);
            return (
              <TradeList key={transaction.transactionId}>

                <TradeListTitle>
                  <a href={`https://wavesexplorer.com/tx/${transaction.transactionId}`} target="_blank" style={{flex: '0 0 20px', borderRight: '1px solid #7075e9', marginRight: '5px', color: 'blue'}}>tx</a>
                  <span>{transaction.address}</span>
                  <small>{date.toLocaleString('en-US', {timeZone: 'UTC'})}</small>
                </TradeListTitle>

                <img src={images[transaction.from]} style={{width: 50, height: 50, borderRadius: '50%'}} alt={transaction.from} />
                <span style={{justifySelf: 'right', textAlign: 'center'}}>{transaction.in} <br /> {transaction.from}</span>
                <img src={images.exchange} style={{width: 30, height: 30, justifySelf: 'center'}} alt="" />
                <span style={{justifySelf: 'left', textAlign: 'center'}}>{transaction.out} <br /> {transaction.to}</span>
                <img src={images[transaction.to]} style={{width: 50, height: 50, borderRadius: '50%', justifySelf: 'right'}} alt={transaction.to} />

              </TradeList>
            )
          })
        }
      </div>
      <PageList>
        {
          new Array(transactions.length > 250 ? 10 : Math.ceil(transactions.length / 25)).fill(undefined).map((el, idx) => {
            return (
              <StyledList 
                key={idx}
                onClick={() => {
                  setPage(idx);
                }}
              >
                {idx+1}
              </StyledList>
            )
          })
        }
      </PageList>
    </TradesWrapper>
  )
}