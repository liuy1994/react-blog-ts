
interface GenericIdentityFn<T> {
  (arg: T): T
}
function identity<T>(arg: T): T {
  return arg
}
let myIdentity: GenericIdentityFn<number> = identity

class GenericNumber<T> {
  zeroValue: T;
  add: (x:T,y:T) => T
}
let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x,y) {
  return x+y
}

interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

loggingIdentity('1231')

function create<T>(c: {new():T}):T{
  return new c()
}
class BeeKeeper {
  hasMesk: boolean
}
