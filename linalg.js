// coordinates:
// left cube := x0 =-1
// back face := x1 =-1
// 1 left top row := x2=-1 x3=-1
// 2 right top row := x2=-1 x3=1
// 3 right bottom row := x2=1 x3=1
// 4 left bottom row := x2=1 x3=-1
let cube = (x0) => [
    // back face x1=-1
    [x0,-1,-1,-1],
    [x0,-1,-1,1],
    [x0,-1,1,1],
    [x0,-1,1,-1],
    // front face x1=1
    [x0,1,-1,-1],
    [x0,1,-1,1],
    [x0,1,1,1],
    [x0,1,1,-1]
]

// 4x4 matrix (inner x outer)
let identity4d = () => [
    [1,0,0,0],
    [0,1,0,0],
    [0,0,1,0],
    [0,0,0,1]
]

let zeroMatrix = (n,m) => {
    let zero = []
    for(let i = 0; i < n; i++) {
        let row = []
        for(let j = 0; j < m; j++) {
            row.push(0)
        }
        zero.push(row)
    }
    return zero
}

// rotation with angle tetha around axis: zw yw yz xw xz xy
function rot4d (axis) {
    switch(axis) {
        case 'zw':
            return (tetha) => [
                [Math.cos(tetha), -Math.sin(tetha), 0, 0],
                [Math.sin(tetha), Math.cos(tetha), 0, 0],
                [0,0,1,0],
                [0,0,0,1]
            ]
        case 'yw':
            return (tetha) => [
                [Math.cos(tetha), 0, -Math.sin(tetha), 0],
                [0,1,0,0],
                [Math.sin(tetha), 0, Math.cos(tetha), 0],
                [0,0,0,1]
            ]
        case 'yz':
            return (tetha) => [
                [Math.cos(tetha), 0,0, -Math.sin(tetha)],
                [0,1,0,0],
                [0,0,1,0],
                [Math.sin(tetha), 0,0, Math.cos(tetha)],
            ]
        case 'xw':
            return (tetha) => [
                [1,0,0,0],
                [0,Math.cos(tetha), -Math.sin(tetha), 0],
                [0,Math.sin(tetha), Math.cos(tetha), 0],
                [0,0,0,1]
            ]
        case 'xz':
            return (tetha) => [
                [1,0,0,0],
                [0, Math.cos(tetha), 0, -Math.sin(tetha)],
                [0,0,1,0],
                [0, Math.sin(tetha), 0, Math.cos(tetha)],
            ]
        case 'xy':
            return (tetha) => [
                [1,0,0,0],
                [0,1,0,0],
                [0,0,Math.cos(tetha), -Math.sin(tetha)],
                [0,0,Math.sin(tetha), Math.cos(tetha)],
            ]
    }
}

let rot = Object.fromEntries(`zw yw yz xw xz xy`.split(' ').map(s => [s, rot4d(s)]))

// 4x1 matrix (inner x outer)
let B = [
    -1,1,1,-1
]

function matsum(a,b,i,j,K) {
    let sum = 0
    for(let k = 0; k < K; k++) {
        sum += a[i][k]*b[k][j]
    }
    return sum
}

function matmul(a,b) {
    let an = a[0].length
    let bn = b.length
    if (an !== bn) {
        throw new Error(`Matrix mutiplication undefined, dimensions don't match: ${an} != ${bn}`)
    }
    let m = a.length
    let p = b[0].length
    let M = zeroMatrix(m, p)
    for(let i = 0; i < m; i++) {
        for(let j = 0; j < p; j++) {
            M[i][j] = matsum(a, b, i, j, an)
        }
    }
    return M
}

function matReduce(ms) {
    return ms.reduce((acc, m) => matmul(acc, m), identity4d())
}


let transposeIsh = x => [[x[0]],[x[1]],[x[2]],[x[3]]]
