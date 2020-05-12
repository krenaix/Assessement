# PhoneBook Assessement

## Setting Up

For simplicity sake I have added both the `backend` and the `front end` to the same repo.
To set up download or clone the project from this repository.

## Front End
The front end is written in angular, so you will need to install the angular cli to run  it as well as node. If you have'nt alreay quickly install node and Angular on your machine.

Once you have downloaded/cloned the project open the front end project in your IDE of choice (I prefer VS CODE), then run the command `npm i` to re-install node modules packages.
once the installation is complete run the command `ng serve` or the command `ng serve -c localhost` to start the application.
Once started open your browser to `http://localhost:4200/`
At this point the front end is set up, now we need to set up the backend.

## Back End

the backend is written in .net core, you will need to have that installed to run it locally.
Once you have .net core installed open the project in your IDE of choice. 
If using VS Code open a terminal and type `dotnet restore` this will restore all the packages the application needs.

once that is done in the same terminal run the command `dotnet run`.
This should start up the server

## Database
Again to make things simple so that you don't have to set up mySql of MSSQL I a sqlLite database, you can find this in the `database` folder of the backend application. to view the database you can install an sqlLite IDE ( they are very light weight and quick to download), I use `DB Browser for SQLite` you can find it at `https://sqlitebrowser.org/`

## Moving On
Once the server is running go back to the front end application on your browser and either register a new account by clicking on the registration link or login using this predefined account `Cellphone Numbeer: 0746477427, Password: Cool@bAlive`

Happy Tetsting!!

