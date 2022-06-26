import styled from 'styled-components';

const HeaderWrapper = styled.ul`
  grid-column: 1 / -1;
  display: flex;
  list-style: none;
  justify-content: space-around;
  padding: 1.25rem 1rem;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid #7075e9;
  position: relative;

  @media(max-width: 35.6rem) {
    justify-content: space-between;
    padding: 1.25rem 0.5rem;
    flex-wrap: wrap;
  }
`;

export function Footer() {
  return (
    <HeaderWrapper>
      <li><a className="footer-link" href="https://puzzleswap.org/trade">Trade</a></li>
      <li><a className="footer-link" href="https://puzzleswap.org/invest">Invest</a></li>
      <li><a className="footer-link" href="https://puzzleswap.org/stake">Stake</a></li>
    </HeaderWrapper>
  )
}