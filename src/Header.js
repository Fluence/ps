import './style.css';

import * as images from './assets/images';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

const HeaderWrapper = styled.ul`
  grid-column: 1 / -1;
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding: 1.25rem 1rem;
  border-radius: 10px;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  border: 1px solid #7075e9;
  position: relative;

  @media(max-width: 35.6rem) {
    justify-content: space-between;
    padding: 1.25rem 0.5rem;
  }
`;

export function Header() {
  return (
    <HeaderWrapper>
      <li style={{cursor: 'pointer', letterSpacing: '2px', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.9em'}}>
        <Link to="/" className="header-menu">
          HOME
        </Link>
      </li>

      <li style={{cursor: 'pointer', letterSpacing: '2px', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.9em'}}>
        <Link to="/trades" className="header-menu">
          TRADES
        </Link>
      </li>

      <li style={{cursor: 'pointer', letterSpacing: '2px', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.9em'}}>
        <Link to="/liquidity" className="header-menu">
          LIQUIDITY
        </Link>
      </li>

      {/*<li style={{cursor: 'pointer', letterSpacing: '2px', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.9em'}}><Link to="/liquidity" className="header-menu">LIQUIDITY</Link></li>*/}

      {/*<li style={{letterSpacing: '2px', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.9em', position: 'relative'}}>
        LIQUIDITY
        <small style={{position: 'absolute', top: '-0.75rem', right: '-30px'}}>soon</small>
      </li>*/}

      <li style={{cursor: 'pointer', letterSpacing: '2px', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.9em'}}>
        <Link to="/stats" className="header-menu">
          STATS
        </Link>
      </li>
      <li style={{cursor: 'pointer', letterSpacing: '2px', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.9em'}}>
        <Link to="/aggregator" className="header-menu">
          AGGREGATOR
        </Link>
      </li>
      <li style={{cursor: 'pointer', letterSpacing: '2px', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '0.9em'}}>
        <Link to="/puzzle" className="header-menu">
          PUZZLE
        </Link>
      </li>
    </HeaderWrapper>
  )
}