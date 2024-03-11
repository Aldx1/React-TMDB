# React-TMDB
A single-page application which gets genres and movie titles from The Movie Database.

Initially the page loads with the most popular movies, which can be changed with the genre links or the search bar, both located in the top header bar. 
The page can be reset to load popular movies by clicking on the TMDB logo in the top left or searching for an empty value in the text field. 

The page will continue to load movies (if more are available) when the user scrolls to the bottom of the current list using API pagination. 

https://www.loom.com/share/76588e9442c04019897903cc9f585e2f?sid=e8f75c6a-0313-413e-b321-2d54162f7137

To clone and run this application you need to get an Authorisation token from The Movie Database. 
Getting this token is quick and free (depending on intended use) and can be done here: https://www.themoviedb.org/login

Once you have a token you can either 
  1. Create a ".env" file in the top-level folder and add the line below (replace YOUR_AUTH_TOKEN with the authorisation token you receive from TMDB)
      
      TMDB_AUTH_TOKEN="YOUR_AUTH_TOKEN"

  2. Paste the token directly into the header objects, located in useFetch.ts and useMovieFetch.ts, both located in src\customHooks\

      ```useMovieFetch.ts
      const axiosHeaders = {
        accept: "application/json",
        Authorization: "YOUR_AUTH_TOKEN",
      };
      ```

      ```useFetch.ts
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "YOUR_AUTH_TOKEN",
        },
      };
      ```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
