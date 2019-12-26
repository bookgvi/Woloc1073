export function Util () {
}
Util.prototype.clearExtras = function (payload) {
  if (!payload.length) return payload
  for (let i = 0; i < payload.length; i++) {
    this.clearData(payload[i])
  }
  return payload
}

Util.prototype.clearData = function (payload) {
  for (let key in payload) {
    if (typeof payload[key] !== 'object') {
      if (key === 'presentsInStudio' || key === 'isChecked') {
        payload[key] = false
      }
    } else {
      this.clearExtras(payload[key])
    }
  }
}

Util.prototype.cloneObject = function (obj) {
  if (!obj) return []
  return JSON.parse(JSON.stringify(obj))
}
