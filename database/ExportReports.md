# ar pmmt bulk export ftf data reports

This outlines the process of bulk exporting Africa Rising FtF data reports from Microsoft SQL Server Management Studio

#### Export Data via SQL Server Management Studio
  - Open up SQL Server Management Studio & Connect to CANDACE\MSSQL2012EXPRESS
  
  ![image1](images/bulk-export-1.png)
  
  - Using the Object Explorer, right click the AfricaRising production database, Select "Tasks" & then "Export Data..." This opens up the Import & Export Wizard.
  
  ![image2](images/bulk-export-2.png)
  
  - Select "Next" to chose your Data Source. In this case, our source is the **_AfricaRising_** production database. These should be the default settings:
  
  ![image3](images/bulk-export-3.png)

  - Select "Next" to chose your Data Destination. In the Destination drop down list, Select "Microsoft Excel" and chose a file path. This is where your data will be exported to.
  
  ![image5](images/bulk-export-4.png)
  
  - On the next screen, Select the radio button, "Copy data from one of more tables or views" & hit "Next"
  
  - We want to pull data from the view **_vwCSVReport_**
  
  ![image6](images/bulk-export-5.png)
  
  - Use the default settings for the Next two screen, and Select "Finish"
  
  ![image5](images/bulk-export-6.png)
  
  - Complete! Your data export should be located in file path provided in step 4
