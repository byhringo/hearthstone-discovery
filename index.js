var express = require('express');

var app = express();

app.use('/dist', express.static('frontend/dist'));

//Render the front page
app.get('/', (req, res)=>{
	res.sendFile(__dirname+"/frontend/index.html");
});

app.listen(process.env.PORT || 3000, ()=>{
	console.log('Listening on port 3000');
});
