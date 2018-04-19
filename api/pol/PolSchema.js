const PolSchema = [
  {
    key: 'id',
    optional: true,
    type: 'number'
  }, {
    key: 'first_name',
    type: 'string'
  }, {
    key: 'middle_name',
    type: 'string',
    optional: true
  }, {
    key: 'last_name',
    type: 'string'
  }, {
    key: 'st',
    type: 'string'
  }, {
    key: 'district',
    type: 'number',
    optional: true
  }, {
    key: 'party',
    type: 'string'
  }, {
    key: 'chamber',
    type: 'string',
    otherCondition: (val) => ['house', 'senate'].includes(val),
    otherConditionMessage: 'Must be either `house` or `senate`'
  }, {
    key: 'gender',
    type: 'string'
  }
]

module.exports = PolSchema
