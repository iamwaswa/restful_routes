const EXPRESS = require(`express`);
const BODY_PARSER = require(`body-parser`);
const METHOD_OVERRIDE = require(`method-override`);
const EXPRESS_SANITIZER = require(`express-sanitizer`);
const APP = EXPRESS();

APP.set(`view engine`, `ejs`);
APP.use(EXPRESS.static(`public`));
APP.use(BODY_PARSER.urlencoded({
    extended: true
}));
APP.use(EXPRESS_SANITIZER());
APP.use(METHOD_OVERRIDE(`_method`));

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
    return libraries.length;
}

// SHOW
APP.get(`/libraries/:id`, (req, res) => {

    let clickedLibraryID = Number.parseInt(req.params.id);
    let libraryToShow = getLibraryByID(clickedLibraryID);

    res.render(`show`, {
        library: libraryToShow
    });
});


function getLibraryByID(clickedLibraryID) {
    
    return libraries.reduce((clickedLibrary, currentLibrary) =>
        isIDSame(currentLibrary.id, clickedLibraryID) ? 
            currentLibrary : clickedLibrary, 
            {});
}

function isIDSame(currentLibraryID, clickedLibraryID) {
    return currentLibraryID === clickedLibraryID;
}

// EDIT
APP.get(`/libraries/:id/edit`, (req, res) => {

    let clickedLibraryID = Number.parseInt(req.params.id);
    let libraryToEdit = getLibraryByID(clickedLibraryID);

    res.render(`edit`, {
        libraryToEdit: libraryToEdit
    });
});

// UPDATE
APP.put(`/libraries/:id`, (req, res) => {

    let clickedLibraryID = Number.parseInt(req.params.id);
    let editedLibrary = req.body.library;
    libraries = updateLibrayWithID(clickedLibraryID, editedLibrary);

    res.redirect(`/libraries`);
});

function updateLibrayWithID(clickedLibraryID, editedLibrary) {

    editedLibrary.id = clickedLibraryID;

    return libraries.map((currentLibrary) =>
        isIDSame(currentLibrary.id, clickedLibraryID) ? 
            editedLibrary : currentLibrary
    );
}

// DELETE
APP.delete(`/libraries/:id/delete`, (req, res) => {

    let clickedLibraryID = Number.parseInt(req.params.id);
    libraries = removeLibraryWithID(clickedLibraryID);

    res.redirect(`/libraries`);
});

function removeLibraryWithID(clickedLibraryID) {

    return libraries.filter((currentLibrary) =>
        isIDSame(currentLibrary.id, clickedLibraryID) ? 
            false : true
    );
}

APP.get(`*`, (req, res) => {
    res.redirect(`/libraries`);
});

APP.listen(8080, () => {
    console.log(`Server running on port 8080`);
});