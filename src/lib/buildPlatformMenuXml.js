const open = tag => `<${tag}>`;
const close = tag => `</${tag}>`;

const escapeValue = valueToEscape => {
  if (typeof value !== 'string') return valueToEscape;

  let output = valueToEscape;
  if (output) {
    output = output
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    output = output.replace(
      /&(?!(amp;)|(lt;)|(gt;)|(quot;)|(#39;)|(apos;))/g,
      '&amp;'
    );
    output = output.replace(/([^\\])((\\\\)*)\\(?![\\/{])/g, '$1\\\\$2'); //replaces odd backslash(\\) with even.
  } else {
    output = '';
  }
  return output;
};

export function buildPlatformMenuXml(items) {
  if (!items) return '';

  const stringBuilder = [];

  const add = tag => stringBuilder.push(open(tag));

  const finish = tag => stringBuilder.push(close(tag));

  const valueNode = (tag, value) => {
    stringBuilder.push(open(tag));
    stringBuilder.push(escapeValue(value));
    stringBuilder.push(close(tag));
  };

  add('RequestXmlRoot');
  add('Items');

  items.forEach(item => {
    add('Item');

    valueNode('Id', item.Id);
    valueNode('MenuOrder', item.MenuOrder);
    valueNode('RelativeRoute', item.RelativeRoute);
    valueNode('TranslationKey', item.TranslationKey);

    add('RequiredPermissions');

    item.RequiredPermissions.forEach(permission => {
      add('Permission');

      valueNode('Id', permission.Id);
      valueNode('Code', permission.Code);
      valueNode('Name', permission.Name);

      finish('Permission');
    });

    finish('RequiredPermissions');
    finish('Item');
  });

  finish('Items');

  finish('RequestXmlRoot');

  const output = stringBuilder.join('');
  return output;
}
