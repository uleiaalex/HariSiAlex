module.exports = (app) => {
    const groups = require('../controllers/group.controller.js');

    app.get('/group/owned/:author_id', groups.GetOwnedGroups);
    app.get('/group/entered/:user_id', groups.GetEnteredGroups);
   
}