// When the "Today" button is clicked,
// and that button is disabled (not changing from a different day),
// Scroll to the current time in center of view

const addScrollToNowBehavior = (element) => {
	
	element.addEventListener("click", () => {
		document.querySelector(".time-indicator-line").scrollIntoView({
	    	behavior: "instant",
	    	block: "center"
		});
	});
}

// NOTE: The observer is required to make sure the element is loaded
// before attempting to attach an event listener to that element
const observer = new MutationObserver((mutations, obs) => {
	
	const todayButton = document.querySelector(".toolbar-button.today");
  
	if (todayButton) {
	    addScrollToNowBehavior(todayButton);
	}
	
	obs.disconnect();
});


// executes immediately
observer.observe(document, {
  childList: true,
  subtree: true
});
