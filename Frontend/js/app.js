class App {

    static pageFlag = "index"

    fetchLanguages(){
        fetch('http://localhost:3000/languages')
        .then(resp => resp.json())
        .then(data => {
            Language.refreshStorage()
            data.forEach(lang => {     
                new Language(lang) 
            })
            Note.refreshNoteStorage()
            this.renderLanguages()
            })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error)
        })
    }
    
       
    renderLanguages(){
        App.pageflag = "index"
        const holder = document.querySelector('#cards-holder')
        holder.innerHTML = ""
        Language.all.forEach(function(lang){
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
                            console.log('note title clicked!')
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

    renderTakeNotes(){
        App.pageFlag = "new"
        const place = document.getElementById('cards-holder')
        place.innerHTML = ""
        place.innerHTML = Note.newForm()
    }

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
                app.renderLanguages()
            })
        })
    }

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
            .then(data => {
            e.target.reset()
            app.toggleNewLanguageForm()
            new Language(langData.language)

                if (App.pageFlag === "index"){
                    app.renderLanguages()
                } else if (App.pageFlag === "new"){
                    app.renderTakeNotes()
                }

            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error)
            })
        })
    }

    mountNavListeners(){
        this.mountIndexListener()
        this.mountNewFormListener()
        this.mountTakeNotesListener()
    }
    
    mountIndexListener(){
        const langButton = document.getElementById('langButton')
        langButton.addEventListener("click", function(e){
            e.preventDefault
            app.renderLanguages()
        })
    }

    mountNewFormListener(){
        const button = document.getElementById("newLanguage")
        button.addEventListener("click", function(e){
            console.log('New Language Clicked')
            e.preventDefault
            app.toggleNewLanguageForm()
        })
    }

    mountTakeNotesListener(){
        const button = document.getElementById('takeNotes')
        button.addEventListener("click", function(e){
            e.preventDefault
            app.renderTakeNotes()
            app.mountNewNoteFormListener()       
        })
    }

    mountNewNoteFormListener(){
        const form = document.getElementById('newNoteForm')
        //debugger
        form.addEventListener("submit", function(e){
            e.preventDefault()
            console.log("Note Submit")
            const noteData = {note: {title: e.target.noteTitle.value, body: e.target.noteBody.value, language_id: e.target.langId.value}}
            app.postNewNote(noteData)
        })
    }

    postNewNote(noteData){
        fetch('http://localhost:3000/notes', { 
            method: "POST",
            body: JSON.stringify(noteData), 
            headers: { 
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(data => {
            app.fetchLanguages()
        })
    }

    toggleNewLanguageForm(){
        const form = document.getElementById('form-holder')
        switch (form.className){
        case "hidden":
            console.log('case was hidden')
            form.className = ""
            break;
        case "":
            console.log('case was empty')
            form.className = "hidden"
            break;
        }
    }

}