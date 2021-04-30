class Events {
 
// selects each language card "expand button"
// adds event to open or close the card
    static delegateAccordianControls(){
        document.querySelectorAll('.lang-card-btn').forEach(f => {
            f.addEventListener("click", e => {
                e.preventDefault()
                const notes = `<ul> ${Note.findByLanguage(e.target.id).map(note=>
                note.htmlifyForIndex()).join('')} </ul>`
                if (e.target.className === "btn btn-primary lang-card-btn"){
                    const text = document.querySelector(`.card-text#lang${e.target.id}`)
                    switch (e.target.innerText){
                    case "Expand":
                        e.target.innerText = "Minimize"
                        text.innerHTML = ""
                        text.innerHTML += notes
                        const noteTitles = Array.from(document.getElementsByClassName('note-summary'))
                        noteTitles.forEach(title => title.addEventListener("click", function(e){
                            app.renderNoteAsEdit(e.target.parentElement.id)
                    }))
                        break;  
                    case "Minimize":
                        text.innerHTML = ""
                        //! render note length here
                        e.target.innerHTML = "Expand"
                        break;
                    }
                }
            })
        })
    }

    

}