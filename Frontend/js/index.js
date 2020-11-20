pageFlag = "index"

function init(){
    pageFlag = "index"
    app = new App()
    app.fetchLanguages()
    app.mountFormListener()
    app.mountNavListeners()
}

init()

//! To Do:
//!
//!
//!
//! -TakeNotes navTab should render form::
// // //!      1. options for languages from existing languages
// // //!      2. input for title, text area for body.
//!         3. onSubmit => post new note (relation to language(does this happen on backend?))
//! -Clicking on a note under its Language card will render a read-only
//!     "form" with buttons to edit individual attributes (title, body)
//!     clicking the button will change from read-only to form-input in place
//!
//!    ^
//!    |
//!    |3. Add Submit Button(duh..), add eventlistener, pull info from form,
//!        Send fetch(PATCH), add note to local storage and render
//!        alert that note saved, reset form for continued notetaking
//!
//! 
//! -Use a global Var "pageFlag" to keep track of the "page" so the new 
//!     language form can rerender current content
//!
//! Language cards - Move Expand Button next to language Name, when
//!                  expanded, have button at top and bottom.
//! search function - search will return notes with similar titles.
//!