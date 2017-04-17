(function() {

const doc = document;

function meShum() {
	this.parentNode.classList.add('max');
	this.style.display = 'none';
}

function all() {

	try {
		const buttonMore = doc.querySelector('div.into > div.results > button');
		buttonMore.addEventListener('click', meShum);
	} catch (e) {}

}

doc.addEventListener('DOMContentLoaded', all, {once:true});

}());
