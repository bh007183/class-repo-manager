const inquirer = require("inquirer");
console.log("thishtisoihoh")
const fs = require("fs");
const path = require("path");
const child_process = require("child_process"); // native in nodeJs
const moment = require("moment");
const choices = [
  "01-HTML-Git-CSS",
  "02-Advanced-CSS",
  "03-JavaScript",
  "04-Web-APIs",
  "05-Third-Party-APIs",
  "06-Server-Side-APIs",
  "07-Project-1",
  "08-Project-1",
  "09-NodeJS",
  "10-OOP",
  "11-Express",
  "12-SQL",
  "13-ORM",
  "14-MVC",
  "15-Project-2",
  "16-Project-2",
  "17-CS",
  "18-NoSQL",
  "19-PWA",
  "20-React",
  "21-MERN",
  "22-State",
  "23-Project-3",
  "24-Project-3",
];
const PathToLocalVersionOfGitLab =
  "/Users/benhopkins/code/uncc-virt-bo-fsf-pt-07-2021-u-b";
// Getting list of current folders in GitLab
let ArrayOfFolders = fs
  .readdirSync(PathToLocalVersionOfGitLab)
  .filter(function (file) {
    return fs.statSync(PathToLocalVersionOfGitLab + "/" + file).isDirectory();
  });
//Getting value of next index that needs to be pushed
const nextIndex = parseInt(
  ArrayOfFolders[ArrayOfFolders.length - 1].split("-")[0]
);
console.log(nextIndex);
// Function for copying every file over that is not in Solved Main or main
function copyRecursiveSync(src, dest) {
  try {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(function (childItemName) {
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
}
// /uncc-virt-bo-fsf-pt-07-2021-u-b/${choices[nextIndex]}
// setInterval(() => {
  console.log("setInterval triggered")
  if (moment().format("dddd") === "Friday") {
    copyRecursiveSync(
      `/Users/benhopkins/class/fullstack-online/01-Class-Content/${choices[nextIndex]}`,
      `/Users/benhopkins/class`
    );
    let child = child_process.exec(
      'git add . && git commit -m "First Push of Week" && git push',
      { cwd: "/Users/benhopkins/class/uncc-virt-bo-fsf-pt-07-2021-u-b" }
    );
    child.stderr.on("data", function (data) {
      console.error("STDERR:", data.toString());
    });
    child.stderr.on("error", function (data) {
      console.error("test", data.toString());
    });
    child.stdout.on("data", function (data) {
      console.log("STDOUT:", data.toString());
    });
    child.on("exit", function (exitCode) {
      console.log("Child exited with code: " + exitCode);
    });
  }
// }, 86400000);


