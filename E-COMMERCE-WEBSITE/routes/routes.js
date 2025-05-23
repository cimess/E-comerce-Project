const express=require("express");
const {registerAuthentication,loginAuthentication,getAllData,adminLoginAuthentication}=require("../controller/controller");

const router=express.Router();

router.post("/register",registerAuthentication)
router.post("/admin",adminLoginAuthentication)
router.post("/login",loginAuthentication)
router.get("/getData",getAllData)

module.exports=router;