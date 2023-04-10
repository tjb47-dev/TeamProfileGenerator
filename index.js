const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./team/Manager');
const Engineer = require('./team/Engineer');
const Intern = require('./team/Intern');

let teamMembers = [];
let teamMemberHTML = "";
let managerHTML = "";

const managerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  },
  {
    type: 'input',
    name: 'employeeID',
    message: 'What is your employee ID?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address?',
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: 'What is your office number?',
  }
];

const addTeamMember = [
  {
      type: 'confirm',
      name: 'addTeamMember',
      message: 'Would you like to add an engineer or an intern?'
    }
];

const employeeTypeQuestions = [
  {
      type: 'list',
      name: 'role',
      message: 'What type of employee would you like to add?',
      choices: ['engineer', 'intern']
    },
    ...managerQuestions.slice(0, 3),
    {
      type: 'input',
      name: 'github',
      message: 'What is your Github username?',
    },
    {
      type: 'input',
      name: 'school',
      message: 'What school did you attend?',
    }
];

function addTeamMemberType() {
  inquirer.prompt(employeeTypeQuestions)
      .then((teamMemberTypeAnswers) => {
          console.log(teamMemberTypeAnswers)

          if (teamMemberTypeAnswers.role === 'engineer') {
              const engineer = new Engineer(teamMemberTypeAnswers.name, teamMemberTypeAnswers.employeeID, teamMemberTypeAnswers.email, teamMemberTypeAnswers.github)
              teamMembers.push(engineer)
              console.log(teamMembers)
          } else {
              const intern = new Intern(teamMemberTypeAnswers.name, teamMemberTypeAnswers.employeeID, teamMemberTypeAnswers.email, teamMemberTypeAnswers.school)
              teamMembers.push(intern)
              console.log(teamMembers)
          }

          console.log('add team member type prompt')

          // prompt to add a team member
          promptAddTeamMember()
      })
      .catch((error) => console.log(error));
}

function promptAddTeamMember() {
  inquirer.prompt(addTeamMember)
      .then((confirmedAnswer) => {
          // if select Y to add a team member 
          if (confirmedAnswer.addTeamMember) {
              // if manager already exists then another cannot be made
              addTeamMemberType()  
          } else {
              // if no, manager is will be created
              console.log(teamMembers)
              generateTeamMemberHTML();

              // Print HTML
              fs.writeFile('index.html', teamMemberHTML, (err) =>
                err ? console.log(err) : console.log('Successfully created a manager but no one else!')
              );
          }

      })
      .catch((error) => console.log(error));
}


function generateTeamMemberHTML(teamMembers) {
  let managerHTML = '';
  let teamMemberHTML = '';

  for (const member of teamMembers) {
    if (member.role === 'Manager') {
      managerHTML += `
        <div class="card manager" style="width: 18rem;">
          <div class="card-header">
            ${member.name}
            <p>${member.role}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${member.id}</li>
            <li class="list-group-item">Email: <a href="mailto:${member.email}" target="_blank">${member.email}</a></li>
            <li class="list-group-item">Office Number: ${member.officeNumber}</li>
          </ul>
        </div>
      `;
    } else {
      teamMemberHTML += `
      <div class="card team-member" style="width: 18rem;">
        <div class="card-header">
          ${member.name}
          <p>${member.role}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${member.id}</li>
          <li class="list-group-item">Email: <a href="mailto:${member.email}" target="_blank">${member.email}</a></li>
          ${
            member.role === 'Engineer'
              ? `<li class="list-group-item">Github: <a href="https://github.com/${member.github}" target="_blank">${member.github}</a></li>`
              : member.role === 'Intern'
              ? `<li class="list-group-item">School: ${member.school}</li>`
              : ''
          }
        </ul>
      </div>
    `;
    }
  }

  const htmlPageContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" type="text/css" href="./assets/css/style.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
        <title>Team Profile Generator</title>
      </head>
      <body>
        <header class="p-5 mb-4 header profileHeader">
          <div class="container">
            <h1 class="display-4">Team Profiles</h1>
          </div>
        </header>
        <main class="employee-info">
          ${managerHTML}
          ${teamMemberHTML}
        </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
      </body>
    </html>
  `;

  return htmlPageContent;
}


function promptQuestions() {
  inquirer.prompt(managerQuestions)
      .then((managerAnswers) => {
      managerAnswer = managerAnswers;
      let manager = new Manager(managerAnswer.name, managerAnswer.employeeID,managerAnswer.email, managerAnswer.officeNumber)
      //creates a new instance of the Manager class
      console.log(manager)
      teamMembers.push(manager)
      promptAddTeamMember()
      //prompt the user whether to add more team members or not.

    })
    .catch((error) => {
      if(error.isTtyError) {
          console.log(error)
      } else {
          console.log(error)
      }
  })
}

promptQuestions()