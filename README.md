# opentalent-network

Une application Node.js pour vérifier l'état des applications et services
Opentalent.


## Présentation

Cette application ne se contente pas de faire de simples requêtes HTTP. Elle
vérifie également la conformité des pages, afin de s'assurer que le contenu
correspond à ce qui est attendu.

Des tests sont donc effectués sur les réponses données par le serveur. Et
l'application va aussi fournir des informations sur:
- les temps de réponse
- le statut des pages
- l'origine possible des problèmes rencontrés


## Utilisation

Pour installer l'application:

```
npm i -g opentalent-network
```

Pour lancer une analyse:

```
opentalent-network
```


## Liens

Github: https://github.com/LittleJ/opentalent-network

NPM: https://www.npmjs.com/package/opentalent-network
