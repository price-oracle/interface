import { ethers } from 'ethers';
import { useState } from 'react';
import styled from 'styled-components';
import { useNetwork } from 'wagmi';

import {
  Button,
  Card,
  Loading,
  SearchInput,
  SPACING_8,
  TokenIcon,
  Typography,
  MOBILE_MAX_WIDTH,
} from '~/components/shared';
import { Token } from '~/types';
import { getTokenList } from '~/utils/tokenList';

const SCard = styled(Card)`
  width: 20rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin: 0 0 0 1.8rem;
  }
`;

const TokenItem = styled(Button)`
  display: grid;
  grid-template-areas:
    'icon symbol'
    'icon name';
  align-items: center;
  justify-content: left;
  text-align: left;
  grid-column-gap: ${SPACING_8};
  padding: ${SPACING_8};
  width: 100%;
`;

const Icon = styled(TokenIcon)`
  grid-area: icon;
`;

const Symbol = styled(Typography)`
  grid-area: symbol;
`;

const Name = styled(Typography).attrs({
  variant: 'small',
  color: 'secondary',
})`
  grid-area: name;
`;

const TokenListContainer = styled.section`
  max-height: 16rem;
  overflow-y: scroll;
  overflow-x: hidden; /* Hide scrollbars */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  padding: 0.5rem;
`;

interface IProps {
  onSelect: (token: Token) => void;
  className?: string;
}
const TokenList = ({ onSelect, className }: IProps) => {
  const { chain } = useNetwork();
  const isLoading = false;

  const [searchInput, setSearchInput] = useState('');

  const filterTokens = (tokens: Token[]): Token[] => {
    const filteredTokens = tokens.filter((token) => {
      const searchCriteria = [token.address, token.name, token.symbol].join('-').toLowerCase();
      return searchCriteria.includes(searchInput.toLowerCase());
    });

    if (filteredTokens.length === 0 && ethers.utils.isAddress(searchInput)) {
      //TODO: Trigger search token by address get all data, save for the session and only if clicked save to localstorage for later use
    }

    return filteredTokens;
  };

  const tokenList = filterTokens(getTokenList(chain?.id));

  return (
    <SCard>
      <SearchInput onChange={(e) => setSearchInput(e.target.value)} />

      <TokenListContainer className={className}>
        {isLoading && <Loading />}
        {!isLoading &&
          tokenList.map((token) => (
            <TokenItem key={token.symbol} onClick={() => onSelect(token)}>
              <Icon src={token.logoURI} />
              <Symbol>{token.symbol}</Symbol>
              <Name>{token.name}</Name>
            </TokenItem>
          ))}
      </TokenListContainer>
    </SCard>
  );
};

export default TokenList;
