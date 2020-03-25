var db = require("../../dbconnection");
var authentication = {
   
  validateUser: function(UserName, Password,callback) {
    // console.log(name,'from model now');
    return db.query('SELECT * FROM admin WHERE UserName = ? AND Password = ?',[UserName, Password], callback);
  },
  checkLoginEmail: function(email, callback){
    // console.log(email, 'from model');
    return db.query("SELECT * FROM users WHERE Email= '"+ email +"'", email, callback);
  }
}
module.exports=authentication;