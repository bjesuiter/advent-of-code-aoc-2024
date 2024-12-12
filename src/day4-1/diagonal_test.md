

## Diagonale 0

| Indexe | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    |
| ------ | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 0      | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    |
| 1      | 1    | 2    |      |      |      |      |      |      |      |
| 2      | 2    |      | 4    |      |      |      |      |      |      |
| 3      | 3    |      |      | 6    |      |      |      |      |      |
| 4      | 4    |      |      |      | 8    |      |      |      |      |
| 5      | 5    |      |      |      |      | 10   |      |      |      |
| 6      | 6    |      |      |      |      |      | 12   |      |      |
| 7      | 7    |      |      |      |      |      |      | 14   |      |
| 8      | 8    |      |      |      |      |      |      |      | 16   |

Hauptdiagonale: 

- sum % lineIndex = 0
- sum % colIndex = 0

## Diagonale 1

| Indexe | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    |
| ------ | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 0      | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    |
| 1      | 1    | 2    | 3    | 4    |      |      |      |      |      |
| 2      | 2    | 3    | 4    | 5    | 6    |      |      |      |      |
| 3      | 3    | 4    | 5    | 6    | 7    | 8    |      |      |      |
| 4      | 4    | 5    | 6    | 7    | 8    | 9    | 10   |      |      |
| 5      | 5    |      | 7    | 8    | 9    | 10   | 11   | 12   |      |
| 6      | 6    |      |      | 9    | 10   | 11   | -    | 13   | 14   |
| 7      | 7    |      |      |      | 11   | 12   | 13   | -    | 15   |
| 8      | 8    |      |      |      |      | 13   | 14   | 15   | -    |

Diagonale darunter: 

- sum % lineIndex = colIndex ?!? 
- sum % colIndex = 

## Multiplikation statt Summe? = geht nicht, alle 0-linien wären dann für alle Diagonalen null

## Idee: diagonalIndex Algorithm umdrehen für Rows

Vorbereitung: Alle Diagonal-Indexe aufschreiben

### Col Based diagonal Index

| Indexe | 0    | 1    | 2    | 3    | 4    |
| ------ | ---- | ---- | ---- | ---- | ---- |
| 0      | 0    | 5    | 6    | 7    | 8    |
| 1      | 1    | 0    | 5    | 6    | 7    |
| 2      | 2    | 1    | 0    | 5    | 6    |
| 3      | 3    | 2    | 1    | 0    | 5    |
| 4      | 4    | 3    | 2    | 1    | 0    |

### Row Based diagonal Index

| Indexe | 0    | 1    | 2    | 3    | 4    |
| ------ | ---- | ---- | ---- | ---- | ---- |
| 0      | 0    | 1    | 2    | 3    | 4    |
| 1      | 5    | 0    | 1    | 2    | 3    |
| 2      | 6    | 5    | 0    | 1    | 2    |
| 3      | 7    | 6    | 5    | 0    | 1    |
| 4      | 8    | 7    | 6    | 5    | 1    |
| 5      | 9    | 8    | 7    | 6    | 5    |

- diagonalOverflow = 0
- openDiagonals: [
  i0 = 0
  i1=1
  i2=2
  i3=3
  i4=4
  ]
- newLine Event: 
  - diagonalOverflow += 1 = 1
  - shift openDiagonals: [
    i0 = i4 + 1 = 5
    i1 = i0 = 0
    i2 = i1 = 1
    i3 = i2 = 2
    i4 = i3 = 3
    ]

- newLine Event 
  - diagonalOverflow += 1 = 2
  - shift openDiagonals: [
    i0 = i0 + 1 = 6
    i1 = i0old = 5
    i2 = i1old = 0
    i3 = i2old = 1
    i4 = i3old = 2
    ]
- newLine Event 
  - diagonalOverflow += 1 = 3
  - shift openDiagonals: [
    i0 = i0 + 1 = 7
    i1 = i0 = 6
    i2 = i1 = 5
    i3 = i2 = 0
    i4 = i3 = 1
    ]
- newLine Event 
  - diagonalOverflow += 1 = 4
  - shift openDiagonals: [
    i0 = i0 + 1 = 7
    i1 = i0 = 6
    i2 = i1 = 5
    i3 = i2 = 0
    i4 = i3 = 1
    ]
- newLine Event 
  - diagonalOverflow += 1 = 4
  - shift openDiagonals: [
    i0 = i0 + 1 = 8
    i1 = i0 = 7
    i2 = i1 = 6
    i3 = i2 = 5
    i4 = i3 = 0
    ]
- newLine Event 
  - diagonalOverflow += 1 = 5
  - shift openDiagonals: [
    i0 = i0 + 1 = 9
    i1 = i0 = 8
    i2 = i1 = 7
    i3 = i2 = 6
    i4 = i3 = 5
    ]