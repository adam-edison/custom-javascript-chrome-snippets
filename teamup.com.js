// When the "Today" button is clicked,
// and that button is disabled (not changing from a different day),
// Scroll to the current time in center of view

const addScrollToNowBehavior = (element) => {
    element.addEventListener('click', () => {
        scrollToNowLine()
    })
}

const keyMap = {
    i: '.sprite-event-rec-single',
    u: '.sprite-event-rec-future',
    a: '.sprite-event-rec-all',
    t: '#title',
    s: '.save-button .button',
    6: '.date-from-value .datepicker .form-control.input',
    7: '.date-from-value .timepicker input',
    8: '.date-to-value .datepicker .input',
    9: '.date-to-value .timepicker input',
}

const addKeyboardShortcuts = () => {
    // TODO: to make this faster, create an input in the document with tab index -1
    //  and make it focusable with the shortcut
    //  then focus and clear its text on shortcut
    //  then bind an event when enter is pressed on that input that will trigger a focus change
    //  this way there is no waiting for the browser to render a prompt, and no visual terribleness
    document.addEventListener('keydown', (event) => {
        if (event.metaKey && event.shiftKey && event.ctrlKey && event.key === 'I') {
            event.preventDefault()
            const result = window.prompt('Focus?')

            if (!result) {
                return
            }

            const key = result.toLowerCase()
            const selector = keyMap[key]

            if (!selector) {
                return
            }

            document.querySelector(selector).focus()
        }
    })
}

const scrollToNowLine = () => {
    document.querySelector('.time-indicator-line').scrollIntoView({
        behavior: 'instant',
        block: 'center',
    })
}

const clickTodayTwiceAfterDelay = (todayButton, delay) => {
    setTimeout(() => {
        todayButton.click()
    }, delay)

    setTimeout(() => {
        todayButton.click()
    }, delay + 30)
}

// NOTE: The observer is required to make sure the element is loaded
// before attempting to attach an event listener to that element
const observer = new MutationObserver((mutations, obs) => {
    const todayButton = document.querySelector('.toolbar-button.today')

    if (todayButton) {
        addScrollToNowBehavior(todayButton)
        addKeyboardShortcuts()
        clickTodayTwiceAfterDelay(todayButton, 500)
        obs.disconnect()
    }
})

// executes immediately
observer.observe(document, {
    childList: true,
    subtree: true,
})
