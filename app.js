const path = require("path");
const fs = require("fs");
const simpleGit = require("simple-git");

const git = simpleGit();

async function createAndPushFile(fileName) {
  await fs.writeFileSync(path.join(process.cwd(), fileName), `Hello, world! from file ${fileName}`);
  await git.add(fileName);
  await git.commit(`Add file ${fileName}`);
  await git.push();

  console.log(`Successfully created and pushed file ${fileName} to the Git repository`);
}

(async function() {
  for (let i = 1; i <= 10; i++) {
    await createAndPushFile(`${i}.txt`);
  }
})();
