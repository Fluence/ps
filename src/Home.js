import { useState, Fragment } from 'react';
import * as images from './assets/images';

import styled from 'styled-components';

import { Link } from 'react-router-dom';


const StatsTitle = styled.div`
  grid-column: 2 / 6;
  border: 1px solid #7075e9;
  border-radius: 0 14px 0 14px;
  padding: 0.7rem;
  font-family: sans-serif;
  letter-spacing: 1px;
  font-weight: bold;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
  }
`;
const StatsInfo = styled.div`
  grid-column: 2 / 6;
  border: 1px solid #7075e9;
  border-radius: 14px 0 14px 0;
  padding: 1rem;
  font-weight: 600;
  font-size: 0.95rem;
  font-family: sans-serif;
  letter-spacing: 1px;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
  }
`;
const StatsGroupedInfoLeft = styled.div`
  grid-column: 2 / 4;
  grid-row-start: 5;
  border: 1px solid #7075e9;
  border-radius: 0 14px 0 14px;
  padding: 1rem;
  font-family: sans-serif;
  letter-spacing: 1px;
  position: relative;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
    grid-row-start: auto;
  }
`;
const StatsGroupedInfoRight = styled.div`
  grid-column: 4 / 6;
  grid-row-start: 5;
  border: 1px solid #7075e9;
  border-radius: 14px 0 14px 0;
  padding: 1rem;
  font-family: sans-serif;
  letter-spacing: 1px;
  position: relative;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
    grid-row-start: auto;
  }
`;
const DecorativePuzzle = styled.div`
  grid-column: 3 / 5;
  grid-row-start: 5;
  justify-self: center;
  align-self: center;
  z-index: 1;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
    grid-row-start: auto;
    margin-top: -1.6rem;
    margin-bottom: -1.6rem;
  }
`;
const ShowMoreButton = styled.div`
    grid-column: 2 / 6;
    justify-self: center;
    border-radius: 50%;
    box-shadow: inset 0 0 3px #7075e9;
    color: black;
    width: 2.6rem;
    height: 2.6rem;
    margin-top: -2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    font-size: 0.85rem;
    cursor: pointer;
    font-family: sans-serif;
    z-index: 1;
    background-color: white;
    :hover {
      box-shadow: 0 0 5px #7075e9;
    }
  @media(max-width: 43.25rem) {
    display: none;
  }
`;
const InnerShowMoreButton = styled.div`
    border-radius: 0 30% 0 30%;
    background-color: #7075e9;
    color: white;
    width: 2.6rem;
    height: 2.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    font-size: 0.85rem;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    font-family: sans-serif;

  @media(min-width: 43.25rem) {
    display: none;
  }
`;



const TokenBalance = styled.article`
  grid-column: 2 / 6;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
  }
  @media(max-width: 35.6rem) {
    grid-template-columns: 1fr;
  }
`;

const TokenBalanceTitle = styled.div`
  grid-column: 1 / -1;
  border: 1px solid #7075e9;
  border-radius: 0 14px 0 14px;
  padding: 0.7rem;
  font-family: sans-serif;
  letter-spacing: 1px;
  font-weight: bold;
`;

const TokenList = styled.div`

	display: flex;
	align-items: center;
	border: 1px solid #7075e9;
	border-left: 0;
	border-radius: 60px 14px 0 60px;
	cursor: pointer;
	font-family: sans-serif;
	letter-spacing: 0.1px;

  :hover {
	background-color: #7075e9;
	color: white;
  }
`;


export function Home({data, tradesInLastTwentyFourHours}) {
  const [showLeftMore, setShowLeftMore] = useState(false);
  const [showRightMore, setShowRightMore] = useState(false);

  return (
    <Fragment>
    
    
      <StatsTitle className="rotate-puzzle">
        <img src={images.puzzleswap} alt="Puzzleswap" width="16px" height="16px" />
        <span style={{marginLeft: '4px'}}>Exchange stats | Last 24 hours</span>
      </StatsTitle>

      <StatsInfo>
        Number of trades: {tradesInLastTwentyFourHours.number}
      </StatsInfo>

      <StatsGroupedInfoLeft>
        <div>
          <span style={{fontWeight: '600', fontSize: '0.95rem'}}>Most traded pairs: </span>
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
            tradesInLastTwentyFourHours.pairs.slice(0, showLeftMore ? 10 : 3).map(([pair, time], idx) => {
              return (
                <li key={pair} className="home-stats" style={{margin: '4px', padding: '3px 0 1px 5px', letterSpacing: '0.5px'}}>
                  {idx+1}) {pair.toUpperCase()} - {time} times
                </li>
              )
            })
          }
        </ul>
        <InnerShowMoreButton onClick={() => setShowLeftMore(!showLeftMore)}>
          {showLeftMore ? 'less' : 'more'}
        </InnerShowMoreButton>
      </StatsGroupedInfoLeft>


      <DecorativePuzzle>
        <img src={images.puzzleswap} alt="" style={{width: '3rem'}} />
      </DecorativePuzzle>


      <StatsGroupedInfoRight>
        <div>
          <span style={{fontWeight: '600', fontSize: '0.95rem'}}>Most traded tokens: </span>
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
            tradesInLastTwentyFourHours.tokens.slice(0, showRightMore ? 10 : 3).map(([token, time], idx) => {
              return (
                <li key={token} className="home-stats" style={{margin: '4px', padding: '3px 0 1px 5px', letterSpacing: '0.5px'}}>
                  {idx+1}) {token.toUpperCase()} - {time} times
                </li>
              )
            })
          }
        </ul>
        <InnerShowMoreButton style={{borderRadius: '0 0 0 30%'}} onClick={() => setShowRightMore(!showRightMore)}>
          {showRightMore ? 'less' : 'more'}
        </InnerShowMoreButton>
      </StatsGroupedInfoRight>

      <ShowMoreButton
        onClick={() => {
          setTimeout(() => {
            if(showLeftMore || showRightMore) {
              setShowLeftMore(false);
              setShowRightMore(false);
            } else {
              setShowLeftMore(true);
              setShowRightMore(true);
            }
          }, 100);
        }}
      >
        {
          showLeftMore || showRightMore ? 'less' : 'more'
        }
      </ShowMoreButton>
    


      {/* farm balance down below */}

      <TokenBalance>

        <TokenBalanceTitle className="rotate-puzzle">
          <img src={images.puzzleswap} alt="Puzzleswap" width="16px" height="16px" />
          <span style={{marginLeft: '4px'}}>Token balances</span>
        </TokenBalanceTitle>


        {
          data.contractBalance.map(asset => {
            return (
              <Link to={`/tokens/${asset.name}`} key={asset.name} style={{color: 'black', textDecoration: 'none'}}>
                <TokenList
                  onClick={() => {
                    window.scroll({
                      top: 0,
                      left: 0,
                      behavior: 'smooth'
                    });
                    }
                  }
                >
                  <img src={images[asset.name]} style={{backgroundColor: 'white', width: '46px', height: '46px', borderRadius: '50%', border: '1px solid #7075e9', marginRight: '8px'}} alt={asset.name} />
                  <div style={{marginRight: '8px'}}>{asset.name.toUpperCase()}</div>
                  <div>{asset.balance}</div>
                </TokenList>
              </Link>
            )
          })
        }
      </TokenBalance>
    
    </Fragment>
  )
}