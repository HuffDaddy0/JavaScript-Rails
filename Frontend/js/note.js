class Note{

    static all = []

    constructor(note){
        this.id = note.id
        this.title = note.title
        this.body = note.body
        this.parentId = note.parentId
        Note.all.push(this)
    }

    static refreshNoteStorage(){
        Note.all = []
        Language.all.forEach(function(lang){
            const id = lang.id
            lang.notes.forEach(function(note){
                Object.assign(note, {parentId: id})
                new Note(note)
            })
        })
    }

    static findNotesByLanguage(langId){
       return Note.all.filter(function(note){
            return note.parentId == langId
        })
    }

    htmlifyForIndex(){
        return(`<li class="note-summary" id="${this.id}"> 
        <h4>${this.title}</h4>
        <p>${this.body}</p> 
        </li>`)
    }


    static newForm(){
        return(`<form class="newNoteForm">
        <select class="form-control form-control-lg" id="langId" placeholder="What language are you studying today?">
            ${Language.htmlifyAllAsOptions()}
        </select>
        <br>
        <input class="form-control form-control-lg" id="noteTitle" type="text" placeholder="Title">
        <textarea class="form-control" id="noteBody" rows="20"></textarea>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        `)
    }


}