var express = require('express');
var router = express.Router();
var formidable = require('formidable')//tratar arquivos
var fs = require('fs')//nativo do node filesystem
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/file', (req, res)=>{

  let form = new formidable.IncomingForm({ //chamar formulario e fazer configs
    uploadDir: './upload',
    keepExtensions: true
  });
  form.parse(req, (err, fields, files) =>{
    let path = "./" + fields.path;
    if(fs.existsSync(path)){
      fs.unlink(path, err =>{//unlink remover arquivo fisico
        if(err){
          res.status(400).json({
            err
          });
        } else {
          res.json({
            fields
          });
        }
      });
    }
    
  });
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
