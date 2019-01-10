enum Direction {
  Up = 1,
  Down = 3,
  Left,
  Right
}

enum FileAccess {
  None,
  Read = 1<<1,
  Write = 1<<2,
  ReadWrite = Read | Write,
  G = '123'.length
}