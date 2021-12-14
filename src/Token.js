import { useState, useEffect, Fragment } from 'react';

import './style.css';

import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import * as images from './assets/images';

import { allFarmTokenAddresses, apiEndpoint, smartContractAddress, farmTokenAddresses, farmTokenAddresses2, smartContractAddress2, farm2TokenAddresses, farm2TokenAddresses2, tokenDecimals } from './data/addresses.js';


const MainWrapper = styled.div`
  grid-column: 2 / 6;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
  }
`;

const TokenInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 125px 1fr 100px;
  grid-template-areas: 
    "imga title title imgb"
    "imga infotitlea infoa imgb"
    "imga infotitleb infob imgb"
    "imga link link imgb";
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5em;
  border: 1px solid #7075e9;
  border-left: 0;
  border-right: 0;
  border-radius: 60px 60px 60px 60px;

  @media(max-width: 29rem) {
    grid-template-columns: 100px 125px 1fr;
    grid-template-areas:
      "imga title title"
      "imga infotitlea infoa"
      "imga infotitleb infob"
      "imga link link";
    border: 1px solid #7075e9;
    border-left: 0;
    border-radius: 60px 0 10px 60px; 
    padding-right: 1rem;
  }
`;
const ImgB = styled.img`
  grid-area: imgb; 
  justify-self: right;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #7075e9;
  @media(max-width: 29rem) {
    display: none;
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
  grid-column: 2 / 6;
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: space-between;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
  }
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

function helperForInAndOutAmount(amount, asset) {
  const digit = tokenDecimals[asset];
  let value = amount;
  if(amount.length <= digit) {
    for (let i = 1; i <= digit - amount.length; i++) {
      value = '0' + value;
    }
    return value = '0.' + value;
  } else {
    return value / 10**digit;
  }
}

export function Token({ data }) {
  const { token } = useParams()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tokenData, setTokenData] = useState({});
  const [page, setPage] = useState(1);

  const tokenId = allFarmTokenAddresses[token];
  const poolBalance = data.contractBalance.find(asset => {
    return asset.name == token;
  }).balance;
  const tokenTrades = data.transactions.exchange.filter(tx => {
    return tx.from == token || tx.to == token;
  });

  useEffect(() => {
    let cancelled = false;
    async function getTokenData() {
      try {
        const fetchedTokenDetails = await fetch(`${apiEndpoint}/assets/details/${tokenId}`);
        const tokenDetails = await fetchedTokenDetails.json();
        await new Promise(r => setTimeout(r, 1000));
        if(!cancelled) {
          setTokenData({ name: tokenDetails.name, description: tokenDetails.description, quantity: tokenDetails.quantity });
          setLoading(false);
          setError(false);
        }
      } catch {
        if(!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    }
    if(token !== 'waves') {
      getTokenData();
    } else {
      if(!cancelled) {
        setLoading(false);
        setError(false);
      }
    }
    return () => cancelled = true;
  }, []);

  return (
    <Fragment>
      <MainWrapper>

        {
          loading ?

            (
              <div style={{width: "100%", height: "130px", textAlign: 'center'}}>
                <img src={images[token]} className="rotate-token-logo" alt="" style={{borderRadius: "50%"}} width="100px" height="100px" />
              </div>
            ) :

            error ?

            (
              null
            ) :

            (
              <TokenInfoWrapper>
                <img src={images[token]} style={{gridArea: 'imga', width: '80px', height: '80px', borderRadius: '50%', border: '1px solid #7075e9'}} alt="" />

                <div style={{gridArea: 'title', fontWeight: 'bold', textAlign: 'center', fontSize: '0.9em'}}>{token.toUpperCase()}</div>
                
                {
                  token === 'waves' ? (
                    <div></div>
                  ) : (
                  <Fragment>
                    <div style={{gridArea: 'infotitlea'}}>total amount:</div> 
                    <div style={{gridArea: 'infoa'}}>{helperForInAndOutAmount(tokenData.quantity, token)}</div>
                  </Fragment>
                  )
                }
                
                <div style={{gridArea: 'infotitleb'}}>puzzle balance:</div> 
                <div style={{gridArea: 'infob'}}>{poolBalance}</div>
                

                <div style={{gridArea: 'link', display: 'flex', justifyContent: 'space-between'}}>
                  <span>
                    {
                      token == 'usdn' || token == 'egg' ? 
                      (
                        <Fragment>
                          <a href="https://puzzleswap.org/farms" style={{fontWeight: 'bold', fontSize: '0.85em', textDecoration: 'none', color: '#7075e9', marginRight: '20px'}}>farms 1</a>
                          <a href="https://puzzleswap.org/farms2" style={{fontWeight: 'bold', fontSize: '0.85em', textDecoration: 'none', color: '#7075e9', marginRight: '20px'}}>farms 2</a>
                          <a href="https://puzzleswap.org/defi" style={{fontWeight: 'bold', fontSize: '0.85em', textDecoration: 'none', color: '#7075e9'}}>defi</a>
                        </Fragment>
                      ) : 
                      (
                        <a 
                          href={(Object.keys(farmTokenAddresses).includes(token)) ? `https://puzzleswap.org/farms` : (Object.keys(farm2TokenAddresses).includes(token)) ? `https://puzzleswap.org/farms2` :  `https://puzzleswap.org/defi`} 
                          style={{fontWeight: 'bold', fontSize: '0.85em', textDecoration: 'none', color: '#7075e9'}}
                        >
                          puzzleswap
                        </a>
                      )
                    }
                  </span>
                  <span>
                    {
                      (Object.keys(farmTokenAddresses).includes(token) || Object.keys(farm2TokenAddresses).includes(token)) && token !== 'usdn' ?
                      (
                        <a href="https://collective.wavesducks.com/" style={{fontWeight: 'bold', fontSize: '0.85em', textDecoration: 'none', color: '#7075e9'}}>collective farms</a>
                      ) :
                      (
                        null
                      )
                    }
                  </span>
                  <span><a href={`https://wavesexplorer.com/assets/${tokenId}`} style={{fontWeight: 'bold', fontSize: '0.85em', textDecoration: 'none', color: '#7075e9'}}>asset</a></span>
                </div>
                
                {
                  (Object.keys(farmTokenAddresses).includes(token) || Object.keys(farm2TokenAddresses).includes(token)) && token !== 'usdn' ?
                  (
                    <ImgB src={images.wavesducks} alt="" />
                  ) :
                  (
                    <ImgB src={images[token]} alt="" />
                  )
                }
              </TokenInfoWrapper>
            )
        }

        {
          tokenTrades.slice(0+(10*(page-1)), 10+(10*(page-1))).map(transaction => {
            const date = new Date(transaction.timestamp);
            return (
              <TradeList key={transaction.transactionId}>

                <TradeListTitle>
                  <a href={`https://wavesexplorer.com/tx/${transaction.transactionId}`} style={{flex: '0 0 20px', borderRight: '1px solid #7075e9', marginRight: '5px', color: 'blue'}}>tx</a>
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
      </MainWrapper>

      <PageList>
        {
          new Array(tokenTrades.length > 100 ? 10 : Math.ceil(tokenTrades.length / 10)).fill(undefined).map((el, idx) => {
            return (
              <StyledList 
                key={idx}
                onClick={() => {
                  setPage(idx + 1);
                }}
              >
                {idx+1}
              </StyledList>
            )
          })
        }
      </PageList>

    </Fragment>
  );
}