const getData = async () => {
    let response = await axios.get('http://api.coinlayer.com/api/list?access_key=97741fc2230cfdac52e4af497b4fa2a5')
    console.log(response.data)
    return response.data
}

// Create constants to hold DOM elements

const DOM_Elements = {
    coin_list : '.coin-list'
}
// Create the Coin List HTML

const create_list = ( symbol, name, icon, supply ) => {
    const html = `<div class="list-group-item list-group-item-action list-group-item-light" id="${symbol}"> <img src="${icon}" class="img-fluid p-1" style="height:40px; width:40px"></img><h6> ${symbol} ${name} ${supply}</h6></div>`
    document.querySelector(DOM_Elements.coin_list).insertAdjacentHTML('beforeend', html)
}

// Functions to load data and display the HTML

const load_coins = async () => {
    const coins = await getData();
    const crypto = coins['crypto']
    for(let x in crypto) { create_list(crypto[x]['symbol'], crypto[x]['name'], crypto[x]['icon_url'], crypto[x]['max_supply'])
        
    } 
}

const clear_data = () => {
    document.querySelector(DOM_Elements.coin_list).innerHTML = ''
}