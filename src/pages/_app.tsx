import Particles from '@components/particles';
import { GlobalStyles } from '@styles/globals';
import GlobalContext from '@utils/globalContext';
import { useState } from 'react';

const MyApp = ({ Component, pageProps }) => {
    const [activeFilter, setActiveFilter] = useState('all' as const);
    const [searchResults, setSearchResults] = useState([]);
    const [currentResult, setCurrentResult] = useState({});

    return (
        <GlobalContext.Provider
            value={{
                activeFilter,
                setActiveFilter,
                searchResults,
                setSearchResults,
                currentResult,
                setCurrentResult,
            }}
        >
            <Particles />
            <GlobalStyles />
            <Component {...pageProps} />
        </GlobalContext.Provider>
    );
};

export default MyApp;
