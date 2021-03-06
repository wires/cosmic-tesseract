// based off shorturl.at/gFJMO

let preamble = `
\\newcommand{\\groth}{\\int}
\\newcommand{\\cat}[1]{\\mathbf{#1}}
\\newcommand{\\DOptic}{\\cat{DOptic}}
\\newcommand{\\Para}{\\cat{Para}}
\\newcommand{\\CoPara}{\\cat{Copara}}
\\newcommand{\\Optic}{\\cat{Optic}}
\\newcommand{\\Lens}{\\cat{Lens}}
\\newcommand{\\DLens}{\\cat{DLens}}
\\newcommand{\\twocat}[1]{\\mathbb{#1}}
\\newcommand{\\deloop}{\\twocat B}
\\newcommand{\\Ca}{{\\mathcal C}}
\\newcommand{\\coop}{\\mathsf{coop}}
\\newcommand{\\op}{\\mathsf{op}}
\\newcommand{\\backwards}{\\color{#cc2020}\\mathsf{backwards}}
\\newcommand{\\forwards}{\\color{#cc2020}\\mathsf{forwards}}
\\newcommand{\\view}{\\color{#20cc20}{view}}
\\newcommand{\\update}{\\color{#20cc20}{update}}
\\newcommand{\\mor}{\\mathrm{mor}}
\\newcommand{\\dom}{\\mathrm{dom}}
`.trim()

let vertices = [
    // cube left
    [
        // back face
        [
            '\\DOptic', //1
            '\\groth_A \\Para_{\\times_A}(\\Ca/A)^\\coop', //2
            '\\groth_A \\Para_{\\times_A}(\\Ca/A)^\\coop', //3
            '\\DLens(\\Ca)' //4
        ],
        // front face
        [
            '\\groth_A \\CoPara_{\\times_A}(\\Ca/A)', //5
            '\\groth_A (\\deloop(\\Ca/A))^\\op',//6
            '\\groth_A (\\deloop(\\Ca/A))^\\op',//7
            '\\Ca'//8
        ]
    ],
    // cube right
    [
        // back facecof
        [
            '\\Optic_{\\times,\\times}',//9
            '\\Para_\\times(\\Ca)^\\coop',//10
            '\\Para_\\times(\\Ca)^\\coop',//11
            '\\Lens(\\Ca)'//12
        ],
        // front face
        [
            '\\CoPara_\\times(\\Ca)',//13
            '(\\deloop \\Ca)^\\op',//14
            '(\\deloop \\Ca)^\\op',//15
            '\\Ca'//16
        ]
    ]
]

let edges = [
    // left back face
    [1,2,'\\backwards'],
    [2,3,'='],
    [4,3,'\\update'],
    [4,1],
    
    // // left top face
    [1,5,'\\forwards'],
    [2,6,'\\groth_A P_A'],
    [5,6,'\\groth_A C_A'],

    // // left bottom face
    [4,8,'\\view'],
    [3,7,'\\groth_A P_A'],
    [8,7,'\\mor'],

    // left front face
    [6,7,'='],
    [8,5,'green'],

    // right back face
    [9,10,'\\backwards'],
    [10,11,'='],
    [12,11,'\\update'],
    [12,9, ''],
    
    // right top face
    [9,13,'\\forwards'],
    [10,14,'P'],
    [14,13,'C'],
    
    // right bottom face
    [11, 15, 'P'],
    [12, 16, '\\view'],
    [16, 15, '\\dom'],

    // right front face
    [16, 13, 'green'],
    [15, 14, '='],

    // between cubes
    [9,1],
    [10,2],
    [11,3],
    [12,4],
    [13,5],
    [14,6],
    [15,7],
    [16,8,'=']
]

const zip = (arr, ...arrs) => {
    return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}

let nodes = zip(
    vertices.flat().flat(),
    [cube(-1), cube(1)].flat()
).map(([latex,coords]) => ({latex,coords}))

// nodes : [{latex:string,coords:[number][4]}]
// transform : 4D matrix


function coordsToNodeId(coords) {
    let ny = x => x < 0 ? '0' : '1'
    return `node${ny(coords[0])}${ny(coords[1])}${ny(coords[2])}${ny(coords[3])}`
}

let depth = z => {
    return 1.0 - Math.min(0.6, ((z+1)/2)*1.3)
}

