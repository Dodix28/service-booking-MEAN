import * as express from "express";
import UslugaModel from "../models/usluga"
import multer from "multer";
import fs from 'fs';
import path from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/podusluge');
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname); // Koristi originalno ime datoteke
  }
});

//multer konfiguracija, obrada primljenih fajlova
const  upload = multer({storage: storage});

export const uploadMiddleware = upload.single('image');

export class UslugaController {

    dohvatiSveUsluge = (req: express.Request, res: express.Response) => {
        UslugaModel.find({})
        .then((usluge) => { res.json(usluge) ; })
        .catch((err) => console.log(err));
    }

    dohvatiUslugu_id = (req: express.Request, res: express.Response) => {
        let idU = req.body.idU;

        UslugaModel.findOne({"idU": idU})
        .then((usluga) => { res.json(usluga) ; })
        .catch((err) => console.log(err));
    }

      dodajTretman = async (req: express.Request, res: express.Response) => {
        let idU = req.body.idU;
        let naziv = req.body.naziv;
        let opis = req.body.opis;
        let cena = req.body.cena;

      try {
        const usluga = await UslugaModel.findOne({ idU });
        if (!usluga) {
          res.status(404).json({ message: "Usluga nije pronađena" });
          return;
        }

        let maxIdPU = 0;
        if (usluga.podusluge && usluga.podusluge.length > 0) {
          maxIdPU = Math.max(...usluga.podusluge.map(p => p.idPU || 0));
        }

        const noviIdPU = maxIdPU + 1;

        const novaPodusluga = {
          idPU: noviIdPU,
          naziv:naziv,
          opis: opis,
          cena:cena,
        };

        usluga.podusluge.push(novaPodusluga);
        await usluga.save();

        res.status(200).json({ message: "Podusluga uspešno dodata", usluga });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Greška na serveru", error });
      }
    };


    uploadImage = async (req: express.Request, res: express.Response) => {
      const idU = Number(req.body.idU);
      const fileName: string = req.file ? req.file.filename : "default.png";

      try {
        // 🔹 Dodaj ime slike u niz "galerija"
        const updatedUsluga = await UslugaModel.findOneAndUpdate(
          { idU: idU },
          { $push: { galerija: fileName } }, // <-- dodaj u niz galerija
          { new: true } // vrati ažuriranu verziju
        );

        if (!updatedUsluga) {
          res.status(404).json({ message: "Usluga nije pronađena" });
        }

        console.log("✅ Ažurirana usluga:", updatedUsluga);
        res.status(200).json(updatedUsluga);

      } catch (err) {
        console.error("❌ Greška prilikom dodavanja slike u galeriju:", err);
        res.status(500).json({ message: "Greška na serveru", error: err });
      }
    };


    izmeniPoduslugu = async (req: express.Request, res: express.Response) => {
      let idU = req.body.idU;
      let idPU = req.body.idPU;
      let cena = req.body.cena;
      let naziv = req.body.naziv;

      try {
        const updatedUsluga = await UslugaModel.findOneAndUpdate(
          { idU: idU, "podusluge.idPU": idPU },   // pronađi tačnu poduslugu
          {
            $set: {
              "podusluge.$.naziv": naziv,
              "podusluge.$.cena": cena
            }
          },
          { new: true } // vrati ažuriranu verziju
        );

        if (!updatedUsluga) {
          res.status(404).json({ message: "Usluga ili podusluga nije pronađena" });
          return;
        }

        res.status(200).json({
          message: "Podusluga uspešno izmenjena",
          usluga: updatedUsluga
        });

      } catch (err) {
        console.error("❌ Greška prilikom izmene podusluge:", err);
        res.status(500).json({ message: "Greška na serveru", error: err });
        return;
      }
    };

    obrisiPoduslugu = async (req: express.Request, res: express.Response): Promise<void> => {
      let idU = req.body.idU;
      let idPU = req.body.idPU;
      try {
        const updatedUsluga = await UslugaModel.findOneAndUpdate(
          { idU: idU },                // pronađi uslugu
          { $pull: { podusluge: { idPU: idPU } } }, // izbriši poduslugu sa datim idPU
          { new: true }                // vrati ažuriranu verziju
        );

        if (!updatedUsluga) {
          res.status(404).json({ message: "Usluga ili podusluga nije pronađena" });
          return;
        }

        res.status(200).json({
          message: "Podusluga uspešno obrisana",
          usluga: updatedUsluga
        });

      } catch (err) {
        console.error("Greška prilikom brisanja podusluge:", err);
        res.status(500).json({ message: "Greška na serveru", error: err });
      }
    };


  
    obrisiSliku = async (req: express.Request, res: express.Response): Promise<void> => {
      let idU = req.body.idU;
        let slika = req.body.slika;

      try {
        // 1️⃣ Obriši iz baze
        const updatedUsluga = await UslugaModel.findOneAndUpdate(
          { idU },
          { $pull: { galerija: slika } }, // uklanja sliku iz niza galerija
          { new: true }
        );

        if (!updatedUsluga) {
          res.status(404).json({ message: "Usluga nije pronađena" });
          return;
        }

        // 2️⃣ Obriši fajl sa servera
        const filePath = path.join(__dirname, "../uploads/podusluge", slika);

        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Greška prilikom brisanja fajla:", err);
            // Ne vraćamo grešku korisniku, jer baza je već ažurirana
          }
        });

        res.status(200).json({
          message: "Slika uspešno obrisana",
          usluga: updatedUsluga
        });

      } catch (err) {
        console.error("Greška prilikom brisanja slike:", err);
        res.status(500).json({ message: "Greška na serveru", error: err });
      }
    };



  




}