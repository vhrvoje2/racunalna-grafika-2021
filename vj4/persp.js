class Persp {
    _matrica;
    _dist;

    constructor(platno, xmin, xmax, ymin, ymax, dist) {
        this.platno = platno;
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
        this._dist = dist;
        this.w = platno.width;
        this.h = platno.height;
        this.g = platno.getContext("2d");
        this.izracunajFaktorSkaliranja();
        this.izracunajPomake();
        this.postaviIdentitet();
    }

    izracunajFaktorSkaliranja() {
        this.sx = this.w / (this.xmax - this.xmin);
        this.sy = -this.h / (this.ymax - this.ymin);
    }

    izracunajPomake() {
        this.px = -this.sx * this.xmin;
        this.py = -this.sy * this.ymax;
    }

    postaviIdentitet() {
        this._matrica =
            [[1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
    }

    trans(m) {
        this._matrica = m.mnoziMatrice(m._matrica, m._kamera);
    }

    koristiBoju(c) {
        this.g.strokeStyle = c;
    }

    povuciLiniju() {
        this.g.stroke();
    }

    postaviNa(x, y, z) {
        var [tX, tY, tZ] = this.transformiraj(x, y, z);
        var [prX, prY] = this.projiciraj(tX, tY, tZ);
        var [gkx, gky] = this.transformirajKoordinate(prX, prY);
        this.g.beginPath();
        this.g.moveTo(gkx, gky);
    }

    linijaDo(x, y, z) {
        var [tX, tY, tZ] = this.transformiraj(x, y, z);
        var [prX, prY] = this.projiciraj(tX, tY, tZ);
        var [gkx, gky] = this.transformirajKoordinate(prX, prY);
        this.g.lineTo(gkx, gky);
    }

    transformiraj(x, y, z) {
        var tX = this._matrica[0][0] * x + this._matrica[0][1] * y + this._matrica[0][2] * z + this._matrica[0][3];
        var tY = this._matrica[1][0] * x + this._matrica[1][1] * y + this._matrica[1][2] * z + this._matrica[1][3];
        var tZ = this._matrica[2][0] * x + this._matrica[2][1] * y + this._matrica[2][2] * z + this._matrica[2][3];
        return [tX, tY, tZ];
    }

    projiciraj(x, y, z) {
        var prX = -(this._dist / z) * x;
        var prY = -(this._dist / z) * y;
        return [prX, prY];
    }

    transformirajKoordinate(x, y) {
        var gkx = this.sx * x + this.px;
        var gky = this.sy * y + this.py;
        return [gkx, gky];
    }

    ocisti() {
        this.g.clearRect(0, 0, this.platno.width, this.platno.height);
    }
}