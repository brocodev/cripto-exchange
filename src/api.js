const url = "https://api.coincap.io/v2";

function getAssets() {
    return fetch(`${url}/assets?limit=30`)
        .then(res => res.json())
        .then(res => res.data);
}

function getAsset(coin) {
    return fetch(`${url}/assets/${coin}`)
        .then(res => res.json())
        .then(res => res.data);
}

function getAssetHistory(coin) {
    //Accedemos a la API al path history el cual contiene los siguientes paremetros:
    //Tipo de history en este caso es por hora, intervalo (start y end)
    let date = new Date();
    const hourEnd = date.getTime(); //<--Hora actual
    date.setDate(date.getDate() - 1); //<--Seteando la fecha un dia atras
    const hourStart = date.getTime(); //<--Hora de ayer
    return fetch(
            `${url}/assets/${coin}/history?interval=h1&start=${hourStart}&end=${hourEnd}`
        )
        .then(res => res.json())
        .then(res => res.data);
}

function getMarkets(coin) {
    return fetch(`${url}/assets/${coin}/markets?limit=10`)
        .then(res => res.json())
        .then(res => res.data);
}

function getExchange(id) {
    return fetch(`${url}/exchanges/${id}`)
        .then(res => res.json())
        .then(res => res.data);
}
export default {
    getAssets,
    getAsset,
    getAssetHistory,
    getMarkets,
    getExchange
};