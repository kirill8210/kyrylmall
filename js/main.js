import getProducts from "./getProducts.js";
import declinationOfNumber from "./declinationOfNumber.js";

let allProducts = [];
const allItems = document.querySelector('.all_item');
const labelBrands = document.querySelector('.filters_list');
const labelSizes = document.querySelector('.block_label_sizes');
const labelColors = document.querySelector('.block_label_colors');
const titleOfFilters = document.querySelector('.title h2');

const createCard = (allProducts) =>{
    const { brand, id, size, price} = allProducts;

    const card = document.createElement('div');
    card.insertAdjacentHTML('afterbegin', ` 
        <div class="item">
            <img src="img/${id}.jpg" class="item_img" alt="C001">
            <div class="item_brand">${brand}</div>
            <div class="item_id"><span>Артикул: </span><span>${id}</span></div>
            <div class="item_size"><span>Розмір: </span><span>${size.join(', ')}</span></div>           
            <div class="item_price"><span>Ціна: </span><span>${price}</span></div>
            <button class="item_button" data-item="${id}">Докладніше</button>
        </div>         
    `);

    return card;
};

const createSelectBrands = (brand) =>{
    const list = document.createElement('label');
    list.classList.add('filters_list_item');

    list.insertAdjacentHTML('afterbegin', ` 
        <p>${brand}</p>
        <input type="checkbox" value="${brand}" name="size">
        <span></span>
    `);

    return list;
};

const createSelectSizes = (size) =>{
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

const createSelectColors = (color) =>{
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
const modalItem = document.querySelector('.details');

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
    details.textContent = 'Заміри:';

    const detailsSize = document.createElement('div');
    detailsSize.textContent = 'Розмір  ' + size;

    const detailsWidth = document.createElement('div');
    detailsWidth.textContent = 'Плечі:  ' + detailsW1 + 'см';

    const detailsWidthTwo = document.createElement('div');
    detailsWidthTwo.textContent = 'Груди:  ' + detailsW2 + 'см';

    const detailsHight = document.createElement('div');
    detailsHight.textContent = 'Довжина:  ' + detailsH + 'см';

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
    filingSelectsBrands();
    filingCards(products);
};

const filingCards = () => {
    const products = [...allProducts];
    allItems.textContent = '';
    const cards = products.map(createCard);
    allItems.append(...cards);
}

const filteringProducts = (allProducts) => {
    const products = [...allProducts];
    const filtersProducts = products
        .filter( product => getCheckedBrand().includes(product.brand))
        .filter(data => data.size.some(product => getCheckedSize().includes(product)))
        .filter( product => getCheckedColor().includes(product.color))
        .map(createCard);

        allItems.textContent = '';
        allItems.append(...filtersProducts);

        const nums = filtersProducts.length;
        titleOfFilters.textContent = `Знайдено ${declinationOfNumber( nums,['модель', 'моделі', 'моделей'])} "${getCheckedBrand()}":`;
};

const sortedSizes = (size) => {
    const sizeCharts = {
        'XS': 1,
        'S': 2,
        'M': 3,
        'L': 4,
        'XL': 5
    };

    const sortedArray = size.sort((a, b) => {
        return sizeCharts[a] - sizeCharts[b]
    });

    return sortedArray;
}

const brandsOfSite = () => {
    const products = [...allProducts];
    return [...new Set(products.map(i => i.brand))].sort();
}

const sizesOfSite = () => {
    const products = [...allProducts];
    const size = products.map(i => i.size).reduce((acc, size) => {
        return acc + ',' + size
    });

    return sortedSizes([...new Set(size.replaceAll(',' , ' ').split(' '))]);
}

const colorsOfSite = () => {
    const products = [...allProducts];
    return [...new Set(products.map(i => i.color))].sort();
}

const filingSelectsBrands = () => {
    const selectBrands = brandsOfSite().map(createSelectBrands);
    labelBrands.append(...selectBrands);

    const selectSizes = sizesOfSite().map(createSelectSizes);
    labelSizes.append(...selectSizes);

    const selectColors = colorsOfSite().map(createSelectColors);
    labelColors.append(...selectColors);
}

//checked select
const btnReset = document.querySelectorAll('.btn_delete');
const btnApply = document.querySelectorAll('.btn_apply');
const filterCheck = document.querySelectorAll('.filters_list input');
const openFilters = document.querySelector('.filter_xs');
const filterBlock = document.querySelector('.filter_block');
const closeFilters = document.querySelector('.close_filters');
const filterXs = document.querySelector('.filters_apply_xs');

function getCheckedBrand() {
    const checkedBrands = document.querySelectorAll('#filterBrand input[type="checkbox"]')
    const arrayCheckedBrands = Array.from(checkedBrands)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
    if (arrayCheckedBrands.length > 0){
        return arrayCheckedBrands;
    } else {
        return brandsOfSite()
    }
}

function getCheckedSize() {
    const checkedSizes = document.querySelectorAll('#filterSize input[type="checkbox"] ')
    const arrayCheckedSizes = Array.from(checkedSizes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
    if (arrayCheckedSizes.length > 0){
        return arrayCheckedSizes;
    } else {
        return sizesOfSite();
    }
}

function getCheckedColor() {
    const checkerColor = document.querySelectorAll('#filterColor input[type="checkbox"] ');
    const arrayCheckerColor = Array.from(checkerColor)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
    if (arrayCheckerColor.length > 0){
        return arrayCheckerColor;
    } else {
        return colorsOfSite();
    }
}

btnApply.forEach(filter =>
    filter.addEventListener('click', (e) => {
        e.preventDefault();

        filteringProducts(allProducts);
        if (document.documentElement.clientWidth > 992) {
            filter.closest('.filters_active').classList.remove('filters_active');
        } else {
            filterBlock.style.display = 'none';
            filter.closest('.open').classList.remove('open');
        }
    })
);

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

        allItems.textContent = '';
        titleOfFilters.textContent = 'All t-shirts';
        orderBy.value = '1';
        filingCards();
        if (document.documentElement.clientWidth > 992) {
            filter.closest('.filters_active').classList.remove('filters_active');
        } else {
            filterBlock.style.display = 'none';
            filter.closest('.open').classList.remove('open');
        }
    })
);

