import { useState, useEffect, Fragment } from 'react';
import { BigNumber } from 'bignumber.js';

import * as images from './assets/images';

import styled from 'styled-components';

import { TradingChart } from './TradingChart';

const TradesWrapper = styled.main`
  grid-column: 2 / 6;
  margin-top: -1rem;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
  }
`;

const StatsTitle = styled.div`
border: 1px solid #7075e9;
border-radius: 0 14px 0 14px;
padding: 0.7rem;
font-family: sans-serif;
letter-spacing: 1px;
font-weight: bold;
margin: 1rem 0;
`;
const StatsInfo = styled.div`
border: 1px solid #7075e9;
border-radius: 14px 0 14px 0;
padding: 1rem;
font-weight: 600;
font-size: 0.95rem;
font-family: sans-serif;
letter-spacing: 1px;
`;
const StatsWrapper = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: 1rem;

@media(max-width: 43.25rem) {
  grid-template-columns: 1fr;
}
`;
const StatsGroupedInfoLeft = styled.div`
  border: 1px solid #7075e9;
  border-radius: 14px 14px 0 14px;
  padding: 1rem;
  font-family: sans-serif;
  letter-spacing: 1px;
  overflow: auto;
`;
const StatsGroupedInfoRight = styled.div`
  border: 1px solid #7075e9;
  border-radius: 14px 0 14px 0;
  padding: 1rem;
  font-family: sans-serif;
  letter-spacing: 1px;
  overflow: auto;
`;
const StatsGroupedInfoRight2 = styled.div`
  border: 1px solid #7075e9;
  border-radius: 0 14px 0 0;
  padding: 1rem;
  font-family: sans-serif;
  letter-spacing: 1px;
  overflow: auto;
`;

const Test = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  li {
    border: 1px solid #7075e9;
    border-top: none;
    border-radius: 0 14px 0 14px;
    padding: 1rem;
    font-family: sans-serif;
    letter-spacing: 1px;
    margin-top: -1rem;
    padding: 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    font-family: sans-serif;
    letter-spacing: 1px;

    :hover {
      background-color: #7075e9;
      color: white;
    }
  }
`;

