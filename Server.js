const express = require('express');
const path = require('path');

const app = express();
const PORT =7777;
app.use(express.static(__dirname)); // Serve all files from root


app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
