class Fetches {


//Handles GET fetch request for all data
//used in the application
    static initData(){
        app.renderSpinner()
        fetch('http://localhost:3000/languages')
        .then(resp => resp.json())
        .then(data => {
            Language.refreshStorage(data)
            Note.refreshNoteStorage()
            app.renderSortedLanguages(Language.all)
            })
        .catch(error => {
            Alerts.danger(error)
        })
    }

    static editNote(note){
        fetch(`http://localhost:3000/notes/${note.id}`, { 
            method: "PATCH",
            body: JSON.stringify({note}), 
            headers: { 
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
    }

    static postLanguage(language){
        fetch('http://localhost:3000/languages', { 
            method: "POST",
            body: JSON.stringify(language), 
            headers: { 
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
    }

    static deleteLanguage(id){
        fetch('http://localhost:3000/languages/id', { 
            method: "DELETE",
            body: JSON.stringify(language), 
            headers: { 
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
    }

}