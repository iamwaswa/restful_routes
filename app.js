const EXPRESS         = require(`express`);
const BODY_PARSER     = require(`body-parser`);
const METHOD_OVERRIDE = require(`method-override`);
const APP             = EXPRESS();

APP.set(`view engine`, `ejs`);
APP.use(EXPRESS.static(`public`));
APP.use(BODY_PARSER.urlencoded({ extended: true }));

let libraries = [{
        id: 0,
        name: `Coquitlam Public Library`,
        location: `Coquitlam`,
        rating: 4,
        description: `The finest library in Coquitlam`
    },
    {
        id: 1,
        name: `Vancouver Public Library`,
        location: `Vancouver`,
        rating: 5,
        description: `Vancouver has never seen a better library`
    },
    {
        id: 2,
        name: `Burnaby Public Library`,
        location: `Burnaby`,
        rating: 3,
        description: `When you are in Burnaby you have to check out this library`
    }
];


// INDEX
APP.get(`/libraries`, (req, res) => {
    res.render(`index`, {
        libraries: libraries
    });
});

// NEW
APP.get(`/libraries/new`, (req, res) => {
    res.render(`new`);
});

// CREATE
APP.post(`/libraries`, (req, res) => {
    let newLibrary = req.body.library;
    newLibrary.id = getNextID();
    libraries.push(newLibrary);
    res.redirect(`/libraries`);
});

function getNextID() {
    let maxID = libraries.reduce((nextID, library) => 
        nextID < library.id ? library.id : nextID, 0);
    return ++maxID;
}

// SHOW
APP.get(`/libraries/:id`, (req, res) => {
    let clickedLibraryID = Number.parseInt(req.params.id);
    let libraryToShow = libraries.reduce( (clickedLibrary, currentLibrary) => {
        return currentLibrary.id === clickedLibraryID ? currentLibrary : clickedLibrary;
    }, {});
    
    res.render(`show`, {library: libraryToShow});
});

// EDIT
APP.get(`/libraries/:id/edit`, (req, res) => {

});

// UPDATE
APP.put(`/libraries/:id`, (req, res) => {

});

// DELETE
APP.delete(`/libraries/:id/delete`, (req, res) => {

});

APP.get(`*`, (req, res) => {
    res.redirect(`/libraries`);
});

APP.listen(8080, () => {
    console.log(`Server running on port 8080`);
});