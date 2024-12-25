const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const { repository, ref } = req.body;

  // Check if the push is to the main branch (change 'main' if needed)
  if (ref === 'refs/heads/main') {
    const repoName = repository.name;
    console.log(`Received push to the ${repoName} repository. Deploying...`);

    // Run the appropriate deployment script based on the repository
    if (repoName === 'frontend') {
      exec('./update-frontend.sh', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error: ${stderr}`);
          res.status(500).send('Error deploying frontend.');
          return;
        }
        console.log(stdout);
        res.status(200).send('Frontend deployed successfully!');
      });
    } else if (repoName === 'backend') {
      exec('sudo systemctl restart backend-service', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error: ${stderr}`);
          res.status(500).send('Error restarting backend.');
          return;
        }
        console.log(stdout);
        res.status(200).send('Backend restarted successfully!');
      });
    }
  } else {
    res.status(200).send('No action needed.');
  }
});

app.listen(port, () => {
  console.log(`Webhook listener is running on http://localhost:${port}`);
});