const orderBy = document.querySelector('#order_by');
const sortBlock = document.querySelector('.filter_sort .filters_item');
const sortTitleLabel = document.querySelector('.filters_label_sort');
const sortList = document.querySelector('.filters_list_sort');
const sortLabelMobile = document.querySelector('.filters_label_xs');

const sortProducts = () => {
    switch (orderBy.value) {
        case 'up':
            return allProducts.sort((a, b) => a.price > b.price ? 1 : -1);
            break;
        case 'down':
            return allProducts.sort((a, b) => b.price > a.price ? 1 : -1);
            break;
        default:
            return allProducts;
    }
}

sortList.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('filters_list_item_sort')){
        sortTitleLabel.textContent = target.textContent;
        orderBy.value = target.dataset.sort;
        sortLabelMobile.textContent = target.textContent;

        allItems.textContent = '';
        sortProducts();
        filteringProducts(sortProducts());

        sortBlock.classList.remove('filters_active');
        for (const el of sortList.querySelectorAll('.filters_list_item_sort')){
            if (el === target){
                el.classList.add('option__item_active');
            } else {
                el.classList.remove('option__item_active');
            }
        }
    }
});

const menu1 = document.querySelectorAll('.filters_label');
const MenuClose1 = document.querySelectorAll('.block');
for (let i = 0; i < menu1.length; i++) {
    const subMenu1 = menu1[i].nextElementSibling;
    menu1[i].addEventListener('click', () => {
        subMenu1.classList.add('open');
    });
    MenuClose1[i].addEventListener('click', () => {
        subMenu1.classList.remove('open');
    });
};

openFilters.addEventListener('click', () => {
    filterBlock.style.display = 'flex';

});

closeFilters.addEventListener('click', () => {
    filterBlock.style.display = 'none';
});

const init = async () => {
    allProducts = await getProducts();
    renderProducts();
    modalHandler();
};

init();
