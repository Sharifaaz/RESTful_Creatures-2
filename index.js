

      const express = require('express')
      const ejsLayouts = require('express-ejs-layouts')
      const methodOverride = require('method-override')
      const app = express()


      app.set('view engine','ejs')
      app.use(ejsLayouts)
      app.use(methodOverride('_method'))
      app.use(express.urlencoded({extended:false}))
      app.use('/dinosaurs', require('./controllers/dinosaurs'))
      
      
      
      
      app.get('/',(req,res)=>{
          res.redirect('/dinosaurs')
      })


    

        app.listen(3500,()=>{
          console.log('HERE WE ARE AGAIN 3500!')
          })
          