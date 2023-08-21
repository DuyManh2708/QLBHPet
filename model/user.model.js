const{mongoose} = require('mongoose');
const bcrypt = require('bcrypt');
let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    email: String,
    phone: String,
    role: String, //phan quyen admin, editor, student...
    status: Boolean,
    createdBy: String,
    createdDate: Date,
    updateBy: String,
    updatedDate: Date,

});
//Truoc khi save thi chay callback
userSchema.pre('save', async function(next){
    //ma hoa mat khau
    try {
        let salt = Math.random();
        let encodedPassword = await bcrypt.hash(this.password, salt);
        this.password = encodedPassword;
        this.salt = salt;
        next();
    } catch (error) {
        console.log(error);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;