import { useState, useEffect, Fragment } from 'react';

import './style.css';

import styled from 'styled-components';

import { useParams } from 'react-router-dom';

import * as images from './assets/images';

import { allFarmTokenAddresses, apiEndpoint, smartContractAddress, farmTokenAddresses, farmTokenAddresses2, smartContractAddress2, farm2TokenAddresses, farm2TokenAddresses2, tokenDecimals } from './data/addresses.js';

let puzzleAddress = `HEB8Qaw9xrWpWs8tHsiATYGBWDBtP2S7kcPALrMu43AS`;
const height = 2869166;

const MainWrapper = styled.div`
  grid-column: 2 / 6;

  @media(max-width: 43.25rem) {
    grid-column: 2 / 3;
  }
`;


const PuzzleInfoTitle = styled.div`
  border: 1px solid #7075e9;
  border-radius: 0 14px 0 14px;
  padding: 0.7rem;
  font-family: sans-serif;
  letter-spacing: 1px;
  font-weight: bold;
`;
const PuzzleInfo = styled.div`

`;

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;
const Info = styled.div`
  border: 1px solid #7075e9;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
  
  :hover {
    box-shadow: 0 0 5px #7075e9;
  }

  display: flex;
  flex-direction: column;

  h1 {
    padding: 10px;
    margin: 0;
  }

  >a {
    margin-top: auto;
    text-align: right;
    background-color: #7075e9;
    color: white;
    border-bottom-left-radius: 8px;
    padding: 6px;
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

const TokenId = styled.div`
  padding: 0.70rem;
  letter-spacing: 1px;
  font-size: 1rem;

  @media(max-width: 33rem) {
    letter-spacing: 0;
    font-size: 1rem;
  }
  @media(max-width: 30rem) {
    letter-spacing: 0;
    font-size: 0.9rem;
  }
  @media(max-width: 28rem) {
    letter-spacing: 0;
    font-size: 0.75rem;
  }
`;

const TopHolderList = styled.div`
  display: flex;
  padding: 0.5rem;
  font-size: 0.9em;
  letter-spacing: 1px;
  border-right: 1px dotted #7075e9;
  border-bottom: 1px dotted #7075e9;

  div:first-child  {
    flex-grow: 1;
  }

  @media (max-width: 35rem) {
    font-size: 0.8rem;
  }
  @media (max-width: 28rem) {
    letter-spacing: 0;
    font-size: 0.75rem;
  }
