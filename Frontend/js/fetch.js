class Fetches {

//Handles GET fetch request for all data
//used in the application
    static initData(){
        app.renderSpinner()
        fetch(`http://localhost:3000/languages`)
        .then(resp => resp.json())
        .then(data => {
            Languages.refreshStorage(data)
            Note.refreshNoteStorage()
            app.renderSortedLanguages(Languages.all)
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
        .then(resp => resp.json())
        .then(data => {
            if (data.status !== 200){
                Alerts.danger(data.error)
            } else {
                Alerts.success(`${data.note.title} edited successfully!`)
                Fetches.initData
            }
        })
        .catch(error => Alerts.danger(error))
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
        .then(resp => resp.json())
            .then(data => {
                app.toggleNewLanguageForm()
                new Languages(data)
                app.renderByPageFlag()
                Alerts.success( `${data.name} created successfully!` )
            })
            .catch( error => Alerts.danger(error) )
    }

    static deleteLanguage(e){
        fetch(`http://localhost:3000/languages/${e.target.id}`, { 
            method: "DELETE", 
            headers: { 
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
    }

//handles POST fetch with new note => re-initializes application
    static postNewNote(noteData){
        console.log(noteData)
        fetch('http://localhost:3000/notes', { 
            method: "POST",
            body: JSON.stringify(noteData), 
            headers: { 
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(data => {
            new Note(data)
        })
        .then(() => {
            app.renderSortedLanguages(Languages.all)
            Alerts.success("Notebook successfully updated")
        })
        .catch(error => Alerts.danger(error))
    }

}