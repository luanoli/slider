var src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
var script = document.createElement('script');
script.src = src;
document.body.appendChild(script);

function X(response) {

    var recommendations = response.data.recommendation;
    var reference = response.data.reference;

    buildReference(reference);
    buildRecommendations(recommendations);

    var next = document.querySelector('.slider-right-control');
    var prev = document.querySelector('.slider-left-control');

    next.addEventListener('click', function(ev) {
        changeSlider(1);
    });
    prev.addEventListener('click', function(ev) {
        changeSlider(-1);
    });

}

function changeSlider(op){
	console.log(op);
}

function buildReference(reference) {

    var ref = document.getElementById('product-ref');

    var div = document.createElement('div');
    div.setAttribute('class', 'product-slide col-md-12');

    var img = document.createElement('img');
    img.setAttribute('src', 'http:' + reference.item.imageName);

    var h4 = document.createElement('div');
    h4.setAttribute('class', 'caption');

    var textNode = document.createTextNode(reference.item.name);

    h4.appendChild(textNode);

    div.appendChild(img);
    div.appendChild(h4);

    ref.appendChild(div);

}

function buildRecommendations(recommendations) {

    var cont = 1;

    for (var i in recommendations) {

        var slider = document.getElementById('slider-vitrine');

        var div = document.createElement('div');

        if (cont > 3) {
            div.setAttribute('class', 'product-slide col-md-4 inactive');
        } else {
            div.setAttribute('class', 'product-slide col-md-4');
        }

        var img = document.createElement('img');
        img.setAttribute('src', 'http:' + recommendations[i].imageName);

        var h4 = document.createElement('div');
        h4.setAttribute('class', 'caption');

        var textNode = document.createTextNode(recommendations[i].name);

        h4.appendChild(textNode);

        div.appendChild(img);
        div.appendChild(h4);

        slider.appendChild(div);

        cont++;

    }

}