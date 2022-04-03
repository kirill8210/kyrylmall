const city = document.querySelector('.all_item');
const detail = document.querySelector('.item_button');

const createCard = (vacancy) =>{
    const { brand, id, size, price} = vacancy;

    const card = document.createElement('div');

    card.insertAdjacentHTML('afterbegin', ` 
        <div class="item">
            <img src="img/${id}.jpg" class="item_img" alt="C001">
            <div class="item_brand">${brand}</div>
            <div class="item_id"><span>Артикул: </span><span>${id}</span></div>
            <div class="item_size"><span>Размер: </span><span>${size}</span></div>           
            <div class="item_price"><span>Цена: </span><span>${price} грн</span></div>
            <button class="item_button">Подробнее</button>
        </div>         
    `);

    return card;
};

const createModal = (vacancy) =>{
    const { id, description} = vacancy;

    const modal = document.createElement('div');
    const idEl = document.createElement('div');
    idEl.textContent = id;
    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = description;
    const closeBtn = document.createElement('button');


    modal.append(idEl, descriptionEl, closeBtn);

    return modal;
};

//detail.addEventListener()


const getData = () => {
    fetch('https://lit-cliffs-43895.herokuapp.com/api/vacancy')
        .then(response => response.json())
        .then(data => {
            const app = data.map(id => id.id);
            console.log(typeof app[0]);
            const cards = data.map(createCard);
            city.append(...cards);
        })
};

getData();




/*
[
    {
        "id": "С004",
        "brand": "Calvin Klein",
        "price": "775",
        "size": "M",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С011",
        "brand": "Calvin Klein",
        "price": "825",
        "size": "S",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С012",
        "brand": "Calvin Klein",
        "price": "775",
        "size": "S, M",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С013",
        "brand": "Calvin Klein",
        "price": "825",
        "size": "M",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С014",
        "brand": "Calvin Klein",
        "price": "825",
        "size": "XS, S",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С020",
        "brand": "Calvin Klein",
        "price": "1150",
        "size": "M",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С022",
        "brand": "Calvin Klein",
        "price": "985",
        "size": "M, L",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С023",
        "brand": "Calvin Klein",
        "price": "875",
        "size": "M",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С024",
        "brand": "Calvin Klein",
        "price": "750",
        "size": "M",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С028",
        "brand": "Calvin Klein",
        "price": "875",
        "size": "M",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С030",
        "brand": "Calvin Klein",
        "price": "925",
        "size": "M",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С033",
        "brand": "Calvin Klein",
        "price": "925",
        "size": "M",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С034",
        "brand": "Calvin Klein",
        "price": "825",
        "size": "S, M",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С036",
        "brand": "Calvin Klein",
        "price": "825",
        "size": "S",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С038",
        "brand": "Calvin Klein",
        "price": "975",
        "size": "L",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С039",
        "brand": "Calvin Klein",
        "price": "775",
        "size": "S",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С040",
        "brand": "Calvin Klein",
        "price": "875",
        "size": "S",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С041",
        "brand": "Calvin Klein",
        "price": "975",
        "size": "S",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С042",
        "brand": "Calvin Klein",
        "price": "975",
        "size": "M, L",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С050",
        "brand": "Calvin Klein",
        "price": "875",
        "size": "L",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "С051",
        "brand": "Calvin Klein",
        "price": "1150",
        "size": "S, M, L",
    "description": "Футболка Calvin Klein, состав хлопок 100%",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    }
]*/
