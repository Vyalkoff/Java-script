// 1) С помощью цикла while вывести все простые числа в промежутке от 0 до 100.
var n = 2
let arr = [];

while (n <= 100) { arr.push(n); n++ } //массив от 2 до 100

var i = 2;
var j = 1;

while (i ** 2 < arr.length) {
    while (j < arr.length) {
        if (arr[j] === 0) {
            j++
            continue;
        }
        if (arr[j] % i === 0) { arr[j] = 0 }
        j++
    }
    i++
    j = i - 1
}

let arr_erat = []
var v = 0
while (v < arr.length) { // перекидываю простые числа в другой массив
    if (arr[v] !== 0) {
        arr_erat.push(arr[v])
    }
    v++
}
console.log(arr_erat)

/*  2)-3) С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
Товары в корзине хранятся в массиве. Задачи:
Организовать такой массив для хранения товаров в корзине;
Организовать функцию countBasketPrice, которая будет считать стоимость корзины.
 */

var basket = [['monitor', 10, 15000], ['laptop', 3, 30000], ['printer', 4, 10000]]

function countBasketPrice() {
    var sum = 0;
    for (var i = 0; i < basket.length; i++) {
        sum += basket[i][1] * basket[i][2];
    }
    return sum;
}
console.log(countBasketPrice(basket));
/* 4) * Вывести с помощью цикла for числа от 0 до 9, не используя тело цикла. Выглядеть это должно так:
 for(...){// здесь пусто}*/

for (var i = 0; i < 10; console.log(i), i++);

//* Нарисовать пирамиду с 20 рядами с помощью console.log, как показано на рисунке:
var a = 'x';
for (var i = 0; i < 20; i++) {
    console.log(a);
    a += 'x';
};

