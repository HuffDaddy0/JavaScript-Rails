
class Language{

    static all = []

    constructor(id, name, category, notes){
        this.id = id
        this.name = name
        this.category = category
        this.notes = notes
        Language.all.push(this)
    }

    static findById(id){
        return Language.all.find((lang) => lang.id === id)
    }

    get notesLength(){
        return this.notes.length
    }

    

    htmlifyForIndex(){
        return(`<li class="${this.id}">${this.name}: ${this.notesLength} Notes</li>`)
    }

    
}
    