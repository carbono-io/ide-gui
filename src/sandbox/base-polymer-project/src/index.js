(function () {

    var app = document.getElementById('app');

    app.cards = [
        { title: 'first card' },
        { title: 'second card' },
        { title: 'third card' },
        { title: 'fourth card' }
    ];

    submitForm = function() {
        console.log("submitted");
        document.getElementById('formdefault').submit();



    }
})();
