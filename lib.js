const parseReminder = require('parse-reminder');
const { exec } = require('child_process');
const moment = require('moment');

module.exports = function() {
  const toParse = process.argv.slice(2).join(' ');
  const parsed = parseReminder(`remind me ${toParse}`);

  if (!parsed) {
    throw Error(`Can't parse remind string: ${toParse}`);
  }

  const date = moment(parsed.when).add(3, 'h');
  const dateStr = date.format('HH:mm DD.MM.YYYY');

  const commandString = `echo 'notify-send "${parsed.what}"' | at "${dateStr}"`;

  exec(commandString)
  console.log(`Reminder stored for ${dateStr}. Have a nice day!`);
}