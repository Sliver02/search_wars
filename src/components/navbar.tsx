import Searchbar from '@components/searchbar';
import styled, { css } from 'styled-components';
import media from '@styles/mediaQueries';
import Logo from './logo';

const StyledNavbar = styled.div`
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem 2rem;

    ${media.max.md`
        justify-content: center;
        flex-wrap: wrap;
    `}
`;

const Navbar = () => {
    return (
        <StyledNavbar>
            <Logo small />
            <Searchbar small />
        </StyledNavbar>
    );
};

export default Navbar;
