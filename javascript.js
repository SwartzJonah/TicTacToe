const gameBoard = (() => {
    const board = [];
    return {board};
})();

const controller = (() => {
    const checkwinner = [];
    return {checkwinner};
})();

const player = (name) => {
    const sayName = () => console.log('Hello ${name}')
};