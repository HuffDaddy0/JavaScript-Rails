class Language{
    constructor(id, name, category, notes){
        this.id = id
        this.name = name
        this.category = category
    }

    fetchLanguages(){
        fetch(https://localhost:3000/languages).then(resp =>
        Response.json()).then(data =>
            new Language(data.id, data.name, data.category, data.notes))
    }





    
}