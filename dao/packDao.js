const db = require('../common/db')
const sql = require('./packSqlMapping')

function all(req, res, next) {
  db.query(sql.queryAll).then(rows => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ 'error': err.toString() }))
  })
}

function add(req, res, next) {
  const values = []
  values.push(req.body.name)
  values.push(req.body.params)
  values.push(req.body.dev)
  values.push(req.body.pre)
  values.push(req.body.prod)
  values.push(req.body.version)
  values.push(req.body.fallback)
  values.push(req.body.app_id)
  db.query(sql.insert, values).then(rows => {
   res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ 'error': err.toString() }))
  })
}

function remove(req, res, next) {
  const appId = req.body.app_id
  db.query(sql.remove, appId).then(rows => {
   res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ 'error': err.toString() }))
  })
}

function update(req, res, next) {
  const appId = req.body.app_id
  const record = req.body
  db.query(sql.update(record, appId)).then(rows => {
   res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify(rows))
  }).catch(err => {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ 'error': err.toString() }))
  })
}

exports.all = all
exports.add = add
exports.remove = remove
exports.update = update
