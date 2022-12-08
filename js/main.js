import getProducts from "./getProducts.js";

let allProducts = [];
const allItems = document.querySelector('.all_item');
const labelBrands = document.querySelector('.block_label_brands');
const labelSizes = document.querySelector('.block_label_size');
const labelColors = document.querySelector('.block_label_colors');

const createCard = (allProducts) =>{
    const { brand, id, size, price} = allProducts;

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

const createSelectB = (brand) =>{
    const list = document.createElement('div');
    list.classList.add('block_label_brands');

    list.insertAdjacentHTML('afterbegin', ` 
        <label class="filters_list_item">
            <p>${brand}</p>
            <input type="checkbox" value="${brand}" name="size">
            <span></span>
        </label>     
    `);

    return list;
};

const createSelectS = (size) =>{
    const list = document.createElement('div');
    list.classList.add('block_label_sizes');

    list.insertAdjacentHTML('afterbegin', ` 
        <label class="filters_list_item">
            <p>${size}</p>
            <input type="checkbox" value="${size}" name="size">
            <span></span>
        </label>     
    `);

    return list;
};

const createSelectC = (color) =>{
    const list = document.createElement('div');
    list.classList.add('block_label_colors');

    list.insertAdjacentHTML('afterbegin', ` 
        <label class="filters_list_item">
            <p><span class="color_${color}"></span>${color}</p>
            <input type="checkbox" value="${color}" name="color">
            <span></span>
        </label>    
    `);

    return list;
};

//select
const filters = document.querySelectorAll('.filters');
for (const filter of filters) {
    const filterItems = filter.querySelectorAll('.filters_item');
    for (const filterItem of filterItems) {
        const filtersLabel = filterItem.querySelector('.filters_label');
        filtersLabel.addEventListener('click', () => {
            for (const otherfilterItems of filterItems) {
                if (otherfilterItems !== filterItem) {
                    otherfilterItems.classList.remove('filters_active');
                }
            }
            filterItem.classList.toggle('filters_active');
        });
    }
}

// modal
const descriptionProduct = ({id}) => {
    const product = allProducts
        .filter(product => product.id === id)
        .reduce((acc, i) => {
            return [
                acc,
                {
                    id: i.id,
                    size: i.size,
                    price: i.price,
                },
            ];
        })
    return product;
};

const createModal = (productId) =>{
    const { id, size, detailsW1, detailsW2, detailsH } = productId;

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
    allItems.addEventListener('click', (e) => {
        const target = e.target;
        if (target.dataset.item) {
            e.preventDefault();
            modalItem.classList.add('details_active');
            const detailsProduct = descriptionProduct({id: target.dataset.item});
            const modal = createModal(detailsProduct);
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

// render cards
const renderProducts = () => {
    const products = [...allProducts];
    filingSelectsBrands(products);
    filingCards(products);
};

const filingCards = (products) => {
    allItems.textContent = '';
    const cards = products.map(createCard);
    allItems.append(...cards);
}

const filingSelectsBrands = (products) => {
    const brands = [...new Set(products.map(i => i.brand))]
    const selectBrands = brands.map(createSelectB);
    labelBrands.append(...selectBrands);

    //const sizes = (allsize.concat(products.map(i => i.size)));
    // const sizes = [...new Set(products.map(i => i.size))]
    // allSize()
    // const selectSize = sizes.map(createSelectS);
    // labelSizes.append(...selectSize);
    const colors = [...new Set(products.map(i => i.color))]
    const selectColors = colors.map(createSelectC);
    labelColors.append(...selectColors);
}

const init = async () => {
    allProducts = await getProducts();
    renderProducts();
    modalHandler();
};

init();



















const modalItem = document.querySelector('.details');

const orderBy = document.querySelector('#order_by');

const declOfNum = (n, titles) => {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
};

const result = document.querySelector('.title h2');
//const number = document.querySelector('.brand_result span');
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

const getFilterSize = () => {
    fetch(apiT)
        .then(response => response.json())
        .then(data => {
            const cards = data.filter((data) => getCheckedBrand().includes(data.brand)).filter(data => data.size.some(i => getCheckedSize().includes(i))).map(createCard);
            allItems.append(...cards);
            const nums = cards.length;
            result.textContent = `Найдено ${declOfNum( nums,['модель', 'модели', 'моделей'])} "${getCheckedBrand()}":`;
        });
};

const getLoadItem = () => {
    fetch(apiT)
        .then(response => response.json())
        .then(data => {
            const cards = data.filter((data) => values.includes(data.brand)).map(createCard);
            allItems.append(...cards);
            const nums = cards.length;
            result.textContent = `найдено ${declOfNum( nums,['модель', 'модели', 'моделей'])} "${values}":`;
        });
};



// filters

const btnReset = document.querySelectorAll('.btn_delete');
const btnApply = document.querySelectorAll('.btn_apply');
const filterCheck = document.querySelectorAll('.filters_list input');

// menu desktop
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

        // if (document.documentElement.clientWidth < 992) {
        //     filterBlock.style.display = 'none'
        //     filter.closest('.open').classList.remove('open');
        // }

        allItems.textContent = '';
        result.textContent = 'All t-shirt';
        sortTitleLabel.textContent = 'сортировка';
        orderBy.value = 'date';
        const products = [...allProducts];
        filingCards(products);
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
    fetch(`https://kirill8210.github.io/api_kyrylmall/db.json`)
        .then(response => response.json())
        .then(data => {
            sortData(data)
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

const filterBlock = document.querySelector('.filter_block')
btnApply.forEach(filter =>
    filter.addEventListener('click', (e) => {
        e.preventDefault();

        // if (document.documentElement.clientWidth < 992) {
        //     filterBlock.style.display = 'none'
        //     filter.closest('.open').classList.remove('open');
        // }

        allItems.textContent = '';
        getFilters();

        filter.closest('.filters_active').classList.remove('filters_active');
    })
);

const sortData = (data) =>{

    switch (orderBy.value) {
        case 'up':
            data.sort((a, b) => a.price > b.price ? 1 : -1);
            break;
        case 'down':
            data.sort((a, b) => b.price > a.price ? 1 : -1);
            break;
        default:
            data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

};

const sortBlock = document.querySelector('.filter_sort .filters_item');
const sortTitleLabel = document.querySelector('.filters_label_sort');
const sortList = document.querySelector('.filters_list_sort');

sortList.addEventListener('click', (e) =>{
    const target = e.target;

    if (target.classList.contains('filters_list_item_sort')){
        sortTitleLabel.textContent = target.textContent;
        orderBy.value = target.dataset.sort;

        allItems.textContent = '';
        getFilters();

        sortBlock.classList.remove('filters_active');
        for (const el of sortList.querySelectorAll('.filters_list_item_sort')){
            if (el === target){
                el.classList.add('option__item_active');
            } else {
                el.classList.remove('option__item_active')
            }
        }
    }
});

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
/*
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
*/
const menu1 = document.querySelectorAll('#filters .filters_label');
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
}

const createSelectBlock = () =>{
    const select = document.createElement('div');
    select.classList.add('filters_item');

    const select_title = document.createElement('div');
    select_title.classList.add('filters_label');
    select_title.textContent = 'Бренд';

    const select_options = document.createElement('div');
    select_options.classList.add('filters_list_block');

    const filters_list = document.createElement('div');
    filters_list.classList.add('filters_list');
    filters_list.id = 'filterBrand';

    const block = document.createElement('div');
    block.classList.add('block');

    const  blockLinks = document.createElement('a');
    blockLinks.href = '#';

    const blockLinks_left = document.createElement('i');
    blockLinks_left.classList.add('i_left');
    blockLinks_left.textContent = 'brand';

    const filters_apply = document.createElement('div');
    filters_apply.classList.add('filters_apply');

    const btnReset = document.createElement('button');
    btnReset.classList.add('btn_delete');
    btnReset.textContent = 'Reset';

    const btnApply = document.createElement('button');
    btnApply.classList.add('btn_apply');
    btnApply.textContent = 'Apply';

    blockLinks.append(blockLinks_left)
    block.append(blockLinks);
    filters_list.append(block);
    filters_apply.append(btnReset, btnApply);
    select_options.append(filters_list, filters_apply);

    select.append(select_title, select_options);

    return select;
};