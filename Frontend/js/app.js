class App {

    static pageFlag = "index"

//Handles GET fetch request for all data
//used in the application
    fetchLanguages(){
        fetch('http://localhost:3000/languages')
        .then(resp => resp.json())
        .then(data => {
            Language.refreshStorage()
            data.forEach(lang => {     
                new Language(lang) 
            })
            Note.refreshNoteStorage()
            this.renderLanguages(Language.all)
            })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error)
        })
    }
    
//Clears DOM, iterates Language and creates a card for
//each Language, adds events to buttons, and handles toggling
//Notes.
    renderLanguages(langs){
        App.pageflag = "index"
        const holder = document.querySelector('#cards-holder')
        holder.innerHTML = ""
        langs.forEach(function(lang){
           holder.innerHTML += lang.htmlifyForIndex()
        })
        const langCards = document.querySelectorAll('.lang-card-btn')
           langCards.forEach(function(f){
            f.addEventListener("click", function(e){
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
                            app.renderAsEditForm(e.target.parentElement.id)
                    }))
                        break;  
                    case "Minimize":
                        text.innerHTML = Language.findById(e.target.id).htmlifyNotesLength()
                        e.target.innerHTML = "Expand"
                        break;
                    }
                }
            })
        })
    }

// Clears DOM, renders new note form
    renderTakeNotes(){
        App.pageFlag = "new"
        const place = document.getElementById('cards-holder')
        place.innerHTML = ""
        place.innerHTML = Note.newForm()
    }

//renders populates Note form=> adds submit listener,
//handles POST request => renders index
    renderAsEditForm(id_string){
        const note = Note.findById(id_string) 
        const editForm = note.editHtmlify()
        const place = document.getElementById('cards-holder')
        place.innerHTML = ""
        place.innerHTML += editForm
        place.childNodes[0].addEventListener("submit",function(e){
            e.preventDefault()
            Object.assign(note, {title: e.target.noteTitle.value, body: e.target.noteBody.value})
            fetch(`http://localhost:3000/notes/${note.id}`, { 
                method: "PATCH",
                body: JSON.stringify({note}), 
                headers: { 
                    "Content-type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(resp => {console.log(resp)
                app.renderLanguages(Language.all)
            })
        })
    }

//mounts submit event on New Language Form
//Handles POST fetch, hides form, and rerenders
//page based on App.pageFlag.
    mountFormListener(){
        const form = document.getElementById('newLanguageForm')
        form.addEventListener("submit", function(e){
            e.preventDefault()
            const langData = {language: {name: e.target.langName.value, category: e.target.langCategory.value}}
            fetch('http://localhost:3000/languages', { 
                method: "POST",
                body: JSON.stringify(langData), 
                headers: { 
                    "Content-type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(resp => resp.json())
            .then(data => {
            e.target.reset()
            app.toggleNewLanguageForm()
            new Language(data)
                if (App.pageFlag === "index"){
                    app.renderLanguages(Language.all)
                } else if (App.pageFlag === "new"){              
                    app.renderTakeNotes()
                }

            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error)
            })
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
            app.renderLanguages(Language.all)
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

// mounts submit listener on New Note Form
    mountNewNoteFormListener(){
        const form = document.getElementById('newNoteForm')
        form.addEventListener("submit", function(e){
            e.preventDefault()
            const noteData = {note: {title: e.target.noteTitle.value, body: e.target.noteBody.value, language_id: e.target.langId.value}}
            app.postNewNote(noteData)
        })
    }

//handles sorting languages on index page
    mountSortListener(){
        const btn = document.getElementById('sort')
        btn.addEventListener("click", function(){
            app.renderSortedLanguages()
        })

    }

    renderSortedLanguages(){
      const sortedLanguages = Language.all.sort(function(a,b){
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

    sorter(){

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
            debugger
            new Note(data)
            this.renderLanguages()
        })
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