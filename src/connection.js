export default function connection(config) {

  let Client = require('ssh2').Client;

  let conn = new Client();

  // let connSettings = config.connection;
  
  let connSettings = {
    host: '100.19.128.124',
    port: 22,
    username: 'addie',
    password: 'mayohotsauce'
    // You can use a key file too, read the ssh2 documentation
  }

  let remotePath = config.remoteBase + config.project; // just use pwd here?

  conn
    .on('ready', () => conn.sftp( onConnect ))
    .connect( connSettings );
}


const onConnect = (err, sftp) => {
  if (err) throw err;

  let fs = require('fs');
  let filelist = require('./filelist')(); // calls generateFileList

  for (let files in filelist) {
    let localFile = files[0];
    let remoteFile = files[1];

    let readStream = fs.createReadStream(config.localBase + localFile);
    let writeStream = sftp.createWriteStream(config.remoteBase + (remoteFile || localFile));

    writeStream.on('close',function () {
      console.log( "- file transferred succesfully" );
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

let connSettings = {
  host: '100.19.128.124',
  port: 22,
  username: 'addie',
  password: window.prompt('addie@raspi password: ');
}

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
  