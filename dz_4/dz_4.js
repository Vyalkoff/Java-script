
// 1) Написать функцию, преобразующую число в объект.
// Передавая на вход число от 0 до 999, надо получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни.
// Например, для числа 245 надо получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}.
// Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект
function getObject(number) {

    if (number > 999) {
        console.log('число не должно превышать 999');
        return {};

    }
    return {
        units: number % 10,
        dozens: Math.floor(number / 10) % 10,
        hundreds: Math.floor(number / 100) % 10,

    };

}

console.log(getObject(945))

/*
2) Продолжить работу с интернет - магазином:
В прошлом домашнем задании вы реализовали корзину на базе массивов.Какими объектами можно заменить их элементы ?
    Реализуйте такие объекты.
Перенести функционал подсчета корзины на объектно - ориентированную базу. */

const basket = {
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
    countBasketPrice() {
        var counting = 0;
        for (var i = 0; i < this.product.length; i++) {
            counting += this.product[i].count * this.product[i].price
        }
        return counting


    }


};






console.log(basket.countBasketPrice())