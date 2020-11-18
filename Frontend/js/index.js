function init(){
    const app = new App()
    app.fetchLanguages()
    app.mountFormListener()
}

init()

//! To Do:
//! -Add events to navBar
//! -fix renderLanguages on rerender
//! -add toggle class to new language form (toggle to hidden after submit)
//! -TakeNotes navTab should render form::
//!         1. options for languages from existing languages
//!         2. input for title, text area for body.
//!         3. onSubmit => post new note (relation to language)
//! -Clicking on a note under its Language card will render a read-only
//!     "form" with buttons to edit individual attributes (title, body)
//!     clicking the button will change from read-only to form-input in place
//! -Language cards should extend across to end of Jumbotron/form 
//!
//!
//!
//!
//!
//!
//!
//!
//! search function - search will return notes with similar titles.