var express = require('express');
var router = express.Router();
var formidable = require('formidable')//tratar arquivos
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res) =>{
  let form = new formidable.IncomingForm({ //chamar formulario e fazer configs
    uploadDir: './upload',
    keepExtensions: true
  });
  form.parse(req, (err, fields, files) =>{//interpretar os dados que estao vindo
    //separa em 2 json dados via post e arquivos
    res.json({
      files:files
    });
  });

 
});
module.exports = router;
