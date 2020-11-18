class Note{

    static all = []

    constructor(note){
        this.id = note.id
        this.title = note.title
        this.body = note.body
        Note.all.push(this)
    }

    htmlifyForIndex(){
        return(`<li class="note${note.id}"> ${this.title} </li>`)
    }
    
    
}