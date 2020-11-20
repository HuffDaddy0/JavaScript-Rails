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
        //debugger
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
                        break;  
                    case "Minimize":
                       // debugger
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

// static renderAsReadOnly(){    
 //!This will be an event function that renders the read-only form 
 //!when a note title is clicked from index.
 //!Clear cards, find note(id attached to card), render note in form
 //!with edit buttons for each input, clicking edit button will 
 //!change from read-only to input in place.
   // }

    mountFormListener(){
        const form = document.getElementById('newLanguageForm')
        form.addEventListener("submit", function(e){
            e.preventDefault()
            const langData = {language: {name: e.target.langName.value, category: e.target.langCategory.value}}
            //debugger //!
            fetch('http://localhost:3000/languages', { 
                method: "POST",
                body: JSON.stringify(langData), 
                headers: { 
                    "Content-type": "application/json",
                    "Accept": "application/json"
                }
            })
            //.then(resp => resp.json()) //!
            .then(data => {console.log(data) //!
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
            console.log('clicked index') //!
            e.preventDefault
            init()
        })
    }

    mountNewFormListener(){
        const button = document.getElementById("newLanguage")
        button.addEventListener("click", function(e){
            console.log('new lang clicked') //!
            e.preventDefault
            app.toggleNewLanguageForm()
        })
    }

    mountTakeNotesListener(){
        const button = document.getElementById('takeNotes')
        button.addEventListener("click", function(e){
            console.log('take notes clicked"') //!
            e.preventDefault
            app.renderTakeNotes()
        })
    }

    mountNewNoteFormListener(){
        form = document.getElementById('newNoteForm')
        form.addEventListener("submit", function(e){
            e.preventDefault()
            console.log("Note Submit")
            app.postNewNote()
        })
    }

    postNewNote(){
            const noteData = {note: {title: e.target.noteTitle.value, category: e.target.noteBody.value, language_id: e.target.langId.value}}
            //debugger //!
            console.log("Just before post request")
            fetch('http://localhost:3000/notes', { 
                method: "POST",
                body: JSON.stringify(noteData), 
                headers: { 
                    "Content-type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(data => {
                console.log(data)
                new Note(noteData.note)//.renderAsReadOnly()
                //! Create renderAsReadOnly method, will need
                //! read-onlyHtmlify in note.js
            })
    }

    toggleNewLanguageForm(){
        console.log("in newlanguageform function")
        //debugger  //!
        const form = document.getElementById('form-holder')
        switch (form.className){
            case "hidden":
                console.log("classname was 'hidden'") //!
                form.className = ""
                break;
            case "":
                console.log('classname was ""') //!
                form.className = "hidden"
                break;
        }


    }



}