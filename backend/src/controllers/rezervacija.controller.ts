import * as express from "express";
import RezervacijaModel from "../models/rezervacija"

export class RezervacijaController {

    dodajRezervaciju = async (req: express.Request, res: express.Response) => {

        let idU = req.body.idU;
        let idPU = req.body.idPU;
        let datumZakazivanja = req.body.datumZakazivanja;
        let vreme = req.body.vreme;
        let cena = req.body.cena;
        let klijent = req.body.klijent;
        let kozmeticar = req.body.kozmeticar;
        let napomena = req.body.napomena;
        let status = "na cekanju";
        let nazivPodusluge  = req.body.nazivPodusluge;

        let max = await RezervacijaModel.find({}).sort({ idR: -1 }).limit(1);
       
        let x;
            if (max.length > 0) {
                x = max[0].idR + 1;
            } else {
                x = 1;
            }
    
            let rezervacija = new RezervacijaModel({
              idR: x,
              idU:idU, 
              idPU:idPU,
              datumZakazivanja: datumZakazivanja,
              vreme: vreme,
              cena: cena,
              klijent: klijent,
              kozmeticar: kozmeticar,
              napomena: napomena,
              status: status,
              nazivPodusluge:nazivPodusluge,
              komentar: ""
            });
    
            await rezervacija.save()
            .then((r) => {res.json(r);})
            .catch((err) => console.log(err));
        
    }

    dohvatiRezervaciju_za_klijenta = (req: express.Request, res: express.Response) =>{
        let kor_ime = req.body.kor_ime;

        RezervacijaModel.find({"klijent":kor_ime})
        .then((rezervacije) => { res.json(rezervacije) ; })
        .catch((err) => console.log(err));
    }

     dohvatiSveRezervacijue_za_kozmeticara = (req: express.Request, res: express.Response) =>{
        let kozmeticar = req.body.kozmeticar;

        RezervacijaModel.find({"kozmeticar":kozmeticar})
        .then((rezervacije) => { res.json(rezervacije) ; })
        .catch((err) => console.log(err));
    }

    prihvatiRezervaciju = (req: express.Request, res: express.Response) =>{ 
        let idR = req.body.idR;

        RezervacijaModel.findOneAndUpdate({idR:idR},{status:"prihvaceno"})
        .then((rezervacije) => { res.json(rezervacije) ; })
        .catch((err) => console.log(err));
    }

    odbijRezervaciju = (req: express.Request, res: express.Response) =>{ 
        let idR = req.body.idR;
        let komentar = req.body.komentar;

        RezervacijaModel.findOneAndUpdate({idR:idR},{status:"odbijeno", komentar:komentar})
        .then((rezervacije) => { res.json(rezervacije) ; })
        .catch((err) => console.log(err));
    }


}