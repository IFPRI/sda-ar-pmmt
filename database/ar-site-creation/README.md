# ar pmmt new site creation

This outlines the process of programmatically adding new AR Site Locations to the PMMT database. This workflow consists of 3 steps:
  
  - Create an XLS File in a format consistent with the example (This example was provided by Todd)
  - Update the config.json file, and run the node script
  - Execute the output sql file on the associated database

#### Create an xls file
Take a look at the [example file](af_site_points.csv) in which this script was based off. Here are a few important things to keep in mind:
  
  - The original file is a .csv. In order for the script to work, **_it must be generated to an .xls or .xlsx_**
  - The following fields are required: village, village_id, district_id, site_type, image_path, long & lat
  - Please confirm the spelling and capitalization the district & country columns is in sync with the database
  - Place your xls/xlsx file in the root of this directory.

#### Update [config.json](config.json)
This file contains simple options used to create the .sql script. Property values are **_case sensitive_**

  - **country** (optional) - Used to target specific which country in spreadsheet to target - Leave blank if you want to target all countries
  - **database** (required) - Used to target a specific PMMT database
      - *options*: AfricaRising, AfricaRising.Dev, AfricaRising.Test
  - **outputFileName** (required) - Filename of output .sql file used to execute on AR PMMT database (**_do not_** include .sql extension)
  - **inputFilename** (required) - Filename of xlxs spreadsheet containing new AR PMMT Sites. **_Filename must include extension (i.e. af_site_points.xlsx)_**

#### Execute node script
In order to execute our script, [index.js](index.js) - we must make sure that [node.js](https://nodejs.org/en/), & [npm](https://www.npmjs.com/) are installed on our machine. NPM is included in the node.js installation.
Once we've installed both dependencies - navigate to the root of the folder in your Terminal, command prompt or PowerShell & run the following commands

```npm install```

Then, 

```node index.js```

This will create a .sql file (_outputFilename_ in config.js) in the root of this directory.

#### Execute sql file on AR PMMT database
Open up SQL Server Management Studio on CANDACE, connect to database specified as _database_ in [config.json](config.json), and execute!
