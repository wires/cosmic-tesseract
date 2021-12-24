
preamble = `\newcommand{\lax}{\mathrm{lx}}
\newcommand{\oplax}{\mathrm{ox}}
\newcommand{\pseudo}{\mathrm{ps}}
\newcommand{\strong}{\mathrm{st}}
\newcommand{\costrong}{\mathrm{ct}}
\newcommand{\bistrong}{\mathrm{bt}}

\newcommand{\lMod}[1]{{#1}\textsf{-}\Mod}
\newcommand{\laxMod}[1]{{#1}\textsf{-}\lax\Mod}
\newcommand{\oplaxMod}[1]{{#1}\textsf{-}\oplax\Mod}
\newcommand{\pseudoMod}[1]{{#1}\textsf{-}\pseudo\Mod}

%
% MAMA package (MAth MAcros)
% a semantic package for mathematical symbols and fast latexing
%
% by Matteo Capucci <matteo.capucci@gmail.com>
%
% https://gist.githubusercontent.com/mattecapu/b16ea761c7fd7069f7755ccef114985d/raw/b5e3275897b3505de0db1065f28a6715eb0d4417/actions.sty

% issues/questions/drafts
\newenvironment{issue}{\color{red}}{\color{black}}

% list environment for properties
\newlist{named}{description}{3}
\newcommand{\labelize}[1]{(\emph{#1})}
\setlist[named]{
  font=\labelize,
}

% aligned equations
\newenvironment{eqalign}{\begin{equation}\begin{aligned}}{\end{aligned}\end{equation}}
\newenvironment{eqalign*}{\begin{equation*}\begin{aligned}}{\end{aligned}\end{equation*}}

% diagrams
\newenvironment{diagram}{\begin{equation}\begin{tikzcd}}{\end{tikzcd}\end{equation}}
\newenvironment{diagram*}{\begin{equation*}\begin{tikzcd}}{\end{tikzcd}\end{equation*}}

\tikzset{
  relation/.style={
    draw=none,
    every to/.append style={
      edge node={node [sloped, allow upside down, auto=false]{$#1$}}}
  }
}

% common arrow styles
\tikzcdset{
  mono/.code={
    \pgfsetarrows{tikzcd to reversed-tikzcd to}
  }
}
\tikzcdset{
  epi/.code={
    \pgfsetarrowsend{tikzcd double to}
  }
}
\tikzcdset{
  into/.code={
    \pgfsetarrows{tikzcd right hook-tikzcd to}
  }
}
\tikzcdset{
  twocell/.style={Rightarrow, shorten >= 3ex, shorten <= 3ex}
}

\tikzcdset{
  row sep/normal={
    6ex
  },
  column sep/normal={
    8ex
  }
}

% comment on an equation
\newcommand{\comment}[1]{\qquad\text{#1}}

% disjoint footnotes
\newcommand{\disjointfootnotemark}[1]{\footnotemark[\getrefnumber{#1}]}
\newcommand{\disjointfootnotetext}[1]{%
  \addtocounter{footnote}{1}%
  \addtocounter{Hfootnote}{1}%
  \footnotetext{#1}%
}

% overset without decreasing font size
\newcommand{\Overset}[2]{%
  \mathop{#2}\limits^{\vbox to -.1ex{%
  \kern -1.8ex\hbox{$#1$}\vss}}%
}
% underset without decreasing font size
\newcommand{\Underset}[2]{%
  \mathop{#2}\limits_{\vbox to .1ex{%
  \kern -.6ex\hbox{$#1$}\vss}}%
}

% hyphen for math mode
\mathchardef\dash="2D

% defined term
\newcommand{\defining}[1]{\textbf{#1}}

% subject of a thesis
\renewcommand{\th}[1]{\overset{th}{#1}}

% e costant
\newcommand{\e}{\mathrm{e}}

% exp
\renewcommand{\exp}{\operatorname{exp}}

% cotangent
\newcommand{\cotan}{\operatorname{cotan}}

% argmin
\newcommand{\argmin}{\operatorname{argmin}}

% 'does not imply' symbol
\newcommand{\nimplies}{\centernot\implies}

% implications in the opposite direction
\newcommand{\implied}{\Longleftarrow}
\newcommand{\nimplied}{\centernot\implied}

% logical implication
\newcommand{\limp}{\rightarrow}
\newcommand{\liff}{\leftrightarrow}

% inhabitation for types
\newcommand{\tin}{\!:\!}

% inverses of \to
\newcommand{\ot}{\leftarrow}
\newcommand{\from}{\ot}

% long version of \to
\newcommand{\longto}{\longrightarrow}

% inverse of \mapsto
\newcommand{\mapsfrom}{\mathrel{\reflectbox{\ensuremath{\mapsto}}}}
\newcommand{\longmapsfrom}{\mathrel{\reflectbox{\ensuremath{\longmapsto}}}}

% inclusion
\newcommand{\into}{\hookrightarrow}
\newcommand{\inot}{\hookleftarrow}
\newcommand{\mono}{\rightarrowtail}

% surjection
\newcommand{\onto}{\twoheadrightarrow}
\newcommand{\epi}{\twoheadrightarrow}

% iso arrows
\newcommand{\isoto}{\overset{\sim}\to}
\newcommand{\isolongto}{\overset{\sim}\longto}

% 2-morphisms
\newcommand{\twoto}{\Rightarrow}
\newcommand{\isotwoto}{\overset{\sim}\twoto}
\newcommand{\longtwoto}{\Longrightarrow}
\newcommand{\isolongtwoto}{\overset{\sim}\longtwoto}

% 3-morphisms
\newcommand{\threeto}{\Rrightarrow}

% named to
% \newlength{\templen}
% \newcommand{\flexbox}[2][1.5ex]{%
%   \settowidth{\templen}{#2}%
%   \ifdim\templen < #1\relax
%     \makebox[#1][l]{#2}\relax
%   \else
%     {#2}%
%   \fi
% }

\newcommand{\narrow}[2]{\overset{#1}{#2}}
\newcommand{\nto}[1]{\narrow{#1}{\to}}
\newcommand{\nlongto}[1]{\xrightarrow{#1}}
\newcommand{\ninto}[1]{\narrow{#1}{\into}}
\newcommand{\nisoto}[1]{\narrow{#1}{\isolongto}}
\newcommand{\nepi}[1]{\narrow{#1}{\epi}}
\newcommand{\nmono}[1]{\narrow{#1}{\mono}}

% 'a | b'
\newcommand{\divides}{\,|\,}

% constant function
\newcommand{\cost}{\text{cost.}}
\newcommand{\const}{\text{const.}}

% locutions
\newcommand{\word}[1]{\quad\text{\underline{#1}}\quad}
\@ifpackagewith{babel}{italian}{%
  \newcommand{\almosteverywhereon}[2][\mu]{{\text{\${#1}$-q.o. su \${#2}$}}}
  \renewcommand{\ae}{\ \text{q.o.}}
  \newcommand{\sse}{\word{sse}}
  \newcommand{\means}{\word{significa}}
  \newcommand{\impl}{\word{implica}}
  \newcommand{\fa}{\ \text{p.o.}\;}
}{%
  \newcommand{\almosteverywhereon}[2][\mu]{{\text{\${#1}$-a.e. on \${#2}$}}}
  \renewcommand{\ae}{\ \text{a.e.}}
  \newcommand{\sse}{\word{iff}}
  \newcommand{\means}{\word{means}}
  \newcommand{\impl}{\word{implies}}
  \newcommand{\fa}{\ \text{f.a.}\;}
}

% such that
\newcommand{\suchthat}{\,|\,}

% numerical sets
\newcommand{\N}{\mathbb{N}}
\newcommand{\Z}{\mathbb{Z}}
\newcommand{\Q}{\mathbb{Q}}
\newcommand{\R}{\mathbb{R}}
\newcommand{\C}{\mathbb{C}}

% set-theoretic stuff
\newcommand{\card}[1]{\left|{#1}\right|}
\newcommand{\parts}[1]{\mathcal{P}\left({#1}\right)}
\newcommand{\continuum}{\mathfrak{c}}

% diameter of a set
\newcommand{\diam}{\operatorname{diam}}

% vectors
\newcommand{\vers}[1]{\hat{\vv{#1}}}

\newcommand{\vv}[1]{{\boldsymbol{#1}}}

\newcommand{\ii}{\vers{i}}
\newcommand{\jj}{\vers{j}}
\newcommand{\kk}{\vers{k}}

\newcommand{\xx}{\vv{x}}
\newcommand{\yy}{\vv{y}}
\newcommand{\zz}{\vv{z}}

% big kernel, cokernel & image
\newcommand{\Ker}{\operatorname{Ker}}
\newcommand{\coker}{\operatorname{coker}}
\newcommand{\Imm}{\operatorname{Im}}
\newcommand{\im}{\operatorname{im}}

% action of a group
\newcommand{\acts}{\curvearrowright}
% weak action groupoid
\newcommand{\wag}{\mathbin{/\mkern-6mu/}}

% linear span
\newcommand{\Span}{\operatorname{span}}

% direct sum
\newcommand{\dir}{\oplus}
\newcommand{\bigdir}{\bigoplus}

% tensor product
\newcommand{\tens}[1][]{\otimes_{#1}}
\newcommand{\bigtens}{\bigotimes}

% operations in an Heyting algebra
\newcommand{\hey}{\Rightarrow}
\newcommand{\bigsup}{\bigvee}
\newcommand{\biginf}{\bigwedge}

% differential
\newcommand{\diff}[1]{\operatorname{d}{#1}}
% jacobian
\newcommand{\jac}{\operatorname{\vv{J}}}

% derivatives
\newcommand{\de}{\mathrm{d}}
\newcommand{\dx}{\de x}
\newcommand{\dt}{\de t}
\newcommand{\ds}{\de s}

\newcommand{\der}[2]{\frac{\de{#1}}{\de{#2}}}
\newcommand{\pder}[2]{\frac{\partial {#1}}{\partial {#2}}}

% second derivatives
\newcommand{\sder}[2]{\frac{\de^2{#1}}{\de{#2}^2}}
\newcommand{\spder}[3]{\frac{\partial^2{#1}}{\partial{#2} \partial{#3}}}
% second derivative on the same coordinate
\newcommand{\sdpder}[2]{\frac{\partial^2{#1}}{\partial{#2}^2}}

% big derivatives
\newcommand{\bigder}[2]{\dfrac{\strut \de{#1}}{\de{#2}}}
\newcommand{\bigpder}[2]{\dfrac{\strut \partial {#1}}{\partial {#2}}}

% big second derivatives
\newcommand{\bigsder}[2]{\dfrac{\strut \de^2 {#1}}{\de{#2}^2}}
\newcommand{\bigspder}[3]{\dfrac{\strut \partial^2 {#1}}{\partial {#2} \partial {#3}}}
% big second derivative on the same coordinate
\newcommand{\bigsdpder}[2]{\dfrac{\strut \partial^2 {#1}}{\partial {#2}^2}}

% left/right applied partial derivatives
\newcommand{\lpartial}{\overset{\leftarrow}\partial}
\newcommand{\rpartial}{\overset{\rightarrow}\partial}

% complex stuff
\newcommand{\conj}[1]{\overline{#1}}
\newcommand{\Arg}{\operatorname{Arg}}
\newcommand{\Res}{\operatorname{Res}}

% real and imaginary parts
\renewcommand{\Re}[1]{\mathfrak{Re}\left(#1\right)}
\renewcommand{\Im}[1]{\mathfrak{Im}\left(#1\right)}

% sign function
\newcommand{\sign}{\operatorname{}{sgn}}

% convergence
\newcommand{\conv}[1][]{\underset{{#1}}{\longrightarrow}}

% regularity classes
\newcommand{\Cn}{\mathcal{C}}
\newcommand{\Czero}{\Cn^0}
\newcommand{\Cone}{\Cn^1}
\newcommand{\Ctwo}{\Cn^2}
\newcommand{\Cinfty}{\Cn^\infty}

% Lipschitz
\newcommand{\Lip}{\mathrm{Lip}}

% indicator function
\newcommand{\ind}{\vv{1}}

% identity
\newcommand{\identity}{\mathrm{id}}
\newcommand{\id}{\mathrm{id}}

% categories
\newcommand{\Ob}{\operatorname{Ob}}
\newcommand{\Hom}{\operatorname{Hom}}
\newcommand{\End}{\operatorname{End}}
\newcommand{\Aut}{\operatorname{Aut}}

\newcommand{\Nat}{\operatorname{Nat}}

% Kan extensions
\newcommand{\Lan}{\operatorname{Lan}}
\newcommand{\Ran}{\operatorname{Ran}}

% profunctor arrow
\newcommand{\profto}{\mathrel{\ooalign{\hfil$\mapstochar$\hfil\cr$\to$\cr}}}

\newcommand{\cat}[1]{\mathbf{#1}}
\newcommand{\twocat}[1]{\mathbb{#1}}
\newcommand{\tripos}[1]{\mathsf{#1}}
\newcommand{\lang}[1]{\mathcal{#1}}
\newcommand{\theory}[1]{\mathbb{#1}}
\newcommand{\topos}[1]{\mathcal{#1}}

% big categories
\newcommand{\Cat}{\twocat{C}\cat{at}}
\newcommand{\CAT}{\twocat{C}\cat{AT}}

\newcommand{\Set}{\cat{Set}}
\newcommand{\FinSet}{\cat{FinSet}}

\newcommand{\Graph}{\cat{Graph}}
\newcommand{\Mon}{\cat{Mon}}
\newcommand{\Grp}{\cat{Grp}}
\newcommand{\Mod}{\cat{Mod}}
\newcommand{\Ab}{\cat{Ab}}
\newcommand{\Rng}{\cat{Rng}}
\renewcommand{\Vec}{\cat{Vec}}
\newcommand{\Meas}{\cat{Meas}}

% spaces
\newcommand{\Top}{\cat{Top}}

% sheaves categories
\newcommand{\Sh}{\operatorname{Sh}}
\newcommand{\Psh}{\operatorname{Psh}}

% opposite category
\newcommand{\op}{\mathsf{op}}
\newcommand{\co}{\mathsf{co}}
\newcommand{\coop}{\mathsf{coop}}

% isomorphism and equivalence symbols
\newcommand{\iso}[1][]{\overset{#1}{\cong}}
\newcommand{\equi}{\simeq}

% pullback
\newcommand{\pbcorner}{\scalebox{1.5}{$\lrcorner$}}
\newcommand{\pb}{\arrow[dr, phantom, "\pbcorner", very near start]}

% colimit
\newcommand{\colim}{\operatorname*{colim}}

% subobjects
\newcommand{\Sub}{\operatorname{Sub}}

% Yoneda embedding
\font\maljapanese=dmjhira at 2ex
\newcommand{\yo}{\operatorname{\text{\maljapanese\char"48}\!}}

% evaluation map
\newcommand{\ev}{\operatorname{ev}}

% true/false predicate maps
\newcommand{\true}{\mathsf{true}}
\newcommand{\false}{\mathsf{false}}

% F left adjoint to G symbol
\newcommand{\adj}{\dashv}

% forcing symbol
\newcommand{\forces}{\vDash}

% entailment
\newcommand{\entails}{\vdash}
\newcommand{\bientails}{\dashv\vdash}

% acronyms
\newcommand{\LEM}{\mathsf{LEM}}
\newcommand{\AC}{\mathsf{AC}}
\newcommand{\IL}{\mathsf{IL}}

\newcommand{\DOptic}{\cat{DOptic}}
\newcommand{\groth}{\int}

\newcommand{\Para}{\cat{Para}}
\newcommand{\CoPara}{\cat{Copara}}
\newcommand{\Optic}{\cat{Optic}}
\newcommand{\Lens}{\cat{Lens}}
\newcommand{\diset}[2]{\binom{#1}{#2}} % objects of optic
\newcommand{\Opt}{\cat{Opt}}
\newcommand{\DLens}{\cat{DLens}}
\newcommand{\DOpt}{\cat{DOpt}}
\newcommand{\Mat}{\cat{Mat}}
\newcommand{\dom}{\mathrm{dom}}
\newcommand{\cod}{\mathrm{cod}}
\newcommand{\mor}{\mathrm{mor}}
\newcommand{\deloop}{\twocat B}

% actions
\newcommand{\action}{\bullet}
\newcommand{\ostar}{\circledast}

\newcommand{\view}{\mathsf{view}}
\newcommand{\update}{\mathsf{update}}

%%% Mathcal
\newcommand{\Ia}{{\mathcal I}}
\newcommand{\Ca}{{\mathcal C}}
\newcommand{\Da}{{\mathcal D}}
\newcommand{\Ma}{{\mathcal M}}
\newcommand{\Na}{{\mathcal N}}
`