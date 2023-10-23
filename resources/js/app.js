import '../css/app.css'

document.getElementById('deleteButton').addEventListener('submit', function(event) {
    var confirmation = confirm("Voulez-vous vraiment supprimer ?");
    if (!confirmation) {
        event.preventDefault(); // Empêche la soumission du formulaire si l'utilisateur clique sur "Annuler"
    }
});