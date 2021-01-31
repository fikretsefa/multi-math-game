

function createQuestion(){
    const number1 = getRandomNumber();
    const number2 = getRandomNumber();
    const operation = '*';
    const expression = `${number1} ${operation} ${number2}`;
    return {
        expression: expression,
        answer: eval(expression)
    }
}

function getRandomNumber(){
    return Math.floor(1+Math.random()*9);
}

module.exports={
    createQuestion,
    getRandomNumber
}