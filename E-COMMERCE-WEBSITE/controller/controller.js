const {checkPassword,comparePassword,validPasswordInput}=require("../passwordHashing/passwordHashing")


const database=[{
   name:"xx",
   email:"hello@gmail.com",
   role:"user",
   password:"Tboy225@",
   adminAccess:"333"
}]

const registerAuthentication=async(req,res)=>{

const userData=req.body
if(userData.name &&userData.password&&userData.email&& userData.role){

  const validPassword= validPasswordInput(userData.password)
  
  if(!validPassword){return res.status(400).json({
   success:false,
   message:"Password not a valid, Password should start with a capital letter and include a special case of : @,#,$,%,&,*,"
  })}

  const passwordResult=await checkPassword(userData.password);
 

  
if(userData.role==="user"){
   const dataToBeSaved={
   name:userData.name,
   email:userData.email,
   role:userData.role,
   password:passwordResult,
   adminAccess:null
  }

database.push(dataToBeSaved)


res.status(200).json({
   success:true,
   message:`${userData.name} is registered succesfully pls login to continue `
 
})

}
   else if(userData.role==="admin"){
      if(userData.adminAccess.length<5)return res.status(400).json({
   success:false,
   message:"AdminAccess Password is required and also longer than 5 to register as admin"
})


if(userData.password===userData.adminAccess)return res.status(400).json({
   success:false,
   message:"Your password and adminAccess password cannot be the same"
})
console.log(userData.adminAccess,userData.password)

const adminAccessresult =await checkPassword(userData.adminAccess);


if(adminAccessresult){

const dataToBeSaved={
   name:userData.name,
   email:userData.email,
   role:userData.role,
   password:passwordResult,
   adminAccess:adminAccessresult
  }
database.push(dataToBeSaved)

res.status(200).json({
   success:true,
   message:`${userData.name} is succesfully registered as Admin pls login to get started `
})
}

}else{
   res.status(400).json({
   success:false,
   message:"invalid role pls specify your role"
})
}


}else{
   res.status(400).json({
   success:false,
   message:"pls fill in your credentials"
  })
}
}


// work on if the user is not registered at all an want 

const adminLoginAuthentication=(req,res)=>{
   
const userData=req.body;

   if(!userData.password && !userData.email && !userData.adminAccess )return  res.status(400).json("pls fill in your credentials")
         

if( userData.role !=="admin" )return  res.status(404).json("unAthorized access ")
      const user=database.find((user)=>user.email===userData.email)

 if(!user )return  res.status(400).json({
   success:false,
   message:"invalid email pls try again"
  });
console.log(userData.adminAccess, "and ",user.adminAccess)
const resultOfComparedAdminAccess=comparePassword(userData.adminAccess,user.adminAccess)
 if(! resultOfComparedAdminAccess )return  res.status(400).json("NO ACCESS GRANTED NOT AN ADMIN")


const resultOfComparedPassword= comparePassword(userData.password,user.password)

  if(!resultOfComparedPassword )return  res.status(400).json({
   success:false,
   message:"invalid password pls try again"
  });
     

  res.status(200).json({
   success:true,
   message:"login succesfull"
  })

   

}

const loginAuthentication=async (req,res)=>{
   const userData=req.body;

   if( userData.password &&userData.email ){

      const user=database.find((user)=>user.email===userData.email)


      if(!user)return  res.status(400).json({
   success:false,
   message:"invalid email pls try again"
  });

const resultOfComparedPassword=comparePassword(userData.password,user.password)
  if(!resultOfComparedPassword )return  res.status(400).json({
   success:false,
   message:"invalid password pls try again"
  });

  res.status(200).json({
   success:true,
   message:"login succesfull"
  })

//   
}else{
   res.status(400).json({
   success:fals,
   message:"pls input your Password and email"
  })
}
}


// get all data function
const getAllData=(req,res)=>{
    res.status(200).json({
   success:true,
   message:"data fetched succesfully",
   data:database
  })
}

module.exports={loginAuthentication,registerAuthentication,getAllData,adminLoginAuthentication}

