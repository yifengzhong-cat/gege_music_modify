document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainScreen = document.getElementById('main-screen');
    const enterBtn = document.getElementById('enter-btn');
    const images = document.querySelectorAll('.gallery-image');
    let currentIndex = 0;

    function updateGallery() {
        images.forEach((img, index) => {
            img.classList.remove('active', 'prev', 'next');
            if (index === currentIndex) {
                img.classList.add('active');
            } else if (index === (currentIndex - 1 + images.length) % images.length) {
                img.classList.add('prev');
            } else if (index === (currentIndex + 1) % images.length) {
                img.classList.add('next');
            }
        });
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery();
    }

    function initGallery() {
        updateGallery();
        setInterval(showNextImage, 3000); // 每3秒切换一次图片
    }

    images.forEach(img => {
        img.addEventListener('click', () => {
            img.style.animation = 'shatter 0.5s forwards';
            setTimeout(() => {
                img.style.animation = 'regroup 0.5s forwards';
            }, 2000); // 延时2秒后重组
        });
    });

    enterBtn.addEventListener('click', () => {
        try {
            welcomeScreen.style.display = 'none';
            mainScreen.style.display = 'block';
            
            if (typeof initParticles === 'function') {
                initParticles();
            } else {
                console.error('initParticles is not defined');
            }
            
            if (typeof initAudio === 'function') {
                initAudio();
            } else {
                console.error('initAudio is not defined');
            }
            
            if (typeof initAnimations === 'function') {
                initAnimations();
            } else {
                console.error('initAnimations is not defined');
            }

            initGallery(); // 初始化图片轮播
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    });
}); 