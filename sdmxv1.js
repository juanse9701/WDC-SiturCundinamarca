// Función auto-ejecutable o IIFE 
(function() {
    // Crea el objeto conector para tableau
    var myConnector = tableau.makeConnector();
    // Define el en verdadero el dominio cruzado para no tener problemas en producción
    const opts = { crossDomain: true};
    // Define el esquema de la tabla que aparecera en tableau
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "periodo",
            alias: "periodo",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "departamento",
            alias: "departamento",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "indicador",
            alias: "indicador",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "medicion",
            alias: "medicion",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "valor",
            alias: "valor",
            dataType: tableau.dataTypeEnum.float
        }
    ];

        var tableInfo = {
            id: "SDXM",
            alias: "Tableau v1.1",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };

    // Función que recibe un objeto, este es utilizada para crear la tabla.
    const createTable = function (feat) {
        tableData = [];
            alert(feat[0].periodo)
            // Itera por cada dato de feat y va insertando el mismo en la tabla.
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "periodo": feat[i].periodo,
                    "departamento": feat[i].departamento,
                    "indicador": feat[i].indicador,
                    "medicion": feat[i].medicion,
                    "valor": parseFloat((feat[i].valor))
                });
            }
            return tableData;
    }


    // Método encargado de realizar la descarga de los datos.
    myConnector.getData = function(table, doneCallback) {
        /**
         * el metodo get recibe la url de los datos y un callback que va a tratarlos
         */
        var dateObj = JSON.parse(tableau.connectionData)
        slug = dateObj.slug;
        $.get("https://siturpanel.cundinamarca.gov.co/api/v1/estadisticas/sdmx/all/?slug=" + slug, function (resp) {
            // var feat = resp.features,
            var feat = resp // dependiendo del api el ().results puede cambiar, inclusive puede no ir, depende que devuelva el API.
            console.log(feat);
            table.appendRows(createTable(feat));
            doneCallback();
        });
    };


    tableau.registerConnector(myConnector);
    // Crea event listeners para cuando el usuario haga submits sobre el formulario
})();

/** lista de acciones que escuchan el evento clic y le pasa el los datos respectivos al objeto de tableau*/

$(document).ready(function() {
    $("#submitButton").click(function() {
        var dateObj = {
            slug: 'receptor'
        };
        // Agrega el valor de dateObj a la información de la conexión.
        tableau.connectionData = JSON.stringify(dateObj);
        // Este será el nombre de la fuente de datos en Tableau
        tableau.connectionName = "Tableau v1.1"; 
        // Aquí se envia el objeto conector a tableau(el scope de esta es global).
        tableau.submit(); 
    });
});

$(document).ready(function() {
    $("#oferta").click(function() {
        var dateObj = {
            slug: 'oferta'
        };
        // Agrega el valor de dateObj a la información de la conexión.
        tableau.connectionData = JSON.stringify(dateObj);
        // Este será el nombre de la fuente de datos en Tableau
        tableau.connectionName = "Tableau v1.1"; 
        // Aquí se envia el objeto conector a tableau(el scope de esta es global).    
        tableau.submit();
    });
});

$(document).ready(function() {
    $("#empleo").click(function() {
        var dateObj = {
            slug: 'empleo'
        };
        // Agrega el valor de dateObj a la información de la conexión.    
        tableau.connectionData = JSON.stringify(dateObj);
        // Este será el nombre de la fuente de datos en Tableau
        tableau.connectionName = "Tableau v1.1"; 
        // Aquí se envia el objeto conector a tableau(el scope de esta es global).
        tableau.submit();
    });
});

$(document).ready(function() {
    $("#ie").click(function() {
        var dateObj = {
            slug: 'interno_emisor'
        };
        // Agrega el valor de dateObj a la información de la conexión.
        tableau.connectionData = JSON.stringify(dateObj);
        // Este será el nombre de la fuente de datos en Tableau
        tableau.connectionName = "Tableau v1.1"; 
        // Aquí se envia el objeto conector a tableau(el scope de esta es global).
        tableau.submit(); 
    });
});

/** Develop by juan sebastian peralta muñoz for Grupo tecnologico CATO*/