class MT2D {
    _matrica;

    constructor() {
        this.identitet();
    }

    dohvatiMatricu() {
        return this._matrica;
    }

    identitet() {
        this._matrica =
            [[1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]];
    }

    pomakni(px, py) {
        var m =
            [[1, 0, px],
            [0, 1, py],
            [0, 0, 1]];
        this.mult(m);
    }

    skaliraj(sx, sy) {
        var m =
            [[sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaX() {
        var m =
            [[1, 0, 0],
            [0, -1, 0],
            [0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaY() {
        var m =
            [[-1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]];
        this.mult(m);
    }

    rotiraj(kut) {
        let rot = kut * (Math.PI / 180);
        let sinKut = Math.sin(rot);
        let cosKut = Math.cos(rot);
        var m =
            [[cosKut, -sinKut, 0],
            [sinKut, cosKut, 0],
            [0, 0, 1]];
        this.mult(m);
    }

    smicanje(alpha, beta) {
        let tgAlpha = Math.tan(alpha);
        let tgBeta = Math.tan(beta);
        var m =
            [[1, tgBeta, 0],
            [tgAlpha, 1, 0],
            [0, 0, 1]];
        this.mult(m);
    }

    mult(m) {
        var m0 =
            [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]];

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    m0[i][j] += m[i][k] * this._matrica[k][j];
                }
            }
        }

        this._matrica = m0;
    }

    rotiraj_oko_tocke(x0, y0, kut) {
        this.pomakni(x0, y0);
        this.rotiraj(kut);
        this.pomakni(-x0, -y0);
    }

    zrcaliNa(k, l) {
        var kut = Math.atan(k);
        this.pomakni(0, -l);
        this.rotiraj(-kut);
        this.zrcaliNaX();
        this.rotiraj(kut);
        this.pomakni(0, l);
    }

    lista() {
        var listaOut = [];

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                listaOut.push(this._matrica[j][i]);
            }
        }

        return listaOut;
    }

    projekcija2D(xmin, xmax, ymin, ymax) {
        this.px = 2 / (xmax - xmin);
        this.py = 2 / (ymax - ymin);
        this.sx = -this.px * xmin - 1;
        this.sy = -this.py * ymin - 1;
    }

    normirajX(x) {
        return this.px * x + this.sx;
    }

    normirajY(y) {
        return this.py * y + this.sy;
    }
}