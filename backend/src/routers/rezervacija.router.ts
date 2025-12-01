import express from "express";
import { RezervacijaController } from "../controllers/rezervacija.controller";

const rezervacijaRouter = express.Router();

rezervacijaRouter
  .route("/addRezervacija")
  .post((req, res) => new RezervacijaController().dodajRezervaciju(req, res));

  rezervacijaRouter
  .route("/getRezervacijaZaKlijenta")
  .post((req, res) => new RezervacijaController().dohvatiRezervaciju_za_klijenta(req, res));

   rezervacijaRouter
  .route("/getAllRezervacijeZaKozmeticara")
  .post((req, res) => new RezervacijaController().dohvatiSveRezervacijue_za_kozmeticara(req, res));

  rezervacijaRouter
  .route("/prihvatiRezervaciju")
  .post((req, res) => new RezervacijaController().prihvatiRezervaciju(req, res));

  rezervacijaRouter
  .route("/odbijRezervaciju")
  .post((req, res) => new RezervacijaController().odbijRezervaciju(req, res));


  export default rezervacijaRouter;