import { useState, Fragment } from 'react';
import * as images from './assets/images';
import { BigNumber } from 'bignumber.js';

import styled from 'styled-components';

import { Link } from 'react-router-dom';



const StatsTitle = styled.div`
  grid-column: 2 / 6;
  border: 1px solid #7075e9;
  border-radius: 0 14px 0 14px;
  padding: 0.7rem;
  text-align: center;
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
    z-index: 2;
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

const MainWrapper = styled.div`
  grid-column: 2 / 6;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
  }
`;

/* const Info = styled.div`
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
`; */

const Info = styled.div`
  border: 1px solid #7075e9;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  
  :hover {
    box-shadow: 0 0 5px #7075e9;
  }

  display: flex;
  flex-direction: column;

  h2 {
    padding: 10px;
    margin: 0;
  }

  >a {
    margin-top: auto;
    text-align: right;
    background-color: #7075e9;
    color: white;
    border-bottom-left-radius: 8px;
    padding: 10px;
  }
`; 

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
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
  border-radius: 0 10px 0 10px;
  
  padding: 0.7rem;
  font-family: sans-serif;
  letter-spacing: 1px;
  font-weight: bold;
`;

const StatsInfoMain = styled.div`
  grid-column: 2 / -2;
  border: 1px solid #7075e9;
  border-radius: 0 10px 0 10px;
  margin-bottom: 0.5em;
  padding: 1rem;
  text-align: center;
  font-family: sans-serif;
  letter-spacing: 5px;
  font-weight: bold;
`;

