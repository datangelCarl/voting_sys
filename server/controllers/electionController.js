// Add new Election 
//post : api/elections
//only admin
const addElection = (req, res, next) => {
    res.json("Add Election")
}

// Add new Election 
//get : api/elections
//only admin
const getElections = (req, res, next) => {
    res.json("Get all Elections")
}


//get election by id
//get : api/elections/:id
const getElection = (req, res, next) => {
    res.json("Get Election by ID")
}

//get election candidates by id
//get : api/elections/:id/candidates
const getElectionCandidates = (req, res, next) => {
    res.json("Get Election candidates by ID")
}

//get election voters by id
//get : api/elections/:id/voters
const getElectionVoters = (req, res, next) => {
    res.json("Get Election voters by ID")
}


//update election by id
//patch : api/elections/:id
const updateElection = (req, res, next) => {
    res.json("Update Election by ID")
}

//delete election by id
//delete : api/elections/:id
const removeElection = (req, res, next) => {
    res.json("Delete Election by ID")
}

module.exports = {addElection, getElections, getElection, getElectionCandidates, getElectionVoters, updateElection, removeElection}