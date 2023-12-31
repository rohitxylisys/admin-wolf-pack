export const RegexEnum = {
  name: '^[a-zA-Z ]*$',
  phone: '^[0-9]*$',
  numeric: '^[0-9]*$',
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  mobile: '^[0-9+]{13}$',
  url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
  passwordValidation:
    '^(?=.{8,15})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^!&*+=~`*]).*$',
  arabicNumber: '^[\u0621-\u064A\u0660-\u0669 ]+$',
  latitude: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/,
  longitude: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/,
  time: '^((([0]?[1-9]|1[0-2])(:|.)[0-5][0-9]((:|.)[0-5][0-9])?( )?(AM|am|aM|Am|PM|pm|pM|Pm))|(([0]?[0-9]|1[0-9]|2[0-3])(:|.)[0-5][0-9]((:|.)[0-5][0-9])?))$',
  validEmail:
    '/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/',
  discount: '^[1-9][0-9]?$|^100$',
  phoneNumber: /\+?\d+/,
};
