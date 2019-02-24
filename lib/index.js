// ./lib/index.js

/**
 * IMPORTS
 *
 * Packages utilisés par cette application
 */

var request = require('request');
var emoji = require('node-emoji');
var perf = require('execution-time')();
var roundTo = require('round-to');
var chalk = require('chalk');

/**
 * REPORT()
 *
 * Renvoie une synthèse de l'analyse effectuée
 *
 * @var {numberSuccess} Nombre de sites conformes
 * @var {numberWarning} Nombre de sites non conformes
 * @var {numberError} Nombre de sites inaccessibles
 */

var numberSuccess = 0;
var numberWarning = 0;
var numberError = 0;
var report = function() {
  var stats = {
    "success": numberSuccess,
    "warning": numberWarning,
    "error": numberError,
    "total": numberSuccess + numberWarning + numberError
  };
  return stats;
}

/**
 * STATUS()
 *
 * Permet d'obtenir le statut d'un site et d'effectuer un test sur la page
 *
 * @param {url} Adresse du site
 * @param {title} Titre de la tâche
 * @param {test} Chaîne de caractères qui doit être présente sur la page
 * @param {testSuccess} Texte à afficher en cas de réussite du test
 * @param {testFailure} Texte à afficher en cas d'échec du test
 */

var status = function(url,title,test,testSuccess,testFailure) {

  perf.start();

  request(url, function (error, response, body) {

    var timeEnd = perf.stop();

    var timeExecution = roundTo(timeEnd.time,0) + "ms";

    if(!error) {

      if(response.statusCode == 200) {

        if(test) {

          if(body.indexOf(test) != -1) {
            console.log(emoji.get("heavy_check_mark") + "  " + title);
            console.log(chalk.gray("   Réponse serveur:   200 - OK"));
            console.log(chalk.gray("   Temps de réponse:  " + timeExecution));
            console.log(chalk.gray("   Test subsidiaire:  " + testSuccess));
            numberSuccess += 1;
          } else {
            console.log(emoji.get("warning") + "  " + title);
            console.log(chalk.gray("   Réponse serveur:   " + response.statusCode + " - " + response.statusMessage));
            console.log(chalk.gray("   Temps de réponse:  " + timeExecution));
            console.log(chalk.gray("   Test subsidiaire:  ") + chalk.yellow(testFailure));
            numberWarning += 1;
          }

        } else {
          console.log(emoji.get("heavy_check_mark") + "  " + title);
          console.log(chalk.gray("   Réponse serveur:   200 - OK"));
          console.log(chalk.gray("   Temps de réponse:  " + timeExecution));
          numberSuccess += 1;
        }

      } else {
        console.log(emoji.get("x") + " " + title);
        console.log(chalk.gray("   Réponse serveur:   ") + chalk.red(response.statusCode + " - " + response.statusMessage));
        console.log(chalk.gray("   Temps de réponse:  " + timeExecution));
        numberError += 1;
      }

    } else {
      console.log(emoji.get("x") + " " + title);
      console.log(chalk.gray("   Réponse serveur:   ") + chalk.red(error.code));
      console.log(chalk.gray("   Temps de réponse:  " + timeExecution));
      numberError += 1;
    }

  });

}

/**
 * EXPORTS
 *
 * Fonctions disponibles dans l'ensemble de cette application
 */

exports.status = status;
exports.report = report;
