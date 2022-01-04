import { useState, Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';

import { BigNumber } from 'bignumber.js';
import { apiEndpoint, smartContractAddress, farmTokenAddresses, farmTokenAddresses2, smartContractAddress2, farm2TokenAddresses, farm2TokenAddresses2, smartContractAddress3, farm3TokenAddresses, farm3TokenAddresses2, tokenDecimals, tokenDecimalsId } from './data/addresses.js';

const LiquidityWrapper = styled.main`
  grid-column: 2 / 6;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
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

const LiquidityProvidingTitle = styled.div`
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

const LiquidityProviderTopList = styled.div`
  display: grid;
  grid-template-columns: 1fr 125px 125px;
  grid-gap: 0.5rem;
  border: 1px solid #7075e9;
  border-radius: 10px 10px 10px 0;
  font-family: sans-serif;
  padding: 8px;
`;
const LPPageList = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;
const LPStyledList = styled.li`
  border: 1px solid #7075e9;
  margin-top: -1rem;
  padding: 0.5rem;
  border-radius: 10px;
  width: 20px;
  text-align: center;
  cursor: pointer;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  border-top: none;
  border-radius: 0 10px 0 10px;

  @media(max-width: 29rem) {
    padding: 5px;
    font-size: 0.9rem;
  }

  :hover {
    background-color: #7075e9;
    color: white;
  }
`;

const TopWalletList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0.5rem;
  font-size: 0.95rem;
  letter-spacing: 2px;
  border-bottom: 1px dotted #7075e9;

  :last-child {
    border-bottom: none;
    border-bottom-right-radius: 8px;
  }

  :hover {
    background-color: #7075e9;
    color: white;
  }
  :hover div span {
    background-color: white;
    color: black;
  }

  div span {
    background-color: #7075e9;
    color: white;
    margin-right: 0.25rem;
    text-decoration: none;
    display: inline-block;
    margin-left: -0.5rem;
    padding: 0.1rem 0.5rem 0.1rem 0.25rem;
    border-radius: 0 10px 10px 0;
    font-size: 0.75rem;
    font-weight: bold;
  }

  @media(max-width: 38rem) {
    font-size: 0.85rem;
  }
  @media(max-width: 33rem) {
    font-size: 0.8rem;
    letter-spacing: 0;
  }
`;
const LPProvidersListNumber = styled.span`
  background-color: #7075e9;
  color: white;
  margin-right: 0.25rem;
  text-decoration: none;
  display: inline-block;
  margin-left: -0.5rem;
  padding: 0.1rem 0.5rem 0.1rem 0.1rem;
  border-radius: 0 10px 10px 0;
  font-size: 0.9rem;
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
function helperForIndexTokens(amount) {
  const digit = 8;
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

function reducer(state, action) {
  switch(action.type) {
    case 'SUCCESS': 
      return {
        loading: false,
        error: false,
        pool1GlobalIndexAmount: action.payload.pool1GlobalIndexAmount,
        pool1StakedIndexAmount: action.payload.pool1StakedIndexBalance,
        pool1WalletStakedIndexAmounts: action.payload.pool1WalletIndexBalances,
        pool1WalletClaimedValues: action.payload.pool1WalletClaimedValues,
        pool1ValueInUSDN: action.payload.pool1ValueInUSDN,
        pool1IndexValueInUSDN: action.payload.pool1IndexValueInUSDN,

        pool2GlobalIndexAmount: action.payload.pool2GlobalIndexAmount,
        pool2StakedIndexAmount: action.payload.pool2StakedIndexBalance,
        pool2WalletStakedIndexAmounts: action.payload.pool2WalletIndexBalances,
        pool2WalletClaimedValues: action.payload.pool2WalletClaimedValues,
        pool2ValueInUSDN: action.payload.pool2ValueInUSDN,
        pool2IndexValueInUSDN: action.payload.pool2IndexValueInUSDN,

        pool3GlobalIndexAmount: action.payload.pool3GlobalIndexAmount,
        pool3StakedIndexAmount: action.payload.pool3StakedIndexBalance,
        pool3WalletStakedIndexAmounts: action.payload.pool3WalletIndexBalances,
        pool3WalletClaimedValues: action.payload.pool3WalletClaimedValues,
        pool3ValueInUSDN: action.payload.pool3ValueInUSDN,
        pool3IndexValueInUSDN: action.payload.pool3IndexValueInUSDN,
      }
    case 'FAIL': 
      return {
        error: true,
        laoding: false
      }
    default:
      return state;
  }
}

export function Liquidity({ liquidityAddings }) {
  const [lpIndexStats, dispatch] = useReducer(reducer, {loading: true, error: false});
  const [lpProviderPool, setLpProviderPool] = useState('pool1');
  const [lpProviderPoolPage, setLpProviderPoolPage] = useState(1);
  
  /*get info from api about index and rewards for the pools*/
  useEffect(() => {
    let cancelled = false;
    async function getData() {
      try {
        async function fetchIndexBalances() {
          return Promise.all([
            fetch(`${apiEndpoint}/addresses/data/${smartContractAddress}?matches=.%2Aglobal_poolToken_amount`).then(r => r.json()),
            fetch(`${apiEndpoint}/addresses/data/${smartContractAddress}?matches=.%2A_indexStaked`).then(r => r.json()),
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress}/DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p`).then(r => r.json()),
            fetch(`${apiEndpoint}/addresses/data/${smartContractAddress}?matches=.%2A_claimedRewardValue`).then(r => r.json()),
            fetch(`${apiEndpoint}/addresses/data/${smartContractAddress2}?matches=.%2Aglobal_poolToken_amount`).then(r => r.json()),
            fetch(`${apiEndpoint}/addresses/data/${smartContractAddress2}?matches=.%2A_indexStaked`).then(r => r.json()),
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress2}/DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p`).then(r => r.json()),
            fetch(`${apiEndpoint}/addresses/data/${smartContractAddress2}?matches=.%2A_claimedRewardValue`).then(r => r.json()),
            fetch(`${apiEndpoint}/addresses/data/${smartContractAddress3}?matches=.%2Aglobal_poolToken_amount`).then(r => r.json()),
            fetch(`${apiEndpoint}/addresses/data/${smartContractAddress3}?matches=.%2A_indexStaked`).then(r => r.json()),
            fetch(`${apiEndpoint}/assets/balance/${smartContractAddress3}/DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p`).then(r => r.json()),
            fetch(`${apiEndpoint}/addresses/data/${smartContractAddress3}?matches=.%2A_claimedRewardValue`).then(r => r.json()),
          ]);
        }
        /*create construct with all the variables*/
        const [fetchedPool1GlobalIndexAmount, fetchedPool1IndexAmount, fetchedPool1USDNBalance, fetchedPool1ClaimedValues, fetchedPool2GlobalIndexAmount, fetchedPool2IndexAmount, fetchedPool2USDNBalance, fetchedPool2ClaimedValues, fetchedpool3GlobalIndexAmount, fetchedpool3IndexAmount, fetchedpool3USDNBalance, fetchedpool3ClaimedValues] = await fetchIndexBalances();
        let pool1WalletIndexBalances = [];
        let pool1WalletClaimedValues = {};
        let pool1StakedIndexBalance;
        let pool1ValueInUSDN = BigNumber(helperForInAndOutAmount(fetchedPool1USDNBalance.balance, 'usdn')).multipliedBy(10).toString();
        let pool1IndexValueInUSDN = (BigNumber(pool1ValueInUSDN).dividedBy(fetchedPool1GlobalIndexAmount[0].value)).toString();
        fetchedPool1IndexAmount.forEach(walletIndex => {
          if(walletIndex.key.length == 47) {
            if(walletIndex.value === 0) return;
            pool1WalletIndexBalances.push({[walletIndex.key.slice(0, 35)]: walletIndex.value});
            return;
          }
          if(walletIndex.key === 'global_indexStaked') {
            pool1StakedIndexBalance = walletIndex.value;
          }
        });
        fetchedPool1ClaimedValues.forEach(wallet => {
          if(wallet.key.length == 54) {
            pool1WalletClaimedValues[wallet.key.slice(0, 35)] = helperForInAndOutAmount(wallet.value, 'usdn').toFixed(2);
            return;
          }
          if(wallet.key === 'global_indexStaked') {
            pool1StakedIndexBalance = wallet.value;
          }
        });

        let pool2WalletIndexBalances = [];
        let pool2WalletClaimedValues = {};
        let pool2StakedIndexBalance;
        let pool2ValueInUSDN = BigNumber(helperForInAndOutAmount(fetchedPool2USDNBalance.balance, 'usdn')).multipliedBy(10).toString();
        let pool2IndexValueInUSDN = (BigNumber(pool2ValueInUSDN).dividedBy(fetchedPool2GlobalIndexAmount[0].value)).toString();
        fetchedPool2IndexAmount.forEach(walletIndex => {
          if(walletIndex.key.length == 47) {
            if(walletIndex.value === 0) return;
            pool2WalletIndexBalances.push({[walletIndex.key.slice(0, 35)]: walletIndex.value});
            return;
          }
          if(walletIndex.key === 'global_indexStaked') {
            pool2StakedIndexBalance = walletIndex.value;
          }
        });
        fetchedPool2ClaimedValues.forEach(wallet => {
          if(wallet.key.length == 54) {
            pool2WalletClaimedValues[wallet.key.slice(0, 35)] = helperForInAndOutAmount(wallet.value, 'usdn').toFixed(2);
            return;
          }
          if(wallet.key === 'global_indexStaked') {
            pool2StakedIndexBalance = wallet.value;
          }
        });

        let pool3WalletIndexBalances = [];
        let pool3WalletClaimedValues = {};
        let pool3StakedIndexBalance;
        let pool3ValueInUSDN = BigNumber(helperForInAndOutAmount(fetchedpool3USDNBalance.balance, 'usdn')).multipliedBy(10).toString();
        let pool3IndexValueInUSDN = (BigNumber(pool3ValueInUSDN).dividedBy(fetchedpool3GlobalIndexAmount[0].value)).toString();
        fetchedpool3IndexAmount.forEach(walletIndex => {
          if(walletIndex.key.length == 47) {
            if(walletIndex.value === 0) return;
            pool3WalletIndexBalances.push({[walletIndex.key.slice(0, 35)]: walletIndex.value});
            return;
          }
          if(walletIndex.key === 'global_indexStaked') {
            pool3StakedIndexBalance = walletIndex.value;
          }
        });
        fetchedpool3ClaimedValues.forEach(wallet => {
          if(wallet.key.length == 54) {
            pool3WalletClaimedValues[wallet.key.slice(0, 35)] = helperForInAndOutAmount(wallet.value, 'usdn').toFixed(2);
            return;
          }
          if(wallet.key === 'global_indexStaked') {
            pool3StakedIndexBalance = wallet.value;
          }
        });
        
        if(!cancelled) {
          dispatch({
            type: 'SUCCESS',
            payload: {
              pool1GlobalIndexAmount: fetchedPool1GlobalIndexAmount[0].value,
              pool1StakedIndexBalance: pool1StakedIndexBalance,
              pool1WalletIndexBalances: pool1WalletIndexBalances.sort((w1, w2) => w2[Object.keys(w2)] - w1[Object.keys(w1)]),
              pool1WalletClaimedValues: pool1WalletClaimedValues,
              pool1ValueInUSDN: pool1ValueInUSDN,
              pool1IndexValueInUSDN: pool1IndexValueInUSDN,
  
              pool2GlobalIndexAmount: fetchedPool2GlobalIndexAmount[0].value,
              pool2StakedIndexBalance: pool2StakedIndexBalance,
              pool2WalletIndexBalances: pool2WalletIndexBalances.sort((w1, w2) => w2[Object.keys(w2)] - w1[Object.keys(w1)]),
              pool2WalletClaimedValues: pool2WalletClaimedValues,
              pool2ValueInUSDN: pool2ValueInUSDN,
              pool2IndexValueInUSDN: pool2IndexValueInUSDN,

              pool3GlobalIndexAmount: fetchedpool3GlobalIndexAmount[0].value,
              pool3StakedIndexBalance: pool3StakedIndexBalance,
              pool3WalletIndexBalances: pool3WalletIndexBalances.sort((w1, w2) => w2[Object.keys(w2)] - w1[Object.keys(w1)]),
              pool3WalletClaimedValues: pool3WalletClaimedValues,
              pool3ValueInUSDN: pool3ValueInUSDN,
              pool3IndexValueInUSDN: pool3IndexValueInUSDN
            }
          })
        }
      } catch {
        if(!cancelled) {
          dispatch({
            type: 'FAIL'
          })
        }
      }
    }

    getData();

    return () => cancelled = false;
  }, []);

  const [page, setPage] = useState(1);
  
  return (
    <LiquidityWrapper>

 
      <div 
        style={{

        }}
      >
      
        {
          lpIndexStats.loading ?
            null :
            lpIndexStats.error ?
            null :
            (

              <Fragment>
                <LPPageList
                  style={{
                    marginBottom: '0',
                    justifyContent: 'flex-start'
                  }}
                >
                  <LPStyledList
                    onClick={() => {
                      setLpProviderPool('pool1');
                      setLpProviderPoolPage(1);
                    }}
                    style={{
                      borderTop: '1px solid #7075e9',
                      borderBottom: 'none',
                      width: 'auto',
                      marginRight: '2rem'
                    }}
                  >
                    farms 1
                  </LPStyledList>

                  <LPStyledList
                    onClick={() => {
                      setLpProviderPool('pool2');
                      setLpProviderPoolPage(1);
                    }}
                    style={{
                      borderTop: '1px solid #7075e9',
                      borderBottom: 'none',
                      width: 'auto'
                    }}
                  >
                    farms 2
                  </LPStyledList>
                  <LPStyledList
                    onClick={() => {
                      setLpProviderPool('defi');
                      setLpProviderPoolPage(1);
                    }}
                    style={{
                      borderTop: '1px solid #7075e9',
                      borderBottom: 'none',
                      width: 'auto'
                    }}
                  >
                    DeFi
                  </LPStyledList>
                </LPPageList>

                <div
                  style={{
                    border: '1px solid #7075e9',
                    borderRadius: '10px 10px 10px 0',
                    fontFamily: 'sans-serif'
                  }}
                >

                  <div
                    style={{
                      borderBottom: '1px solid #7075e9',
                      padding: '0.75rem',
                      fontWeight: '600',
                      letterSpacing: '1px',
                      fontSize: '1rem',
                      textAlign: 'center'
                    }}
                  >
                    <span>liquidity provider stats</span>
                  </div>

                  <div>
                    {
                      lpIndexStats[lpProviderPool == 'pool1' ? 'pool1WalletStakedIndexAmounts' : 'pool2WalletStakedIndexAmounts'].slice(0+(10*(lpProviderPoolPage-1)), 10+(10*(lpProviderPoolPage-1))).map((lp, idx) => {
                        const walletAddress = Object.keys(lp)[0];
                        return (
                          <TopWalletList
                            key={walletAddress}
                          >
                            <div style={{gridColumn: '1 / -1', marginBottom: '0.5rem', textDecoration: 'underline #7075e9'}}>
                              <span>
                                {(idx+1)+(lpProviderPoolPage-1)*10}
                              </span>
                              {walletAddress}
                            </div>
                            <span><span style={{textDecoration: 'underline #7075e9'}}>amount</span> : {helperForIndexTokens(lp[walletAddress]).toFixed(4)}</span>
                            <span><span style={{textDecoration: 'underline #7075e9'}}>value</span> : {BigNumber(lp[walletAddress]).multipliedBy(lpIndexStats[lpProviderPool == 'pool1' ? 'pool1IndexValueInUSDN' : 'pool2IndexValueInUSDN']).toFixed(2).toString()}</span>
                            <span><span style={{textDecoration: 'underline #7075e9'}}>claimed</span> : {lpIndexStats[lpProviderPool == 'pool1' ? 'pool1WalletClaimedValues' : 'pool2WalletClaimedValues'][walletAddress]}</span>
                          </TopWalletList>
                        )
                      })
                    }
                  </div>
                    
                </div>

                <LPPageList>
                {
                  new Array(lpIndexStats[lpProviderPool == 'pool1' ? 'pool1WalletStakedIndexAmounts' : 'pool2WalletStakedIndexAmounts'].length > 100 ? 10 : Math.ceil(lpIndexStats[lpProviderPool == 'pool1' ? 'pool1WalletStakedIndexAmounts' : 'pool2WalletStakedIndexAmounts'].length / 10)).fill(undefined).map((el, idx) => {
                    return (
                      <LPStyledList 
                        key={idx}
                        onClick={() => {
                          setLpProviderPoolPage(idx + 1);
                        }}
                      >
                        {idx+1}
                      </LPStyledList>
                    )
                  })
                }
              </LPPageList>
              </Fragment>
            )
        }

      </div>

      {
        liquidityAddings.slice(0+(10*(page-1)), 10+(10*(page-1))).map(liquidity => {
          const date = new Date(liquidity.timestamp);
          return (
            <Fragment key={liquidity.transactionId}>
              <LiquidityProvidingTitle>
                <a href={`https://wavesexplorer.com/tx/${liquidity.transactionId}`} style={{flex: '0 0 20px', borderRight: '1px solid #7075e9', marginRight: '5px', color: 'blue'}}>tx</a>
                <span>{liquidity.liquidityProvider}</span>
                <small>{date.toLocaleString('en-US', {timeZone: 'UTC'})}</small>
              </LiquidityProvidingTitle>

              <ul style={{
                listStyle: 'none',
                margin: '0 0 3em 0',
                borderBottom: '1px solid #7075e9',
                borderRight: '1px solid #7075e9',
                paddingLeft: '1.80em'
              }}>
                
                {
                  liquidity.addedLiquidity.map(liquidity => (
                    <li key={liquidity.amount + liquidity.asset} style={{
                      padding: '0.25em',
                      fontSize: '0.9em',
                      letterSpacing: '1px',
                      borderLeft: '1px dotted #7075e9',
                      borderBottom: '1px dotted #7075e9',
                      display: 'flex',
                      justifyContent: 'left'
                    }}>
                      <span style={{flexBasis: '150px'}}>{liquidity.asset.toUpperCase()}</span>  
                      <span>{liquidity.amount}</span>
                    </li>
                  ))
                }
              </ul>
            </Fragment>
          )
        })
      }
      <PageList>
        {
          new Array(liquidityAddings.length > 100 ? 10 : Math.ceil(liquidityAddings.length / 10)).fill(undefined).map((el, idx) => {
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
    </LiquidityWrapper>
  )
}