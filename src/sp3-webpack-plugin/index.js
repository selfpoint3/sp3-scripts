/**
 * SP3 webpack plugin to help finish of the bundle
 * 
 * 1. Zips the _dist directory to dist/bundle.zip
 * 2. Removed the _dist directory
 * 
 */

 const fs = require('fs');
 const archiver = require('archiver');
 
 /**
  * @param {String} sourceDir: /some/folder/to/compress
  * @param {String} outPath: /path/to/created.zip
  * @returns {Promise}
  */
 function zipDirectory(sourceDir, outPath) {
   const archive = archiver('zip', { zlib: { level: 9 }});
   const stream = fs.createWriteStream(outPath);
 
   return new Promise((resolve, reject) => {
     archive
       .directory(sourceDir, false)
       .on('error', err => reject(err))
       .pipe(stream)
     ;
 
     stream.on('close', () => resolve());
     archive.finalize();
   });
 }
 
 class SP3WebPackPlugin {
     apply(compiler) {
         
         compiler.hooks.done.tapAsync(
             'SP3WebPackPlugin',
             async (
                 compilation, callback /* stats is passed as an argument when done hook is tapped.  */
             ) => {
                 console.log('creating directory')
                 if( ! await fs.existsSync('./dist')) {
                     await fs.mkdirSync('./dist', {});
                 }
                 await zipDirectory('./_dist/effects','./dist/effects.zip')
                 await zipDirectory('./_dist','./dist/bundle.zip')
               //  await fs.rmSync('./_dist', { recursive: true, force: true });
 
                 callback();
             }
         );
     }
 }
 
 module.exports = SP3WebPackPlugin;
 