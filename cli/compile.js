#!/usr/bin/env node

/**
 * Qahera UI Kit — Compiler & Validator CLI (Backward Compatibility Bridge)
 * Delegates execution to the authoritative 8-stage compiler in compiler/compiler.js
 */

'use strict';

const { runQaheraCompiler } = require('../compiler/compiler');

const success = runQaheraCompiler();
process.exit(success ? 0 : 1);
