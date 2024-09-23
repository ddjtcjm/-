document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('img');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const dotsContainer = document.querySelector('.dots');
    const progress = document.querySelector('.progress'); // 添加这行

    let currentIndex = 0;
    const intervalTime = 5000; // 5秒
    let intervalId;

    // 创建圆点指示器
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        images[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = index;
        images[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
        updateProgress(); // 添加这行
    }

    function nextSlide() {
        goToSlide((currentIndex + 1) % images.length);
    }

    function prevSlide() {
        goToSlide((currentIndex - 1 + images.length) % images.length);
    }

    // 添加这个新函数
    function updateProgress() {
        const progressWidth = ((currentIndex + 1) / images.length) * 100;
        progress.style.width = `${progressWidth}%`;
    }

    leftArrow.addEventListener('click', prevSlide);
    rightArrow.addEventListener('click', nextSlide);

    // 自动轮播
    function startAutoSlide() {
        intervalId = setInterval(nextSlide, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // 初始化
    goToSlide(0);
    startAutoSlide();
});