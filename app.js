const game = document.getElementById('game')

let startGame = (game, cardsCount) => {
    const cardsNumberArray = []
    let firstCard = null
    let secondCard = null
    let count = 0

    // Создание массива чисел
    for (let i = 1; i <= cardsCount; i++) {
        cardsNumberArray.push(i, i)
    }

    // Перемешивание массива чисел
    for (let i = 0; i < cardsNumberArray.length; i++) {
        let randomIndex = Math.floor(Math.random() * cardsNumberArray.length)

        // Алгаритм перемешивания
        let temp = cardsNumberArray[i]
        cardsNumberArray[i] = cardsNumberArray[randomIndex]
        cardsNumberArray[randomIndex] = temp
    }

    // Настройка сетки
    let columns = null

    switch (cardsCount) {
        case 1: columns = 2; break
        case 2: columns = 2; break
        case 3: columns = 3; break
        default: columns = 4
    }

    console.log(columns);

    game.style = `grid-template-columns: repeat(${columns}, 1fr)`

    // Создание карточек
    for (const cardNumber of cardsNumberArray) {
        let card = document.createElement('div')
        card.textContent = cardNumber
        card.classList.add('card')

        card.addEventListener('click', () => {

            if (card.classList.contains('open') || card.classList.contains('success')) {
                return
            }

            if (firstCard !== null && secondCard !== null) {
                firstCard.classList.remove('open')
                secondCard.classList.remove('open')

                firstCard = null
                secondCard = null
            }

            card.classList.add('open')
            console.log('Карточка, по которой произошел клик', card);

            if (firstCard === null) {
                firstCard = card
            } else {
                secondCard = card

            }

            if (firstCard !== null && secondCard !== null) {
                let firstCardNumber = firstCard.textContent
                let secondCardNumber = secondCard.textContent

                count++

                if (firstCardNumber === secondCardNumber) {
                    firstCard.classList.add('success')
                    secondCard.classList.add('success')
                }
                console.log('Обе карточки открыты');
            }

            if (cardsNumberArray.length === document.querySelectorAll('.success').length) {
                setTimeout(() => {
                    game.innerHTML = ''
                    alert(`ИГРА ЗАВЕРШЕНА! Кол-во шагов: ${count}`)
                    let cardsCount = Number(prompt('Введите количество пар', 4))
                    startGame(game, cardsCount)

                }, 400)
            }
        })

        game.append(card)
    }

}

let cardsCount = Number(prompt('Введите количество пар', 4))
startGame(game, cardsCount)
