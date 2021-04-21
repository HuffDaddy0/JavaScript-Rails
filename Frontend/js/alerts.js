class Alerts {

    static success(message){
        const alert = document.getElementById('success-alert')
        alert.classList.remove('hidden')
        alert.innerHTML = (`<h1>${message}</h1>`)
        setTimeout(() => alert.classList.add('hidden'), 5000 )
    }


    static danger(error){
        const alert = document.getElementById('danger-alert')
        alert.classList.remove('hidden')
        alert.innerHTML = (`<h1>${error.message}</h1>`)
        setTimeout(() => alert.classList.add('hidden'), 5000 )
    }


}