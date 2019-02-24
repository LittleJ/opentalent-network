#!/usr/bin/env node

/**
 * TRAITEMENT DE LA DEMANDE
 *
 * On supprime les deux premiers paramètres ("node" et "script.js"),
 * et on récupère le paramètre suivant (optionnel)
 */

var args = process.argv.splice(process.execArgv.length + 2);
var option = args[0];

/**
 * IMPORTS
 *
 * Packages utilisés par cette application
 */

var check = require('../lib/index.js');
var emoji = require('node-emoji');
var chalk = require('chalk');

/**
 * ANALYSE
 *
 * Exécution des différents tests
 */

console.log("\n");
console.log(emoji.get("arrow_right") + chalk.bold("  PLATEFORME"));
console.log("\n");
check.status(
  "https://www.opentalent.fr",
  "PORTAIL OPENTALENT",
  "div id=\"google-map\"",
  "Carte Google présente sur la page",
  "Carte Google absente de la page. Le portail serait-il en maintenance ?"
);
check.status(
  "https://www.opentalent.fr/login",
  "PAGE DE CONNEXION",
  "form class=\"logMeIn\" action=\"https://www.opentalent.fr/login/\"",
  "Formulaire de connexion présent sur la page",
  "Formulaire de connexion absent de la page. Le logiciel serait-il en maintenance ?"
);

setTimeout(function () {
  console.log("\n");
  console.log(emoji.get("arrow_right") + chalk.bold("  ASSISTANCE"));
  console.log("\n");
  check.status(
    "https://assistance.opentalent.fr",
    "JIRA",
    "<meta name=\"application-name\" content=\"JIRA\"",
    "Balise META (application-name=JIRA)",
    "Balise META \"application-name\" absente ou invalide. L'application JIRA est-elle bien active ?"
  );
  check.status(
    "https://ressources.opentalent.fr",
    "CONFLUENCE",
    "<meta id=\"confluence-space-key\" name=\"confluence-space-key\" content=\"AS\">",
    "Balise META (confluence-space-key=AS)",
    "Balise META \"confluence-space-key\" absente ou invalide. L'application Confluence est-elle bien active ? L'espace \"AS\" a-t-il été renommé, déplacé ou supprimé ?",
  );
  check.status(
    "https://ressources.opentalent.fr/display/DOC",
    "DOCUMENTATION",
    "<meta id=\"confluence-space-key\" name=\"confluence-space-key\" content=\"DOC\">",
    "Balise META (confluence-space-key=DOC)",
    "Balise META \"confluence-space-key\" absente ou invalide. L'application Confluence est-elle bien active ? L'espace \"DOC\" a-t-il été renommé, déplacé ou supprimé ?",
  );
  check.status(
    "https://ressources.opentalent.fr/display/FAQ",
    "FAQ",
    "<meta id=\"confluence-space-key\" name=\"confluence-space-key\" content=\"FAQ\">",
    "Balise META (confluence-space-key=FAQ)",
    "Balise META \"confluence-space-key\" absente ou invalide. L'application Confluence est-elle bien active ? L'espace \"FAQ\" a-t-il été renommé, déplacé ou supprimé ?",
  );
}, 3500);

setTimeout(function () {
  console.log("\n");
  console.log(emoji.get("arrow_right") + chalk.bold("  COMMERCIAL"));
  console.log("\n");
  check.status(
    "https://www.2iopenservice.fr",
    "2IOPENSERVICE.FR"
  );
  check.status(
    "https://www.2iopenservice.com",
    "2IOPENSERVICE.COM"
  );
}, 7000);

setTimeout(function () {
  var stats = check.report();
  console.log("\n");
  console.log(emoji.get("arrow_right") + chalk.bold("  RAPPORT D'ANALYSE"));
  console.log(" ");
  console.log("   SITES CONTROLES    " + stats.total);
  console.log(chalk.gray("   Conformes:         " + stats.success));
  console.log(chalk.gray("   Non conformes:     " + stats.warning));
  console.log(chalk.gray("   Inaccessibles:     " + stats.error));
  console.log("\n");
}, 10500);
