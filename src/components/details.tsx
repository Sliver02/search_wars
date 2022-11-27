import { searchWars } from '@pages/api/swapi';
import { capitalizeFirstLetter } from '@utils/utility';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const Name = styled.h2`
    font-family: 'Star Jedi', arial;
    font-size: 3rem;
`;
const Category = styled.span`
    font-size: 0.8rem;
`;
const Features = styled.div`
    padding: 3rem 1rem;
`;
const FiledTitle = styled.h3`
    margin-bottom: 0.5rem;
`;
const Field = styled.div`
    margin-bottom: 1rem;
`;
const StyledDetails = styled.div`
    max-width: 60rem;
    width: 100%;
    margin: auto;
`;

const Details = ({ data }) => {
    const { name, films, category } = data;
    const [loading, setLoading] = useState(false);
    const [filmsData, setFilmsData] = useState([]);

    useEffect(() => {
        if (films.length >= 1) {
            setLoading(false);
            searchWars(films).then((result) => {
                setFilmsData(result);
                setLoading(true);
            });
        }
    }, [films]);

    return (
        <StyledDetails>
            {!!loading && (
                <>
                    <Category>{category}</Category>
                    <Name>{name}</Name>
                    <Features>
                        {films.length >= 1 && (
                            <Field>
                                <FiledTitle>Film appearances</FiledTitle>{' '}
                                {filmsData.map((film) => film.title).toString()}
                            </Field>
                        )}
                        {Object.keys(data).map((key, i) => {
                            if (
                                key === 'edited' ||
                                key === 'created' ||
                                key === 'url' ||
                                key === 'surface_water' ||
                                key === 'category'
                            ) {
                                return;
                            } else {
                                const detail = data[key].toString();
                                const normKey = capitalizeFirstLetter(key.replace(/_/g, ' '));

                                return (
                                    !!detail &&
                                    !detail.includes('https') && (
                                        <Field key={i}>
                                            <FiledTitle>{normKey}</FiledTitle> {detail}
                                        </Field>
                                    )
                                );
                            }
                        })}
                    </Features>
                </>
            )}
        </StyledDetails>
    );
};

export default Details;
