---
title: Setting Up Phoenix Front End
lastChecked: 2019-08-19
---

# Setting Up Phoenix Front End

# Overview

The repository can be found at (https://dev.azure.com/KrenaixProjects/_git/Phoenix)

You will need the following to set up the project on your machine.
1. Git
2. An IDE of your choice (I recommend VS Code or Inteli J)
3. Node.js
4. `Anugular 8` (version at the time of development).
    - Once Node is installed open bash or powershell terminal and run command `npm install -g @angular/cli`. for more on Angular go to `https://cli.angular.io/`.

Once all software is set up follow the below steps to get the code running

-  clone the repository from git by running command `git clone https://KrenaixProjects@dev.azure.com/KrenaixProjects/Phoenix/_git/Phoenix` (make sure to be in the folder you want your repository in).
-  Open the code in VS Code (IDE of choice).
-  Restore packages by running `npm i` in the terminal.
-  Note that the project runs on port `4200`.
-  Changing the default port can be done with the command ng serve --port {portNumber}
-  A more permanent solution is to add the following to `angular.json ` file
    ```
     "defaults": {
    "serve": {
      "port": 8080
        }
    }
    ```

-  To run the project run the command `ng serve` in the terminal, make sure the api is set up and running as well.
-  No open the browser to `http://localhost:4200`

