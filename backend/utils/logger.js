const info = (...igraci) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...igraci);
    }
}

const greska = (...igraci) => {
    console.error(...igraci);
}

module.exports = {info, greska}