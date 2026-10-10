/**
 * Qahera UI Kit — Interactive CLI Wizard (Zero-Dependency)
 * 
 * Provides interactive prompts using Node.js built-in `readline` module.
 * Gracefully degrades to non-interactive mode if running in CI or non-TTY.
 */

'use strict';

const readline = require('readline');

const isTTY = Boolean(process.stdout.isTTY && process.stdin.isTTY);

/**
 * Prompt for free text input
 */
function promptText(question, defaultValue = '') {
  return new Promise(resolve => {
    if (!isTTY) return resolve(defaultValue);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const displayPrompt = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;

    rl.question(displayPrompt, answer => {
      rl.close();
      resolve(answer.trim() || defaultValue);
    });
  });
}

/**
 * Prompt for Yes / No confirmation
 */
function promptConfirm(question, defaultValue = true) {
  return new Promise(resolve => {
    if (!isTTY) return resolve(defaultValue);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const hint = defaultValue ? '[Y/n]' : '[y/N]';
    rl.question(`${question} ${hint}: `, answer => {
      rl.close();
      const trimmed = answer.trim().toLowerCase();
      if (!trimmed) return resolve(defaultValue);
      resolve(trimmed === 'y' || trimmed === 'yes');
    });
  });
}

/**
 * Prompt single select from a list of choices
 * Each choice: { name: string, value: any, description?: string }
 */
function promptSelect(question, choices, defaultIndex = 0) {
  return new Promise(resolve => {
    if (!isTTY) return resolve(choices[defaultIndex].value);

    let selectedIndex = defaultIndex;

    const render = () => {
      // Clear previous lines
      readline.cursorTo(process.stdout, 0);
      console.log(`\n\x1b[1;36m? ${question}\x1b[0m \x1b[90m(Use arrow keys, press Enter)\x1b[0m`);
      choices.forEach((c, idx) => {
        const isSelected = idx === selectedIndex;
        const prefix = isSelected ? '\x1b[36m❯\x1b[0m' : ' ';
        const text = isSelected ? `\x1b[1;36m${c.name}\x1b[0m` : c.name;
        const desc = c.description ? ` \x1b[90m- ${c.description}\x1b[0m` : '';
        console.log(`  ${prefix} ${text}${desc}`);
      });
    };

    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    render();

    const onKeypress = (str, key) => {
      if (key.ctrl && key.name === 'c') {
        if (process.stdin.isTTY) process.stdin.setRawMode(false);
        process.stdin.removeListener('keypress', onKeypress);
        process.exit(130);
      }

      if (key.name === 'up') {
        selectedIndex = (selectedIndex - 1 + choices.length) % choices.length;
        readline.moveCursor(process.stdout, 0, -(choices.length + 2));
        readline.clearScreenDown(process.stdout);
        render();
      } else if (key.name === 'down') {
        selectedIndex = (selectedIndex + 1) % choices.length;
        readline.moveCursor(process.stdout, 0, -(choices.length + 2));
        readline.clearScreenDown(process.stdout);
        render();
      } else if (key.name === 'return' || key.name === 'enter') {
        if (process.stdin.isTTY) process.stdin.setRawMode(false);
        process.stdin.removeListener('keypress', onKeypress);
        resolve(choices[selectedIndex].value);
      }
    };

    process.stdin.on('keypress', onKeypress);
  });
}

/**
 * Prompt multiple select with checkboxes
 * Each choice: { name: string, value: any, checked?: boolean }
 */
function promptMultiSelect(question, choices) {
  return new Promise(resolve => {
    if (!isTTY) {
      return resolve(choices.filter(c => c.checked).map(c => c.value));
    }

    let pointer = 0;
    const selectedState = choices.map(c => Boolean(c.checked));

    const render = () => {
      readline.cursorTo(process.stdout, 0);
      console.log(`\n\x1b[1;36m? ${question}\x1b[0m \x1b[90m(Space: toggle, Enter: confirm)\x1b[0m`);
      choices.forEach((c, idx) => {
        const isCurrent = idx === pointer;
        const isChecked = selectedState[idx];
        const prefix = isCurrent ? '\x1b[36m❯\x1b[0m' : ' ';
        const box = isChecked ? '\x1b[32m[✓]\x1b[0m' : '[ ]';
        const text = isCurrent ? `\x1b[1m${c.name}\x1b[0m` : c.name;
        console.log(`  ${prefix} ${box} ${text}`);
      });
    };

    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    render();

    const onKeypress = (str, key) => {
      if (key.ctrl && key.name === 'c') {
        if (process.stdin.isTTY) process.stdin.setRawMode(false);
        process.stdin.removeListener('keypress', onKeypress);
        process.exit(130);
      }

      if (key.name === 'up') {
        pointer = (pointer - 1 + choices.length) % choices.length;
        readline.moveCursor(process.stdout, 0, -(choices.length + 2));
        readline.clearScreenDown(process.stdout);
        render();
      } else if (key.name === 'down') {
        pointer = (pointer + 1) % choices.length;
        readline.moveCursor(process.stdout, 0, -(choices.length + 2));
        readline.clearScreenDown(process.stdout);
        render();
      } else if (key.name === 'space') {
        selectedState[pointer] = !selectedState[pointer];
        readline.moveCursor(process.stdout, 0, -(choices.length + 2));
        readline.clearScreenDown(process.stdout);
        render();
      } else if (key.name === 'return' || key.name === 'enter') {
        if (process.stdin.isTTY) process.stdin.setRawMode(false);
        process.stdin.removeListener('keypress', onKeypress);
        const results = choices.filter((_, idx) => selectedState[idx]).map(c => c.value);
        resolve(results);
      }
    };

    process.stdin.on('keypress', onKeypress);
  });
}

module.exports = {
  isTTY,
  promptText,
  promptConfirm,
  promptSelect,
  promptMultiSelect
};
