// When the "Today" button is clicked,
// and that button is disabled (not changing from a different day),
// Scroll to the current time in center of view

const addScrollToNowBehavior = (element) => {
    element.addEventListener('click', () => {
        scrollToNowLine()
    })
}

const addKeyboardShortcuts = () => {
    document.addEventListener('keydown', (event) => {
        if (event.metaKey && event.shiftKey && event.key === 's') {
            document.querySelector('.sprite-event-rec-single').click()
        } else if (event.metaKey && event.shiftKey && event.key === 'f') {
            document.querySelector('.sprite-event-rec-future').click()
        } else if (event.metaKey && event.shiftKey && event.key === 'a') {
            document.querySelector('.sprite-event-rec-all').click()
        } else if (event.metaKey && event.key === 's') {
            event.preventDefault()
            document.querySelector('.save-button button').click()
        }
    })
}

const scrollToNowLine = () => {
    document.querySelector('.time-indicator-line').scrollIntoView({
        behavior: 'instant',
        block: 'center',
    })
}

// NOTE: The observer is required to make sure the element is loaded
// before attempting to attach an event listener to that element
const observer = new MutationObserver((mutations, obs) => {
    const todayButton = document.querySelector('.toolbar-button.today')

    if (todayButton) {
        addScrollToNowBehavior(todayButton)
        addKeyboardShortcuts()
    }

    obs.disconnect()
})

// executes immediately
observer.observe(document, {
    childList: true,
    subtree: true,
})
