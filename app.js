
  const chalk = require('chalk');
  const clear = require('clear');
  const figlet = require('figlet');
  
  
  clear();
  
  console.log(
    chalk.blue.bold(
      figlet.textSync('PowerHost')
    )
  );
  console.log(chalk.bgBlue.underline.bold('Tool created by Aarush Paul'));
  console.log(chalk.blue(' '));
  
  'use strict';
  const  inquirer = require('inquirer');

const startApp = () => {


inquirer
  .prompt([
    {
      type: 'list',
      name: 'theme',
      message: 'Please select an option: ',
      choices: [
        'Start hosting my files',
        'Report a bug',
        'Credits',
      ],
    },
  ])
  
	.then((answer) => {
		if (answer.theme === 'Start hosting my files'){
      console.log(' ')
        console.log(chalk.bgCyan.white.bold('Please open the folder named public at'));
        console.log(chalk.bgCyan.white.bold(__dirname, 'in your file manager and put your files'));
        console.log(chalk.bgCyan.white.bold('which are to be hosted. Make sure that there is an index.html and a 404.html.'));
        console.log(' ');
        host();
		};
		if (answer.theme === 'Report a bug'){
			console.log(' ');
			console.log(chalk.bgRed.white.bold('Please go to https://github.com/aarush-paul/powerhost/issues and describe the bug.'));
			console.log(' ');
			startApp();
		};
    if (answer.theme === 'Credits'){
			console.log(' ');
			console.log(chalk.bgYellow.white.bold('This tool is created by Aarush Paul'));
      console.log(chalk.bgYellow.white.bold('Please follow me at https://github.com/aarush-paul'));
			console.log(' ');
			startApp();
		};
	});
	
	
};




const host = () => {
  inquirer
    .prompt([
      {
        name: 'port',
        type: 'number',
        message: 'Please enter a port number where your files will be hosted: ',
      },
    ])
    .then((answer) => {
      if (!answer.port) {
        console.log(chalk.bgRed.white.bold('Please enter a valid number'));
        console.log(' ');
        host();
      } 
	    else if (answer.port > '65535'){
		    console.log(chalk.bgRed.white.bold('A port number should be between 1024 to 65535'));
        console.log(' ');
		    host();
	    }
		else if (answer.port < '1024'){
		    console.log(chalk.bgRed.white.bold('A port number should be between 1024 to 65535'));
        console.log(' ');
		    host();
	    }
	    else {
			  var CLI = require('clui'),
			  Spinner = CLI.Spinner;

		    var countdown = new Spinner('Hosting your files  ', ['◜','◠','◝','◞','◡','◟']);

        console.log('\n');
		    countdown.start();

		    var number = 5;
		    setInterval(function () {
		    	number--;
		    	if (number === 0) {
		    		countdown.stop()
            const express = require('express');
          const app = express();
          const PORT = answer.port;
          const path = require('path');
		
          app.use(express.static('public'));

          app.get('/', (req, res) => {
              res.send('Success');
          });
          app.use(function(req, res, next) {
          	res.status(404);

          	// respond with html page
          	if (req.accepts('html')) {
          		res.status(404).sendFile(path.join(__dirname, '/public/404.html'));
          	  return;
          	};
         });
          app.listen(PORT);
          console.log(chalk.bgGreen.white.bold(`Webpage hosted at http://localhost:${PORT}\nPress Ctrl + C to stop hosting your files`));
		      	}
		    }, 1000);
      };
    });
  };
startApp();