function updateDiv(div, sx, sy, z) {
    div.setAttribute("style", `position:absolute;left:${(sx??0).toFixed(0)}px;top:${(sy??0).toFixed(0)}px;opacity:${depth(z).toFixed(3)}`)
}

function createAndInsert(id, latex) {
    let div = document.createElement('span')
    let cube = document.getElementById('cube')
    cube.appendChild(div)

    div.setAttribute("id", id)
    let html = katex.renderToString(`${preamble}\n${latex}`, {
        throwOnError: false
    })
    div.innerHTML = html
    let size = div.getBoundingClientRect()
    let bounds = [size.width, size.height]
    return {div, bounds}
}

// scale
let scale = x => (parseFloat(x) + 2.0) * 170.0

let katexedBounds = {}

function renderNode(id, coordinates, latex, selected) {
    // just project two dimensions
    let x = coordinates[0][0]
    let y = coordinates[1][0]
    let z = coordinates[2][0]
    let f = 4.5
    let originZ = -5.3
    let persp = (x,y,z) => [scale(f * x/ (z - originZ)), scale(f * y/(z - originZ))]
    let [sx,sy] = persp(x,y,z)
    let elem = document.getElementById(id)
    let zz = selection.selecc ? (selected ? -1.0 : 0.1) : z
    if(elem === null) {
        // create and insert node
        let {div,bounds} = createAndInsert(id, latex)
        katexedBounds[id] = bounds
        let [x,y] = [sx - bounds[0] / 2, sy - bounds[1] / 2]
        updateDiv(div, x, y, zz, selected)
    } else {
        // just update node
        let bounds = katexedBounds[id]
        let [x,y] = [sx - bounds[0] / 2, sy - bounds[1] / 2]
        updateDiv(elem, x, y, zz, selected)
    }
    return [sx,sy,z]
}

// keep track of the rotations
let AXES = `zw yw yz xw xz xy`.split(' ')
var rotations = Object.fromEntries(AXES.map(ax => [ax, 0]))

function main () {

    function loop () {
        let t = (Date.now() / 22000) % 1000
        let x = (Math.PI * mouseCoords.x/(window.innerWidth/2))
        let y = (Math.PI * mouseCoords.y/(window.innerHeight/2))
        let env = {t,x,y}
        
        // if (demoMode) {
        //     // update the rotations zw yw yz xw xz xy
        //     rotations.zw = Math.PI/3 * t/2
        //     rotations.yw = Math.PI * mouseCoords.x/window.innerWidth/2
        //     rotations.yz = Math.PI * t
        //     rotations.xw = -Math.PI/5 * t/1.3
        //     rotations.xz = Math.PI * mouseCoords.y/window.innerHeight/2
        //     rotations.xy = Math.PI/11 * t/3
        // } else {
        //     // update the rotations zw yw yz xw xz xy
        //     rotations[mouseMode.x] = (Math.PI * mouseCoords.x/(window.innerWidth/2))
        //     rotations[mouseMode.y] = (Math.PI * mouseCoords.y/(window.innerHeight/2))
        //     rotations[mouseMode.t] = Math.PI * t
        // }

        // let transforms = AXES.map(ax => rot[ax](rotations[ax]))
        let transforms = toTranforms(parseResult.result, env)
        let transform = matReduce(transforms)
        
        render(transform, nodes)
        // window.location.hash = JSON.stringify(parseResult.queryString)
    }

    // setTimeout(loop, 100)
    setInterval(loop, 100)
}

function edgeIdToNodeId(edgeId) {
    return coordsToNodeId(nodes[(edgeId - 1) % nodes.length].coords)
}

let arrowDef = (id,color) => `
<marker id="arrowhead-${id}" markerWidth="10" markerHeight="7" 
refX="0" refY="3.5" orient="auto">
  <polygon points="0 0, 10 3.5, 0 7" fill="${color}"/>
</marker>
`

function color (label, z) {
    // alpha
    let a = depth(z)
    if (label === '\\backwards' || label === '\\forwards') {
        // return '#c02020'
        return `rgba(192,32,32,${a})`
    }
    if (label === '\\view' || label === '\\update' || label === 'green') {
        return `rgba(32,192,32,${a})`
    }
    //rgba(0,0,0,${depth(z)})
    return `rgba(0,0,0,${a})`
}

