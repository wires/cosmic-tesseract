# cosmic cube diagram rendering

this renders a hypercube in two dimensions. The third dimension is used to change the opacity of the labels/edges. KaTeX is used to render the labels.

To modify the projection matrix used to render the cube you can enter
queries using a stupid query language

```bnf
transforms := transform (_ transform)*
transform := axis '(' formula ')'
axis = 'zw' | 'yw' | 'yz' | 'xw' | 'xz' | 'xy
formula := expression var?
var := x | y | t
expression := float (+ | * ..)
```

The values are in `pi`, so `2` is `2 * Math.PI`.

```txt
zw(1) yw(t) yz(0.3 t)
```