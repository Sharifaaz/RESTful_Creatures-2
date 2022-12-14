    
    
    const express = require('express')
    const router = express.Router()
    const fs = require('fs')
    

    app.set('view engine','ejs')
    app.use(ejsLayouts)
    app.use(methodOverride('_method'))

    // routing to the index.ejs
    
    router.get('/',(req,res)=>{

        let creatures = fs.readFileSync('./prehistoric_creatures.json')
        let creaturesData = JSON.parse(creatures)
        console.log(creaturesData)
        res.render('/prehistoric_creatures/index',{myCreatures: creaturesData})

})


//show route will catch the request and pass in "new" of prehistoric_creatures

router.get('/new', (req, res) => {
    res.render('prehistoric_creatures/new')
})

    // routing to the show.ejs

    router.get( '/:idx', (req,res)=>{
    // get the creatures 
    let creatures =fs.readFileSync('./prehistoric_creatures.json')
    let creaturesData = JSON.parse(creatures);
    console.log('This is the req.parms object!', req.parms)
    let creaturesIndex = parseInt(req.params.idx)
    res.render('prehistoric_creatures/show',{myCreatures: creaturesData[creaturesIndex]})
    })




    router.post('/', (req, res) => {
        // read creatures file
        let creatures = fs.readFileSync('./prehistoric_creatures.json');
        let creaturesData = JSON.parse(creatures)
      
        // add item to creatures array
        creaturesData.push(req.body)
      
        // save dinosaurs to the data.json file
        fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
      
        //redirect to the GET /creatures route (index)
        res.redirect('/prehistoric_creatures')
    })

    router.delete('/:idx', (req, res) => {
        console.log('This is the req.params object!', req.params)
       
        let creatures = fs.readFileSync('./prehistoric_creatures.json')
        let creaturesData = JSON.parse(creatures)
       
        creaturesData.splice(req.params.idx, 1)
         
        fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
       
        res.redirect('/prehistoric_creatures')
    })

    router.get('/edit/:idx' ,(req, res) =>{
        //grab data creatures
        let creatures = fs.readFileSync('./prehistoric_creatures.json')
        let creaturesData = JSON.parse(creatures)
       
        //disply edit page
        res.render('prehistoric_creatures/edit', {
        myCreatures: creaturesData[req.params.idx], 
        creaturesId: req.params.idx
        })
       
    })




    router.put('/:idx', (req, res) => {
        //grab data creatures vvv
        let creatures = fs.readFileSync('./prehistoric_creatures.json')
         //parse JSON data into JS object vv
         let creaturesData = JSON.parse(creatures)
          
           //update our creatures with form data
           creaturesData[req.params.idx].name = req.body.type
           creatures[req.params.idx].type = req.body.img_url
          
           //update pur json file with new date
           fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creaturesData))
          //redirect to home page
           res.redirect('/prehistoric_creatures');
       })    
    module.exports = router;