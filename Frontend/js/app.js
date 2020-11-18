class App {

    fetchLanguages(){
        fetch('http://localhost:3000/languages')
        .then(resp => resp.json())
        .then(data => {
            data.forEach(lang => {     
                new Language(lang.id, lang.name, lang.category, lang.notes) 
                })
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
        Language.all.forEach(function(lang){
           const fin = newSpot.innerHTML += lang.htmlifyForIndex()
           fin.addEventListener("click", function(e){
                renderNotes(e.target.className, e.target)
           })
        })
    }

    renderNotes(langID, cardClicked){
        Language.findById(langID).createNotes()
        Note.all.forEach(function(note){
            
        })


    }


}