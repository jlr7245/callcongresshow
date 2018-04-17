const PolSchema = [
  {
    key: 'id',
    optional: true,
    type: 'number'
  }, {
    key: 'firstname',
    type: 'string'
  }, {
    key: 'middlename',
    type: 'string',
    optional: true
  }, {
    key: 'lastname',
    type: 'string'
  }, {
    key: 'state',
    type: 'string'
  }, {
    key: 'party',
    type: 'string'
  }, {
    key: 'chamber',
    type: 'string',
    otherCondition: (val) => ['House', 'Senate'].includes(val),
    otherConditionMessage: 'Must be either `house` or `senate`'
  }
]

module.exports = PolSchema
