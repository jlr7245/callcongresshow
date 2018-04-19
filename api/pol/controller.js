const Pol = require('./Pol')

module.exports = {
  index(req, res, next) {
    Pol.findAll()
      .then(allPol => {
        res.locals.data.pol = allPol
        return next()
      })
      .catch(next)
  },
  state(req, res, next) {
    const { state } = req.params
    Pol.state(state)
      .then(statePols => {
        res.locals.data.polsForState = statePols
        return next()
      })
      .catch(next)
  } 
}
