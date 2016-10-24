var xlsx = require('xlsx');
var utilities = xlsx.utils;
var Q = require('q');
var fs = require('fs');
var config = require("./config.json");
var ETL = module.exports = {};
var sqlArr = [];

var preStatement = "INSERT INTO [" + config.database + "].[dbo].[site]([village_id],[title],[district_id],[type],[image_path],[point]) VALUES";

ETL.utils = utilities;

ETL.createXLSdict = function (xlsfile) {
    var workbook = xlsx.readFile(xlsfile);
    var sheetObj = {};
    var deferred = Q.defer();

    workbook.SheetNames.forEach(function (val) {
        sheetObj[val] = ETL.utils.sheet_to_json(workbook.Sheets[val]);
    });

    deferred.resolve(sheetObj);
    return deferred.promise;
};

ETL.createXLSdict(__dirname + '/' + config.inputFilename)
    .then(function (sheetObj) {
        // use config to determine country ETL
        if (config.country !== null && config.country !== "") {
            sheetObj["af_site_points.csv"].forEach(function (row) {
                if (row["country"] === config.country) {
                    // escape single quotes
                    if (row["village"].indexOf("'") !== -1) {
                        row["village"] = row["village"].replace("'", "''");
                    }
                    var sql = preStatement + " ('" + row["village_id"] + "','" + row["village"] + "',(SELECT district_id FROM district WHERE title = '" + row["district"] + "'),'" + capitalizeEachWord(row["site_type"]) + "','" + row["url"] + "' ,geometry::STPointFromText('POINT(" + parseFloat(row["lon"]) + " " + parseFloat(row["lat"]) + ")', 4326));";
                    sqlArr.push(sql);
                }
            });
        } else {
            sheetObj["af_site_points.csv"].forEach(function (row) {
                // escape single quotes
                if (row["village"].indexOf("'") !== -1) {
                    row["village"] = row["village"].replace("'", "''");
                }
                var sql = preStatement + " ('" + row["village_id"] + "','" + row["village"] + "',(SELECT district_id FROM district WHERE title = '" + row["district"] + "'),'" + capitalizeEachWord(row["site_type"]) + "','" + row["url"] + "' ,geometry::STPointFromText('POINT(" + parseFloat(row["lon"]) + " " + parseFloat(row["lat"]) + ")', 4326));";
                sqlArr.push(sql);
            });
        }
        writeStatementToDisk();
    });

function writeStatementToDisk(cb) {
    var str = "";
    sqlArr.forEach(function (statement) {
        str += statement;
    });

    fs.writeFile(__dirname + '/' + config.outputFilename +'.sql', str, function (err) {
        if (err) {
            console.error('Had trouble writing ETL.sql. ');
        }
        if (cb) cb();
        console.log('Completed writing file ' + config.outputFilename + ' to disk.');
    });
}

function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}