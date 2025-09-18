const mongoose =require ('mongoose')
const bcrypt =require('bcrypt')
const {Schema} = mongoose
const UserSchema = new Schema({
    username:{
        type:String,
        required:[true,'please enter a username']},
    email:{
        type:String,
         required:[true,'please enter your email'],
        unique:[true,'This email already exists.'],
        match:[/.+@.+\..+/,'Must match an email address.']
    },
    password:{
        type:String,
        required:[true,'please enter your password'],
        minLength:8

    },
    role:{
        type:String,
        required:[true,'please enter your role'],
        enum:['student','teacher','admin'],
        default:'student'
    },
    isApproved:
    {type:Boolean,
        default:true},
    inviteCode:
    {type:String,
     default:null   
    }
    
},{timestamps:true})

UserSchema.pre("save",async function(next){
  if(this.isNew || this.isModified('password')){
    const saltRounds =10
    this.password = await bcrypt.hash(this.password, saltRounds)
}

next()
})
UserSchema.methods.checkPassword= async function(password){
    return bcrypt.compare(password,this.password)
}
mongoose.set('runValidators',true) // mongoose will enforce schema validation before any changes(findAndupdate,findAndDelete...)

const User = mongoose.model('user',UserSchema)

module.exports = User



