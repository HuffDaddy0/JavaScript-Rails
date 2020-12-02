class Note{

    static all = []

    constructor(note){
        this.id = note.id
        this.title = note.title
        this.body = note.body
        this.language_id = note.language_id
        Note.all.push(this)
    }

    static findById(id_string){
        const id = Number.parseInt(id_string)
        return Note.all.find(note => note.id === id)
    }
//empties Note.all and repopulates with all notes from
//existing Languages
    static refreshNoteStorage(){
        Note.all = []
        Language.all.forEach(function(lang){
            const id = lang.id
            lang.notes.forEach(function(note){
                Object.assign(note, {language_id: id})
                new Note(note)
            })
        })
    }

    static findNotesByLanguage(langId){
       return Note.all.filter(function(note){
            return note.language_id == langId
        })
    }

    htmlifyForIndex(){
        return(`<li class="note-summary" id="${this.id}"> 
        <h4 class="note-title">${this.title}</h4>
        </li>`)
    }
// Returns pre-populated Form
    editHtmlify(){
        return(`<form class="editNoteForm">
        <input class="form-control form-control-lg" id="noteTitle" type="text" value="${this.title}">
        <textarea class="form-control" id="noteBody"  rows="20">${this.body}</textarea>
        <button type="submit" class="btn btn-primary">Edit</button>
        </form>`)
    }
//HTML for "New Note" Form
    static newForm(){
        return(`<form id="newNoteForm">
        ${Note.renderSelectInput()}
        <br>
        <input class="form-control form-control-lg" id="noteTitle" type="text" placeholder="Title">
        <textarea class="form-control" id="noteBody" rows="20"></textarea>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        `)
    }

    static renderSelectInput(){
        return(`<select class="form-control form-control-lg" id="langId" >
            ${Language.htmlifyAllAsOptions()}
        </select>`)
    }


}