const allItems = document.querySelector('.all_item');
const modalItem = document.querySelector('.details');
const element = document.querySelector('.search_choices');

const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: ''
});

const declOfNum = (n, titles) => {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
};

const result = document.querySelector('.title h2');
const number = document.querySelector('.brand_result span');
let values = null;

const filterApply = document.getElementById('filter_apply');
const filterReset = document.getElementById('filter_reset');
const resetCheck = document.querySelectorAll('.filter_check input');

function getCheckedBrand() {
    return Array.from(document.querySelectorAll('#filter_brand input[type="checkbox"]'))
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
}

function getCheckedSize() {
    return Array.from(document.querySelectorAll('#filter_size input[type="checkbox"]'))
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
}

function removeCheck() {
    for(let i = 0; i < resetCheck.length; i++){
        if(resetCheck[i].type === 'checkbox'){
            resetCheck[i].checked = false;
        }
    }
    return resetCheck;
}

filterReset.addEventListener('click', (e) => {
    e.preventDefault();
    removeCheck();
    result.textContent = 'All t-shirt';
    allItems.textContent = '';
    getData();
});

filterApply.addEventListener('click', (e) => {
    e.preventDefault();

    if (getCheckedBrand().length !== 0){
        if (getCheckedSize().length !== 0){
            allItems.textContent = '';
            getFilterSize();
        } else {
            result.textContent = 'Выберите размер';
            allItems.textContent = '';
            setTimeout (function () {
                result.textContent = 'All t-shirt';
                getData();
            }, 1000);
        }

    } else{
        result.textContent = 'Выберите бренд';
        allItems.textContent = '';
        setTimeout (function () {
            result.textContent = 'All t-shirt';
            getData();
        }, 1000);
    }
});

element.addEventListener('change', (e) => {
    result.textContent = '';
    allItems.textContent = '';
    values = e.target.value;
    if (values){
        getLoadItem();
    } else {
        result.textContent = 'All t-shirt';
        getData();
    }
});

// const getFilterBrands = () => {
//     fetch(`https://lit-cliffs-43895.herokuapp.com/api/vacancy`)
//         .then(response => response.json())
//         .then(data => {
//             const cards = data.filter((data) => getCheckedValues().includes(data.brand)).map(createCard);
//             allItems.append(...cards);
//             const nums = cards.length;
//             result.textContent = `найдено ${declOfNum( nums,['модель', 'модели', 'моделей'])} "${getCheckedValues()}":`;
//         });
// };

// const getFilterSize = () => {
//     fetch(`https://lit-cliffs-43895.herokuapp.com/api/vacancy`)
//         .then(response => response.json())
//         .then(data => {
//             const cards = data.filter(data => data.size.some(i => getCheckedValues2().includes(i))).map(createCard);
//             allItems.append(...cards);
//             const nums = cards.length;
//             result.textContent = `найдено ${declOfNum( nums,['модель', 'модели', 'моделей'])} "${getCheckedValues()}":`;
//         });
// };


const getFilterSize = () => {
    fetch(`https://lit-cliffs-43895.herokuapp.com/api/vacancy`)
        .then(response => response.json())
        .then(data => {
            const cards = data.filter((data) => getCheckedBrand().includes(data.brand)).filter(data => data.size.some(i => getCheckedSize().includes(i))).map(createCard);
            allItems.append(...cards);
            const nums = cards.length;
            result.textContent = `Найдено ${declOfNum( nums,['модель', 'модели', 'моделей'])} "${getCheckedBrand()}":`;
        });
};

const getLoadItem = () => {
    fetch(`https://lit-cliffs-43895.herokuapp.com/api/vacancy`)
        .then(response => response.json())
        .then(data => {
            const cards = data.filter((data) => values.includes(data.brand)).map(createCard);
            allItems.append(...cards);
            const nums = cards.length;
            result.textContent = `найдено ${declOfNum( nums,['модель', 'модели', 'моделей'])} "${values}":`;
        });
};

const getData = () => {
    fetch(`https://lit-cliffs-43895.herokuapp.com/api/vacancy`)
        .then(response => response.json())
        .then(data => {
            //console.log(Object.values(data[0].size));
            const cards = data.map(createCard);
            allItems.append(...cards);
        });

};

getData();

const getDataId = ({id} = {}) => {
    const URL = 'https://lit-cliffs-43895.herokuapp.com/api/vacancy';
    let url = `${URL}/${id ? id : '' }`;

    return fetch(url).then(response => response.json());
};

getDataId();

const createCard = (item) =>{
    const { brand, id, size, price} = item;

    const card = document.createElement('div');
    card.insertAdjacentHTML('afterbegin', ` 
        <div class="item">
            <img src="img/${id}.jpg" class="item_img" alt="C001">
            <div class="item_brand">${brand}</div>
            <div class="item_id"><span>Артикул: </span><span>${id}</span></div>
            <div class="item_size"><span>Размер: </span><span>${size.join(', ')}</span></div>           
            <div class="item_price"><span>Цена: </span><span>${price}</span></div>
            <button class="item_button" data-item="${id}">Подробнее</button>
        </div>         
    `);

    return card;
};

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
            const data = await getDataId({id: target.dataset.item});
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
const getFilterSize = () => {

    fetch(`https://lit-cliffs-43895.herokuapp.com/api/vacancy`)
        .then(response => response.json())
        .then(data => {
            const arr1 = ['Calvin Klein', 'Guess', 'Levis', 'Puma', 'Jack Jones'];
            const arr3 = ['S', 'M', 'L'];
            let arr2 = [];
            let arr4 = [];
            if (getCheckedBrand().length !== 0){
                arr2 = getCheckedBrand();
            } else{
                arr2 = getCheckedBrand().concat(arr1);
            }
            if (getCheckedSize().length !== 0){
                arr4 = getCheckedSize();
            } else{
                arr4 = getCheckedSize().concat(arr3);
            }
            const cards = data.filter((data) => arr2.includes(data.brand)).filter(data => data.size.some(i => arr4.includes(i))).map(createCard);
            allItems.append(...cards);
            const nums = cards.length;
            result.textContent = `Найдено ${declOfNum( nums,['модель', 'модели', 'моделей'])} "${arr2}":`;
        });
};

const getLoadItem = () => {
    fetch(`https://lit-cliffs-43895.herokuapp.com/api/vacancy`)
        .then(response => response.json())
        .then(data => {
            const cards = data.filter((data) => values.includes(data.brand)).map(createCard);
            allItems.append(...cards);
            const nums = cards.length;
            result.textContent = `найдено ${declOfNum( nums,['модель', 'модели', 'моделей'])} "${values}":`;
        });
};

]*/
