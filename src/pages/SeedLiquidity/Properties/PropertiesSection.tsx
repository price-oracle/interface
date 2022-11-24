import { useState } from 'react';
import styled from 'styled-components';

import Dropdown from '~/components/shared/Dropdown';
import {
  Typography,
  Loading,
  Icon,
  SPACING_16,
  MOBILE_MAX_WIDTH,
  SPACING_12,
  SPACING_8,
  SPACING_768,
  InputNumber,
  FONT_SIZE_20,
} from '~/components/shared';
import PropertyCard from './PropertyCard';
import FeeCard from './FeeCard';
import { FeeTier } from '~/types/FeeTiers';
import { getConfig } from '~/config';
import { Token } from '~/types/Token';
import BigNumber from 'bignumber.js';

const Container = styled.section`
  display: grid;
  grid-area: set-starting-price;
  grid-column-gap: ${SPACING_16};
  grid-template-columns: repeat(3, 1fr);
  max-width: ${SPACING_768};
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SDropdownModal = styled(Dropdown.Modal)`
  column-gap: ${SPACING_16};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: ${SPACING_12} 0;
  padding: ${SPACING_16};
  row-gap: ${SPACING_16};
  transform: translateX(-45%);
  border: ${(props) => props.theme.border};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-left: 10.5rem;
    row-gap: ${SPACING_8};
    column-gap: ${SPACING_8};
    padding: ${SPACING_8};
  }
`;

const Suffix = styled(Typography).attrs({
  color: 'disabled',
  variant: 'small',
})`
  margin-left: 2px;
`;

const SInputNumber = styled(InputNumber)`
  width: 100%;
  font-size: ${FONT_SIZE_20};
  grid-area: value;
  line-height: 1.25;
`;

interface PropertiesSectionProps {
  selectedToken: Token | undefined;
  startingPrice: BigNumber;
  setStartingPrice: (newPrice: BigNumber) => void;
}

function PropertiesSection({ selectedToken, startingPrice, setStartingPrice }: PropertiesSectionProps) {
  const dropdownProps = Dropdown.useProps();

  const FEE_TIERS = getConfig().FEE_TIERS;

  const defaultFee = FEE_TIERS['0_3%'];

  const [selectedFee, setSelectedFee] = useState<FeeTier>(defaultFee);

  const feeTierList = Object.values(FEE_TIERS);

  const isLoading = false;

  const setNewFee = (fee: FeeTier) => {
    dropdownProps.setShow(false);
    setSelectedFee(fee);
  };

  const onPriceChange = (newPrice: string) => {
    setStartingPrice(new BigNumber(newPrice));
  };
  const startingPriceInput = InputNumber.useProps({ initialValue: startingPrice.toString(), onChange: onPriceChange });

  return (
    <Container>
      <PropertyCard>
        <PropertyCard.Title>Set starting price</PropertyCard.Title>
        <PropertyCard.Value>
          <SInputNumber {...startingPriceInput} />
        </PropertyCard.Value>
        <PropertyCard.Helper />
      </PropertyCard>

      <PropertyCard>
        <PropertyCard.Title>Rate</PropertyCard.Title>
        <PropertyCard.Value>
          1 <Suffix>ETH</Suffix>
          <Icon name='arrow-down' /* color={disabled} */ rotate={270} />
          {startingPriceInput.value} <Suffix>{selectedToken?.symbol || ''}</Suffix>
        </PropertyCard.Value>
      </PropertyCard>

      <PropertyCard>
        <PropertyCard.Title>Fee Tier</PropertyCard.Title>

        <PropertyCard.Value>
          {isLoading && <Loading />}

          {!isLoading && (
            <Dropdown {...dropdownProps}>
              <Dropdown.Button>{selectedFee.label}</Dropdown.Button>
              <SDropdownModal>
                {feeTierList.map((fee) => (
                  <FeeCard onClick={() => setNewFee(fee)} key={fee.fee}>
                    <FeeCard.FeePercentage>{fee.label}</FeeCard.FeePercentage>
                    {fee.created || <FeeCard.UsagePercentage>not created</FeeCard.UsagePercentage>}
                    <FeeCard.Hint>{fee.hint}</FeeCard.Hint>
                  </FeeCard>
                ))}
              </SDropdownModal>
            </Dropdown>
          )}
        </PropertyCard.Value>

        <PropertyCard.Helper />
        {!isLoading && <PropertyCard.Chip>{selectedFee.hint}</PropertyCard.Chip>}
      </PropertyCard>
    </Container>
  );
}

export default PropertiesSection;
