class Fetches {


//Handles GET fetch request for all data
//used in the application
    static initData(){
        app.renderSpinner()
        fetch('http://localhost:3000/languages')
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
                console.log(data.status)
                Alerts.danger(data.error)
            } else {
                console.log(data.status)
                Alerts.success(`${data.note.title} edited successfully!`)
                app.renderSortedLanguages(Languages.all)
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
        .then(resp => resp.json())
            .then(data => {
                app.toggleNewLanguageForm()
                new Languages(data)
                if ( App.pageFlag === "index" ){
                    app.renderSortedLanguages( Languages.all )
                } else if ( App.pageFlag === "new" ){              
                    app.renderTakeNotes()
                }
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

}