`;

function helperForInAndOutAmount(amount) {
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

export function Puzzle() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tokenData, setTokenData] = useState({});
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    async function getTokenData() {
      try {
        const blockHeight = await fetch(`${apiEndpoint}/blocks/height`).then(r => r.json()).then(r => r.height);


        let fetchedPuzzleDistribution = await fetch(`${apiEndpoint}/assets/${puzzleAddress}/distribution/${blockHeight-1}/limit/999`).then(r => r.json());
        let puzzleDistribution = fetchedPuzzleDistribution.items;

        async function fetchRecursively(nextItem) {
          const fetchedPuzzleDistributionNext = await fetch(`${apiEndpoint}/assets/${puzzleAddress}/distribution/${blockHeight-1}/limit/999?after=${nextItem}`).then(r => r.json());
          const puzzleDistributionNext = fetchedPuzzleDistributionNext.items;
          puzzleDistribution = { ...puzzleDistribution, ...puzzleDistributionNext };
          if(fetchedPuzzleDistributionNext.hasNext) {
            await fetchRecursively(fetchedPuzzleDistributionNext.lastItem);
          }
          return;
        }

        if(fetchedPuzzleDistribution.hasNext) {
          await fetchRecursively(fetchedPuzzleDistribution.lastItem);
        }

        const sorted = Object.entries(puzzleDistribution);
        sorted.sort((w1, w2) => w2[1] - w1[1]);
        setTokenData(sorted);
        setLoading(false);
        setError(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    }
    getTokenData();
  }, []);

console.log(tokenData)

  return (
    <Fragment>
      <MainWrapper>

        <PuzzleInfoTitle className="rotate-puzzle">
          <img src={images.puzzleswap} alt="puzzle swap" width="16px" height="16px" />
          <span style={{marginLeft: '4px'}}>$PUZZLE</span>
        </PuzzleInfoTitle>
        <div>

        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: '1rem',
            borderRight: '1px solid #7075e9',
            borderBottom: '1px solid #7075e9',
            borderBottomRightRadius: '10px',
            marginRight: '0.8rem',
            marginLeft: '0.8rem',
            letterSpacing: '2px'
          }}
        >
          <div
            style={{
              width: '5rem',
              backgroundColor: '#7075e9',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              padding: '0.2rem',
              borderBottomRightRadius: '5px'
            }}
          >
            supply
          </div>
          <div 
            style={{
              padding: '0.70rem'
            }}
          >
            479,147 (hard coded) <a href="https://wavesexplorer.com/assets/HEB8Qaw9xrWpWs8tHsiATYGBWDBtP2S7kcPALrMu43AS" style={{color: '#7075e9', fontWeight: 'bold'}}>explorer</a> 
          </div>
        </div>

          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: '1rem',
              borderLeft: '1px solid #7075e9',
              borderBottom: '1px solid #7075e9',
              marginRight: '0.8rem',
              marginLeft: '0.8rem',
              letterSpacing: '2px'
            }}
          >
            <div
              style={{
                width: '5rem',
                backgroundColor: '#7075e9',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                padding: '0.2rem',
                borderBottomRightRadius: '5px'
              }}
            >
              id
            </div>
            <TokenId>
              HEB8Qaw9xrWpWs8tHsiATYGBWDBtP2S7kcPALrMu43AS
            </TokenId>
          </div>

          <div
            style={{
              fontFamily: 'sans-serif',
              fontSize: '1rem',
              borderRight: '1px solid #7075e9',
              borderBottom: '1px solid #7075e9',
              borderBottomRightRadius: '10px',
              marginRight: '0.8rem',
              marginLeft: '0.8rem',
              letterSpacing: '2px'
            }}
          >
            <div
              style={{
                width: '5rem',
                backgroundColor: '#7075e9',
                color: 'white',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                padding: '0.2rem',
                borderBottomRightRadius: '5px'
              }}
            >
              pools
            </div>
            <div 
              style={{
                padding: '0.70rem',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <a href="https://puzzleswap.org/farms1" style={{color: '#7075e9', fontWeight: 'bold'}}>farms1</a> 
              <a href="https://puzzleswap.org/farms2" style={{color: '#7075e9', fontWeight: 'bold'}}>farms2</a> 
              <a href="https://puzzleswap.org/defi" style={{color: '#7075e9', fontWeight: 'bold'}}>defi</a> 
              <a href="https://puzzleswap.org/puzzle" style={{color: '#7075e9', fontWeight: 'bold'}}>puzzle</a> 
            </div>
          </div>

          <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: '1rem',
            borderLeft: '1px solid #7075e9',
            borderBottom: '1px solid #7075e9',
            borderBottomLeftRadius: '10px',
            marginRight: '0.8rem',
            marginLeft: '0.8rem',
            letterSpacing: '2px',
            marginBottom: '2rem'
          }}
        >
          <div
            style={{
              width: '5rem',
              backgroundColor: '#7075e9',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              padding: '0.2rem',
              borderBottomRightRadius: '5px'
            }}
          >
            www
          </div>
          <div 
          style={{
            padding: '0.70rem',
            display: 'flex',
            justifyContent: 'space-between'
          }}
          >
            <a href="https://puzzleswap.org/" style={{color: '#7075e9', fontWeight: 'bold'}}>website</a> 
            <a href="https://twitter.com/puzzle_swap" style={{color: '#7075e9', fontWeight: 'bold'}}>twitter</a> 
            <a href="https://t.me/puzzleswap" style={{color: '#7075e9', fontWeight: 'bold'}}>telegram</a> 
          </div>
        </div>

      </div>
        


        {
          loading ?

            (
              <div style={{width: "100%", height: "130px", textAlign: 'center'}}>
                <img src={images.puzzleswap} className="rotate-token-logo" alt="" style={{borderRadius: "50%"}} width="100px" height="100px" />
              </div>
            ) :

            error ?

            (
              null
            ) :

            (

              <Fragment>


                <PuzzleInfoTitle className="rotate-puzzle" style={{marginTop: '3rem'}}>
                  <img src={images.puzzleswap} alt="puzzle swap" width="16px" height="16px" />
                  <span style={{marginLeft: '4px'}}>TOP $PUZZLE HODLERS</span>
                </PuzzleInfoTitle>


              
                {
                  tokenData.slice(0+(25*(page-1)), 25+(25*(page-1))).map((address, idx) => {
                    return (
                      <TopHolderList key={address[0]}>
                        <div>
                          {(idx+1)+(page-1)*25}_ {`${address[0]} `}
                        </div>
                        <div style={{justifySelf: 'end'}}>
                          {`${helperForInAndOutAmount(address[1]).toFixed(1)}`}
                        </div>
                      </TopHolderList>
                    )
                  })
                }

                <PageList>
                  {
                    new Array(tokenData.length > 250 ? 10 : Math.ceil(tokenData.length / 25)).fill(undefined).map((el, idx) => {
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
            )

        }


      <PuzzleInfoTitle className="rotate-puzzle" style={{marginBottom: '1rem', marginTop: '3rem'}}>
        <img src={images.puzzleswap} alt="puzzle swap" width="16px" height="16px" />
        <span style={{marginLeft: '4px'}}>$PUZZLE NEWS</span>
      </PuzzleInfoTitle>

      <InfoWrapper>
        <Info>
          <h1><a href="https://medium.com/@puzzleswap/puzzle-tokenomics-b08f3bbc42af" style={{textDecoration: 'none', color: 'black'}}>Puzzle Tokenomics</a></h1>
          <a href="https://medium.com/@puzzleswap/puzzle-tokenomics-b08f3bbc42af">
            go to read
          </a>
        </Info>
        <Info>
          <h1><a href="https://medium.com/@puzzleswap/explaining-the-power-of-mega-pools-6f9437b94d5e" style={{textDecoration: 'none', color: 'black'}}>Explaining the power of mega pools</a></h1>
          <a href="https://medium.com/@puzzleswap/explaining-the-power-of-mega-pools-6f9437b94d5e">
            go to read
          </a>
        </Info>
        <Info>
          <h1><a href="https://medium.com/@puzzleswap/liquidity-providing-is-live-at-puzzle-swap-5ffaed38e9f0" style={{textDecoration: 'none', color: 'black'}}>Liquidity providing is live at Puzzle Swap</a></h1>
          <a href="https://medium.com/@puzzleswap/liquidity-providing-is-live-at-puzzle-swap-5ffaed38e9f0">
            go to read
          </a>
        </Info>
        <Info>
          <h1><a href="https://medium.com/@puzzleswap/the-first-defi-mega-pool-on-waves-is-live-90fe120a8217" style={{textDecoration: 'none', color: 'black'}}>The first DeFi mega pool on Waves is live</a></h1>
          <a href="https://medium.com/@puzzleswap/the-first-defi-mega-pool-on-waves-is-live-90fe120a8217">
            go to read
          </a>
        </Info>
        <Info>
          <h1><a href="https://medium.com/@puzzleswap/puzzle-swap-%EF%B8%8F-roadmap-d8629c2dd166" style={{textDecoration: 'none', color: 'black'}}>Puzzle Swap 🗺️ Roadmap</a></h1>
          <a href="https://medium.com/@puzzleswap/puzzle-swap-%EF%B8%8F-roadmap-d8629c2dd166">
            go to read
          </a>
        </Info>
      </InfoWrapper>


      </MainWrapper>

    </Fragment>
  );
}