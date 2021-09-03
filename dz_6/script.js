const catalog = {
    div_basket: document.querySelector('.basket'),
    product: [
        {
            name: 'monitor',
            count: 10,
            price: 15000
        },
        {
            name: 'laptop',
            count: 3,
            price: 30000
        },

        {
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
            <button>Купить</button><hr>
        </div>`;
    },

    getcatalog() {

        if (this.product.length) {
            this.product.forEach(element => {
                this.div_basket.insertAdjacentHTML('beforeend', this.getBlock(element));
                // this.div_basket.insertAdjacentHTML('beforeend', this.addBtn());

            })
            //     this.div_basket.insertAdjacentHTML('beforeend', `<p>В корзине: ${this.product.length} товара(ов) на сумму ${this.getTotal()} рублей</p>`);
            // } else {
            //     this.div_basket.insertAdjacentText('beforeend', '«Корзина пуста»');


        };

    },

    addBtn() {



    },

    getTotal() {
        return this.product.reduce((total, amount) => total += amount.price * amount.count, 0)

    },
    clearBasket() {
        this.product = []
    }





};

const basket = {
    basketProduct: [],

    init() {

    }



};




// basket.clearBasket();
catalog.getcatalog();