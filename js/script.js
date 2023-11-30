const filterButtons = document.querySelectorAll('.filter-button');
const listItems = document.querySelectorAll('.list-item'); //NodeList
const listItemsContainer = document.querySelector('.list-items');

let lastClickedFilterBy = null;
let lastClickedFilterValue = null;

const filterList = (event) => {
	// the clicked filter button
	const currentButton = event.currentTarget;

	// data-filter-by
	let currentButtonFilterBy = currentButton.dataset.filterBy;
	// data-filter
	let currentButtonFilterValue = currentButton.dataset.filter;

	// use "*" if the button clicked is the same as in the previous iteration
	if (currentButtonFilterValue === lastClickedFilterValue) {
		currentButtonFilterValue = '*'
	}

	// store the values until the next time the function is called
	lastClickedFilterBy = currentButtonFilterBy;
	lastClickedFilterValue = currentButtonFilterValue;
	
	// filter items based on type
	const filteredItems = [...listItems].filter(item => {
		if (lastClickedFilterValue === '*') {
			return true;
		} else {
			// item.dataset["color"]
			// item.dataset["type"]
			// ... etc
			return item.dataset[currentButtonFilterBy] === currentButtonFilterValue;
		}
	});

	// remove every item in the list container
	listItemsContainer.innerHTML = '';
	
	// add back only filtered items
	filteredItems.forEach(item => {
		listItemsContainer.appendChild(item);
	});

	// remove active class from all filters
	filterButtons.forEach(button => {
		button.classList.remove('filter-button--active');
	})

	// add active class to the clicked button, only if it's
	// not the clear button
	if (currentButtonFilterValue !== '*') {
		currentButton.classList.add('filter-button--active');
	}
}

filterButtons.forEach(filterButton => {
	filterButton.addEventListener('click', filterList);
});