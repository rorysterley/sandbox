# Sandbox

The place where fantasy first meets reality.


## Settup

Create a .env file at the project root. Add any environmental variables your setup requires.
One entry per line. By default you will need `SANDBOX`. E.x. `SANDBOX=sandbox-01/`.


## Conventions

Projects in `sandbox-xx` folders will follow the structure outlined in the root
gulpfile.js and will be toggled via amending the value of `SANDBOX`  in the root .env file
and run via `$ gulp`.
<br>
Projects in `sandtrap-xx` folders are intended to be true sandboxes. They are free to conform
to any rules they wish. They may have their own gulpfile.js and custom structure or
do just about anything. Note that they are still not perfect sandboxes as they are welcome
to inherit any or all functionality of the root folder if they wish.
