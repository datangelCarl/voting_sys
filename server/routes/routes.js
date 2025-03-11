const {Router} = require("express")
const { registerVoter, loginVoter, getVoter } = require("../controllers/voterController")

const router = Router()

//register, login voter route
router.post('/voters/register', registerVoter)
router.post('/voters/login', loginVoter)
router.post('/voters/:id', getVoter)


router.post('/elections', addElection)
router.get('/elections', getElections)
router.get('/elections/:id', getElection)
router.delete('/elections/:id', removeElection)
router.patch('/elections/:id', updateElection)
router.get('/elections/:id/candidates', getElectionCandidates)
router.get('/elections/:id/voters', getElectionVoters)

module.exports=router