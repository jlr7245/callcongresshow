const db = require('../../db/config')
const { modelUtils, modelStatics } = require('../utils')
const schema = require('./PolSchema')

function Pol({ id = null, first_name, middle_name, last_name, gender, st, district = null, party, chamber }) {
  this.id = this._validate(id, 'id')
  this.first_name = this._validate(first_name, 'first_name')
  this.middle_name = this._validate(middle_name, 'middle_name')
  this.last_name = this._validate(last_name, 'last_name')
  this.gender = this._validate(gender, 'gender')
  this.st = this._validate(st, 'st')
  this.district = this._validate(district, 'district')
  this.party = this._validate(party, 'party')
  this.chamber = this._validate(chamber, 'chamber')
}

const polStatics = modelStatics(db, 'pols')
polStatics.fuzzy = (search) => (
  db.manyOrNone(`
    SELECT * FROM pols
    WHERE st LIKE %$1%
  `, search)
)
polStatics.state = (state) => (
  db.manyOrNone(`
    SELECT * FROM pols
    WHERE st = $1
  `, state)
)
Object.setPrototypeOf(Pol, polStatics)

Pol.prototype = Object.assign(Pol.prototype, modelUtils(schema))
Pol.prototype.save = function() {
  return db.one(`
    INSERT INTO pols (
      first_name, middle_name, last_name, gender, st, district, party, chamber
    ) VALUES (
      $/first_name/, $/middle_name/, $/last_name/, $/gender/, $/st/, $/district/, $/party/, $/chamber/
    )
    RETURNING *
  `, this)
  .then(pol => this._modify(pol))
}

module.exports = Pol
