import styled, { css } from 'styled-components';
import Link from 'next/link';
import { color } from '@styles/variables';

const smallModifier = css`
    margin: 0;
    font-size: 3rem;
    transform: translateY(-10%);

    span {
        font-size: 2rem;
    }
`;

const StyledPageTitle = styled.h1`
    font-family: 'Star Jedi', arial;
    cursor: pointer;

    color: ${color.yellow};
    font-size: 6rem;
    line-height: 0.8;
    margin-top: 8rem;
    cursor: 'pointer';

    margin-bottom: 5rem;
    text-align: center;

    span {
        font-size: 5rem;
    }

    ${(props) => !!props.small && smallModifier}
`;

const Logo = ({ small }: { small?: boolean }) => {
    return (
        <Link href="/">
            <StyledPageTitle small={small}>
                <span>Search</span> <br /> WarS
            </StyledPageTitle>
        </Link>
    );
};

export default Logo;
