var line = `let add_url = '{{reverse_url("admin/test")}}'`
// var line = 'reverse_url("admin/test")'
var re = new RegExp('\\{\\{\s*reverse_url\\("(.*)"\\)\s*\\}\\}')
console.log("result", re.exec(line))