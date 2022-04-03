const allItems = document.querySelector('.all_item');
const modalItem = document.querySelector('.details');


const getData = () => {
    fetch(`https://lit-cliffs-43895.herokuapp.com/api/vacancy`)
        .then(response => response.json())
        .then(data => {
            const cards = data.map(createCard);
            allItems.append(...cards);
        });
};

getData();

const getId = ({id} = {}) => {

    const URL = 'https://lit-cliffs-43895.herokuapp.com/api/vacancy';
    let url = `${URL}/${id ? id : '' }`;

    return fetch(url).then(response => response.json());
};

getId();

const createCard = (item) =>{
    const { brand, id, size, price} = item;

    const card = document.createElement('div');
    card.insertAdjacentHTML('afterbegin', ` 
        <div class="item">
            <img src="img/${id}.jpg" class="item_img" alt="C001">
            <div class="item_brand">${brand}</div>
            <div class="item_id"><span>Артикул: </span><span>${id}</span></div>
            <div class="item_size"><span>Размер: </span><span>${size}</span></div>           
            <div class="item_price"><span>Цена: </span><span>${price} грн</span></div>
            <button class="item_button" data-item="${id}">Подробнее</button>
        </div>         
    `);

    return card;
};
/*
*<div class="modal">
        <img src="img/C020.jpg" class="details_img" alt="">
        <div class="details_item">
            <h2>Замеры:</h2>
            <div>Размер S</div>
            <div>Плечи 43см</div>
            <div>Ширина подмышками 48см</div>
            <div>Длина 70см</div>
        </div>
        <button class="modal_close" data-item="012">✕</button>
    </div>composition,
    * */
const createModal = (data) =>{
    const { id, size, detailsW1, detailsW2, detailsH } = data;

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const img = document.createElement('img');
    img.src = `img/${id}.jpg`;
    img.classList.add('details_img');

    const detailsItem = document.createElement('div');
    detailsItem.classList.add('details_item');

    const details = document.createElement('h2');
    details.textContent = 'Замеры:';

    const detailsSize = document.createElement('div');
    detailsSize.textContent = 'Размер  ' + size;

    const detailsWidth = document.createElement('div');
    detailsWidth.textContent = 'Плечи:  ' + detailsW1 + 'см';

    const detailsWidthTwo = document.createElement('div');
    detailsWidthTwo.textContent = 'Ширина подмышками:  ' + detailsW2 + 'см';

    const detailsHight = document.createElement('div');
    detailsHight.textContent = 'Длина по спине:  ' + detailsH + 'см';

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('modal_close');
    closeBtn.textContent = '✕';

    detailsItem.append(details, detailsSize, detailsWidth, detailsWidthTwo, detailsHight);

    modal.append(closeBtn, img, detailsItem);

    return modal;
};

const modalHandler = () => {
    allItems.addEventListener('click', async (e) => {
        const target = e.target;
        if (target.dataset.item) {
            e.preventDefault();
            modalItem.classList.add('details_active');
            const data = await getId({id: target.dataset.item});
            const modal = createModal(data);
            modalItem.append(modal);
        }
    });

    modalItem.addEventListener('click', (e) => {
        const target = e.target;

        if (target === modalItem || target.classList.contains('modal_close')) {
            modalItem.classList.remove('details_active');
            modalItem.textContent = '';
        }
    });
};

modalHandler();







/*
[
    {
        "id": "C004",
        "brand": "Calvin Klein",
        "price": "775",
        "size": "M",
        "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
        "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
        "date": "30/03/2022",
        "employer": "HFLabs",
        "country": "calvin klein",
        "employment": "",
        "skills": ""
    },
    {
        "id": "C011",
        "brand": "Calvin Klein",
        "price": "825",
        "size": "S",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C012",
        "brand": "Calvin Klein",
        "price": "775",
        "size": "S, M",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C013",
        "brand": "Calvin Klein",
        "price": "825",
        "size": "M",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C014",
        "brand": "Calvin Klein",
        "price": "825",
        "size": "XS, S",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C020",
        "brand": "Calvin Klein",
        "price": "1150",
        "size": "M",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C022",
        "brand": "Calvin Klein",
        "price": "985",
        "size": "M, L",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C023",
        "brand": "Calvin Klein",
        "price": "875",
        "size": "M",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C024",
        "brand": "Calvin Klein",
        "price": "750",
        "size": "M",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C028",
        "brand": "Calvin Klein",
        "price": "875",
        "size": "M",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C030",
        "brand": "Calvin Klein",
        "price": "925",
        "size": "M",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C033",
        "brand": "Calvin Klein",
        "price": "925",
        "size": "M",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C034",
        "brand": "Calvin Klein",
        "price": "825",
        "size": "S, M",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C036",
        "brand": "Calvin Klein",
        "price": "825",
        "size": "S",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C038",
        "brand": "Calvin Klein",
        "price": "975",
        "size": "L",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C039",
        "brand": "Calvin Klein",
        "price": "775",
        "size": "S",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C040",
        "brand": "Calvin Klein",
        "price": "875",
        "size": "S",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C041",
        "brand": "Calvin Klein",
        "price": "975",
        "size": "S",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C042",
        "brand": "Calvin Klein",
        "price": "975",
        "size": "M, L",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C050",
        "brand": "Calvin Klein",
        "price": "875",
        "size": "L",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    },
    {
        "id": "C051",
        "brand": "Calvin Klein",
        "price": "1150",
        "size": "S, M, L",
    "composition": "100% хлопок",
        "detailsW1": "43",
        "detailsW2": "48",
        "detailsH": "70",
    "date": "30/03/2022",
    "employer": "HFLabs",
    "country": "calvin klein",
    "employment": "",
    "skills": ""
    }
]*/
