import mongoose   from "mongoose";

const Schema = mongoose.Schema;

let Kozmeticar = new Schema({
    ime: {
        type: String, required:true
    },
     prezime: {
        type: String, required:true
    },
     kor_ime: {
        type: String, required:true
    },
     trajanje: {
        type: String, required:true
    },
    delatnosti: {
        type: Array
    }
}, { versionKey: false })

export default mongoose.model("KozmeticarModel", Kozmeticar, "kozmeticari");