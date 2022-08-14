import axios from "axios";

const osnovniUrl = "http://localhost:3001/api/igraci"

const dohvatiSve = () => {
    return axios.get(osnovniUrl);
}

const brisi = id => {
    return axios.delete(`${osnovniUrl}/${id}`)
}

export default {dohvatiSve, brisi}