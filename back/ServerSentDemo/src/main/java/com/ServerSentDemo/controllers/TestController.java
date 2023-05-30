package com.ServerSentDemo.controllers;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
public class TestController{
	
	//Un emitter correspond à 1 utilisateur, il faudra stocker des emitters dans une liste afin de gérer plusieurs connections simultannées.
	private SseEmitter emitter;
	private Long lastId = 0L;

	//endpoint http de test
	@GetMapping(value="/test", produces="application/json")
    public ResponseEntity<String> test() {
    	return new ResponseEntity<>("Hello World!", HttpStatus.OK);
    }
	
	//endpoint http de subscription aux server sent events de démo
	@GetMapping(value="SSE/subscribe")
    public SseEmitter subscribe() throws IOException {
		//La valeur passée en argument permet de définir la durée de vie de l'emetteur (en ms)
		this.emitter = new SseEmitter(600000L);
		
		this.emitter.send(SseEmitter.event()
				/*name : type d'événements. Seules deux valeurs sont possibles : message (pour les événements normaux) 
				 * et error (pour les événements d'erreurs). Attention, les événements d'erreur ferment la connexion. */
				.name("message")
				//id : identifiant unique à chaque message permettant de les traquer (utilisé aussi dans le cas de reconnexion).
				.id(""+lastId++)
				//data : données envoyées.
				.data("connexion test")
				);
		
		return this.emitter;
    }
	
	//La méthode heartbeat sert à envoyer un message quelconque au frontend afin de maintenir la connexion en vie.
	//à l'exception de la méthode du endpoint en lui-même, toute la logique de création, d'initialisation, de maintient en vie de la connexion et d'envoi de données peut être déplacée dans un service adéquat.
	@Scheduled(fixedRate = 30000)  
	public void heartbeat() throws IOException {
		this.emitter.send(SseEmitter.event()
					.name("message")
					.id("" + ++lastId)
					.data("heartbeat"));
	}
	
	@SuppressWarnings("unused")
	private void sendMessage(Object data) throws IOException {
		this.emitter.send(SseEmitter.event()
					.name("message")
					.id("" + ++lastId)
					.data(data));
	}
	
}