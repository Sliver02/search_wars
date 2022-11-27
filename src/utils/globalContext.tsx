import { createContext } from 'react';

interface IGlobalContext {
    activeFilter?: 'all' | 'people' | 'planets' | 'starships' | 'vehicles';
    setActiveFilter?: (string) => void;
    searchResults?: any[];
    setSearchResults?: ([]) => void;
    currentResult?: {};
    setCurrentResult?: ({}) => void;
}

const GlobalContext = createContext<IGlobalContext>({});

export default GlobalContext;
