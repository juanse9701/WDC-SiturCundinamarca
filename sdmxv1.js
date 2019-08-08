(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();
    const opts = { crossDomain: true};
    // Define the schema
    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "name",
            alias: "name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableInfo = {
            id: "SDXM",
            alias: "Tableau v1.1",
            columns: cols
        };

        schemaCallback([tableInfo]);
    };


    const createTable = function (feat) {
        tableData = [];
            // Iterate over the JSON object
            // alert(feat[0].name)
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "name": feat[i].name,
                    "id": feat[i].id
                });
            }

            return tableData;
    }


    // Download the data
    myConnector.getData = function(table, doneCallback) {
        /**
         * el metodo get recibe la url de los datos y un callback que va a tratarlos
         */
        $.get("http://api.citybik.es/v2/networks/", function (resp) {
            // var feat = resp.features,
            var feat = resp.networks // dependiendo del api el ().results puede cambiar, inclusive puede no ir, depende que devuelva el API.
            console.log(feat);
            table.appendRows(createTable(feat));
            doneCallback();
        });
    };


    tableau.registerConnector(myConnector);
    // Create event listeners for when the user submits the form
})();

$(document).ready(function() {
    console.log('llega');
    setTimeout(function () {
        tableau.connectionName = "Tableau v1.1"; // This will be the data source name in Tableau
        tableau.submit(); // This sends the connector object to Tableau
    }, 500)
});