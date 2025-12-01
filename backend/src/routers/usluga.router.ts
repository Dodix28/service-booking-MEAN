import express from "express";
import { UslugaController, uploadMiddleware } from "../controllers/usluga.controller";

const uslugaRouter = express.Router();

uslugaRouter
  .route("/getUsluge")
  .get((req, res) => new UslugaController().dohvatiSveUsluge(req, res));

  uslugaRouter
  .route("/dohvatiUslugu_id")
  .post((req, res) => new UslugaController().dohvatiUslugu_id(req, res));

  //specijalno samo za dodavanje slike
  /*uslugaRouter
  .route("/addImage")
  .post(uploadMiddleware, (req,res) => new  UslugaController().addImage(req,res));*/

   uslugaRouter
  .route("/dodajPoduslugu")
  .post((req, res) => new UslugaController().dodajTretman(req, res));

  uslugaRouter
  .route("/uploadImage")
  .post(uploadMiddleware, (req,res) => new  UslugaController().uploadImage(req,res));

    uslugaRouter
  .route("/izmeniPoduslugu")
  .post((req, res) => new UslugaController().izmeniPoduslugu(req, res));

    uslugaRouter
  .route("/obrisiPoduslugu")
  .post((req, res) => new UslugaController().obrisiPoduslugu(req, res));

    uslugaRouter
  .route("/obrisiSliku")
  .post((req, res) => new UslugaController().obrisiSliku(req, res));



  export default uslugaRouter;