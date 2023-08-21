import moment from 'moment'

export function getUUID() {
  return Math.random().toString(36).substr(3, 5)
}

export function getNow() {
  return moment(moment.now()).format('YYYY-MM-DD HH:mm:ss')
}

