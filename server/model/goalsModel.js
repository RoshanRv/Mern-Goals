const mongoose  =require('mongoose')

const goalSchema = mongoose.Schema({
    text:{
        type:String,
        require:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Goal',goalSchema)