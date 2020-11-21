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
//! Language cards - Move Expand Button next to language Name, when
//!                  expanded, have button at top and bottom.
//! search function - search will return notes with similar titles.
//!