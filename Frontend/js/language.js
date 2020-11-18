
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
        return(`<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text" id="lang${this.id}">${this.notesLength} Notes</p>
          <a href="#" class="btn btn-primary lang-card-btn" id="${this.id}">Expand</a>
        </div>
      </div>`
      )}

    createNotes(){
        const parentId = this.id
        this.notes.map((note) => {
            Object.assign(note, {parentId: parentId})
            return newNote(note)
        })
    }

    
}
    