export function Stats( {tradesInLastTwentyFourHours} ) {
  const [historical, setHistorical] = useState({});
  const [historicalVolumes, setHistoricalVolumes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [poolStats, setPoolStats] = useState('all');
  const [stats, setStats] = useState('trades');

  useEffect(() => {
    async function getTokenData() {
      try {
        const fetchedTradingNumbers = await fetch('https://data.puzzlepedia.cc/puzzleswap-trades');
        const tradingNumbers = await fetchedTradingNumbers.json();
        const tradingDates = Object.keys(tradingNumbers).map(tradingDate => {
          let yearIndex = tradingDate.indexOf('.', 3);
          return tradingDate.slice(0, yearIndex);
        });
        
        const tradingNumbersAll = Object.values(tradingNumbers).map(tradeNumber => tradeNumber.exchange);
        const tradingNumbersPool1 = Object.values(tradingNumbers).map(tradeNumber => tradeNumber.pool1);
        const tradingNumbersPool2 = Object.values(tradingNumbers).map(tradeNumber => tradeNumber.pool2);
        const tradingNumbersPool3 = Object.values(tradingNumbers).map(tradeNumber => tradeNumber.pool3);

        setHistorical({ tradingDates, tradingNumbersAll, tradingNumbersPool1, tradingNumbersPool2, tradingNumbersPool3 });


        const fetchedVolumeNumbers = await fetch('https://data.puzzlepedia.cc/puzzleswap-volumes');
        const volumeNumbers = await fetchedVolumeNumbers.json();
        const volumeDates = Object.keys(volumeNumbers).map(volumeDate => {
          let yearIndex = volumeDate.indexOf('.', 3);
          return volumeDate.slice(0, yearIndex);
        });
        volumeDates.shift();
        
        let volumeNumbersValues = Object.values(volumeNumbers);
        const volumeNumbersAll = [];
        volumeNumbersValues.forEach((volumeNumber, idx) => {
          if(idx === 0) return;
          volumeNumbersAll.push(BigNumber(volumeNumber.exchange).minus(volumeNumbersValues[idx-1].exchange).toString());
        });
        const volumeNumbersPool1 = [];
        volumeNumbersValues.forEach((volumeNumber, idx) => {
          if(idx === 0) return;
          volumeNumbersPool1.push(BigNumber(volumeNumber.pool1).minus(volumeNumbersValues[idx-1].pool1).toString());
        });

        const volumeNumbersPool2 = [];
        volumeNumbersValues.forEach((volumeNumber, idx) => {
          if(idx === 0) return;
          volumeNumbersPool2.push(BigNumber(volumeNumber.pool2).minus(volumeNumbersValues[idx-1].pool2).toString());
        });

        const volumeNumbersPool3 = [];
        volumeNumbersValues.forEach((volumeNumber, idx) => {
          if(idx === 0) return;
          volumeNumbersPool3.push(BigNumber(volumeNumber.pool3).minus(volumeNumbersValues[idx-1].pool3).toString());
        });

        setHistorical({ tradingDates, tradingNumbersAll, tradingNumbersPool1, tradingNumbersPool2, tradingNumbersPool3 });
        setHistoricalVolumes({ volumeDates, volumeNumbersAll, volumeNumbersPool1, volumeNumbersPool2, volumeNumbersPool3 });
        setLoading(false);
        setError(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }
    getTokenData();
  }, []);
  
  return (
    <TradesWrapper>



      {
        loading ? 
          null : 
            error ? 
            null :
            <Fragment>
              <StatsTitle className="rotate-puzzle">
                <img src={images.puzzleswap} alt="puzzle swap" width="16px" height="16px" />
                <span style={{marginLeft: '4px'}}>daily stats</span>
              </StatsTitle>

              <div>
                <span
                  style={{
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                    border: '1px solid #7075e9',
                    padding: '0.25rem',
                    borderRadius: '8px 8px 8px 0'
                  }}
                >
                  *all = farms 1 + farms 2 + defi
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}
              >
                <span 
                  onClick={() => {
                    setStats('trades');
                    setPoolStats('all');
                  }}
                  style={{
                    background: '#7075e9',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderRadius: '7px'
                  }}
                >
                  daily trading numbers
                </span>
                <span 
                  onClick={() => {
                    setStats('volumes');
                    setPoolStats('all');
                  }}
                  style={{
                    background: '#7075e9',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderRadius: '7px'
                  }}
                >
                  daily trading volume
                </span>
              </div>

              {
                stats == 'trades' ? 

                (
                  <Fragment>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span 
                        onClick={() => setPoolStats('all')}
                        style={{
                          background: '#7075e9',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          borderRadius: '7px'
                        }}
                      >
                        *all
                      </span>
                      <span 
                        onClick={() => setPoolStats('pool1')}
                        style={{
                          background: '#7075e9',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          borderRadius: '7px'
                        }}
                      >
                        farms 1
                      </span>
                      <span 
                        onClick={() => setPoolStats('pool2')}
                        style={{
                          background: '#7075e9',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          borderRadius: '7px'
                        }}
                      >
                        farms 2
                      </span>
                      <span 
                        onClick={() => setPoolStats('pool3')}
                        style={{
                          background: '#7075e9',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          borderRadius: '7px'
                        }}
                      >
                        defi
                      </span>
                    </div>
                    <TradingChart historical={historical} pool={poolStats} /> 
                  </Fragment>

                ) : (
                  <Fragment>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span 
                        onClick={() => setPoolStats('all')}
                        style={{
                          background: '#7075e9',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          borderRadius: '7px'
                        }}
                      >
                        *all
                      </span>
                      <span 
                        onClick={() => setPoolStats('pool1')}
                        style={{
                          background: '#7075e9',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          borderRadius: '7px'
                        }}
                      >
                        farms 1
                      </span>
                      <span 
                        onClick={() => setPoolStats('pool2')}
                        style={{
                          background: '#7075e9',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          borderRadius: '7px'
                        }}
                      >
                        farms 2
                      </span>
                      <span 
                        onClick={() => setPoolStats('pool3')}
                        style={{
                          background: '#7075e9',
                          color: 'white',
                          padding: '0.25rem 0.5rem',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          borderRadius: '7px'
                        }}
                      >
                        defi
                      </span>
                    </div>
                    <TradingChart historicalVolumes={historicalVolumes} pool={poolStats} /> 
                  </Fragment>
                )
              }

              
            </Fragment>
      }



      <StatsTitle className="rotate-puzzle">
        <img src={images.puzzleswap} alt="puzzle swap" width="16px" height="16px" />
        <span style={{marginLeft: '4px'}}>last 24 hours</span>
      </StatsTitle>

      <StatsInfo>
        <div>number of trades: {tradesInLastTwentyFourHours.number}</div>
      </StatsInfo>
      <Test>
        <li>farms 1: {tradesInLastTwentyFourHours.numberPool1}</li>
        <li>farms 2: {tradesInLastTwentyFourHours.numberPool2}</li>
        <li>defi: {tradesInLastTwentyFourHours.numberPool3}</li>
        <li>puzzle: {tradesInLastTwentyFourHours.numberPool4}</li>
      </Test>


      <StatsWrapper>

      <StatsGroupedInfoLeft>
        <div>
          <span style={{fontWeight: '600', fontSize: '0.95rem'}}>most traded pairs: </span>
        </div>
        <ul
          style={{
            marginTop: '8px',
            marginBottom: '0',
            paddingLeft: '0',
            listStyle: 'none'
          }}
        >
          {
            tradesInLastTwentyFourHours.pairs.slice(0, 50).map(([pair, time], idx) => {
              return (
                <li key={pair} className="home-stats" style={{margin: '4px', padding: '3px 0 1px 5px', letterSpacing: '0.4px', fontSize: '0.97rem'}}>
                  {idx+1}) {pair.toUpperCase()} - <span style={{fontSize: '0.9rem'}}>{time} times</span>
                </li>
              )
            })
          }
        </ul>
      </StatsGroupedInfoLeft>
      <div >
        <StatsGroupedInfoRight>
          <div>
            <span style={{fontWeight: '600', fontSize: '0.95rem'}}>most active tokens: </span>
          </div>
          <ul
            style={{
              marginTop: '8px',
              marginBottom: '0',
              paddingLeft: '0',
              listStyle: 'none'
            }}
          >
            {
              tradesInLastTwentyFourHours.tokens.slice(0,25).map(([token, time], idx) => {
                return (
                  <li key={token} className="home-stats" style={{margin: '4px', padding: '3px 0 1px 5px', letterSpacing: '0.4px', fontSize: '0.97rem'}}>
                    {idx+1}) {token.toUpperCase()} - <span style={{fontSize: '0.9rem'}}>{time} times</span>
                  </li>
                )
              })
            }
          </ul>
        </StatsGroupedInfoRight>

        <StatsGroupedInfoRight2 style={{marginTop: '1rem'}}>
          <div>
            <span style={{fontWeight: '600', fontSize: '0.95rem'}}>traded amounts: </span>
          </div>
          <ul
            style={{
              marginTop: '8px',
              marginBottom: '0',
              paddingLeft: '0',
              listStyle: 'none'
            }}
          >
            {
              tradesInLastTwentyFourHours.tokens.slice(0,25).map(([token, time], idx) => {
                return (
                  <li key={token} className="home-stats" style={{margin: '4px', padding: '3px 0 1px 5px', letterSpacing: '0.4px', fontSize: '0.97rem'}}>
                    {idx+1}) {token.toUpperCase()} - <span style={{fontSize: '0.9rem'}}>{tradesInLastTwentyFourHours.amounts[token]}</span>
                  </li>
                )
              })
            }
          </ul>
        </StatsGroupedInfoRight2>
      </div>

      </StatsWrapper>

    </TradesWrapper>
  )
}