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
//! 
//! Language cards - Move Expand Button next to language Name, when
//!                  expanded, have button at top and bottom.
//! search function - search will return notes with similar titles.
//!