document.addEventListener("DOMContentLoaded", () => {
    // initLocalStorage();

    let guessedWords = [[]] // 시도한 단어
    let availableSpace = 1; // 현재 글자가 들어갈 자리

    let word = getNewWord(); // 단어 가져오기
    let guessedWordCount = 0;
    // let currentWordIndex = 0;

    const keys = document.querySelectorAll(".keyboard-row button") // 키보드 버튼

    // function initLocalStorage() {
    //     const storedCurrentWordIndex = window.localStorage.getItem('currentWordIndex');
    //     if (!storedCurrentWordIndex) {
    //         window.localStorage.setItem('currentWordIndex', currentWordIndex);
    //     } else {
    //         currentWordIndex = Number(storedCurrentWordIndex);
    //     }
    // }

    createSquares();
    keyInput();


    function getNewWord() {
        // 데이터베이스에 있는 단어들을 가져오는 방식으로 수정해야함
        // 이 과정에서 각 단어의 정답률, 평균 시도 횟수 등을 통계처리 할 수 있을 듯
        const wordArr = ['seven', 'world', 'about', 'again', 'heart', 'pizza', 'water', 'happy', 'sixty', 'board', 'month', 'angel', 'death', 'green', 'music', 'fifty', 'three', 'party', 'piano', 'kelly', 'mouth'];
        const randomWord = wordArr[Math.floor(Math.random() * wordArr.length)];
        // const randomWord = wordArr[currentWordIndex % wordArr.length]
        console.log(randomWord)
        return randomWord;
    }

    function getCurrentWordArr() { // 입력한 단어 리스트
        const numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords - 1]
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        };

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }


    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !== 5) { // 5 letter only
            // window.alert("5글자 단어를 제출하세요거트~");
            // shakeX 애니메이션 
            // 글자 지우기
            return;
        }

        // const currentWord = currentWordArr.join('') // 단어조합
        let currentWord = ""

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;

        currentWordArr.forEach(function (letter, index) {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId); // 애니메이션 할 글자 El 가져옴
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
                currentWord = currentWord + letter;
            }, interval * index);
        });

        guessedWordCount += 1;

        if (currentWord === word) { // 정답
            window.alert("정답입니다람쥐~")
            // 애니메이션 bounce
            // currentWordArr.forEach((letter, index) => {
            //     setTimeout(() => {
            //         const tileColor = getTileColor(letter, index);

            //         const letterId = firstLetterId + index; 
            //         const letterEl = document.getElementById(letterId); // 애니메이션 할 글자 El 가져옴
            //         letterEl.classList.add("animate__bounce");
            //         letterEl.style = `background-color:${tileColor};border-color:${tileColor}`
            //     }, interval * index);
            // });

            // 결과창에 통계 보여준다. 
            // 평균 답안 수
            // 개인 평균
            // 정답글자
            // 새게임
        }
        // else {
        //     window.alert("틀렸네용가리치킨너겟~")
        // }

        if (guessedWords.length === 6) {
            window.alert(`더이상 기회가 없습니당나귀... 정답은 ${word} 입니다.`)
        }

        guessedWords.push([])
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr % 5 == 0) { // 이미 확인한 단어는 지우지 못함
            console.log("Can't delete")
            return;
        }

        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1))

        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    // 글자 입력
    function keyInput() {

        // 키보드 입력
        document.addEventListener('keydown', (event) => {
            const letter = event.key;
            // console.log(event);

            if (letter === 'Enter') {
                handleSubmitWord()
                return;
            }

            if (['Delete', 'Backspace'].includes(letter)) {
                if (availableSpace > 1) {
                    handleDeleteLetter();
                }
                return;
            }

            if ('abcdefghijklmnopqrstuvwxyz'.includes(letter)) {
                updateGuessedWords(letter);
                return;
            }
        });

        // 클릭 입력
        for (let i = 0; i < keys.length; i++) {
            keys[i].onclick = ({ target }) => {
                const letter = target.getAttribute("data-key");

                if (letter === 'enter') {
                    handleSubmitWord()
                    return;
                }

                if (letter === 'del') {
                    if (availableSpace > 1) {
                        handleDeleteLetter();
                    }
                    return;
                }

                console.log(letter);
                updateGuessedWords(letter);
            }
        }
    }
});

function openPop() {
    console.log("open-result-box");
    document.getElementById("result-box").style.display = "block";
}

function closePop() {
    console.log("close-result-box");
    document.getElementById("result-box").style.display = "none";
}