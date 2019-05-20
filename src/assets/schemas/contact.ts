export default {
  'name': {
    'required': true,
    'type': 'string',
    'minLength': 3,
    'maxLength': 15,
    'isAlphaNumericSpaces': true
  },
  'email': {
    'required': true,
    'type': 'string',
    'minLength': 5,
    'maxLength': 35,
    'isEmail': true
  },
  'message': {
    'required': true,
    'type': 'string',
    'minLength': 5,
    'maxLength': 255,
    'isCommonWriting': true
  }
}