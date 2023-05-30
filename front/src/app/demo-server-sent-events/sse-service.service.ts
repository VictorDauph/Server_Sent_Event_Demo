import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SseServiceService {

  //endpoint de la méthode qui gère l'emitter SSE côté back
  private sseEndpoint ='http://localhost:8080/test/SSE/subscribe';
  private eventSource: EventSource | undefined ;

  constructor() { }

  /*Le constructeur du EventSource va automatiquement lancer la requête et intercepter la réponse. 
  Tant que cet objet est en vie, la connexion le restera. De plus, si une erreur survient, 
  le processus de reconnexion se lancera automatiquement.*/
  public subscribe() {
		this.eventSource = new EventSource(this.sseEndpoint);

    /* onopen() : réagit aux événement de type open. Ces événements sont générés par l'ouverture de la connexion. 
    Ici on écrit dans la console l'événement uniquement à titre indicatif, aucune action spécifique n'est préconisée. */
    this.eventSource.onopen = ((ev) => console.log(ev));

    /*onerror() : réagit aux événement de type error. Globalement, ceux-ci sont a ignorer puisque l'auto-reconnexion prendra le relai. 
    Pour l'exemple on ne fait qu'afficher l'erreur. De plus, vous pouvez voir qu'on retourne en fin de méthode la valeur null. 
    Ceci permet n'ignorer l'affiche normalement automatique de certaines erreurs.
    Ce n'est pas obligatoire mais votre console de log risque d'être vite envahie si vous ne le faite pas. */
		this.eventSource.onerror = (ev => {
			console.log(ev);
			return null;
		});
    /*onmessage() : réagit aux événement de type message. Tous les événements normaux seront de ce type. 
    C'est dans cette méthode que devront concrètement être interprétés les messages envoyés par le Backend.
    (Ne pas oublier que même avec ce type, 
      tous les événements ne sont pas toujours pertinent, notamment les heartbeats.) */
		this.eventSource.onmessage = ((ev) => {
				console.log('évènement : '+ev.data)
		});

	}
}
