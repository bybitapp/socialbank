const handler = require('./handler')

module.exports = [
  {
    description: 'Get history by project',
    method: 'GET',
    path: '/list/p/:id',
    handler: handler.findAllByProjectId
  }
]
