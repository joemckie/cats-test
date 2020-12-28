# Getting Started

1. Install dependencies using `yarn`.
2. Copy `.env.sample` to a file named `.env` and fill in your thecatapi.com API key.
3. Run the project using `yarn start` or `npm start`.
4. Run tests using `yarn test` or `npm test`.

## Dev Notes

* I chose not to use Redux for this. Mainly due to the application's size, but also as Redux comes with a lot of unnecessary boilerplate... plus its main functionality is now built in to React via `useReducer` and the context API. For a larger, more complicated application I would most likely opt to use Redux, as it has better support for async dispatches and memoised selectors (plus the dev tools are great).
* The API key is not hard coded into the application, but rather injected as an environment variable (as defined in the [12 Factor App](https://12factor.net/)).
* Generally for a larger-scale application, I would organise the codebase in a modular fashion (organising based on business need rather than file type). As this application is so small (and will never need to scale), it didn't make sense to architect it like that as it would add confusing boilerplate.
* The main testing strategy here is to focus heavily on integration tests, with unit tests being used for testing complicated logic (which wasn't necessary for this demo). The benefit of focusing on integration tests means your tests are more resilient to refactors as you aren't testing every implementation detail. Generally this means your tests are more efficient so more time can be spent on features.
