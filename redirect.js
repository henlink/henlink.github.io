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

var slug = location.pathname.slice(1);

xhr({
	src: 'hen.json',
	onsuccess: function () {
		var slugs = JSON.parse(this.responseText);

		var hash = slugs[slug];

		if (hash) {
			// Redirect
			var url = hash.indexOf('http') == 0? hash : 'https://www.hicetnunc.xyz/tz/' + hash;
			$('section.redirecting > p').innerHTML = 'redirecting...';
			location.href = url;
		}
		else {
			$('section.error > p').innerHTML = 'Hi! If you like to have a free short Hic Et Nunc link, please dm me on twitter <a href="https://twitter.com/playnft" target="_blank">@playnft</a>';
			}
	},
	onerror: function () {

	}
});

})(); 
