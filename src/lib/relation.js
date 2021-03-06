const { isString, isArray } = require('./dataType')
const Error = require('./error')

const relation = class Relation {
  constructor (tableName) {
    if (!isString(tableName)) {
      throw new Error(415)
    }
    this.tableName = tableName
  }
  add (parmas) {
    return operation.call(this, parmas, 'AddRelation')
  }
  remove (parmas) {
    return operation.call(this, parmas, 'RemoveRelation')
  }
}

function operation (parmas, op) {
  if (isString(parmas)) {
    return {
      '__op': op,
      'objects': [
        {
          '__type': 'Pointer',
          'className': this.tableName,
          'objectId': parmas
        }
      ]
    }
  } else if (isArray(parmas)) {
    const data = []
    parmas.map(item => {
      if (!isString(item)) {
        throw new Error(415)
      }
      data.push({ '__type': 'Pointer', 'className': this.tableName, 'objectId': item })
    })
    return { '__op': op, 'objects': data }
  } else {
    throw new Error(415)
  }
}

module.exports = relation
