var mysql = require("mysql");
var pool = mysql.createPool(
{  
    connectionLimit: 10,  
    host: "travelamos.net",  
    user: "t579049_Travelamos",  
    password: "Travelamos123",  
    database: "t579049_Travelamos"
});
pool.getConnection((err, connection) => {    
    if (err) {        
        if (err.code === 'PROTOCOL_CONNECTION_LOST') 
        {            
            console.error('Database connection was closed.')       
        }        
        if (err.code === 'ER_CON_COUNT_ERROR') 
        {            
            console.error('Database has too many connections.')        
        }        
        if (err.code === 'ECONNREFUSED') 
        {            
            console.error('Database connection was refused...Please Switch On Your MYSQL Apache Server Port')        
        }    
    } 
    if (connection) connection.release()    
    return console.log('WELCOME TO EXPRESS SERVER');
})
module.exports = pool