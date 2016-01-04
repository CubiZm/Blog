//menu
var parent = document.querySelector(".header__menu");
var toggle = document.querySelector(".header__menu--burger");

parent.classList.add('js-menu');

toggle.addEventListener("click", function(event) {
		event.preventDefault();
		parent.classList.toggle('js-menu--open');
		toggle.classList.toggle('header__js-menu--close');
});
