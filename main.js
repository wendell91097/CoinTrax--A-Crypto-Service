const getData = async () => {
    let response = await axios.get('http://api.coinlayer.com/api/list?access_key=97741fc2230cfdac52e4af497b4fa2a5')
    console.log(response.data)
    return response.data
}

const getPrice = async () => {
    let response = await axios.get('http://api.coinlayer.com/api/live?access_key=97741fc2230cfdac52e4af497b4fa2a5')
    console.log(response.data)
    return response.data
}
// Create constants to hold DOM elements

const DOM_Elements = {
    coin_list : '.coin-list'
}
// Create the Coin List HTML

const create_list = ( symbol, name, icon, supply, price) => {
    const html = `<a href="#" <tr><th scope="row"><img src="${icon}" class="img-fluid p-1" style="height:30px; width:30px"></img></th><td>${symbol}</td><td>${name}</td><td>$${price}</td><td>${supply}</td></tr></a>`
    document.querySelector(DOM_Elements.coin_list).insertAdjacentHTML('beforeend', html)
    // onclick="show_info(${symbol})"
}

// Functions to load data and display the HTML


const load_coins = async () => {
    const coins = await getData();
    const crypto = coins['crypto']
    const coins_prices = await getPrice();
    for(let x in crypto) { create_list(crypto[x]['symbol'], crypto[x]['name'], crypto[x]['icon_url'], crypto[x]['max_supply'], coins_prices['rates'][x])
        
    } 
}

const clear_data = () => {
    document.querySelector(DOM_Elements.coin_list).innerHTML = ''
}