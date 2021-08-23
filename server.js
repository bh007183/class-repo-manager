const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

var copyRecursiveSync = function (src, dest) {
  try {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(function (childItemName) {
        console.log(childItemName);
        if (
          childItemName !== "Solved" &&
          childItemName !== "Main" &&
          childItemName !== "main"
        ) {
          copyRecursiveSync(
            path.join(src, childItemName),
            path.join(dest, childItemName)
          );
        }
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  } catch (err) {
    console.error(err.message);
  }
};
inquirer
  .prompt([
    {
      name: "data",
      message: "What module would you like to upload to GitLab?",
      type: "list",
      choices: [
        "01-HTML-Git-CSS",
        "02-Advanced-CSS",
        "03-JavaScript",
        "04-Web-APIs",
        "05-Third-Party-APIs",
        "06-Server-Side-APIs",
        "09-NodeJS",
        "10-OOP",
        "11-Express",
        "12-SQL",
        "13-ORM",
        "14-MVC",
        "17-CS",
        "18-NoSQL",
        "19-PWA",
        "20-React",
        "21-MERN",
        "22-State",
      ],
    },
  ])
  .then((res) => {
    copyRecursiveSync(
      `/Users/benhopkins/class/fullstack-online/01-Class-Content/${res.data}`,
      `/Users/benhopkins/class/test/${res.data}`
    );
  });
