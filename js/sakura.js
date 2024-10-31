function createSakuraPetal() {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = Math.random() * 3 + 2 + 's';
    petal.style.opacity = Math.random();
    document.getElementById('sakura-container').appendChild(petal);

    petal.addEventListener('click', () => {
        petal.className = 'heart';
    });

    setTimeout(() => {
        petal.remove();
    }, 5000);
}

setInterval(createSakuraPetal, 300); 