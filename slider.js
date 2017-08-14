var src = 'http://roberval.chaordicsystems.com/challenge/challenge.json?callback=X';
var script = document.createElement('script');
script.src = src;
document.body.appendChild(script);

function X(response){

	var recs = response.data.recommendation;

	for(var i in recs){                
		var slider = document.getElementById('slider-vitrine');
        
		var div = document.createElement('div');
		div.setAttribute('class', 'col-xs-12 col-sm-6 col-md-2');

		var img = document.createElement('img');
		img.setAttribute('src', 'http:' + recs[i].imageName);

		var h4 = document.createElement('div');
		h4.setAttribute('class', 'caption');
				
		var textNode = document.createTextNode(recs[i].name);

		h4.appendChild(textNode);

		div.appendChild(img);
		div.appendChild(h4);

		slider.appendChild(div);
                
	}

	
}