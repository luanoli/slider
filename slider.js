var src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
var script = document.createElement('script');
script.src = src;
document.body.appendChild(script);

function X(response) {

    var recommendations = response.data.recommendation;
    var reference = response.data.reference;

    buildReference(reference);
    buildRecommendations(recommendations);

    // direction buttons
    var next = document.querySelector('.slider-right-control');
    var prev = document.querySelector('.slider-left-control');

    // events
    next.addEventListener('click', function(ev) {
        changeSlider(1);
    });
    prev.addEventListener('click', function(ev) {
        changeSlider(-1);
    });

}

function changeSlider(op) {

    var currentDiv = document.querySelector('div.current');
    var seq = currentDiv.getAttribute('seq');

    if (op === 1) {
        // right div
        seq++;
    } else {
        // left div
        seq--;
    }

    var nextDiv = document.querySelector('div.slider-set[seq="' + seq + '"]');

    if (nextDiv !== null) {
        currentDiv.setAttribute('class', 'slider-set col-md-12 inactive');
        nextDiv.setAttribute('class', 'slider-set col-md-12 current');
    }

}

function buildReference(reference) {

    var ref = document.getElementById('product-ref');

    // details link
    var a = document.createElement('a');
    a.setAttribute('href', 'http:' + reference.item.detailUrl);
    ref.appendChild(a);

    // product reference
    var div = document.createElement('div');
    div.setAttribute('class', 'product-slide col-md-12');
    a.appendChild(div);

    // image
    var img = document.createElement('img');
    img.setAttribute('src', 'http:' + reference.item.imageName);
    div.appendChild(img);

    // title
    var h4 = document.createElement('h4');
    var textNode = document.createTextNode(reference.item.name);
    h4.appendChild(textNode);
    div.appendChild(h4);

    // old price
    if (reference.item.oldPrice !== null) {
        var h4OldPrice = document.createElement('h4');
        var textOldPrice = document.createTextNode('De: ' + reference.item.oldPrice);
        h4OldPrice.appendChild(textOldPrice);
        div.appendChild(h4OldPrice);
    }

    // new price             
    if (reference.item.price !== null) {
        var h4Price = document.createElement('h4');
        h4Price.setAttribute('class', 'price');
        var textPrice = document.createTextNode('Por: ' + reference.item.price);
        h4Price.appendChild(textPrice);
        div.appendChild(h4Price);
    }

    // payment conditions
    var h4Payment = document.createElement('h4');
    h4Payment.setAttribute('class', 'price');
    var textPayment = document.createTextNode(reference.item.productInfo.paymentConditions);
    h4Payment.innerHTML = textPayment.textContent + ' sem juros';
    div.appendChild(h4Payment);

}

function buildRecommendations(recommendations) {

    // max size 3 (products per page)
    var cont = 0;
    // page 
    var seq = 1;

    var divFull = null;


    for (var i in recommendations) {

        var slider = document.getElementById('slider-vitrine');

        // new page
        if (cont === 0) {
            divFull = document.createElement('div');
            divFull.setAttribute('seq', seq);

            if (seq === 1) {
                // first page (show)
                divFull.setAttribute('class', 'slider-set col-md-12 current');
            } else {
                // rest (hide)
                divFull.setAttribute('class', 'slider-set col-md-12 inactive');
            }

            slider.appendChild(divFull);

            // increase the sequence
            seq++;
        }

        // details link
        var a = document.createElement('a');
        a.setAttribute('href', 'http:' + recommendations[i].detailUrl);
        divFull.appendChild(a);

        // product
        var div = document.createElement('div');
        div.setAttribute('class', 'product-slide col-md-4');
        a.appendChild(div);

        // image
        var img = document.createElement('img');
        img.setAttribute('src', 'http:' + recommendations[i].imageName);
        div.appendChild(img);

        // title
        var h4 = document.createElement('h4');
        var textNode = document.createTextNode(recommendations[i].name);
        h4.appendChild(textNode);
        div.appendChild(h4);

        // old price
        if (recommendations[i].oldPrice !== null) {
            var h4OldPrice = document.createElement('h4');
            var textOldPrice = document.createTextNode('De: ' + recommendations[i].oldPrice);
            h4OldPrice.appendChild(textOldPrice);
            div.appendChild(h4OldPrice);
        }

        // new price             
        if (recommendations[i].price !== null) {
            var h4Price = document.createElement('h4');
            h4Price.setAttribute('class', 'price');
            var textPrice = document.createTextNode('Por: ' + recommendations[i].price);
            h4Price.appendChild(textPrice);
            div.appendChild(h4Price);
        }

        // payment conditions
        var h4Payment = document.createElement('h4');
        h4Payment.setAttribute('class', 'price');
        var textPayment = document.createTextNode(recommendations[i].productInfo.paymentConditions);
        h4Payment.innerHTML = textPayment.textContent + ' sem juros';
        div.appendChild(h4Payment);

        // controls products per page
        if (cont === 2) {
            cont = 0;
        } else {
            cont++;
        }

    }

}