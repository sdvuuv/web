function primeFactorization(n) {
    let i = 2;
    const primeFactors = [];
    while (n > 1) {
        if (n % i == 0) {
            primeFactors.push(i);
            n /= i;
            i--;
        }
        i++;

    }
    return primeFactors
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function eratosthenes(n) {
    primes = []
    for (let i = 0; i <= n; i++) {
        primes.push(i)
    }
    primes[1] = 0;
    let i = 2;
    while (i <= n) {
        if (primes[i] != 0) {
            let j = i + i;
            while (j <= n) {
                primes[j] = 0;
                j += i;
            }
        }
        i += 1;
    }
    const filteredNumbers = primes.filter((number) => number !== 0);
    return filteredNumbers;

}

function findDivisors(n) {
    divisors = [];
    for (let i = 1; i <= n; i++) {
        if (n % i == 0) {
            divisors.push(i)
        }
    }
    return divisors;
}

function sumOfThreePrimes(num, primes) {
    const len = primes.length;
    for (let i = 0; i < len; i++) {
        for (let j = i; j < len; j++) {
            for (let k = j; k < len; k++) {
                if (primes[i] + primes[j] + primes[k] === num) {
                    return true;
                }
            }
        }
    }
    return false;
}

function NOD() {
    for (var x = arguments[0], i = 1; i < arguments.length; i++) {
        var y = arguments[i];
        while (x && y) {
            x > y ? x %= y : y %= x;
        }
        x += y;
    }
    return x;
}

function divideByDigits(n) {
    let digits = n.toString().split('');
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
        digits[i] = parseInt(digits[i]);
    }

    return digits;
}

// 1. Составить программу, проверяющую, будут ли взаимно просты два натуральных (целых) числа.
const firstTask = (function() {
    let a = 13;
    let b = 17;
    const arr1 = primeFactorization(a);
    const arr2 = primeFactorization(b);
    if (arr1.length === 1 && arr2.length === 1 && arraysEqual(arr1, arr2) !== true) {
        console.log("Задание 1. Числа a и b взаимно просты");
    } else {
        console.log("Задание 1. Числа a и b не взаимно просты", arr1.length, arr2.length);

    }
})();

// 2.Составить программу, проверяющую, будет ли простым данное натуральное число.
const secondTask = (function() {
    let a = 13;
    const arr1 = primeFactorization(a);
    if (arr1.length === 1) {
        console.log("Задание 2. Число a простое");
    } else {
        console.log("Задание 2. Число a не простое", arr1.length);

    }
})();

// 3. Напишите программу, которая выводит на экран все простые числа из интервала 1..N, используя решето Эратосфена.

const thirdTask = (function() {
    let N = 20;
    console.log("Задание 3. ", eratosthenes(N))
})();

// 4. Написать программу, которая выводит на экран первые N простых чисел.
// Я уверена есть адекватный способ решения этой задачи, но я думать не хочу и написала первое что пришло в голову :)
const fourthTask = (function() {
    let N = 10;
    let len = 0;
    let c = 2;

    while (len !== N) {
        len = eratosthenes(c).length;
        c++;
    }
    console.log("Задание 4. ", eratosthenes(c - 1));

})();

// 5. Найти все делители натурального числа N.

const fifthTask = (function() {
    let N = 28;
    console.log("Задание 5. ", findDivisors(N));

})();

//6. Разложить целое число на простые множители. Вывести на экран все простые множители (в порядке возрастания) и их порядки.

const sixthTask = (function() {
    let N = 2888;
    console.log("Задание 6. ", primeFactorization(N));

})();

//7.  Натуральное число называется совершенным, если оно равно сумме всех своих делителей, включая единицу. Вывести первые N (N<5) совершенных чисел на экран.
const seventhTask = (function() {
    const arr = [];

    for (let i = 2; i < 10000; i++) {
        let sum = 0;
        findDivisors(i).forEach(function(num) {
            sum += num;
        });
        if (sum - i === i) {
            arr.push(i);

        }
        if (arr.length === 4) {
            break;
        }
    }

    console.log("Задание 7. ", arr);

})();
//8. Проверить, какие нечетные натуральные числа из интервала N..M можно представить в виде суммы трех простых чисел.

