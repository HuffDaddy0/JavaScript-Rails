pageFlag = "index"


//initializes the app by fetching data, rendering
//index page, mounting event listeners,
function init(){
    pageFlag = "index"
    app = new App()
    app.fetchLanguages()
    app.mountFormListener()
    app.mountNavListeners()
    app.mountSortListener()
}

init()








//! To Do:
//!
//! Language cards - Move Expand Button next to language Name, when
//!                  expanded, have button at top and bottom.
//! search function - search will return notes with similar titles.
//!