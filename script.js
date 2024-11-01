var array_length = 256000;
var table_size = 8;
var current_index = 1;
var max_index = 40;

function displayIndexButtons() {
    $(".index-buttons__button").remove();
    $(".index-buttons").append('<button onclick="prev();" class="index-buttons__button _icon-arrow"></button>');

    const extraPages = current_index === 40 ? 1 : 0;
    const start = Math.max(1, current_index - 3 - extraPages);
    const end = Math.min(max_index, start + 3 + extraPages);

    for (var i = start; i <= end; i++) {
        $(".index-buttons").append('<button onclick="indexPagination(' + i + ');" class="index-buttons__button" index="' + i + '">' + i + '</button>');
    }

    if (end < max_index) {
        $(".index-buttons").append('<button onclick="indexPagination(' + max_index + ');" class="index-buttons__button" index="' + max_index + '">' + max_index + '</button>');
    }

    $(".index-buttons").append('<button onclick="next();" class="index-buttons__button _icon-arrow"></button>');

    if (current_index <= 38) {
        $(".index-buttons__button:nth-last-child(2)").addClass("tree-point");
    }

    highlightIndexButton();
}



function highlightIndexButton() {
    var start_index = ((current_index - 1) * table_size) + 1;
    var end_index = start_index + table_size - 1;
    if (end_index > array_length) {
        end_index = array_length;
    }
    $(".tfoot-table__counter").text('Showing ' + start_index + ' to ' + end_index + ' of 256K entries');
    $(".index-buttons__button").removeClass('active');
    $(".index-buttons__button[index='" + current_index + "']").addClass('active');
}

$(document).on('click', '.index-buttons__button', function() {
    var index = $(this).attr('index');
    if (index) {
        current_index = parseInt(index);
        highlightIndexButton();
        displayIndexButtons();
    }
});

function next() {
    if (current_index < max_index) {
        current_index++;
        highlightIndexButton();
        displayIndexButtons();
    }
}

function prev() {
    if (current_index > 1) {
        current_index--;
        highlightIndexButton(); 
        displayIndexButtons();
    }
}

function indexPagination(index) {
    current_index = parseInt(index);
    highlightIndexButton();
    displayIndexButtons();
}

displayIndexButtons();

function menuInit() {
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", function (e) {
			if (bodyLockStatus && e.target.closest('.icon-menu')) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
			}
		});
	};
}
function menuOpen() {
	bodyLock();
	document.documentElement.classList.add("menu-open");
}
function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove("menu-open");
}
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
menuInit()
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav__item');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove active class from any active link
            document.querySelector('.nav__item.active')?.classList.remove('active');
            
            // Add active class to the clicked link
            this.classList.add('active');
        });
    });
});
