const URL_API = 'https://kirill8210.github.io/api_kyrylmall/db.json';

const getProducts = () => fetch(URL_API)
    .then(response => response.json())
    .catch((err) => {console.error(err)});

export default getProducts;