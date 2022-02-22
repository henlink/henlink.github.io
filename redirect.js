function $(expr, con) {
	return typeof expr === 'string'? (con || document).querySelector(expr) : expr;
}

function $$(expr, con) {
	return Array.prototype.slice.call((con || document).querySelectorAll(expr));
}

function xhr(o) {
	var xhr = new XMLHttpRequest(o.src);

	xhr.open("GET", o.src);

	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status < 400) {
				try {
					o.onsuccess.call(xhr);
				}
				catch (e) {
					o.onerror.call(xhr);
					console.error(e);
				}
			}
			else {
				o.onerror.call(xhr);
			}
		}
	};

	xhr.send();
}

(function(){

document.body.className = 'redirecting';

var p = location.pathname.slice(1);
	
var slug = p.toLowerCase();
var url ="";

xhr({
	src: 'hen.json',
	onsuccess: function () {
		var slugs = JSON.parse(this.responseText);

		var hash  = slugs[slug];

		if (hash) {
			// Redirect
			url = hash.indexOf('http') == 0? hash : 'https://hicetnunc.xyz/tz/' + hash;
			$('section.redirecting > p').innerHTML = slug;
			location.href = url;
		}
		else {
			url = 'https://hicetnunc.xyz/' + p;
			$('section.redirecting > p').innerHTML = p;
			location.href = url;
			}
	},
	onerror: function () {

	}
});

})(); 
