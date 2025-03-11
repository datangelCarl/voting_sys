
// Register new Voter
//post : api/voters/register
const registerVoter = (req, res, next) => {
    res.json("Registered Voter")
}

// Login Voter
//post : api/voters/login
const loginVoter = (req, res, next) => {
    res.json("Login Voter")
}


// Get Voter
//post : api/voters/:id
const getVoter = (req, res, next) => {
    res.json("Get Voter")
}

module.exports = {registerVoter, loginVoter, getVoter}