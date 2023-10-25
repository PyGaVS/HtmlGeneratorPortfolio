import '../css/app.css'

let deleteButtons = document.getElementsByClassName('deleteForm')

for(let button of deleteButtons){
    button.addEventListener('submit', function(event) {
        console.log('click on delete button')
        var confirmation = confirm("Voulez-vous vraiment supprimer ?");
        if (!confirmation) {
            event.preventDefault(); // Empêche la soumission du formulaire si l'utilisateur clique sur "Annuler"
        }
    });
}
