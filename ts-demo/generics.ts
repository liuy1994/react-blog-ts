function identity<T> (arg: T): T {
  return arg
}
function identity2(a:number, b:string):string{
  return a+b
}

let myIdentity: <T> (arg: T) => T = identity
