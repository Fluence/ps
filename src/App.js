import './style.css';

import styled from 'styled-components';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { BigNumber } from 'bignumber.js';

import * as images from './assets/images';

import useDataLoader from './useDataLoader';

import { Home } from './Home';
import { Trades } from './Trades';
import { Footer } from './Footer';
import { Header } from './Header';
import { Token } from './Token';
import { Liquidity } from './Liquidity';
import { Puzzle } from './Puzzle';
import { Stats } from './Stats';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.1rem 17rem 2rem 2rem 17rem 0.1rem;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  gap: 1rem;


  @media(max-width: 43.25rem) {
    grid-template-columns: 0.1rem minmax(17rem, 1fr) 0.1rem;
    gap: 0.7rem 0.19rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const PuzzleLink = styled.div`
  grid-column: 1 / -1;
  list-style: none;
  justify-self: end;
  padding: 0.25rem 0;
  border-radius: 0 0 10px 0;
  border: 1px solid #7075e9;
  border-top: 0;
  margin-top: -2rem; 
  @media(max-width: 43.25rem) {
    margin-top: -1.75rem;
  }
`;

function App() {

  const [error, loading, data] = useDataLoader();
  
  function trades24Hours() {
    const current = Date.now();

    const trades =  data.transactions.exchange.filter(tx => {
      return 24*60*60*1000 >= (current - tx.timestamp);
    });
    const tradesPool1 =  data.transactions.pool1.filter(tx => {
      return 24*60*60*1000 >= (current - tx.timestamp);
    });
    const tradesPool2 =  data.transactions.pool2.filter(tx => {
      return 24*60*60*1000 >= (current - tx.timestamp);
    });
    const tradesPool3 =  data.transactions.pool3.filter(tx => {
      return 24*60*60*1000 >= (current - tx.timestamp);
    });
    const tradesPool4 =  data.transactions.race.filter(tx => {
      return 24*60*60*1000 >= (current - tx.timestamp);
    });

    let tradedTokens = {};
    let tradedPairs = {};
    let tradedAmounts = {};
    
    trades.forEach(trade => {
      if(!(trade.from in tradedAmounts)) {
        tradedAmounts[trade.from] = trade.in;
      }
      if(!(trade.to in tradedAmounts)) {
        tradedAmounts[trade.to] = trade.out;
      }
      if(trade.from in tradedAmounts) {
        tradedAmounts[trade.from] = BigNumber(trade.in).plus(tradedAmounts[trade.from]).toString();
      }
      if(trade.to in tradedAmounts) {
        tradedAmounts[trade.to] = BigNumber(trade.out).plus(tradedAmounts[trade.to]).toString();
      }
    });

    trades.forEach(trade => {
      if(trade.from in tradedTokens) {
        tradedTokens[trade.from]++;
      } else {
        tradedTokens[trade.from] = 1;
      }
      if(trade.to in tradedTokens) {
        tradedTokens[trade.to]++;
      } else {
        tradedTokens[trade.to] = 1;
      }


      if( (`${trade.from} - ${trade.to}` in tradedPairs) || (`${trade.to} - ${trade.from}` in tradedPairs) ) {
        tradedPairs[`${trade.from} - ${trade.to}`] ? tradedPairs[`${trade.from} - ${trade.to}`]++ : tradedPairs[`${trade.to} - ${trade.from}`]++;
      } else {
        tradedPairs[`${trade.from} - ${trade.to}`] = 1;
      }
    });

    tradedTokens = Object.entries(tradedTokens).sort((tokenA, tokenB) => {
      return tokenB[1] - tokenA[1];
    });

    tradedPairs = Object.entries(tradedPairs).sort((tokenA, tokenB) => {
      return tokenB[1] - tokenA[1];
    });

    return { 
      number: trades.length, 
      tokens: tradedTokens, 
      pairs: tradedPairs, 
      amounts: tradedAmounts, 
      numberPool1: tradesPool1.length, 
      numberPool2: tradesPool2.length, 
      numberPool3: tradesPool3.length, 
      numberPool4: tradesPool4.length 
    };
  }

  let tradesInLastTwentyFourHours;
  if(data.transactions.length !== 0) {
    tradesInLastTwentyFourHours = trades24Hours();
  }
  
  return (
    <div>


    {
      loading ? 

        (
          <div style={{overflow: 'hidden'}}>
            <div className="loading-rotate" style={{width: "100vw", height: "100vh", display: 'grid', alignContent: "center"}}>
              <img src={images.puzzleswap} className="left-puzzle" alt="" width="32px" />
              <img src={images.puzzleswap} className="right-puzzle" alt="" width="32px" />
            </div>
          </div>
        ) : 

        error ? 

        (
          <div style={{overflow: 'hidden'}}>
            <h1 className="error-title">error occurred, sorry ser!</h1>
            <div className="error-loading-rotate" style={{width: "100vw", height: "100vh", display: 'grid', alignContent: "center"}}>
              <img src={images.puzzleswap} className="error-left-puzzle" alt="" width="32px" />
              <img src={images.puzzleswap} className="error-right-puzzle" alt="" width="32px" />
            </div>
          </div>
        ) :

        (
          <Router>
         
            <Wrapper>
          
              <Header />

              <PuzzleLink className="rotate-puzzle">
                {/* <span style={{fontSize: '0.8rem', paddingRight: '1rem', paddingLeft: '-1rem', color: 'red'}}>doesn't reflect any changes after 2.12.2021</span> */}
                <a href="https://puzzleswap.org/" style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.8rem', color: '#7075e9'}}>
                  <img src={images.puzzleswap} alt="puzzle swap" width="15px" height="15px" />puzzleswap
                </a>
              </PuzzleLink>

              <Switch>

                <Route path="/" exact>
                  <Home data={data} tradesInLastTwentyFourHours={tradesInLastTwentyFourHours} />
                </Route>

                <Route path="/trades" exact>
                  <Trades data={data} />
                </Route>

                <Route path="/liquidity" exact>
                  <Liquidity liquidityAddings={data.liquidityAddings} />
                </Route>

                <Route path="/tokens/:token" exact>
                  <Token data={data} />
                </Route>

                <Route path="/puzzle" exact>
                  <Puzzle />
                </Route>

                <Route path="/stats" exact>
                <Stats data={data} tradesInLastTwentyFourHours={tradesInLastTwentyFourHours} />
              </Route>

              </Switch>
              
              <Footer />

            </Wrapper> 
          
          </Router>
        )
    }

    </div>
  );



}

export default App;