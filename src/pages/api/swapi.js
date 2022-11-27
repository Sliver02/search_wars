const repo_search_endpoint = 'https://swapi.dev/api/';
const search_param = '/?search=';

export const searchStars = async (searchTerm, filters) => {
    const results = await Promise.all(
        filters.map((filter) => {
            const searchQuery = repo_search_endpoint + filter + search_param + searchTerm;

            return fetch(searchQuery)
                .then((res) => res.json())
                .then((data) => {
                    data['category'] = filter;
                    return data;
                })
                .catch((error) => {
                    console.error(error);
                    return [];
                });
        })
    );

    return results;
};

export const searchWars = async (querys) => {
    const results = await Promise.all(
        querys.map((search) => {
            let searchQuery = search;

            if (Array.isArray(search)) {
                searchQuery = repo_search_endpoint + search.join('/');
            }

            return fetch(searchQuery)
                .then((res) => res.json())
                .then((data) => {
                    data['category'] = search[0];

                    return data;
                })
                .catch((error) => {
                    console.error(error);
                    return [];
                });
        })
    );

    return results;
};
