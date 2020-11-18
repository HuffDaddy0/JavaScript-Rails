
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
        return(`<li class="lang-card" id="${this.id}">${this.name}: ${this.notesLength} Notes</li>`)
    }

    createNotes(){
        const parentId = this.id
        this.notes.map((note) => {
            Object.assign(note, {parentId: parentId})
            return newNote(note)
        })
    }

    
}
    