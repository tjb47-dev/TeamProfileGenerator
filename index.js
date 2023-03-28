const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./team/Manager');
const Engineer = require('./team/Engineer');
const Intern = require('./team/Intern');


let managerAnswers = []
let teamMemberTypeAnswers = []
let teamMembers = []
let htmlPageContent
let teamMemberHTML = ""
let managerHTML = ""

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
]

const addTeamMember = [
  {
      type: 'confirm',
      name: 'addTeamMember',
      message: 'Would you like to add an engineer or an intern?'
    }
]