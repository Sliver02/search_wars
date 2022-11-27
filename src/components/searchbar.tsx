import { color } from '@styles/variables';
import styled, { css } from 'styled-components';
import { useState, useEffect, useContext, useRef } from 'react';
import GlobalContext from '@utils/globalContext';
import { useDebounce } from '@utils/hooks/useDebaunce';
import { searchStars } from '@pages/api/swapi';
import Link from 'next/link';
import { getId } from '@utils/utility';
import media from '@styles/mediaQueries';

const Search = styled.div`
    ${(props) =>
        props.isActive &&
        css`
            &:before {
                transform: scaleY(1.1) scaleX(1.05);
            }
        `}
`;
const Resultsbox = styled.div``;
const Category = styled.div``;
const CategoryTitle = styled.h4``;
const Result = styled.div``;

const Icon = styled.button``;
const Textbox = styled.input.attrs({
    type: 'text',
    placeholder: 'Search..',
})``;

const Filters = styled.div``;
const RadioButton = styled.div``;

const smallModifer = css`
    max-width: none;
    width: auto;
    flex: wrap;
    min-width: auto;
    height: fit-content;
    flex-direction: row;
    flex-wrap: wrap;

    ${media.min.md`
        margin: 0;
        margin-left: 3rem;
        flex-wrap: nowrap;
        flex-direction: row-reverse;
    `}

    ${Search} {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        min-width: 20rem;

        ${Textbox} {
            font-size: 1rem;
        }

        ${Icon} {
            right: 0.5rem;
            padding: 0.5rem;

            .material-icons {
                font-size: 1.5rem;
            }
        }
    }

    ${Resultsbox} {
        position: absolute;
        left: 0;
        top: 9rem;
        margin-top: 0;
        background: ${color.black};
        border: 1px solid ${color.gray};
        padding: 1rem;
        min-width: 100%;
        max-height: 20rem;
        overflow: scroll;

        ${media.min.md`
            top: 5rem;
            min-width: 20rem;
        `};

        ${Category} {
            margin-bottom: 2rem;

            ${CategoryTitle} {
                padding-bottom: 0.5rem;
                border-bottom: 1px solid ${color.white};
            }

            ${Result} {
                margin-top: 1rem;
                display: flex;
                flex-direction: column;

                a {
                    display: block;
                    font-size: 1.2rem;
                }

                span {
                    margin-top: 0.2rem;
                    color: ${color.gray};
                }
            }
        }
    }

    ${Filters} {
        width: auto;
        font-size: 0.8rem;

        ${media.min.md`
            flex-wrap: nowrap;
            margin-left: 2rem;
        `}
    }
`;

const StyledSearchbar = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    align-items: center;

    width: 100%;

    max-width: 30rem;
    min-width: 20rem;

    ${Search} {
        position: relative;
        height: fit-content;
        display: flex;
        align-items: center;
        width: 100%;

        &:before {
            content: '';
            position: absolute;
            width: 100%;

            border: 2px solid ${color.gray};
            border-radius: 2rem;
            transition: transform 0.5s;
            top: 0;
            bottom: 0;
        }

        ${Textbox} {
            position: relative;
            background: transparent;
            color: ${color.white};

            padding: 0.8rem 1.8rem;
            padding-right: 3.5rem;
            font-size: 1.2rem;

            width: 100%;

            &:active,
            &:focus {
                outline: none;
            }
        }

        ${Icon} {
            position: absolute;
            right: 0.5rem;
            padding: 0.8rem;

            cursor: pointer;
            background: transparent;
            color: ${color.white};

            transition: transform 0.2s;

            .material-icons {
                font-size: 1.8rem;
            }
        }
    }

    ${Resultsbox} {
        margin-top: 2rem;
        width: 100%;

        ${Category} {
            margin-bottom: 2rem;

            ${CategoryTitle} {
                padding-bottom: 0.5rem;
                border-bottom: 1px solid ${color.white};
            }

            ${Result} {
                margin-top: 1rem;
                display: flex;
                flex-direction: column;

                a {
                    display: block;
                    font-size: 1.2rem;
                }

                span {
                    margin-top: 0.2rem;
                    color: ${color.gray};
                }
            }
        }
    }

    ${Filters} {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 1rem;
        width: 100%;

        ${RadioButton} {
            display: flex;
            margin-bottom: 1.2rem;

            + ${RadioButton} {
                margin-left: 1.2rem;
            }

            input,
            label {
                cursor: pointer;
            }

            label {
                padding-left: 0.5rem;
            }
        }
    }

    ${(props) => !!props.small && smallModifer}
`;

const Searchbar = ({ small }: { small?: boolean }) => {
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const textBoxRef = useRef(null);

    const { activeFilter, setActiveFilter, searchResults, setSearchResults } =
        useContext(GlobalContext);

    const filters = ['all', 'people', 'planets', 'starships', 'vehicles'];
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const handleClick = () => {
        setSearchTerm('');
        setSearchResults([]);
        setLoading(false);
        textBoxRef.current.value = '';
    };

    useEffect(() => {
        if (!!debouncedSearchTerm) {
            setLoading(false);

            filters.shift();
            const currentFilters = activeFilter === 'all' ? filters : [activeFilter];

            searchStars(debouncedSearchTerm, currentFilters).then((results) => {
                setLoading(true);

                const currentResults = results.filter((result) => result.count >= 1 && result);

                currentResults.sort((a, b) => (a.count < b.count ? 1 : b.count < a.count ? -1 : 0));

                setSearchResults(currentResults);
            });
        } else {
            setSearchResults([]);
            setLoading(false);
        }
    }, [debouncedSearchTerm, activeFilter]);

    return (
        <StyledSearchbar small={small}>
            <Filters>
                {filters.map((filter, i) => (
                    <RadioButton key={i}>
                        <input
                            type="radio"
                            id={filter}
                            name={filter}
                            value={filter}
                            checked={activeFilter === filter}
                            onChange={() => setActiveFilter(filter)}
                        />
                        <label htmlFor={filter}>{filter}</label>
                    </RadioButton>
                ))}
            </Filters>
            <Search {...{ isActive }}>
                <Textbox
                    ref={textBoxRef}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Icon>
                    <i className="material-icons">search</i>
                </Icon>
            </Search>
            {!!loading && searchResults.length >= 1 && (
                <Resultsbox>
                    {searchResults.map((data, i) => (
                        <Category key={i}>
                            <CategoryTitle>
                                ({data.count}) {data.category}
                            </CategoryTitle>
                            {data.results.map((result, i) => (
                                <Result key={i}>
                                    <div onClick={handleClick}>
                                        <Link href={`/${data.category}/${getId(result.url)}`}>
                                            {result.name}
                                        </Link>
                                    </div>
                                    <span>
                                        appears in film:{' '}
                                        {result.films.map(
                                            (film, i) =>
                                                getId(film) +
                                                (result.films.length - 1 > i ? ', ' : '')
                                        )}
                                    </span>
                                </Result>
                            ))}
                        </Category>
                    ))}
                </Resultsbox>
            )}
        </StyledSearchbar>
    );
};

Searchbar.defaultProps = {
    small: false,
};

export default Searchbar;
