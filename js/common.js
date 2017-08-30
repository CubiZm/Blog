//menu
var parent = document.querySelector(".menu");
var toggle = document.querySelector(".menu-burger");

parent.classList.add('js-menu');

toggle.addEventListener("click", function(event) {
		event.preventDefault();
		parent.classList.toggle('js-menu--open');
		toggle.classList.toggle('header__js-menu--close');
});
