const chrono = require('chrono-node');
const { exec } = require('child_process');
const moment = require('moment');

const parseRegex = /to (.*?) (in |at |tomorrow|next)/;

module.exports = function() {
  const toParse = process.argv.slice(2).join(' ');
  const what = parseRegex.exec(toParse);
  const when = chrono.parseDate(toParse);

  if (what && when) {
    const parsed = {
      what: what[1],
      when: moment(when),
    }
    const dateStr = parsed.when.format('HH:mm DD.MM.YYYY');
  
    const commandString = `echo 'notify-send "${parsed.what}"' | at "${dateStr}"`;
  
    exec(commandString)
    console.log(`Reminder ${parsed.what} set for ${dateStr}. Have a nice day!`);
  } else {
    throw Error(`Can't parse remind string: ${toParse}`);
  }
}