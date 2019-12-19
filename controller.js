const modelData = require('./modelData')
const path = require('path')
const fs = require('fs')
const template = require('art-template')
const querystring = require('querystring')

exports.showIndexPage = function(req, res) {
    modelData.getAllHeros(function(err, data) {
        if (err) throw err;
        res.render('/views/index.html', {data01: data})
    })
}

exports.showAddPage = function(req, res) {
    res.render('/views/add.html', {})
}

exports.showEditPage = function(req, res) {
    let qId = req.query.id * 1;
    modelData.getOneHero(qId * 1, function(err, data) {
        if (err) return console.log(err.message);
       res.render('/views/edit.html', data)
    })
}

exports.editHeroData = function(req, res) {
    let str = '';
    req.on('data', chunk => {
        str += chunk
    })
    req.on('end', () => {
        str = querystring.parse(str)
        modelData.editHero(str, err => {
            if (err) return res.json({
                code: 201,
                msg: '英雄不存在'
            })
            res.json({
                code: 200,
                msg: '修改成功'
            })
            
        })
    })
}

exports.editPage = function(req, res) {

}

exports.showInfoPage = function(req, res) {
    let qId = req.query.id * 1;
    modelData.getOneHero(qId * 1, function(err, data) {
        if (err) return console.log(err.message);
        res.render('/views/info.html', data)
    })
    
}

exports.addHero = function(req, res) {
    let str = '';
    req.on('data', chunk => {
        str += chunk;
    })
    req.on('end', () => {
        str = querystring.parse(str)
        modelData.addHeroData(str, err => {
            if (err) return res.end(JSON.stringify({
                code: 501,
                msg: '服务器错误'
            }))
            res.end(JSON.stringify({
                code: 200,
                msg: '添加成功'
            }))
        })
    })
}

exports.showStaticPage = function(req, res) {
    fs.readFile(__dirname + req.pathname, 'utf-8', (err,data) => {
        if (err) return res.end(JSON.stringify({
            code: 202,
            msg: '文件不存在'
        }))
        if (req.url.endsWith('css')) res.writeHeader(200, {'content-Type': 'text/css;charaset=utf-8'})
        res.end(data)
    })
}

exports.delHeroData = function(req, res) {
    let {id} = req.query
    console.log(id);
    
    modelData.delOneHero(id,function(err) {
        if (err) return res.json({
            code: 201,
            msg: '删除失败'
        })
        res.json({
            code: 200,
            msg: '删除成功'
        })
    })
}


exports.render = function(req, res) {
    res.render = function(filename, obj = {}) {
        let str = template(path.join(__dirname + filename), obj)
        res.end(str)
    }
    res.json = function(obj = {}) {
        res.end(JSON.stringify(obj))
    }
}