const eigthTask = (function() {
    const N = 2;
    const M = 40;

    function isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }

    function generatePrimes(maxLimit) {
        const primes = [];
        for (let i = 2; i <= maxLimit; i++) {
            if (isPrime(i)) {
                primes.push(i);
            }
        }
        return primes;
    }

    function sumOfThreePrimes(num, primes) {
        for (let i = 0; i < primes.length - 2; i++) {
            for (let j = i + 1; j < primes.length - 1; j++) {
                for (let k = j + 1; k < primes.length; k++) {
                    if (primes[i] + primes[j] + primes[k] === num) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function findOddNumbers(N, M) {
        const primes = generatePrimes(M);
        const result = [];

        for (let num = N; num <= M; num++) {
            if (num % 2 !== 0 && sumOfThreePrimes(num, primes)) {
                result.push(num);
            }
        }

        return result;
    }
    const oddNumbers = findOddNumbers(N, M);
    console.log("Задание 8. Нечетные числа, которые можно представить в виде суммы трех различных простых чисел:", oddNumbers);



})();

//9. Проверить, будет ли данное число числом Фибоначчи.
const nineTask = (function() {
    function isPerfectSquare(n) {
        if (n < 0) {
            return false;
        }
        return Math.sqrt(n) % 1 === 0;
    }
    let N = 15
    if (isPerfectSquare(5 * N * N + 4) || isPerfectSquare(5 * N * N - 4)) {
        console.log("Задание 9. Число N является числом фиббоначи");

    } else {
        console.log("Задание 9. Число N не является числом фиббоначи");

    }
})();
//11. Найти все различные пифагоровы тройки из интервала от N до М.

const eleventhTask = (function() {
    let N = 3;
    let M = 40;
    let pifegorean_triplets = [];
    for (let i = N; i < M; i++) {
        for (let j = i + 1; j < M; j++) {
            for (let k = j + 1; k < M; k++) {
                if (i * i + j * j === k * k) {
                    pifegorean_triplets.push([i, j, k]);
                }
            }
        }
    }
    console.log("Задание 11. все различные пифагоровы тройки из интервала от N до М", pifegorean_triplets);
})();

// 12. Написать программу умножения (деления) двух данных рациональных чисел. Ответ должен быть несократимой дробью.
const twelvethTask = (function() {
    let a = 1;
    let b = 2;
    let c = 3;
    let d = 5;
    nom = a * c;
    denom = b * d;
    nod = NOD(nom, denom);
    nom = nom / nod;
    denom = denom / nod;
    console.log("Задание 12. a/b*c/d=", [nom, denom]);

})();
// 13. Написать программу сложения (вычитания) двух данных рациональных чисел. Ответ должен быть несократимой дробью.
const thirteenthTask = (function() {
    let a = 1;
    let b = 2;
    let c = 3;
    let d = 5;
    nom = a * d + b * c;
    denom = b * d;
    nod = NOD(nom, denom);
    nom = nom / nod;
    denom = denom / nod;
    console.log("Задание 13. a/b+c/d=", [nom, denom]);
})();
// 14. Найти все целые числа из интервала от N до M, которые делятся на каждую из своих цифр.
const fourteenthTask = (function() {
    let N = 20;
    let M = 30;
    let numbers = [];
    for (let i = N; i < M; i++) {
        let digits = divideByDigits(i);
        for (let j = 0; j < digits.length; j++) {
            if (!(i % digits[j] === 0)) {
                break;
            }
            if (j === digits.length - 1) {
                numbers.push(i);
            }
        }
    }
    console.log("Задание 14. все целые числа из интервала от N до M, которые делятся на каждую из своих цифр: ", numbers);
})();
//15. Найти все целые числа из интервала от N до M, которые делятся на сумму всех своих цифр.
const fifteenthTask = (function() {
    let N = 20;
    let M = 30;
    let numbers = [];
    for (let i = N; i < M; i++) {
        let sum = 0;
        let digits = divideByDigits(i);
        for (let j = 0; j < digits.length; j++) {
            sum += digits[j];
        }
        if (i % sum === 0) {
            numbers.push(i);
        }
    }
    console.log("Задание 15. все целые числа из интервала от N до M, которые делятся на сумму всех своих цифр: ", numbers);
})();