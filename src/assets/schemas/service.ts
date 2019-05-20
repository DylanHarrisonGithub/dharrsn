export default {
  'place': {
    'required': true,
    'type': 'number',
    'min': 0
  },
  'title': {
    'required': true,
    'type': 'string',
    'minLength': 5,
    'maxLength': 30,
    'isAlphaNumericSpaces': true
  },
  'text': {
    'required': true,
    'type': 'string',
    'minLength': 1,
    'maxLength': 255,
    'isCommonWriting': true
  },
  'icons': {
    'required': true,
    'type': 'string',
    'min-length': 1,
    'max-length': 255,
    'regex': /^fa-/
  }
}