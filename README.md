This project shows how a simple REST API can be implemented in node.js. The goal was to start with an empty directory and build the app from scratch in 7-10 minutes for a class presentation, demonstrating basic npm functions (init, install) and the use of several modules in node.js (Express, MySQL, Body-Parser, Pug) while explaining the process along the way.

The app itself simply writes to and reads from a local MySQL database based on incoming HTTP requests. The database stores dogs' birthdays and sizes. The user can either add a dog, view dogs by size, or view all dogs using dog_form.html. Pug is used to render the server's responses.

The "script" for the presentation (code and talking points/explanation) can be found in dog-server.js.
