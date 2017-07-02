module.exports = function (source) {
  const LOAD_CHILDREN_RE = 'path[\\s]*:[\\s]*[\'|"]' + this.query.entry + '[\'|"][\\s]*,[\\s]*loadChildren[\\s]*:[\\s]*[\'|"]([^?]*?)[\'|"]';
  const regex = new RegExp(LOAD_CHILDREN_RE, 'gm');
  let match = regex.exec(source);

  while (match) {
    source = source.replace(match[0], match[0].replace(match[1], match[1] + '?loader=sync'));
    match = regex.exec(source);
  }

  return source;
};
