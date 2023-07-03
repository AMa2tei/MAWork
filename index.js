#!/usr/bin/env node
import minimist        from "minimist";
import path, {dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {
	Plop,
	run
}                      from "plop";

const args = process.argv.slice( 2 );
const argv = minimist( args );

const __dirname = dirname( fileURLToPath( import.meta.url ) );

const config = {
	cwd        : argv.cwd,
	configPath : path.join(
		__dirname,
		"plopfile.js"
	),
	preload    : argv.preload || [],
	completion : argv.completion
};

const callback = ( env ) => Plop.execute( env,
                                          run );

Plop.prepare( config,
              callback );