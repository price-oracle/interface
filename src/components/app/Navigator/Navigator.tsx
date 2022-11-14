import { useState } from 'react';

import { IconButton, FONT_SIZE_16, SPACING_8, getTheme } from '~/components/shared';
import { useWindowDimensions } from '~/hooks/windowDimensions';
import { useAppSelector } from '~/hooks';
import { List, Item, Nav, IStylesProps, CollapsableList } from './Navigator.styles';

interface INavigatorProps {
  handleClickCloseMenu: () => void;
  handleClickToggleMenu: () => void;
  showMenu: boolean;
  collapseOnMobile: boolean;
}

export const useNavigatorProps = (collapseOnMobile: boolean): INavigatorProps => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClickToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickCloseMenu = () => {
    setShowMenu(false);
  };

  return { showMenu, handleClickToggleMenu, handleClickCloseMenu, collapseOnMobile };
};

type IProps = {
  children: any;
  className?: string;
} & IStylesProps &
  INavigatorProps;

function Navigator({
  children,
  className,
  differenceMixBlend,
  handleClickCloseMenu,
  handleClickToggleMenu,
  showMenu,
  collapseOnMobile = true,
}: IProps) {
  const currentTheme = useAppSelector(({ theme }) => theme.current);
  const theme = getTheme(currentTheme);
  const { isMobile } = useWindowDimensions();

  const list = collapseOnMobile ? (
    <CollapsableList onMouseLeave={handleClickCloseMenu} className={className}>
      {isMobile && (
        <IconButton
          flip={showMenu}
          onClick={handleClickToggleMenu}
          name='chevron-down'
          color={theme.textPrimary}
          fontSize={FONT_SIZE_16()}
          padding={SPACING_8()}
        />
      )}
      {(!isMobile || showMenu) && children}
    </CollapsableList>
  ) : (
    <List onMouseLeave={handleClickCloseMenu} className={className}>
      {children}
    </List>
  );

  return <Nav differenceMixBlend={differenceMixBlend}>{list}</Nav>;
}

export default Navigator;
