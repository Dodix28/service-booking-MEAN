import express from "express";
import { KozmeticarController } from "../controllers/kozmeticar.controller";

const kozmeticarRouter = express.Router();

kozmeticarRouter
  .route("/dohvatiKozmeticara")
  .post((req, res) => new KozmeticarController().dohvatiKozmeticara(req, res));


  export default kozmeticarRouter;