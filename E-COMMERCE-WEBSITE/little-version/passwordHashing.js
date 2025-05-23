
const bcrypt=require("bcrypt");

const regex=/(?=.*[A-Z])(?=.*[@#$%&*])[A-Za-z0-9!@#$%&*]{6,}$/
const saltRound=10


const validPasswordInput=(password)=>{
let result=regex.test(password)
console.log(password)
   if(!result) return;
   console.log("pass regex");  
   return result 
}



const getHashPassword=async (password)=>{
   

const salt= await bcrypt.genSalt(saltRound);

const hashPassword=await bcrypt.hash(password,salt);
console.log(hashPassword)
return hashPassword;


}

const comparePassword=(password,hashPassword)=>{
  
   if(!password && hashPassword)return undefined
 const result=  bcrypt.compareSync(password,hashPassword)
 return result
 
}

async function checkPassword(password){
   console.log("checkpassword:",password)
if(!password)return

console.log("using gethashpassword func")
const result= await getHashPassword(password)
   return result
}


module.exports={checkPassword,comparePassword,validPasswordInput}