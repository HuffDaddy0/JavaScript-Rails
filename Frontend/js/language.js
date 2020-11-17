languages = []
class Language{

    constructor(id, name, category, notes){
        this.id = id
        this.name = name
        this.category = category
        this.notes = notes
        languages.push(this)
    }

    notesLength(){
        return this.notes.length
    }

    
}
    function fetchLanguages(){
        fetch('http://localhost:3000/languages')
        .then(resp => resp.json())
        .then(data =>
            data.forEach(lang => 
                new Language(lang.id, lang.name, lang.category, lang.notes))
                )
                renderLanguages(languages)
    }

    
    function fetchLanguageById(id){
        fetch(`http://localhost:3000/languages/${id}`)
        .then(resp => resp.json())
        .then(data =>      
                new Language(lang.id, lang.name, lang.category, lang.notes))
                renderLanguages(data)
    }

    function renderLanguages(languages){
        const spot = document.getElementById('cards')
        const ul = document.createElement('ul')
        const newCard = `<li> ${lang.name}, ${lang.notesLength} Notes</li>`
        spot.appendChild(ul)
            languages.forEach(() => 
                spot.innerHTML += newCard)
    }