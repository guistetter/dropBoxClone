var express = require('express');
var router = express.Router();
var formidable = require('formidable')//tratar arquivos
var fs = require('fs')//nativo do node filesystem
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/file',(req, res) => { //rota para abrir aruivos
  let path = './' + req.query.path;
  if (fs.existsSync(path)){

      fs.readFile(path, (err, data) => {
        if(err){
          console.log(err);
          res.status(400).json({
            error:err
          });
        } else 
          res.status(200).end(data);
        
      })

  } else {
    res.statyus(404).json({
      error:'File not Found.'
    })
  }
})

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
    } else {

      res.statyus(404).json({
        error:'File not Found.'
      })
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
