const fs = require('fs')
const path = require('path')
const moment = require('moment')

exports.getAllHeros = function(callback) {
    fs.readFile(__dirname + '/heros.json', 'utf-8', (err, data) => {
        if (err) return callback(err)
        let arr = JSON.parse(data)
        callback(null, arr)
    })
}

exports.getOneHero = function(qId, callback) {
    this.getAllHeros((err, arr) => {
        if (err) return console.log(err.message);
        let obj = arr.find((value,index) => {
            return value.id == qId
        })
        callback(null, obj);
        
    })
}

exports.editOneHero = function() {

}

exports.delOneHero = function(id, callback) {
    this.getAllHeros((err, data) => {
        if (err) return callback(err)
        data.some((item, index) => {
            if (item.id == id) {
                data.splice(index,1)
            }
        })
        fs.writeFile(path.join(__dirname + '/heros.json'), JSON.stringify(data), err=> {
            if (err) return callback(err)
            callback(null)
        })
    })
}

exports.addHeroData = function(heroData, callback) {
    this.getAllHeros(function(err, data) {
        if (err) return callback(err);
        heroData.id = data[data.length - 1].id + 1
        heroData.date = moment().format('YYYY-MM-DD hh:mm:ss')
        data.push(heroData)
        fs.writeFile(path.join(__dirname + '/heros.json'), JSON.stringify(data), err=> {
            if (err) return callback(err)
            callback(null)
        })
    })
}

exports.editHero = function(heroData, callback) {
    this.getAllHeros(function(err, data) {
        if (err) return callback(err);
        heroData.id = +heroData.id
        heroData.date = moment().format('YYYY-MM-DD hh:mm:ss')
        data.some((item, index) => {
            if (item.id == heroData.id) {
                data.splice(index, 1, heroData)
            }
        })
        fs.writeFile(path.join(__dirname + '/heros.json'), JSON.stringify(data), err=> {
            if (err) return callback(err)
            callback(null)
        })
    })
}