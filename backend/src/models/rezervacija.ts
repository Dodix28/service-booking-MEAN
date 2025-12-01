import mongoose   from "mongoose";

const Schema = mongoose.Schema;

let Rezervacija = new Schema({
    idR: {
        type: Number, required:true, unique:true
    },
    datumZakazivanja: {
    type: String, required:true
  },
    vreme: {
        type: String, required:true
    },
    cena: {
        type: Number, required:true
    },
    napomena: {
        type: String
    },
    klijent: {
        type: String, required:true
    },
    kozmeticar: {
        type: String
    },
    status: {
        type: String, required:true
    },
    idU: {
        type: Number, required:true
    },
    idPU: {
        type: Number, required:true
    },
    nazivPodusluge: {
        type: String, required:true
    },
    komentar: {
        type: String
    },
}, { versionKey: false })

export default mongoose.model("RezervacijaModel", Rezervacija, "rezervacije");