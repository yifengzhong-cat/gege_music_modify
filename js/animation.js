function initAnimations() {
    gsap.from("#birthday-text", {
        duration: 2,
        opacity: 0,
        y: 100,
        ease: "bounce.out"
    });

    gsap.to("#birthday-text", {
        duration: 1.5,
        scale: 1.1,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
    });
}

// 确保动画在页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
}); 