const InfoTitle = styled.div`
  grid-column: 1 / -1;
  border: 1px solid #7075e9;
  border-radius: 0 10px 0 10px;
  text-align: center;
  margin-bottom: 0.5em;
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
  let volumeNumbers = data.volumeNumbers;

  function simpleNumber(costOfIt, visualOfIt) {
    var visualOfIt = costOfIt.toString();

    var visualLeng = 6;
    var maxLeng = 4;
    var letterArrayIndex = 0;

    var letterArray = [" Thousand", " Million", " Billion", " Trillion", " Quadrillion", " Quintillion", " Sextillion", " Septillion", " Octillion", " Nonillion", " Decillion", " Undecillion", " Duodecillion", " Tredecillion", " Quatuordecillion", " Quindecillion", " Sexdecillion", " Septendecillion", " Octodecillion", " Novemdecillion", " Vigintillion", " Unvigintillion", " Duovigintillion", " Tresvigintillion", " Quatuorvigintillion", " Quinquavigintillion", " Sesvigintillion", " Septemvigintillion", " Octovigintillion", " Novemvigintillion", " Trigintillion", " Untrigintillion", " Duotrigintillion", " Trestrigintillion", " Quatuortrigintillion", " Quinquatrigintillion", " Sestrigintillion", " Septentrigintillion", " Octotrigintillion", " Novemtrigintillion", " Quadragintillion", " Unquadragintillion", " Duoquadragintillion", " Tresquadragintillion", " Quatuorquadragintillion", " Quinquaquadragintillion", " Sesquadragintillion", " Septemquadragintillion", " Octoquadragintillion", " Novemquadragintillion", " Quinquagintillion", " Unquinquagintillion", " Duoquinquagintillion", " Tresquinquagintillion", " Quatuorquinquagintillion", " Quinquaquinquagintillion", " Sesquinquagintillion", " Septenquinquagintillion", " Octoquinquagintillion", " Novemquinquagintillion", " Sexagintillion", " Unsexagintillion", " Duosexagintillion", " Tressexagintillion", " Quatuorsexagintillion", " Quinquasexagintillion", " Sexasexagintillion", " Septemsexagintillion", " Octosexagintillion", " Novemsexagintillion", " Septuagintillion", " Unseptuagintillion", " Duoseptuagintillion", " Tresseptuagintillion", " Quatuorseptuagintillion", " Quinquaseptuagintillion", " Sexaseptuagintillion", " Septenseptuagintillion", " Octoseptuagintillion", " Novemseptuagintillion", " Octogintillion", " Unoctogintillion", " Duooctogintillion", " Tresoctogintillion", " Quatuoroctogintillion", " Quinquaoctogintillion", " Sesoctogintillion", " Septemoctogintillion", " Octooctogintillion", " Novemoctogintillion", " Nonagintillion", " Unnonagintillion", " Duononagintillion", " Tresnonagintillion", " Quatuornonagintillion", " Quinquanonagintillion", " Sesnonagintillion", " Septemnonagintillion", " Octononagintillion", " Novemnonagintillion", " Centillion", " Uncentillion"];

    var leng = 4;
    var slic = 1;

    for (var g = 0; g < visualOfIt.length; g++) {
        if (visualOfIt.length <= visualLeng) {
            if (leng < maxLeng) {
                leng = maxLeng;
            }

            if (visualOfIt.length === leng) {
                if (slic > 2) {
                    visualOfIt = costOfIt.toString().slice(0, slic) + letterArray[letterArrayIndex];
                    break;
                } else {
                    visualOfIt = costOfIt.toString().slice(0, slic) + "," + costOfIt.toString().slice(slic, 3) + letterArray[letterArrayIndex];
                    break;
                }
            } else {
                leng++;
                slic++;
            }
        } else {
            maxLeng += 3;
            visualLeng += 3;
            letterArrayIndex++;
        }
    }

    return visualOfIt;
}
  
  
  

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
  const slicedVolume = simpleNumber((volumeNumbersAll[volumeNumbersAll.length -1].slice(0, -11)))
  
  

  return (
    <Fragment>
    
    
      <StatsTitle className="rotate-puzzle">
        <img src={images.puzzleswap} alt="puzzle swap" width="50px" height="50px" />
        <h2><span style={{marginLeft: '4px'}}>exchange stats | last 24 hours< br /></span></h2>
        
        <StatsInfoMain>
          <span>number of trades: {tradesInLastTwentyFourHours.number} <br /></span>
          {/* <span>Total volume <tab> {tradesInLastTwentyFourHours.number}</tab> <br /></span> */}
        </StatsInfoMain>
        <StatsInfoMain>
        <span>Volume:  {slicedVolume} <br /></span>
        </StatsInfoMain>

      
      </StatsTitle>
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
            tradesInLastTwentyFourHours.pairs.slice(0, /* showLeftMore ? 10 : */ 3).map(([pair, time], idx) => {
              return (
                <li key={pair} className="home-stats" style={{margin: '4px', padding: '3px 0 1px 5px', letterSpacing: '0.5px'}}>
                  {idx+1}) {pair.toUpperCase()} - {time} times
                </li>
              )
            })
          }
        </ul>

      </StatsGroupedInfoLeft>


      <DecorativePuzzle>
        <img src={images.puzzleswap} alt="" style={{width: '3rem'}} />
      </DecorativePuzzle>


      <StatsGroupedInfoRight>
        <div>
          <span style={{fontWeight: '600', fontSize: '0.95rem'}}>most traded tokens: </span>
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
            tradesInLastTwentyFourHours.tokens.slice(0, /* showRightMore ? 10 : */ 3).map(([token, time], idx) => {
              return (
                <li key={token} className="home-stats" style={{margin: '4px', padding: '3px 0 1px 5px', letterSpacing: '0.5px'}}>
                  {idx+1}) {token.toUpperCase()} - {time} times
                </li>
              )
            })
          }
        </ul>

        </StatsGroupedInfoRight>


{/*       <InnerShowMoreButton style={{borderRadius: '0 0 0 30%'}} onClick={() => setShowRightMore(!showRightMore)}>
          {showRightMore ? 'less' : 'more'}
        </InnerShowMoreButton>
      <InnerShowMoreButton onClick={() => setShowLeftMore(!showLeftMore)}>
          {showLeftMore ? 'less' : 'more'}
        </InnerShowMoreButton>
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
      </ShowMoreButton> */}




    
    <MainWrapper>
    <InfoTitle className="rotate-puzzle">
          <img src={images.puzzleswap} alt="puzzle swap" width="15px" height="15px" display="flex"/>
          <span style={{marginLeft: '4px'}}>Learn about Puzzleswap!</span>
        </InfoTitle>
      <InfoWrapper>
      <Info>
          <h2><a href="https://medium.com/@puzzleswap/supreme-puzzle-adjustment-spa-proposal-c515a5855cea" style={{textDecoration: 'none', color: 'black'}}>Supreme Puzzle Adjustment (SPA) proposal</a></h2>
          <a href="https://medium.com/@puzzleswap/supreme-puzzle-adjustment-spa-proposal-c515a5855cea">
            read more...
          </a>
        </Info>
      <Info>
          <h2><a href="https://medium.com/@puzzleswap/explaining-puzzle-aggregator-e0b0224384a8" style={{textDecoration: 'none', color: 'black'}}>Explaining Puzzle Aggregator</a></h2>
          <a href="https://medium.com/@puzzleswap/explaining-puzzle-aggregator-e0b0224384a8">
            read more...
          </a>
        </Info>
        <Info>
          <h2><a href="https://medium.com/@puzzleswap/puzzle-tokenomics-b08f3bbc42af" style={{textDecoration: 'none', color: 'black'}}>Puzzle Tokenomics</a></h2>
          <a href="https://medium.com/@puzzleswap/puzzle-tokenomics-b08f3bbc42af">
            read more...
          </a>
        </Info>
        <Info>
          <h2><a href="https://medium.com/@puzzleswap/explaining-the-power-of-mega-pools-6f9437b94d5e" style={{textDecoration: 'none', color: 'black'}}>Explaining the power of mega pools</a></h2>
          <a href="https://medium.com/@puzzleswap/explaining-the-power-of-mega-pools-6f9437b94d5e">
            read more...
          </a>
        </Info>
        <Info>
          <h2><a href="https://medium.com/@puzzleswap/liquidity-providing-is-live-at-puzzle-swap-5ffaed38e9f0" style={{textDecoration: 'none', color: 'black'}}>Liquidity providing is live at Puzzle Swap</a></h2>
          <a href="https://medium.com/@puzzleswap/liquidity-providing-is-live-at-puzzle-swap-5ffaed38e9f0">
            read more...
          </a>
        </Info>

        <Info>
          <h2><a href="https://medium.com/@puzzleswap/puzzle-swap-%EF%B8%8F-roadmap-d8629c2dd166" style={{textDecoration: 'none', color: 'black'}}>Puzzle Swap 🗺️ Roadmap<br/></a></h2>
          <a href="https://medium.com/@puzzleswap/puzzle-swap-%EF%B8%8F-roadmap-d8629c2dd166">
            read more...
          </a>
        </Info>
      </InfoWrapper>
</MainWrapper>

      {/* farm balance down below */}

      <TokenBalance>

        <TokenBalanceTitle className="rotate-puzzle">
          <img src={images.puzzleswap} alt="puzzle swap" width="16px" height="16px" />
          <span style={{marginLeft: '4px'}}>token balances</span>
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