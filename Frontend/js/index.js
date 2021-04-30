
//initializes the app by fetching data, rendering
//index page, mounting event listeners,
function init(){
    app = new App()
    Fetches.initData()
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