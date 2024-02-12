const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// Initialize the Git repository
exec("git init", { cwd: process.cwd() }, (error, stdout, stderr) => {
  if (error) {
    console.error("Error initializing Git repository:", error);
    return;
  }

  // Create a new file
  const fileName = "1.txt";
  fs.writeFileSync(path.join(process.cwd(), fileName), "Hello, world!");

  // Add the file to the Git staging area
  exec("git add .", { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) {
      console.error("Error adding file to Git staging area:", error);
      return;
    }

    // Commit the changes to the Git repository
    exec('git commit -m "Add file"', { cwd: process.cwd() }, (error, stdout, stderr) => {
      if (error) {
        console.error("Error committing changes to Git repository:", error);
        return;
      }

      // Push the changes to the remote Git repository
      exec("git push origin main", { cwd: process.cwd() }, (error, stdout, stderr) => {
        if (error) {
          console.error("Error pushing changes to remote Git repository:", error);
          return;
        }

        // Keep creating new files and pushing them to the repository
        let fileNumber = 2;
        const interval = setInterval(() => {
          const fileName = `${fileNumber}.txt`;
          fs.writeFileSync(path.join(process.cwd(), fileName), `Hello, world! from file ${fileNumber}`);

          exec("git add .", { cwd: process.cwd() }, (error, stdout, stderr) => {
            if (error) {
              console.error("Error adding file to Git staging area:", error);
              return;
            }

            exec('git commit -m "Add file"', { cwd: process.cwd() }, (error, stdout, stderr) => {
              if (error) {
                console.error("Error committing changes to Git repository:", error);
                return;
              }

              exec("git push", { cwd: process.cwd() }, (error, stdout, stderr) => {
                if (error) {
                  console.error("Error pushing changes to remote Git repository:", error);
                  return;
                }

                console.log(`Successfully created and pushed file ${fileName} to the Git repository`);
              });
            });
          });

          fileNumber++;
        }, 5000);
      });
    });
  });
});
