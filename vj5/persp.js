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
        this._matrica = m.mnoziMatrice(m._kamera, m._matrica);
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

    stozac(r, h, n) {
        var p1 = r * Math.cos(0);
        var p2 = r * Math.sin(0);
        this.postaviNa(p1, 0, p2);

        for (var fi = 0; fi < 2 * Math.PI + 1; fi += 2 * Math.PI / (n + 1)) {
            var t1 = r * Math.cos(fi);
            var t2 = r * Math.sin(fi);
            this.linijaDo(t1, 0, t2);
            this.linijaDo(0, h, 0);
            this.povuciLiniju();
            this.linijaDo(t1, 0, t2);
        }
        this.povuciLiniju();
    }

    valjak(r, h, n) {
        var p1 = r * Math.cos(0);
        var p2 = r * Math.sin(0);
        this.postaviNa(p1, 0, p2);
        for (let fi = 0; fi < 2 * Math.PI + 1; fi += 2 * Math.PI / (n + 1)) {
            var p1 = r * Math.cos(fi);
            var p2 = r * Math.sin(fi);
            this.linijaDo(p1, 0, p2);
            this.linijaDo(p1, h, p2);
            this.povuciLiniju();
            this.postaviNa(p1, 0, p2);
        }

        this.postaviNa(r * Math.cos(0), h, r * Math.sin(0));
        for (let fi = 0; fi < 2 * Math.PI + 1; fi += 2 * Math.PI / (n + 1)) {
            var p1 = r * Math.cos(fi);
            var p2 = r * Math.sin(fi);
            this.linijaDo(p1, h, p2);
            this.povuciLiniju();
        }
    }

    kugla(r, m, n) {
        var dFT = 0.1;

        for (var fi = 0; fi < 2 * Math.PI; fi += 2 * Math.PI / m) {
            var p1 = r * Math.cos(fi) * Math.sin(0);
            var p2 = r * Math.sin(fi) * Math.sin(0);
            var p3 = r * Math.cos(0);
            this.postaviNa(p1, p3, p2);
            for (var theta = 0; theta < Math.PI + 1; theta += dFT) {
                var t1 = r * Math.cos(fi) * Math.sin(theta);
                var t2 = r * Math.sin(fi) * Math.sin(theta);
                var t3 = r * Math.cos(theta);
                this.linijaDo(t1, t3, t2);
                this.povuciLiniju();
            }
        }

        for (let theta = 0; theta < Math.PI; theta += Math.PI / (n + 1)) {
            var p1 = r * Math.cos(0) * Math.sin(theta);
            var p2 = r * Math.sin(0) * Math.sin(theta);
            var p3 = r * Math.cos(theta);
            this.postaviNa(t1, t3, t2);
            for (let fi = 0; fi < 2 * Math.PI + 1; fi += dFT) {
                var t1 = r * Math.cos(fi) * Math.sin(theta);
                var t2 = r * Math.sin(fi) * Math.sin(theta);
                var t3 = r * Math.cos(theta);
                this.linijaDo(t1, t3, t2);
                this.povuciLiniju();
            }
        }
        this.povuciLiniju();
    }

    polukugla(r, m, n) {
        var dFT = 0.1;

        for (var fi = 0; fi < Math.PI + 0.5; fi += 2 * Math.PI / m) {
            var p1 = r * Math.cos(fi) * Math.sin(0)
            var p2 = r * Math.sin(fi) * Math.sin(0)
            var p3 = r * Math.cos(0)
            this.postaviNa(p1, p3, p2);
            for (var theta = 0; theta < Math.PI; theta += dFT) {
                var t1 = r * Math.cos(fi) * Math.sin(theta);
                var t2 = r * Math.sin(fi) * Math.sin(theta);
                var t3 = r * Math.cos(theta);
                this.linijaDo(t1, t3, t2);
                this.povuciLiniju();
            }
        }

        for (var theta = 0; theta < Math.PI; theta += Math.PI / (n + 1)) {
            var p1 = r * Math.cos(0) * Math.sin(theta);
            var p2 = r * Math.sin(0) * Math.sin(theta);
            var p3 = r * Math.cos(theta);
            this.postaviNa(p1, p3, p2);
            for (var fi = 0; fi < Math.PI; fi += dFT) {
                var t1 = r * Math.cos(fi) * Math.sin(theta);
                var t2 = r * Math.sin(fi) * Math.sin(theta);
                var t3 = r * Math.cos(theta);
                this.linijaDo(t1, t3, t2);
                this.povuciLiniju();
            }
        }
        this.povuciLiniju();
    }
}