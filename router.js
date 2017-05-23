const Profile = require('./profile.js');

function home(request, response) {
	if (request.url === '/') {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write("Header\n");
		response.write("Search\n");
		response.end("Footer\n");
	}
}
function user(request, response) {
	const userName = request.url.replace('/', '');
	if (userName.length > 0) {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write("Header\n");
		//e merr JSON prej treehouse
		const studentProfile = new Profile(userName);

		studentProfile.on("end", function(profileJSON) {

			const values = {
				avatarUrl: profileJson.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javaScriptPoints: profileJSON.points.JavaScript 
			}

			response.write(`${values.username} has ${values.badges} badges \n`);
			response.end("Footer\n");

		});

		studentProfile.on("error", function(error) {

			response.write(error.message + '\n');
			response.end("Footer\n");

		});

	}
}

module.exports.home = home;
module.exports.user = user;