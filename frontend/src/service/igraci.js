import axios from "axios";

const osnovniUrl = "http://localhost:3001/api/igraci"

const dohvatiSve = () => {
    return axios.get(osnovniUrl);
}

const stvori = noviObjekt => {
    return axios.post(osnovniUrl, noviObjekt)
}

const brisi = id => {
    return axios.delete(`${osnovniUrl}/${id}`)
}

export default {dohvatiSve, stvori, brisi}