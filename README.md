# Sandbox

The place where fantasy first meets reality.


## Settup

Create a .env file at the project root. Add any environmental variables your setup requires.
One entry per line. By default you will need `SANDBOX`. E.x. `SANDBOX=sandbox-01/`.
The value of `SANDBOX` tells `gulp` which project to start when you run `$ gulp`.


## Conventions

Projects in `sandbox-xx` folders will follow the structure outlined in the root
gulpfile.js and will be toggled via amending the value of `SANDBOX`  in the root .env file
and run via `$ gulp`.


Projects in `sandtrap-xx` folders are intended to be true sandboxes. They are free to conform
to any rules they wish. They may have their own gulpfile.js and custom structure or
do just about anything. Note that they are still not perfect sandboxes as they are welcome
to inherit any or all functionality of the root folder if they wish.


Work on a given `sandbox` or `sandtrap` should be based out of a git branch of the same name.<br>
E.g. `$ git checkout -b sandbox-01`


## Sandboxes

A short description of each `sandbox-xx` and `sandtrap-xx`.
<br>
> `sandbox-01`<br>
Initial experimentation with Phaser and basic isomorphic viewing... maybe more.
