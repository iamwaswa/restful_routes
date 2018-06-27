const EXPRESS         = require(`express`);
const BODY_PARSER     = require(`body-parser`);
const METHOD_OVERRIDE = require(`method-override`);
const APP             = EXPRESS();

APP.set(`view engine`, `ejs`);
APP.use(EXPRESS.static(`public`));
APP.use(BODY_PARSER.urlencoded({ extended: true }));

const LIBRARIES = [{
        id: generateRandomIntegerID(),
        name: `Coquitlam Public Library`,
        location: `Coquitlam`,
        rating: 4
    },
    {
        id: generateRandomIntegerID(),
        name: `Vancouver Public Library`,
        location: `Vancouver`,
        rating: 5
    },
    {
        id: generateRandomIntegerID(),
        name: `Burnaby Public Library`,
        location: `Burnaby`,
        rating: 3
    }
];

function generateRandomIntegerID() {
    return Number.parseInt(Math.random() * 10000);
}

// INDEX
APP.get(`/libraries`, (req, res) => {
    res.render(`index`, {
        libraries: LIBRARIES
    });
});

// NEW
APP.get(`/libraries/new`, (req, res) => {
    res.render(`new`);
});

// CREATE
APP.post(`/libraries`, (req, res) => {
    let newLibrary = req.body.library;
    newLibrary.id = generateRandomIntegerID();
    LIBRARIES.push(newLibrary);
    res.redirect(`/libraries`);
});

// SHOW
APP.get(`/libraries/:id`, (req, res) => {

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