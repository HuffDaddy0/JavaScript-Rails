class App {

    constructor(){
        this.pageFlag = "index",
        this.sortBy = "a-z"
    }

    
//Clears DOM, iterates Language and creates a card for
//each Language, adds events to buttons, and handles toggling
//Notes.
    renderLanguages(langs){
        app.pageflag = "index"
        const container = document.querySelector('#content-holder')
        container.innerHTML = ""
        if (langs.length === 0) {
            Alerts.danger({message: `You don't have any languages yet!
            Click 'New Language' to add one.`})
        }
        langs.forEach(lang => container.innerHTML += lang.htmlifyForIndex())
        document.querySelectorAll('.lang-card-btn').forEach(f => {
            f.addEventListener("click", e => {
                e.preventDefault()
                const notes =  `<ul> ${Note.findNotesByLanguage(e.target.id).map(note=>
                note.htmlifyForIndex()).join('')} </ul>`
                if (e.target.className === "btn btn-primary lang-card-btn"){
                    const text = document.querySelector(`.card-text#lang${e.target.id}`)
                    switch (e.target.innerText){
                    case "Expand":
                        e.target.innerText = "Minimize"
                        text.innerHTML = ""
                        text.innerHTML += notes
                        const noteTitles = Array.from(document.getElementsByClassName('note-summary'))
                        noteTitles.forEach(title => title.addEventListener("click", function(e){
                            app.renderNoteAsEdit(e.target.parentElement.id)
                    }))
                        break;  
                    case "Minimize":
                        text.innerHTML = Languages.findById(e.target.id).htmlifyNotesLength()
                        e.target.innerHTML = "Expand"
                        break;
                    }
                }
            })
        })
        app.mountDeleteListener()
    }


    renderSpinner(){
        const place = document.getElementById('content-holder')
        place.innerHTML=(`<div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`)
    }


// Clears DOM, renders new note form
    renderTakeNotes(){
        app.pageFlag = "new"
        document.getElementById('content-holder').innerHTML = Note.newForm()
    }

    renderNoteAsShow(id_string){
    
    }


//renders & populates Note form => adds submit listener,
//handles POST request => renders index
    renderNoteAsEdit(id_string){
        const note = Note.findById(id_string) 
        const place = document.getElementById('content-holder')
        place.innerHTML = note.editHtmlify()
        place.childNodes[0].addEventListener("submit", e => {
            e.preventDefault()
            Object.assign(note, {title: e.target.noteTitle.value, body: e.target.noteBody.value})
            Fetches.editNote(note)
            // .then(resp => resp.json())
            // .then(data => {
            //     if (data.status !== 200){
            //         console.log(data.status)
            //         Alerts.danger(data.error)
            //     } else {
            //         console.log(data.status)
            //         Alerts.success(`${data.note.title} edited successfully!`)
            //         app.renderSortedLanguages(Languages.all)
            //     }
            // })
            .catch(error => Alerts.danger(error))
        })
    }


//mounts submit event on New Language Form
//Handles POST fetch, hides form, and rerenders
//page based on App.pageFlag.
    mountFormListener(){
        const form = document.getElementById('newLanguageForm')
        form.addEventListener( "submit", e => {
            e.preventDefault()
            const langData = { language: { name: e.target.langName.value, category: e.target.langCategory.value }}
            Fetches.postLanguage(langData)
            e.target.reset()
        })
    }


// mounts events on all navbar components
    mountNavListeners(){
        this.mountIndexListener()
        this.mountNewFormListener()
        this.mountTakeNotesListener()
    }
    

//mounts "Languages" event - navbar
    mountIndexListener(){
        const langButton = document.getElementById('langButton')
        langButton.addEventListener("click", function(e){
            e.preventDefault
            app.renderLanguages(Languages.all)
        })
    }


//mounts "New Language" button event
    mountNewFormListener(){
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

    //!              here
    mountDeleteListener(){
        const buttons = Array.from(document.getElementsByClassName('lang-card-delete-btn'))
            buttons.forEach(button => button.addEventListener("click", e => {
            e.preventDefault()
            console.log("clicked!")
            Fetches.deleteLanguage(e)
            console.log(Languages.all.filter(lang => lang.id != e.target.id)
            )
            Languages.all = Languages.all.filter(lang => lang.id !== Number.parseInt(e.target.id))
            app.renderLanguages(Languages.all)
        }))

    }


// mounts submit listener on New Note Form
    mountNewNoteFormListener(){
        const form = document.getElementById('newNoteForm')
        form.addEventListener("submit", function(e){
            e.preventDefault()
            const noteData = {note: {title: e.target.noteTitle.value, body: e.target.noteBody.value, language_id: e.target.langId.value}}
            app.postNewNote(noteData)
        })
    }

    

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
      app.renderLanguages(sortedLanguages)
    }

//handles POST fetch with new note => re-initializes application
    postNewNote(noteData){
        fetch('http://localhost:3000/notes', { 
            method: "POST",
            body: JSON.stringify(noteData), 
            headers: { 
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            new Note(data)
        })
        .then(this.renderSortedLanguages(Languages.all))
        .catch(error => Alerts.danger(error))
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