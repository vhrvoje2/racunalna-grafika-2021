class GKS {
    _matrica;

    constructor(platno, xmin, xmax, ymin, ymax) {
        this.platno = platno;
        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
        this.w = platno.width;
        this.h = platno.height;
        this.g = platno.getContext("2d");
        this.g.font = "10px serif";
        this.izracunajFaktorSkaliranja();
        this.izracunajPomake();
        this.postaviIdentitet();
    }

    postaviIdentitet() {
        this._matrica =
            [[1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]];
    }

    izracunajFaktorSkaliranja() {
        this.sx = this.w / (this.xmax - this.xmin);
        this.sy = -this.h / (this.ymax - this.ymin);
    }

    izracunajPomake() {
        this.px = -this.sx * this.xmin;
        this.py = -this.sy * this.ymax;
    }

    transformirajKoordinate(x, y) {
        var gkx = this.sx * x + this.px;
        var gky = this.sy * y + this.py;
        return [gkx, gky];
    }

    postaviNa(x, y) {
        var [tX, tY] = this.transformiraj(x, y);
        var [gkx, gky] = this.transformirajKoordinate(tX, tY);
        this.g.beginPath();
        this.g.moveTo(gkx, gky);
    }

    linijaDo(x, y) {
        var [tX, tY] = this.transformiraj(x, y);
        var [gkx, gky] = this.transformirajKoordinate(tX, tY);
        this.g.lineTo(gkx, gky);
    }

    transformiraj(x, y) {
        var tX = this._matrica[0][0] * x + this._matrica[0][1] * y + this._matrica[0][2];
        var tY = this._matrica[1][0] * x + this._matrica[1][1] * y + this._matrica[1][2];
        return [tX, tY];
    }

    umetniTekst(x, y, tekst) {
        var [gkx, gky] = this.transformirajKoordinate(x, y);
        this.g.strokeText(tekst, gkx, gky);
    }

    koristiBoju(c) {
        this.g.strokeStyle = c;
    }

    povuciLiniju() {
        this.g.stroke();
    }

    nacrtajOsi() {
        this.koristiBoju("black");
        this.nacrtajXOs();
        this.nacrtajYOs();
        this.dodajXOznake();
        this.dodajYOznake();
    }

    nacrtajXOs() {
        this.postaviNa(this.xmin, 0);
        this.linijaDo(this.xmax, 0);
        this.povuciLiniju();
    }

    nacrtajYOs() {
        this.postaviNa(0, this.ymin);
        this.linijaDo(0, this.ymax);
        this.povuciLiniju();
    }

    dodajXOznake() {
        var dx = 1;
        for (var x = this.xmin; x <= this.xmax; x += dx) {
            var floorX = Math.floor(x);
            this.postaviNa(floorX, 0.05);
            this.linijaDo(floorX, -0.05);
            this.povuciLiniju();
            this.umetniTekst(floorX + 0.1, -0.1, floorX.toString());
        }
    }

    dodajYOznake() {
        var dy = 1;
        for (var y = this.ymin; y <= this.ymax; y += dy) {
            var floorY = Math.floor(y);
            this.postaviNa(0.05, floorY);
            this.linijaDo(-0.05, floorY);
            this.povuciLiniju();
            if (floorY) {
                this.umetniTekst(0.1, floorY - 0.1, floorY.toString());
            }
        }
    }

    trans(m) {
        this._matrica = m.dohvatiMatricu();
    }
}