const mysql  = require('mysql');
const conn = mysql.createConnection(
{
    host:'localhost',            
    user:'root',               
    password: 'mysqli',
    database:'TodoApp',
    multipleStatements: true   
});

module.exports=conn;