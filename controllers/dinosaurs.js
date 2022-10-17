    
    // 1- installing express
    // 2- Routing function
    // 3- file reader function 'fs'
    const express = require('express')
    const router = express.Router()
    const fs = require('fs')

// for the index.ejs 
router.get('/',(req,res)=>{
   let dinosaurs = fs.readFileSync('./dinosaurs.json')
   console.log(dinosaurs)
   let dinoData =JSON.parse(dinosaurs)
   let nameFilter = req.query.nameFilter
if(nameFilter){
    dinoData = dinoData.filter(dino=>{
        return dino.name.toLowerCase()===nameFilter.toLowerCase()
    })
}


   console.log(nameFilter)
   console.log(req.query)

   res.render('dinosaurs/index', {myDino:dinoData})
  
})

// for the new.ejs 
router.get('/new',(req,res)=>{
    res.render('dinosaurs/new')
})

// for the show.ejs
router.get('/:index',(req,res)=>{
    // get the dinosaurs 
    let dinosaurs =fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs);
    console.log('This is the req.parms object!',req.parms)
    let dinoIndex = parseInt(req.params.index)
    res.render('dinosaurs/show',{myDino: dinoData[dinoIndex]})
   })

// router that posts the new data
router.post('/',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    dinoData.push(req.body)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));
    console.log('This is the Request Body: ',req.body)
    res.redirect('/dinosaurs')
})

// deleting a data
    router.delete('/:idx',(req,res)=>{
    
    console.log('This is my Req Params object',req.params)
    
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData =JSON.parse(dinosaurs)
    dinoData.splice(req.params.idx,1)
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

    res.redirect('/dinosaurs')
});




// for the edit.ejs
router.get('/edit/:idx',(req,res)=>{
    
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx});
});

// Adding data to the data base 
router.put('/:dinoId', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    // Parse JSON data into JS Object VVV
    let dinoDate = JSON.parse(dinosaurs)
    dinoData[req.params.dinoId].name =req.body.name
    dinoData[req.params.dinoId].type=req.body.type
    // update our json file with new data
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))
    // redirect to home page
    res.redirect('./dinosaurs')
})
module.exports = router;