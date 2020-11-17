class App {

    static languages = []

    fetchLanguages(){
        console.log("Fetching Languages")
        fetch('http://localhost:3000/languages')
        .then(resp => resp.json())
        .then(data => console.log(data))
            // data.forEach(lang => 
            //     new Language(lang.id, lang.name, lang.category, lang.notes))
            //     )
            //     this.renderLanguages(this.languages)
    }

    
    fetchLanguageById(id){
        fetch(`http://localhost:3000/languages/${id}`)
        .then(resp => resp.json())
        .then(lang =>      
                new Language(lang.id, lang.name, lang.category, lang.notes))
                renderLanguages(lang)
    }

    renderLanguages(languages){
        console.log("rendering")
        const spot = document.getElementById('cards')
        const ul = document.createElement('ul')
        const newCard = "<li> `${this.name}, ${this.notesLength} Notes` </li>"
        spot.appendChild(ul)
            languages.forEach(function() 
                {spot.innerHTML += newCard)}
    }



}