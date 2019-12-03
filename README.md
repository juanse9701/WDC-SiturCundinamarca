## WDC SITUR
*Web Data Conector (WDC) que extrae los datos de los reportes para la plataforma SITUR Cundinamarca y así visualizarlos en **tableau**.*

Un **WDC** es una página HTML con codigo JavaScript que conecta los datos web que provienen de una API REST, estos datos son convertidos a formato JSON y son pasados como datos a Tableau.

## Por que un HTML?

Cuando tu abres un WDC en tableau, tu visualizas una página html enlazada a tu código JS y la libreria de WDC.

      <script src="https://connectors.tableau.com libs/tableauwdc-2.3.latest.js" type="text javascript"></script>

      <script src="yourCode.js" type="text/javascript"></script>

* **tableauwdc-2.3.latest.js** es el archivo o libreria principal para el WDC API. 

## Código JavaScript :

    (function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {

    };

    myConnector.getData = function (table, doneCallback) {

    };

    tableau.registerConnector(myConnector);
    })();

* El código es un función que se invoca inmediatamente (IIFE) para crear un scope local.
* El objeto de **tableau** no esta definido en nuestro código, pero si esta el la libreria del **WDC**.
* La función **makeConnector** es un constructor que predefine algunos métodos para nuestro objeto conector.
* **getSchema** y **getData** son funciones que contendran la lógica para obtener el esquema de la tabla que contendra los datos y descargar los datos.
* La función **registerConnector** valida el objeto antes de la inicialización.