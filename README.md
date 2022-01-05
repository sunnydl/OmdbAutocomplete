# autocomplete-omdb

### Prerequisite
* [Node.js](https://nodejs.org/en/download/)
* [Omdb API key](http://www.omdbapi.com/)

### Basic Instruction
1. Clone/download the project folder in your local machine
2. Create a `.env` file in `/server` folder, and enter your [Omdb API key](http://www.omdbapi.com/) in it as `OMDB_API_KEY = YOUR_API_KEY`
3. Open two terminals, one within `/client` and another one within`/server`
4. Do following in both terminal to install the dependencies
```
npm install
```
5. In the terminal within `/server`, run the backend with the following command
```
npm run dev
```
6. In the terminal within `/client`, run the frontend with the following command
```
npm start
```
7. Open `http://localhost:3000/` on your browser and you should see the component being rendered and ready to use.

### Testing
From project root folder
```
cd client
npm test
```

### Component structure

![Blank diagram](https://user-images.githubusercontent.com/56567343/148298736-04d7f968-fe9b-469b-8ffb-671b99223e21.png)

### File Structure
```
./                        
|- ...
|- client/                # -> Front end
    |- src/
        |- components/
                |-  Autocomplete
                        |- Custom-hooks
                                | -useClickHook.js             # Custom hooks for handling user clicking events
                        |- SearchBar
                                |- AutocompleteSearch
                                          |- InputField.jsx    # User input field
                                          |- Suggestions.jsx   # Movie suggestions
                                          |- index.jsx
                                |- Pills.jsx                   # Pills that appear on the left of searchBar
                                |- index.jsx
                        |- Autocomplete.test.js                # Testings for the component
                        |- index.jsx           
                        |- index.css
        |- App.jsx                                             # frontend app start point
        |- ...
    |- ...
|- server/                 # -> Back end
    |- index.ts                 # main file/server
    |- omdbAPI/                 # custom functions for calling omdbAPI
    |- routes/                  # Rest endpoint Routes
    |- controllers/             # Rest endpoint controllers
    |- services/                # functions folder for handling business logic
    |- .env                     # file for storing API key
```
