const Pool=require('pg').Pool;
const pool= new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  port: 5432
});

var status;

module.exports.getStatusAdmin= async (id) => {
  const client=await pool.connect();
  // Checks if the status at the admin side is 1
  let query=await pool.query('SELECT status FROM admin WHERE id = $1',[id]);
  adminStatus=query.rows[0].status;
  console.log(adminStatus);
  if(adminStatus==1){
    // Checks if the status at the employee side is 1
    let query=await pool.query('SELECT status FROM employee WHERE id = $1',[id]);
    empStatus=query.rows[0].status;
    if(empStatus==1){
      // Then update the table saying that the blog content has been approved.
      let res=await pool.query('UPDATE customer SET status=$1 WHERE id=$2',[empStatus,id]);
      if(res.rowCount==1){

        return "Successfully updated";

      }
    }
  } else {
    let query=await pool.query('SELECT status FROM admin WHERE id = $1',[id]);
    adminStatus=query.rows[0].status;
    if(adminStatus==0){
    let res=await pool.query('UPDATE customer SET status=$1 WHERE id=$2',[adminStatus,id]);
    if(res.rowCount==1){
      return "Successfully updated";
    }
  }
}
}

module.exports.authenticate=async(id,username,password)=>{
  let username1=await pool.query('SELECT username FROM users WHERE id=$1',[id]);
  let password1=await pool.query('SELECT password FROM users WHERE id=$1',[id]);
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if(username===''){
      return "Enter a valid username";
  }else if(!filter.test(username)){
    return "Enter a valid email id";
  } else if(password.length<4){
    return "Length of the password is less than 4";
  }else if(username!==username1.rows[0].username){
    return "The username not the same";
  } else if(password!==password1.rows[0].password){
    return "The password not the same";
  }
  return "Successful";
}
module.exports.registration=async(name,username,password1,password2)=>{
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if(name===''){
    return "Enter a valid name";
  } else if(username===''){
    return "Enter a username";
  } else if(!filter.test(username)){
    return "Enter a valid username";
  }else if(password1!==password2){
    return "Enter the same password";
  }
  return "Successful";
}
