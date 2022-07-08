const allItems = document.querySelector('.all_item');
const modalItem = document.querySelector('.details');
const element = document.querySelector('.search_choices');

// const choices = new Choices(element, {
//     searchEnabled: false,
//     itemSelectText: ''
// });

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

// change
// element.addEventListener('change', (e) => {
//     result.textContent = '';
//     allItems.textContent = '';
//     values = e.target.value;
//     if (values){
//         getLoadItem();
//     } else {
//         result.textContent = 'All t-shirt';
//         getData();
//     }
// });

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

const createCard = (data) =>{
    const { brand, id, size, price} = data;

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

// filters

const btnReset = document.querySelectorAll('.btn_delete');
const btnApply = document.querySelectorAll('.btn_apply');
const filterCheck = document.querySelectorAll('.filters_list input');

// filterLabel.forEach(filter =>
//     filter.addEventListener('click', () => {
//         if (filter){
//             // filterList.classList.remove('filters_active')
//             filter.nextElementSibling.classList.toggle('filters_active');
//         } else {
//             filter.nextElementSibling.classList.toggle('filters_active');
//         }
//     })
// );


// menu desctop
// const filters = document.querySelectorAll('.filters');
// for (const filter of filters) {
//     const filterItems = filter.querySelectorAll('.filters_item');
//     for (const filterItem of filterItems) {
//         const filtersLabel = filterItem.querySelector('.filters_label');
//         filtersLabel.addEventListener('click', () => {
//             for (const otherfilterItems of filterItems) {
//                 if (otherfilterItems !== filterItem) {
//                     otherfilterItems.classList.remove('filters_active');
//                 }
//             }
//             filterItem.classList.toggle('filters_active');
//         });
//     }
// }

function removeFilterCheck() {
    for(let i = 0; i < filterCheck.length; i++){
        if(filterCheck[i].type === 'checkbox'){
            filterCheck[i].checked = false;
        }
    }
    return filterCheck;
}

btnReset.forEach(filter =>
    filter.addEventListener('click', () => {
        removeFilterCheck();
        filterBlock.style.display = 'none'
        filter.closest('.open').classList.remove('open');
        allItems.textContent = '';
        result.textContent = 'All t-shirt';
        getData();
        filter.closest('.filters_active').classList.remove('filters_active');
    })
);

function getFilterBrand() {
    const checkerBrand = document.querySelectorAll('#filterBrand input[type="checkbox"] ')
    const arrayBrand = ['Calvin Klein', 'Guess', 'Levis', 'Puma', 'Jack Jones']
    const arrayCheckerBrand = Array.from(checkerBrand).filter((checkbox) => checkbox.checked)

    if (arrayCheckerBrand.length > 0){
        return arrayCheckerBrand.map((checkbox) => checkbox.value);
    } else {
        return arrayBrand
    }
}

function getFiltersSize() {
    const checkerSize = document.querySelectorAll('#filterSize input[type="checkbox"] ')
    const arraySize = ['S', 'M', 'L']
    const arrayCheckerSize = Array.from(checkerSize).filter((checkbox) => checkbox.checked)

    if (arrayCheckerSize.length > 0){
        return arrayCheckerSize.map((checkbox) => checkbox.value);
    } else {
        return arraySize
    }
}

function getFilterColor() {
    const checkerColor = document.querySelectorAll('#filterColor input[type="checkbox"] ')
    const arrayColor = ['black', 'white', 'blue', 'red', 'grey', 'orange', 'yellow']
    const arrayCheckerColor = Array.from(checkerColor).filter((checkbox) => checkbox.checked)

    if (arrayCheckerColor.length > 0){
        return arrayCheckerColor.map((checkbox) => checkbox.value);
    } else {
        return arrayColor
    }
}

const getFilters = () => {
    fetch(`https://lit-cliffs-43895.herokuapp.com/api/vacancy`)
        .then(response => response.json())
        .then(data => {

            const cards = data
                .filter( data => getFilterBrand().includes(data.brand))
                .filter(data => data.size.some(i => getFiltersSize().includes(i)))
                .filter( data => getFilterColor().includes(data.color))
                .map(createCard)

            allItems.append(...cards);

            const nums = cards.length;
            result.textContent = `Найдено ${declOfNum( nums,['модель', 'модели', 'моделей'])} "${getFilterBrand()}":`;
        });
};

btnApply.forEach(filter =>
    filter.addEventListener('click', (e) => {
        e.preventDefault();

        filterBlock.style.display = 'none'
        filter.closest('.open').classList.remove('open');
        allItems.textContent = '';
        getFilters();

        filter.closest('.filters_active').classList.remove('filters_active');
    })
);


// if(getFilters()){
//     allItems.textContent = '';
//     getFilters();
// } else{
//     result.textContent = 'Выберите размер';
//     allItems.textContent = '';
//     setTimeout (function () {
//         result.textContent = 'All t-shirt';
//         getData();
//     }, 1000);
// }


if (document.documentElement.clientWidth < 992) {

} else {

}
const menu = document.querySelectorAll('.menu_link');
const MenuClose = document.querySelectorAll('.menu_item_link');
for ( let i = 0; i < menu.length; i++ ) {
    const subMenu = menu[i].nextElementSibling;
    menu[i].addEventListener('click', () => {
        subMenu.classList.add('open');
    });
    MenuClose[i].addEventListener('click', () => {
        subMenu.classList.remove('open');
    });
}

const accordions = document.querySelectorAll('.submenu');
for (const accordion of accordions) {
    const panels = accordion.querySelectorAll('.submenu_item');
    for (const panel of panels) {
        const head = panel.querySelector('.submenu_item_link');
        head.addEventListener('click', () => {
            for (const otherPanel of panels) {
                if (otherPanel !== panel) {
                    otherPanel.classList.remove('submenu_open');
                }
            }
            panel.classList.toggle('submenu_open');
        });
    }
}

const menu1 = document.querySelectorAll('.filters_label');
const MenuClose1 = document.querySelectorAll('.block');
for ( let i = 0; i < menu1.length; i++ ) {
    const subMenu1 = menu1[i].nextElementSibling;
    menu1[i].addEventListener('click', () => {
        subMenu1.classList.add('open');
    });
    MenuClose1[i].addEventListener('click', () => {
        subMenu1.classList.remove('open');
    });
}

const openFilter = document.querySelector('.filter_xs')
const openFilters = document.querySelector('.filter_x')
const filterBlock = document.querySelector('.filter_block')
openFilter.addEventListener('click', () =>{
    filterBlock.style.display = 'flex'
})
openFilters.addEventListener('click', () =>{
    filterBlock.style.display = 'none'
})