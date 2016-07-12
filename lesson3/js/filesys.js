/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*global screen, setTimeout, window, document, tizen*/

(function initApp() {
	'use strict';

	var CHECK_WIFI_INTERVAL = 10000

	function init() {

	}

	init();

})();

var docsDir;

function writeFile() {
	var dir = tizen.filesystem;

	function onSuccess(files) {
		document.getElementById("file_text1").innerHTML = "Files:";
		var text = '';
		for (var i = 0; i < files.length; i++) {
			text = text + "Filename: " + files[i].name;
		}
		document.getElementById("file_text2").innerHTML = text;

		var myFile = docsDir.createFile("myFile.txt");
		if (myFile != null) {
			myFile.openStream("w", function(f) {
				f.write("This is my text.");
				f.close();
			}, null, "UTF-8");
		}
	}

	tizen.filesystem.resolve("documents", function(dir) {
		docsDir = dir;
		dir.listFiles(onSuccess, null);
	}, null, "rw");
}

function readFile() {
	var file;
	try {
		file = docsDir.resolve('myFile.txt');
		document.getElementById("file_text1").innerHTML = 'File size: ' + file.fileSize + ' ';
	} catch (exc) {
		document.getElementById("file_text1").innerHTML = 'Could not resolve file: ' + exc.message;
		document.getElementById("file_text2").innerHTML = '';
		return;
	}

	try {
		file.readAsText(
		// success callback - display the contents of the file
		function(contents) {
			document.getElementById("file_text2").innerHTML = 'Text in myFile.txt: ' + contents;
		},

		null);
	} catch (exc) {
		console.log('readAsText() exception:' + exc.message + ' ');
	}
}

function deleteFile() {
	try {
		docsDir.deleteFile(docsDir.fullPath + '/myFile.txt');
		document.getElementById("file_text1").innerHTML = 'File deleted';
		document.getElementById("file_text2").innerHTML = '';
	} catch (exc) {
		console.log('deleteFile(): ' + exc.message);
	}
}
