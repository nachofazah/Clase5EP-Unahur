// const {
//   HealthcheckerDetailedCheck,
//   HealthcheckerSimpleCheck
// } = require('./healthchecker/healthchecker');

var router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Hello world' })
});

module.exports = router;
