class App {

    constructor(){
        this.pageFlag = "index",
        this.sortBy = "a-z"
        this.contentContainer = document.querySelector('#content-holder')
        this.newLanguageForm = document.getElementById('newLanguageForm')
    }

    
//Clears DOM, iterates Language and creates a card for
//each Language, adds events to buttons, and handles toggling
//Notes.
    renderLanguageCards(langs){
        this.pageflag = "index"
        this.contentContainer.innerHTML = ""
        if (langs.length === 0) {
            Alerts.danger({message: `You don't have any languages yet!
            Click 'New Language' to add one.`})
        }
        langs.forEach(lang => this.contentContainer.innerHTML += lang.htmlifyForIndex())
        Events.delegateAccordianControls()
        app.mountDeleteListener()
    }

//renders spinner in container
    renderSpinner(){
        this.contentContainer.innerHTML=(`<div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`)
    }


// Clears DOM, renders new note form
    renderTakeNotes(){
        this.pageFlag = "new"
        this.contentContainer.innerHTML = Note.newForm()
        this.mountNewNoteFormListener()
    }


//renders & populates Note form => adds submit listener,
//handles POST request => renders index
    renderNoteAsEdit(id_string){
        const activeNote = Note.findById(id_string)
        this.contentContainer.innerHTML = activeNote.editHtmlify()
        this.contentContainer.childNodes[0].addEventListener("submit", e => {
            e.preventDefault()
            Object.assign(activeNote, {title: e.target.noteTitle.value, body: e.target.noteBody.value})
            Fetches.editNote(activeNote)
        })
    }


//mounts submit event on New Language Form
//Handles POST fetch, hides form, and rerenders
//page based on App.pageFlag.
    mountFormListener(){
        this.newLanguageForm.addEventListener( "submit", e => {
            e.preventDefault()
            const langData = { language: { name: e.target.langName.value, category: e.target.langCategory.value }}
            Fetches.postLanguage(langData)
            e.target.reset()
        })
    }


// mounts events on all navbar components
    mountNavListeners(){
        this.mountIndexListener()
        this.mountNewLanguageFormListener()
        this.mountTakeNotesListener()
    }
    

//mounts "Languages" event - navbar
    mountIndexListener(){
        const langButton = document.getElementById('langButton')
        langButton.addEventListener("click", function(e){
            e.preventDefault
            app.renderLanguageCards(Languages.all)
        })
    }


//mounts "New Language" button event
    mountNewLanguageFormListener(){
        const button = document.getElementById("newLanguage")
        button.addEventListener("click", function(e){
            e.preventDefault
            app.toggleNewLanguageForm()
        })
    }


// mounts "Take Notes" event - navbar.  
    mountTakeNotesListener(){
        const button = document.getElementById('takeNotes')
        button.addEventListener("click", function(e){
            e.preventDefault
            app.renderTakeNotes()
            app.mountNewNoteFormListener()       
        })
    }


    mountDeleteListener(){
        const buttons = Array.from(document.getElementsByClassName('lang-card-delete-btn'))
            buttons.forEach(button => button.addEventListener("click", e => {
            e.preventDefault()
            Fetches.deleteLanguage(e)
            Languages.all = Languages.all.filter(lang => lang.id !== Number.parseInt(e.target.id))
            app.renderLanguageCards(Languages.all)
        }))

    }

// mounts submit listener on New Note Form
    mountNewNoteFormListener(){
        const newNoteForm = document.getElementById('newNoteForm')
        newNoteForm.addEventListener("submit", function(e){
            e.preventDefault()
            const noteData = {note: {title: e.target.noteTitle.value, body: e.target.noteBody.value, language_id: e.target.langId.value}}
            Fetches.postNewNote(noteData)
        })
    }

//renders all languages sorted a-z
    renderSortedLanguages(){
      const sortedLanguages = Languages.all.sort((a,b) => {
          let firstLang = a.name.toUpperCase()
          let lastLang = b.name.toUpperCase()
            if (firstLang < lastLang) {
            return -1;
          }
            if (firstLang > lastLang) {
            return 1;
          }
          // a must be equal to b
            return 0;
      })
      this.renderLanguageCards(sortedLanguages)
    }

    renderByPageFlag(){
        if ( app.pageFlag === "index" ){
            app.renderSortedLanguages( Languages.all )
        } else if ( app.pageFlag === "new" ){              
            app.renderTakeNotes()
        }
    }

//changes class between "hidden" and "" on New Language Form
    toggleNewLanguageForm(){
        const form = document.getElementById('form-holder')

        switch (form.className){
        case "hidden":
            form.className = ""
            break;
        case "":
            form.className = "hidden"
            break;
        }
    }


}