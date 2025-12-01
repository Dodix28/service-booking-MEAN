import mongoose   from "mongoose";

const Schema = mongoose.Schema;

let Usluga = new Schema({
    naziv: {
        type: String, required:true
    },
     cena: {
        type: Number, required:true
    },
     idU: {
        type: Number, required:true
    },
     trajanje: {
        type: String, required:true
    },
    galerija: {
        type: Array
    },
    kozmeticari: {
        type: Array
    },
    opis: {
        type: String, required:true
    },
    podusluge: {
        type: Array
    },
    slika: {
        type: String, required:true
    },
}, { versionKey: false })

export default mongoose.model("UslugaModel", Usluga, "usluge");