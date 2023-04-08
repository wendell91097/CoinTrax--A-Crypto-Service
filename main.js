const getData = async () => {
    let response = await axios.get('http://api.coinlayer.com/api/list?access_key=078bc4adfe6cadd9652797b596de9c82');
    console.log(response.data);
    return response.data;
};

const getPrice = async () => {
    let response = await axios.get('http://api.coinlayer.com/api/live?access_key=078bc4adfe6cadd9652797b596de9c82');
    console.log(response.data);
    return response.data;
};

// Create constants to hold DOM elements

const DOM_Elements = {
    coin_list : '.coin-list',
    clicked_coin : '.clicked-coin'
};

// Create the diplay_coin function

function display_coin( icon, name, symbol, supply, price ) {
    // const coin_info = input.split(',');
    const coin_html = `<img src="${icon}" class="img-fluid py-1" alt=""></img><ul><li class="d-flex fd-row"><h6 class="text-info mx-1">Name: </h6><h6 class="text-light">${name}</h6></li><li class="d-flex fd-row"><h6 class="text-info mx-2">Price: </h6><h6 class="text-light">${price}</h6></li><li class="d-flex fd-row"><h6 class="text-info mx-2">Symbol: </h6><h6 class="text-light">${symbol}</h6></li><li class="d-flex fd-row"><h6 class="text-info mx-2">Supply:</h6><h6 class="text-light">${supply}</h6></li></ul>`;
    document.querySelector(DOM_Elements.clicked_coin).innerHTML = '';
    document.querySelector(DOM_Elements.clicked_coin).insertAdjacentHTML('beforeend', coin_html);
}
// Create the Coin List HTML

const create_list = ( symbol, name, icon, supply, price) => {
    const html = `<tr><th scope="row"><img src="${icon}" class="img-fluid p-1" style="height:30px; width:30px"></img></th><td>${symbol}</td><td onclick="display_coin('${icon}','${name}','${symbol}','${price}','${supply}')"><a href="#">${name}</a></td><td>$${price}</td><td>${supply}</td></tr>`;
    document.querySelector(DOM_Elements.coin_list).insertAdjacentHTML('beforeend', html);
    // onclick="show_info(${symbol})";
};

// Functions to load data and display the HTML


const load_coins = async () => {
    const coins = await getData();
    const crypto = coins['crypto'];
    const coins_prices = await getPrice();
    for(let x in crypto) { create_list(crypto[x]['symbol'], crypto[x]['name'], crypto[x]['icon_url'], crypto[x]['max_supply'], coins_prices['rates'][x]);
        
    }
};

const clear_data = () => {
    document.querySelector(DOM_Elements.coin_list).innerHTML = '';
};