let quickId = label => {
    // replace all not alphanum by _
    return `qid-${(label??'undef').replace('\\','').replace(/[^a-zA-Z0-9]/g,'_')}`
}

function svgEdges(current, arcs, [width,height]) {
    let mkDef = ([x1,y1,x2,y2,z,label]) => {
        return arrowDef(quickId(label), color(label, z))
    }
    let arrowDefs = arcs.map(mkDef).join('')
    let svg = x => `<svg height="${height}" width="${width}"><defs>${arrowDefs}</defs>\n${x}</svg>`
    let line = ([x1,y1,x2,y2,z,label,sw]) => {
        if (label !== '=') {
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${color(label, z)};stroke-width:${sw}" marker-end="url(#arrowhead-${quickId(label)})"/>`
        } else {
            let l = length([x1,y1,x2,y2]) / 1.3
            let dx = l == 0 ? 0 : (x2-x1)/l
            let dy = l == 0 ? 0 : (y2-y1)/l
            let n1 = [-dy,dx]
            let n2 = [dy,-dx]
            return `<line x1="${x1-n1[0]}" y1="${y1-n1[1]}" x2="${x2-n1[0]}" y2="${y2-n1[1]}" style="stroke:${color(label, z)};stroke-width:${sw}"/>` +
                `<line x1="${x1-n2[0]}" y1="${y1-n2[1]}" x2="${x2-n2[0]}" y2="${y2-n2[1]}" style="stroke:${color(label, z)};stroke-width:${sw}"/>`
        }
    }

    // render the faces
    let crd = u => current[coordsToNodeId(nodes[u-1].coords)]
    let xy = u => {
        let [sx, sy, z] = crd(u)
        return `${sx.toFixed(1)},${sy.toFixed(1)}`
    }
    let faces = []
    if (selection.selecc) {
        for(let s of selection.selecc) {
            if (s.poly) {
                let pts = [s.poly.u0,s.poly.v0,s.poly.v1,s.poly.u1]
                faces.push(`<polygon points="${pts.map(xy).join(' ')}" fill="rgba(20,20,190,0.2)"/>`)
            }
        }
    }

    let ls = arcs.map(line).join('')
    return svg(`${faces.join('')}\n${ls}`)
}

let center = ([x1,y1,x2,y2,z]) => ([x1 + ((x2 - x1) / 2), y1 + ((y2 - y1) / 2),z])

let length = ([x1,y1,x2,y2]) => {
    return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
}

let shortenLine = (s, [x1,y1,x2,y2,z]) => {
    let l = (length([x1,y1,x2,y2]) / s)
    let dx = l == 0 ? 0 : (x2-x1)/l
    let dy = l == 0 ? 0 : (y2-y1)/l
    return [
        x1 + dx,
        y1 + dy,
        x2 - dx,
        y2 - dy,
        z
    ]
}

let edgeIdFromSrcDst = (src,dst) => `edge-${src}-${dst}`

function nodeIsSelecc(node) {
    if(selection.selecc) {
        for (let s of selection.selecc) {
            if(s.vertex && s.vertex === node) {
                return true
            }
            if(s.edge && (s.edge.u === node || s.edge.v === node)) {
                    return true
            }
        }
    }
    return false
}
function render(transform, nodes) {
    // keep track of screen positions of the nodes
    // used to draw edges
    let current = {}

    // transform and render each node
    let nodeCount = 1
    for(let {latex,coords} of nodes) {
        let id = coordsToNodeId(coords)
        // rotate in 4-space
        let x = matmul(transform, transposeIsh(coords))
        
        // renderNode projects down the first 2 dimensions
        // z is used for opacity
        // and return this as a coordinate pair [x,y,z]
        let selected = nodeIsSelecc(nodeCount)
        current[id] = renderNode(id, x, latex, selected)
        nodeCount++;
    }
    
    // now render the edges
    let arcs = []
    
    function isSelecc(src, dst) {
        if (selection.selecc) {
            for(let s of selection.selecc) {
                if (s.edge) {
                    if ((src === s.edge.u) && (dst === s.edge.v)) {
                        return true
                    }
                    if ((dst === s.edge.u) && (src === s.edge.v)) {
                        return true
                    }
                }
            }
        }
        return false
    }

    for(let [src,dst,label] of edges) {
        let sId = edgeIdToNodeId(src)
        let dId = edgeIdToNodeId(dst)
        let [sx,sy,sz] = current[sId]
        let [dx,dy,dz] = current[dId]
        let z;
        if (selection.selecc) {
            z = -1.0
        } else {
            z = (sz + dz)/2
        }
        let selected = isSelecc(src,dst)
        let sw = selection.selecc ? (selected ? '1' : '0.5') : '1'
        let lineCoords = shortenLine(30, [sx,sy,dx,dy,z])
        lineCoords.push(label)
        lineCoords.push(sw)
        arcs.push(lineCoords)
        let c = center(lineCoords)
        let edgeId = edgeIdFromSrcDst(src, dst)
        
        let latex = label === '=' ? '' : label === 'green' ? '' : label ?? ''
        
        // generate or update KaTeX edge label div
        if(latex !== '') {
            createOrUpdateEdgeLabelDiv(edgeId, c[0], c[1], selected ? -1.0 : 0.04, `{\\scriptsize ${latex}}`)
        }
    }


    // generate and set SVG for arrows
    document.getElementById('arcs').innerHTML = svgEdges(current, arcs, [1000, 1000])
}

let katexedEdgeLabelBounds = {}
function createOrUpdateEdgeLabelDiv(id, x, y, z, latex) {
    let elem = document.getElementById(id)
    if(elem == null) {
        let {div, bounds} = createAndInsert(id, latex)
        katexedEdgeLabelBounds[id] = bounds
        updateEdgeLabelDiv(div, x - bounds[0] / 2, y - bounds[1] / 2, z)
    } else {
        let bounds = katexedEdgeLabelBounds[id]
        updateEdgeLabelDiv(elem, x - bounds[0] / 2, y - bounds[1] / 2, z)
    }
}

function updateEdgeLabelDiv(div, x, y, z) {
    div.setAttribute("style", `opacity:${depth(z)};position:absolute;left:${(x??0).toFixed(0)}px;top:${(y??0).toFixed(0)}px`)
}

function browserReady() {
    let doc = document
    let win = window
    let add = 'addEventListener'
    let remove = 'removeEventListener'
    let loaded = 'DOMContentLoaded'
    let load = 'load'

    return new Promise(function (resolve) {
        if (doc.readyState === 'complete') {
            resolve();
        } else {
            function onReady() {
                resolve();
                doc[remove](loaded, onReady, true);
                win[remove](load, onReady, true);
            }
            doc[add](loaded, onReady, true);
            win[add](load, onReady, true);
        }
    })
}

var mouseCoords = {
    x: 0,
    y: 0
}
var mouseMode = {
    x: 'none',
    y: 'none',
    t: 'none'
}

browserReady().then(() => {
   main()
   mouseHandler()
   initMouseModes()
   initQuerybar()
})

function initQuerybar() {
    let input = document.getElementById('query')
    try {
        let hash = window.location.hash
        let queryString = JSON.parse(atob(decodeURI(hash.slice(1))))
        if(queryString.q) {
            input.value = queryString.q
            console.log('SET_FROM_HASH', input.value)
        }
    }
    catch(e){
        console.error('HASH ERROR', e)
    }
    
    input.addEventListener('input', () => {
        updateQuery(input.value)
    })
    updateQuery(input.value)
}

var parseResult = {
    result: false,
    queryString: ''
}

var selection = {}

function computeSelection(parseResult) {
    // ugh don't wnat to modify parser
    let selecc = []
    function pushFace(sel) {
        selecc.push({edge: {u:sel.e1.u,v:sel.e1.v}})
        selecc.push({edge: {u:sel.e2.u,v:sel.e2.v}})
        selecc.push({edge: {u:sel.e1.u,v:sel.e2.v}})
        selecc.push({edge: {u:sel.e2.u,v:sel.e1.v}})
        selecc.push({poly: {u0:sel.e1.u,u1:sel.e2.u,v0:sel.e1.v,v1:sel.e2.v}})
    }
    parseResult.forEach(op => {
        if(op.selecc) {
            for(let sel of op.selecc) {
                if(typeof(sel) === 'number') {
                    // vertex
                    selecc.push({vertex: sel})
                } else if (sel.selecc === 'edge') {
                    selecc.push({edge: {u:sel.u,v:sel.v}})
                } else if (sel.selecc === 'face') {
                    pushFace(sel)
                } else if (sel.selecc === 'cube') {
                    pushFace(sel.f1)
                    pushFace(sel.f2)
                    pushFace({e1:sel.f1.e1,e2:sel.f2.e2})
                    pushFace({e1:sel.f2.e1,e2:sel.f1.e2})
                    pushFace({e1:sel.f1.e1,e2:sel.f2.e1})
                    pushFace({e1:sel.f1.e2,e2:sel.f2.e2})
                }
            }
        }
    })
    selection.selecc = selecc.length ? selecc : false
}

function updateQuery(queryString) {
    let errDiv = document.getElementById('error')
    try {
        let result = parser.parse(queryString.trim())
        errDiv.innerHTML = ''
        parseResult.result = result
        parseResult.queryString = queryString
        console.log('PARSE', result)
        window.location.hash = btoa(JSON.stringify({q:queryString}))

        // but also, update the selection
        parseResult.selection = computeSelection(result)
    }
    catch(e) {
        errDiv.innerHTML = `<pre>${e}</pre>`
    }
}

function computeFormula(formula, env) {
    if(typeof(formula) === 'number') {
        return formula
    }
    if(formula.op === "var") {
        return env[formula.var] || 0
    }
    if(formula.op === "mul") {
        return computeFormula(formula.lhs, env) * computeFormula(formula.rhs, env)
    }
}

function toTranforms(parseResult, env) {
    function toRot(t) {
        let ax = t.rot
        let th = computeFormula(t.theta, env) * Math.PI
        return rot[ax](th)
    }
    function isRot(t) {
        return t.rot
    }
    return parseResult.filter(isRot).map(toRot)
}

function setMouseMode(xy, mode) {
    console.log('SETMOUSEMODE', {xy, mode})
    mouseMode[xy] = mode
    initMouseModes()
}

var axes = `none zw yw yz xw xz xy`.split(' ')
let keyBindings = {
    t: `1 2 3 3 4 5 6 7`.split(' '),
    x: `q w e r t y u i`.split(' '),
    y: `a s d f g h j k`.split(' ')
}

for(let i = 0; i < axes.length; i++) {
    keyboardJS.bind(keyBindings.x[i], () => {
        setMouseMode('x', axes[i])
    })
    keyboardJS.bind(keyBindings.y[i], () => {
        setMouseMode('y', axes[i])
    })
    keyboardJS.bind(keyBindings.t[i], () => {
        setMouseMode('t', axes[i])
    })
}

keyboardJS.bind('z', reset())

var demoMode = true
function toggleDemoMode () {
    demoMode = !demoMode
    if(!demoMode) {
        reset()
    }
    initMouseModes()
}

function reset() {
    // reset rotations
    AXES.forEach(a => rotations[a] = 0)
}

function initMouseModes () {
    let modeSpanX = m => `<button class="${mouseMode.x === m ? 'active' : ''}" onclick="setMouseMode('x','${m}')">${m} [${keyBindings.x[axes.indexOf(m)]}]</button>`
    let modeSpanY = m => `<button class="${mouseMode.y === m ? 'active' : ''}" onclick="setMouseMode('y','${m}')">${m} [${keyBindings.y[axes.indexOf(m)]}]</button>`
    let modeSpanT = m => `<button class="${mouseMode.t === m ? 'active' : ''}" onclick="setMouseMode('t','${m}')">${m} [${keyBindings.t[axes.indexOf(m)]}]</button>`
    let xModes = axes.map(modeSpanX).join('')
    let yModes = axes.map(modeSpanY).join('')
    let tModes = axes.map(modeSpanT).join('')
    let divModes = document.getElementById('modes')
    // divModes.innerHTML = `<div>demo: <button class="${demoMode ? 'active' : ''}" onclick="toggleDemoMode()">demo</button><br>T: ${tModes}<br>X: ${xModes}<br>Y: ${yModes}<br>[z] = reset</div>`
}


function mouseHandler () {
    // ripped from https://stackoverflow.com/questions/7790725/javascript-track-mouse-position
    document.addEventListener('mousemove', handleMouseMove);
    function handleMouseMove(event) {
        var eventDoc, doc, body;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        // Use event.pageX / event.pageY here
        mouseCoords.x = event.pageX
        mouseCoords.y = event.pageY
    }
}

