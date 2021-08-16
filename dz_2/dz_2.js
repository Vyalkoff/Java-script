// 1) Почему код дает именно такие результаты?
var a = 1, b = 1, c, d;
c = ++a; alert(c); // 2 возвращает значение a после того, как оно было увеличено a=2
d = b++; alert(d); // 1  возвращает значение b до приращения. b = 2
c = (2 + ++a); alert(c); // 5 увеличит a  на 1 и прибавить 2
d = (2 + b++); alert(d); // 4 вернуть произведение а затем увеличить b на 1
alert(a); // 3
alert(b); // 3

// 2) Чему будет равен x?
var a = 2;
var x = 1 + (a *= 2);// сначало в скобках выражение 4 потом +1 и будет x = 5



/* 3) Объявить две целочисленные переменные — a и b и задать им произвольные начальные значения. Затем написать скрипт,
который работает по следующему принципу:
если a и b положительные, вывести их разность;
если а и b отрицательные, вывести их произведение;
если а и b разных знаков, вывести их сумму;*/
var a = -5
var b = 4

if (a && b > 0) {
    console.log(a / b);
} else if (a && b < 0) {
    console.log(a * b);
} else if (Math.sign(a) != Math.sign(b)) {
    console.log(a * b);
}
 /* 4) Присвоить
    переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15. */ var
    a = 7;
switch (a) {
    case 1: console.log('1')
    case 2: console.log('2')
    case 3: console.log('3')
    case 4: console.log('4')
    case 5: console.log('5')
    case 6: console.log('6')
    case 7: console.log('7')
    case 8: console.log('8')
    case 9: console.log('9')
    case 10: console.log('10')
    case 11: console.log('11')
    case 12: console.log('12')
    case 13: console.log('13')
    case 14: console.log('14')
    case 15: console.log('15')
}
/* 5) Реализовать четыре основные
арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return. */
function plus(a, b) {
    return a + b
}
function minus(a, b) {
    return a - b
}
function multiply(a, b) {
    return a * b
}
function divide(a, b) {
    return a / b
}
 /* 6) Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2,
    operation), где arg1, arg2 — значения аргументов, operation — строка с названием операции. В зависимости от
    переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть
    полученное значение (применить switch).*/ function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case '-':
            minus(arg1, arg2)
            break;
        case '+':
            plus(arg1, arg2)
            break;
        case '*':
            multiply(arg1, arg2)
            break;
        case '/':
            divide(arg1, arg2)
            break;
    }
} // 7) Сравнить null и 0. Объяснить результат. 
console.log(null == 0)//null это отсутсвие обьектного значение, а 0 это число 
/* 8) С помощью рекурсии организовать функцию возведения числа в
    степень. Формат: function power(val, pow), где val — заданное число, pow –— степень*/
function power(val, pow) {
    if (pow === 1) {
        return val
    } else {
        return val * power(val, pow - 1)
    }

}
console.log(power(2, 4))