const firstTask = (function() {
    str = "i-dont-know";

    console.log("Задание 1.", str.split('-').map((word, index) => {
        return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    }).join(''));

})();

const secondTask = (function() {
    const originalArray = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    const arrayCopy = originalArray.slice().reverse();
    console.log("Задание 2.", originalArray, arrayCopy);
})();

const thirdTask = (function() {
    word = "пони";
    const dictionary = {
        "пони": "pony",
        "красивый": "handsome",
        "кот": "cat",
        "разрешите дискорд в рф": "allow discord in Russia"
    };
    console.log("Задание 3.", dictionary[word]);
})();

const fourthTask = {
    1: "понедельник",
    2: "вторник",
    3: "среда",
    4: "четверг",
    5: "пятница",
    6: "суббота",
    7: "воскресенье",
    getCurrentDay: function() {
        const currentDate = new Date();
        console.log("Задание 4.", this[(currentDate.getDay() === 0 ? 7 : currentDate.getDay())]);
    }
};
const fifthTask = (function() {

    const personnel = {
        manager: "Какой-то мужик",
        developer: "Аня",
        designer: "Аня"
    };

    const personnel2 = {...personnel };

    personnel2.manager = "Второй мужик";
    personnel2.developer = "Все еще Аня";
    personnel2.designer = "Кирилл";

    console.log("Задание 5.", JSON.stringify(personnel, null, 2) + "\n" + JSON.stringify(personnel2, null, 2));
})();



const subjects = {
    list: "математика,физика,физра",

    addSubject(subject) {
        let subjectsArray = this.list.split(',');

        if (!subjectsArray.includes(subject)) {
            subjectsArray.push(subject);
            this.list = subjectsArray.join(',');
            console.log(`${subject} добавлен`);
        } else {
            console.log(`${subject} уже существует`);
        }
    },

    removeSubject(subject) {
        let subjectsArray = this.list.split(',');

        const index = subjectsArray.indexOf(subject);

        if (index !== -1) {
            subjectsArray.splice(index, 1);
            this.list = subjectsArray.join(',');
            console.log(`${subject} удален`);
        } else {
            console.log(`${subject} не найден`);
        }
    }
};
console.log("Задание 6.")
subjects.addSubject("химия");
subjects.addSubject("математика");
subjects.removeSubject("физика");
subjects.removeSubject("история");
console.log(subjects.list);