const catalog = {
    div_catalog: document.querySelector('.catalog'),

    product: [
        {
            art: 1253,
            name: 'monitor',
            count: 10,
            price: 15000
        },
        {
            art: 1896,
            name: 'laptop',
            count: 3,
            price: 30000
        },

        {
            art: 234,
            name: 'printer',
            count: 4,
            price: 10000
        }
    ],

    getBlock(good) {
        return `<div class="cart">
            <div><b>Наименование</b>: ${good.name}</div>
            <div><b>Цена</b>: ${good.price}</div>
            <div><b>Количество</b>: ${good.count}</div>
            <div><b>Стоимость</b>: ${good.count * good.price}</div><br>
            <button class='addBasketBtn' data-buy=${good.art}>Купить</button>
        </div>`;
    },
    init() {
        this.getCatalog();
        this.addBtn()


    },

    getCatalog() {

        if (this.product.length) {
            this.product.forEach(element => {
                this.div_catalog.insertAdjacentHTML('beforeend', this.getBlock(element));
            });
        };
    },
    addBtn() {





    },


    getTotal() {
        return this.product.reduce((total, amount) => total += amount.price * amount.count, 0)

    },





};

const basket = {
    div_basket: document.querySelector('.basket'),

    basketProduct: [

    ],
    init() {

        this.render();
        this.clearBasket();
        this.addBasket();

    },

    render() {

        if (this.getBasketLenght()) {
            this.basketProduct.forEach(element => {
                this.div_basket.insertAdjacentHTML('beforeend', this.getBasket(element));
            });

        } else {
            this.div_basket.innerHTML = '';
            this.div_basket.insertAdjacentHTML('beforeend', `В корзине ${this.getBasketLenght()} `)
        }
    },
    getBasketLenght() {
        return this.basketProduct.length

    },

    getBasket(product) {
        return `<div class='basket_product'>
        <h3>${product.name}</h3>
        <div><b>Цена</b>: ${product.price}</div>
        <div><b>Количество</b>: ${product.count}</div>
        <div><b>Стоимость</b>: ${product.count * product.price}</div>
        
        </div>`;

    },
    clearBasket() {

        let clr_btn = document.querySelector('.clr-basket')
        clr_btn.addEventListener('click', (event) => {
            this.basketProduct = [];
            this.render();



        });


    },
    addBasket() {
        document.querySelector('.catalog').addEventListener('click', event => {
            if (event.target.classList.contains('addBasketBtn')) {

                let art = event.target.dataset.buy
                let findProdCat = catalog.product.find(item => item.art == art);
                let findproduct = this.basketProduct.find(item => item.art == art)

                if (findproduct) {
                    findproduct.count++


                } else {
                    this.basketProduct.push(Object.assign(findProdCat, { count: 1 }));


                }
                this.div_basket.innerHTML = ''
                this.render();
            }
        });






    },




};





catalog.init();
basket.init();