const express=require("express");
const routes=require("./routes/routes")
const app=express();
const port=process.env.port|| 3000
app.use(express.json());
app.use("/api",routes);




app.listen(port,"localhost",()=>console.log(`running on port${port}`))




















// app.post("/test-password", (req, res) => {
//   const password = req.body.password?.trim();
//   const regex = /^(?=.*[A-Z])[A-Za-z0-9]{6,}$/;

//   console.log("Password:", JSON.stringify(password));

//   if (!regex.test(password)) {
//     return res.status(400).json({
//       error:
//         "Password must be at least 6 characters long, contain one uppercase letter, and have only letters and numbers.",
//     });
//   }

//   return res.status(200).json({ message: "Password is valid ✅" });
// });