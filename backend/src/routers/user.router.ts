import express from "express";
import { UserController, uploadMiddleware} from "../controllers/user.controller";


const userRouter = express.Router();

userRouter
  .route("/login")
  .post((req, res) => new UserController().login(req, res));

userRouter
.route("/getUsername")
.post((req, res) => new UserController().getUsername(req, res));

userRouter
.route("/getMail")
.post((req, res) => new UserController().getMail(req, res));

userRouter
  .route("/addUser")
  .post((req,res) => new  UserController().addUser(req,res));

userRouter
.route("/updateInfo")
.post((req,res) => new UserController().updateInfoUser(req,res));

//specijalno samo za azuriranje profilne
userRouter
.route("/uploadImage")
.post(uploadMiddleware, (req,res) => new  UserController().uploadImage(req,res));


userRouter
  .route("/dohvatiKlijente")
  .get((req, res) => new UserController().dohvatiSveKlijente(req, res));


  userRouter
  .route("/dohvatiKozmeticare")
  .get((req, res) => new UserController().dohvatiSveKozmeticare(req, res));


  
  export default userRouter;