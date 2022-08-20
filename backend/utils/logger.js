const info = (...igraci) => {
    console.log(...igraci);
}

const greska = (...igraci) => {
    console.error(...igraci);
}

module.exports = {info, greska}