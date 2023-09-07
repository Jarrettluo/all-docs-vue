document.addEventListener('DOMContentLoaded', function() {
    let button = document.getElementById('homeButton');

    button.addEventListener('click', function() {
        let link = 'http://localhost:80'; // 设置跳转链接
        // let link = '/'; // 设置跳转链接
        window.location.href = link; // 跳转到链接
    });
});


