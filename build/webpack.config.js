const webpack = require('webpack');

module.exports = (env = {}) => {

	if (env.local){
		console.log('Local: ', env.local)
		return {
			// plugins: [
   //    			new webpack.DefinePlugin({ "process.env.API_URL": JSON.stringify("http://localhost:3000") })
   //    		],
			entry: {
		  		index: "./index.js",
		  		drawer: ["./drawer.js", "./draw.js"],
		  		sitter: "./sitter.js"
		  	},
			output: {
		    	filename: "[name].bundle.js"
			}
		}		
	}		
		
	if (env.remote){
		console.log('Remote: ', env.remote)
		return {
			plugins: [
				new webpack.DefinePlugin({"process.env.API_URL": JSON.stringify("https://agile-headland-63570.herokuapp.com")})
			],
			entry: {
		  		index: "./scripts.js",
		  		previousAdvice: "./previousAdviceScripts.js",
		  		singleEntry: "./singleEntry.js"
		  	},
			output: {
		    	filename: "[name].bundle.js"
			}
		}
	}		

}