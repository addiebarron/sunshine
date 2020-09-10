// handle transferring files to the server

import fs from 'fs'
import { Client } from 'ssh2'
import generateFileList from './filelist'

export default function connect(config) {
  let conn = new Client();

  let connSettings = config.connection;

  conn
    .on('ready', () => conn.sftp( onConnect ))
    .connect( connSettings );
}


const onConnect = (err, sftp) => {
  if (err) throw err;

  let filelist = generateFileList(); // calls generateFileList

  for (let files in filelist) {
    let localFile = files[0];
    let remoteFile = files[1];

    let readStream = fs.createReadStream(config.localBase + localFile);
    let writeStream = sftp.createWriteStream(config.remoteBase + (remoteFile || localFile));

    writeStream.on('close',function () {
      console.log( "file transferred succesfully" );
    });

    writeStream.on('end', function () {
      conn.close();
      console.log( "sftp connection closed" );
    });

    readStream.pipe( writeStream );

    // you'll be able to use sftp here
    // Use sftp to execute tasks like .unlink or chmod etc
  }
}

// test - should transfer "~/testfile" to raspi

/*

let Client = require('ssh2').Client;
let conn = new Client();

let connSettings = config.connection;

let localPath = '/Users/addie/testfile'
let remotePath = '/home/addie/testfile'

conn.on('ready', function() {
  conn.sftp( function(err, sftp) {
    if (err) throw err;

    let fs = require("fs");
    
    let readStream = fs.createReadStream(localPath);
    let writeStream = sftp.createWriteStream(remotePath);

    writeStream.on('close',function () {
      console.log( "- file transferred succesfully" );
    });

    writeStream.on('end', function () {
      conn.close();
      console.log( "sftp connection closed" );
    });

    readStream.pipe( writeStream );
  });
}).connect(connSettings);

*/
  