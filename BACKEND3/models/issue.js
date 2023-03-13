const mongoose  = require('mongoose')

const issueschema = mongoose.Schema(
    {
        id: {type: String, require:true},
        name: {type: String, require:true},
        surname: {type: String, require:true},
        birth_date: {type: String, require:true},
        employee_number: {type: String, require:true},
        salary: {type: String, require:true},
        position: {type: String, require:true},
        manager: {type: String, require:true}
        
    }
) 

module.exports = mongoose.model('Issue', issueschema)