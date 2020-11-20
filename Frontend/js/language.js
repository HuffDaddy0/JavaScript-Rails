
class Language{

    static all = []

    constructor(lang){
        this.id = lang.id
        this.name = lang.name
        this.category = lang.category
        this.notes = lang.notes ||= []
        Language.all.push(this)
    }

    static refreshStorage(){
        Language.all = []
    }

    static findById(idString){
        const id = Number.parseInt(idString)
        return Language.all.find((lang) => lang.id === id)
    }

    get notesLength(){
        return this.notes.length
    }

    static htmlifyAllAsOptions(){
        return Language.all.map(lang => `<option value="${lang.id}">${lang.name}</option>`).join('')
    }

    htmlifyForIndex(){
        return(`<div class="card">
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text" id="lang${this.id}">${this.notesLength} Notes</p>
          <a href="#" class="btn btn-primary lang-card-btn" id="${this.id}">Expand</a>
        </div>
      </div>`
      )}
    
    htmlifyNotesLength(){
        return(`<p class="card-text" id="lang${this.id}">${this.notesLength} Notes</p>`)
    }

    createNotes(){
        const language_id = this.id
        this.notes.map((note) => {
            Object.assign(note, {language_id: language_id})
            return newNote(note)
        })
    }

    
}
    