require('isomorphic-fetch')
require('dotenv').config()

const { stateLookup, headers } = require('./utils')
const Pol = require('../../api/pol/Pol')

function getSenators() {
  return fetch('https://api.propublica.org/congress/v1/115/senate/members.json', { headers })
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(res => (
      res.results[0].members.map(senator => ({
        ...senator,
        st: stateLookup[senator.state],
        id: null,
        chamber: 'senate'
      }))
    ))
    .catch(err => console.log(err))
}

function getRepresentatives(senators) {
  return fetch('https://api.propublica.org/congress/v1/115/house/members.json', { headers })
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(res => ([
      ...senators,
      ...res.results[0].members.map(rep => ({
        ...rep,
        st: stateLookup[rep.state],
        district: parseInt(rep.district) || null,
        id: null,
        chamber: 'house'
      }))
    ]))
    .catch(err => console.log(err))
}

function insertPolsIntoDB(pols) {
  return Promise.all(pols.map(polit => {
    try {
      new Pol(polit).save()
    } catch(err) {
      console.warn(err)
    }
  }))
}

function finish(polRecords) {
  process.exit
}

getSenators()
  .then(getRepresentatives)
  .then(insertPolsIntoDB)
  .then(finish)
  .catch(err => console.log(err))
