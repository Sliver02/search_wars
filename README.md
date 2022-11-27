# Coding Assignment
The goal of this assignment is to build a small React application that lets you search and display information from the Star Wars movies (no knowledge of SW is required). The data needed will be queried from [SWAPI (Star Wars API)](https://swapi.dev/) which is an open testing API.

## Overview
The app should consist of a front page with a centered search box where you can type a search string and get matching results. Clicking on a result should route to a new page with the search box on top and details about the query underneath.

### Searching
The search box will be used to query information about people, planets, starships and vehicles. Beneath the search box there should be five radio buttons:
* All (default)
* People
* Planets
* Starships
* Vehicles

You should use the existing `/search` endpoints for each category (see: https://swapi.dev/documentation#search).
The default behaviour (All) should be to query all four search endpoints and display all results.

### Search results
The search result page should have the whole search form at the top and the list with results beneath it (much like any other search engine, like google or duckduckgo).
Combined results (`All` selected) should be ordered by category whith the category with most results appearing at the top.

Each result entry should be listed with it's `name` property taken from the result plus a list of the films in which it appears (provided in the result).


### SWAPI
The [SWAPI](https://swapi.dev/) API is a free service and has a 10,000 requests per day rate limiting. Please make sure you don't abuse it.
Note that in some of the results the URLs returned start with `http` which is wrong and should be modified to `https` for them to work, make sure you handle this correctly.

### Next.js
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.