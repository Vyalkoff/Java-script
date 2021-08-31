function getBoard() {
    let board = document.querySelector('#board');
    let flag = true;
    let words = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ' '];


    for (let i = 0; i < 10; i++) {
        let block_tr = document.createElement('tr');
        board.appendChild(block_tr);


        for (let j = 0; j < 10; j++) {
            if (j == 0) flag = !flag;
            let block_td = document.createElement('td');

            if (i == 0 || i == 9) {
                board.appendChild(block_tr);
                let block_td_word = document.createElement('td');
                block_td_word.innerHTML = words[j];
                block_tr.appendChild(block_td_word);
            } else if (i != 0 && i != 9) {
                if (flag) {
                    block_td.className = 'black';
                    block_tr.appendChild(block_td);
                    flag = !flag;

                } else {
                    block_td.className = 'white';
                    block_tr.appendChild(block_td);
                    flag = !flag;

                };
            };



        };
    };
};
getBoard();