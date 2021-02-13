var express = require('express');
var router = express.Router();
var Discogs = require('disconnect').Client;
const cors = require('cors');

var collectorsItems;
var noOfPages;
var pagination;

/* GET users listing. */
router.get('/', cors(), function(req, res, next) {
  res.render('user', { title: 'USER : Killian' });
});

router.get('/collection', cors(), function(req, res, next) {  
  var col = new Discogs({userToken: 'lYVtKyeISQGrTaFWvhONqkFfvbexIAIsrNiJhvAf'}).user().collection();
  
  col.getReleases('konsouloz', 0, {per_page:1000},
   function(err, data){
      //console.log(data);
      //pagination =res.json(data.pagination);
      //console.log("Number of Pages: "+pagination.pages);
      res.json(data.releases);//
    });
  
});

module.exports = router;

function getEntireCollection(string ,res){

}
