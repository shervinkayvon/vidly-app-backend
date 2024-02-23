module.exports = function() {
    // handle uncaught exceptions that are not handled by express router
    process.on('uncaughtException', (ex) => {
        console.error(ex);
        process.exit(1);
    });
  
    // handle unhandled promise rejections
    process.on('unhandledRejection', (ex) => {
        console.error(ex);
        process.exit(1);
    });
}