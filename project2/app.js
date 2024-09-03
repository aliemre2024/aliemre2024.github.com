const { createApp } = Vue

createApp({
    data() {
        return {
            health: 10,
            
            redHeart: 0,
            pinkHeart: 0,
            blackHeart: 0,

            currentImage: 'images/10.png',  // Current image source
            images: [
                'images/00.png',
                'images/01.png',
                'images/02.png',
                'images/03.png',
                'images/04.png',
                'images/05.png',
                'images/06.png',
                'images/07.png',
                'images/08.png',
                'images/09.png',
                'images/10.png',
                'images/11.png',
                'images/12.png',
                'images/13.png',
                'images/14.gif',
                'images/15.gif',
                'images/16.png',
                'images/17.png',
                'images/18.png',
                'images/19.png',
                'images/20.png'
            ],

            currentHover: "images/BLANK.png",
        }
    },
    methods: {
        imageUpdate() {
            if (this.health >= 0 && this.health <= 20) {
                this.currentImage = this.images[this.health];
            }
        },

        heartControl() {
            if (this.health < 10) {
                this.redHeart = this.health;
                this.blackHeart = 10 - this.redHeart;
                this.pinkHeart = 0;
            } else if (this.health === 10) {
                this.redHeart = this.health;
                this.blackHeart = 0;
                this.pinkHeart = 0;
            } else if (this.health > 10) {
                this.pinkHeart = this.health - 10;
                this.redHeart = 10 - this.pinkHeart;
                this.blackHeart = 0;
            }
        },
        updateHealth(amount) {
            if(this.health + amount < 0){
                this.health = 0;
            }
            else if(this.health + amount >= 20){
                this.health = 20;
            }
            else {
                this.health += amount;
            }

            this.heartControl();
            this.imageUpdate();
        },

        hoverImage_visualize(imageSrc) {
            this.currentHover = imageSrc;
        },
        hoverImage_clean() {
            this.currentHover = 'images/BLANK.png';
        },
        hoverImage_move() {
            const hoverImg = document.getElementById('hover-image');
        
            // Apply transition and move to the right
            hoverImg.style.transition = 'left 0.3s'; //
            hoverImg.style.left = '50%'; // Move image to the right by 1000px

            setTimeout(() => {
                this.currentHover = 'images/BLANK.png'; 
                hoverImg.style.transition = 'none'
                hoverImg.style.left = '35%'; 
            }, 300);
        },
        hover_slapSound() {
            const audio = new Audio('sounds/slap.mp3');
            audio.play();
        },
        hover_poisonSound() {
            const audio = new Audio('sounds/poison.mp3');
            audio.play();
        },
        hover_loveSound() {
            const audio = new Audio('sounds/love.mp3');
            audio.play();
        },
        hover_niceSound() {
            const audio = new Audio('sounds/nice.mp3');
            audio.play();
        },
        hoverImage_move_forStars() {
            const hoverImg = document.getElementById('hover-image');
        
            // Apply transition and move to the right
            hoverImg.style.transition = 'width 5s, bottom 5s'; //
            hoverImg.style.width = '320px'; 
            hoverImg.style.bottom = '20%';

            setTimeout(() => {
                this.currentHover = 'images/BLANK.png'; 
                hoverImg.style.transition = 'none'
                hoverImg.style.width = '100px';
                hoverImg.style.bottom = '15%';
            }, 9000);
        },
        hoverImage_move_forPoision() {
            const hoverImg = document.getElementById('hover-image');
        
            // Apply transition and move to the right
            hoverImg.style.transition = 'width 5s, bottom 5s'; //
            hoverImg.style.width = '320px'; 
            hoverImg.style.bottom = '20%';

            setTimeout(() => {
                this.currentHover = 'images/BLANK.png'; 
                hoverImg.style.transition = 'none'
                hoverImg.style.width = '100px';
                hoverImg.style.bottom = '15%';
            }, 5000);
        },
        

    },
    computed: {
        currHeart() {
            this.heartControl();
            let hearts = '';
            hearts += '<span>&#128150;</span>'.repeat(this.pinkHeart);
            hearts += '<span>❤️</span>'.repeat(this.redHeart);
            hearts += '<span>&#128420</span>'.repeat(this.blackHeart);
            return hearts;
        }
    },
    watch: {
        health() {
            this.heartControl();
        }
    },
    mounted() {
        this.imageUpdate()
    }
}).mount("#main")
