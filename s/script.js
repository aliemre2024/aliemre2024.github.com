(function() {
    function printButtons() {
        const output = [];

        myBtnsArr.forEach((button) => {
            let myBtn = `<button class="${button.class}" id="${button.id}">
                            ${button.content}
                         </button>`;
            output.push(myBtn);
        });

        buttonsDiv.innerHTML = output.join('');
        addEventListeners();
    }

    function addEventListeners() {
        myBtnsArr.forEach((button) => {
            let btn = document.getElementById(button.id);
            btn.addEventListener('click', () => {
                showDiv(button.divId);
            });
        });

        // Add event listeners for info buttons
        const infoButtons = document.querySelectorAll('.info-btn');
        infoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleText(btn);
            });
        });
    }

    function showDiv(divId) {
        const allDivs = document.querySelectorAll('.photo_block');
        allDivs.forEach(div => {
            div.classList.remove('active');
        });

        const activeDiv = document.getElementById(divId);
        if (activeDiv) {
            activeDiv.classList.add('active');
        }
    }

    function toggleText(button) {
        const imageContainer = button.parentElement;
        const image = imageContainer.querySelector('.gallery');
        const text = image.getAttribute('data-text');

        const textBlock = imageContainer.querySelector('.text-block') || document.createElement('div');
        textBlock.classList.add('text-block');
        textBlock.innerHTML = text;

        if (textBlock.style.display === 'block') {
            textBlock.style.display = 'none';
        } else {
            textBlock.style.display = 'block';
        }

        imageContainer.appendChild(textBlock);
    }

    const buttonsDiv = document.getElementById('allBtns');
    const myBtnsArr = [
        { class: 'myBtn', id: 'button1', content: 'Gaziler', divId: 'gaziler' },
        { class: 'myBtn', id: 'button2', content: 'Korkuteli', divId: 'korkuteli' },
    ];

    printButtons();
})();
