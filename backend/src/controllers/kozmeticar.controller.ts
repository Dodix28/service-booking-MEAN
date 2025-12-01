import * as express from "express";
import KozmeticarModel from "../models/kozmeticar"


export class KozmeticarController {

    dohvatiKozmeticara = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        KozmeticarModel.find({"kor_ime": kor_ime})
        .then((kozmeticar) => { res.json(kozmeticar) ; })
        .catch((err) => console.log(err));
    }

   
}