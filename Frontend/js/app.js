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
        
    renderLanguages(){
        const spot = document.querySelector('.cards')
        const ul = document.createElement('ul')
        const newSpot = spot.appendChild(ul)
        newSpot.innerHTML = ""
        Language.all.forEach(function(lang){
           newSpot.innerHTML += lang.htmlifyForIndex()
        })
        const langCards = document.querySelectorAll('.lang-card')
           langCards.forEach(function(f){
            f.addEventListener("click", function(e){
               const notes =  `<ul> ${Note.findNotesByLanguage(e.target.id).map(note=>
               note.htmlifyForIndex()).join('')} </ul>`
               if (e.target.className === 'lang-card'){
                const ul = document.createElement('ul')
                e.target.appendChild(ul)
                e.target.children[0].innerHTML=""
                e.target.children[0].innerHTML += notes
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

    mountListeners(){
        const form = document.getElementById('newLanguageForm')
        form.addEventListener("submit", function(e){
            e.preventDefault()
            debugger

        })
    }


}