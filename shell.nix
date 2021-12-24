with import <nixpkgs> {};

stdenv.mkDerivation {

	name = "prcss";

	buildInputs = [
		nodejs
		nodePackages.pnpm
	];

	shellHook = ''
		pnpm install
	'';
}
