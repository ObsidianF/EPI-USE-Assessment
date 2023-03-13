const express = require('express')
const router = express.Router();
const Issue = require('../models/issue')
const checkauth = require('../check-auth')

router.get('', (req, res) => {
        Issue.find().then((issues) => {
          res.json({
      message: 'Issues found',
      issues:issues
          }
          )
        })
      })


router.post('',  checkauth,(req, res)=>{ 
        const issue = new Issue(
            {
                id: req.body.id,
                name: req.body.name,
                surname: req.body.surname,
                birth_date: req.body.birth_date,
                employee_number: req.body.employee_number,
                salary: req.body.salary,
                position: req.body.position,
                manager: req.body.manager
                
            }
    
        )
        issue.save().then(()=> {
        res.status(201).json({
            message: 'Issues created',
            issue: issue
        })
    })
})


router.delete('/:id', checkauth,(req, res)=>{
  
        Issue.deleteOne({_id: req.params.id})
        .then((result)=>{
            res.status(200).json({message: "Issues Deleted"});
        });
    });


module.exports = router;

