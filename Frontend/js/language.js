
class Languages{

    static all = []

    constructor(lang){
        this.id = lang.id
        this.name = lang.name
        this.category = lang.category
        this.notes = lang.notes ||= []
        Languages.all.push(this)
    }

    static refreshStorage(data){
        Languages.all = []
        data.forEach(lang => {     
            new Languages(lang) 
        })
    }

    static findById(idString){
        const id = Number.parseInt(idString)
        return Languages.all.find(lang => lang.id === id)
    }

    get notesLength(){
        return this.notes.length
    }

//HTML for New Note Form
    static htmlifyAllAsOptions(){
        return Languages.all.map(lang => `<option value="${lang.id}">${lang.name}</option>`).join('')
    }

//HTML for index card
    htmlifyForIndex(){
        return(`<div class="card">
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text" id="lang${this.id}">${this.notesLength} Notes</p>
          <a href="#" class="btn btn-primary lang-card-btn" id="${this.id}">Expand</a>
          <a href="#" class="btn btn-primary lang-card-delete-btn" id="${this.id}">Delete</a
        </div>
      </div>`
      )}
   
    htmlifyNotesLength(){
        return(`<p class="card-text" id="lang${this.id}">${this.notesLength} Notes</p>`)
    }

    

 
}
    