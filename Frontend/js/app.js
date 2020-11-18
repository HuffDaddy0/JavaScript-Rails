class App {

    fetchLanguages(){
        fetch('http://localhost:3000/languages')
        .then(resp => resp.json())
        .then(data => {
            data.forEach(lang => {     
                new Language(lang.id, lang.name, lang.category, lang.notes) 
                })
                Note.refreshNoteStorage()
            this.renderLanguages()
            })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error)
        })
    }
    
        //! when recalling renderLanguages after POSTing a new language, duplicates are made.
    renderLanguages(){
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
                text.innerHTML=""
                text.innerHTML += notes
               }
            })
        })
    }

    // static renderNotes(langID, cardClicked){
    //     Language.findById()
    //     Note.all.forEach(function(note){
    //         debugger
    //     })


    // }

    mountFormListener(){
        const form = document.getElementById('newLanguageForm')
        form.addEventListener("submit", function(e){
            e.preventDefault()
            const langData = {language: {name: e.target.langName.value, category: e.target.langCategory.value}}
            // debugger
            fetch('http://localhost:3000/languages', { 
                method: "POST",
                body: JSON.stringify(langData), 
                headers: { 
                    "Content-type": "application/json",
                    "Accept": "application/json"
                }
            })
            // .then(resp => resp.json())
            .then(data => {console.log(data)
            e.target.reset()
            init()
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error)
            })
        })
    }

    renderTakeNotes(){

    }

}