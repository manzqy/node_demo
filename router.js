const path = require('path')
const urlFoo = require('url')

let control = require('./controller')

function router(req, res) {
    let method = req.method
    let url = req.url
    let pathname = urlFoo.parse(url, true).pathname
    let query = urlFoo.parse(url, true).query
    let getM = method == 'GET'
    let postM = method == 'POST'

    req.pathname = pathname
    req.query = query

    control.render(req, res)
    
    if (getM && (pathname == '/' || pathname == '/index' || pathname == '/index.html')) {
        control.showIndexPage(req, res)

    } else if (getM && (pathname == '/add' || pathname == '/add.html')) {
        control.showAddPage(req, res)

    } else if (getM && (pathname == '/edit' || pathname == '/edit.html')) {
        control.showEditPage(req, res)
        control.showEditPage(req, res)

    } else if (getM && (pathname == '/info' || pathname == '/info.html')) {
        control.showInfoPage(req, res)

    } else if (getM && pathname.startsWith('/node_modules')) {
        control.showStaticPage(req, res)

    } else if (postM && pathname == '/addHero') {
        control.addHero(req, res)

    } else if (postM && pathname == '/editHeroData') {
        control.editHeroData(req, res)

    } else if (getM && pathname == '/delHeroData') {
        control.delHeroData(req, res)

    } else {
        res.end('404 not found')
    }
}
module.exports = router