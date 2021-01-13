const checkDoubleDigits = (number) => {
    const prom = new Promise((resolve, reject) => {
        if(number > 10) {
            resolve("The number is bigger than 10!");
        }else {
            reject("Error! The number is smaller than 10...");
        };
    });
};