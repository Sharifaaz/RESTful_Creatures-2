

      const express = require('express')
      const ejsLayouts = require('express-ejs-layouts')
      const methodOverride = require('method-override')
      const app = express()


      app.set('view engine','ejs')
      app.use(ejsLayouts)
      app.use(methodOverride('_method'))
      // app.use((req,res,next)=>{

      // })

      // is it url encoding what it does 
      app.use(express.urlencoded({extended:false}))
      app.use('/dinosaurs', require('./controllers/dinosaurs'))

      app.get('/',(req,res)=>{
          res.redirect('/dinosaurs')
      })


      //express show route for dinosaurs (lists one dinosaur)
      // app.get('/dinosaurs/:idex', (req, res) => {
      //     // get dinosaurs
      //     let dinosaurs = fs.readFileSync('./dinosaurs.json');
      //     let dinoData = JSON.parse(dinosaurs);
        
      //     //get array index from url parameter
      //     let dinoIndex = parseInt(req.params.idx);
        
      //     //render page with data of the specified animal
      //     res.render('dinosaurs/show', {myDino: dinoData[dinoIndex]});
      //   });


      //   app.get('/dinosaurs/new', (req, res) => {
      //     res.render('dinosaurs/new');
      //   });

        app.listen(3500,()=>{
          console.log('HERE WE ARE AGAIN 3500!')
          })
          