const getAnonName = (firstName) => {
    const fullName = `${firstName} Doe`;

    setTimeout(() => {
        const prom = new Promise((resolve, reject) => {
            if(firstName) {
                resolve(console.log(fullName));
            }
            reject(Error("You didn't pass in a first name!"));
        })
    }, 2000);
};

getAnonName('Ekmel');
getAnonName();