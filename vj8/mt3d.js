class MT3D {
    constructor() {
        this.matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.kamera = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
    }

    identitet() {
        var m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.matrica = m;
    }

    pomakni(px, py, pz) {
        var m = [[1, 0, 0, px], [0, 1, 0, py], [0, 0, 1, pz], [0, 0, 0, 1]];
        this.mult(m);
    }

    skaliraj(sx, sy, sz) {
        var m = [[sx, 0, 0, 0], [0, sy, 0, 0], [0, 0, sz, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaX() {
        var m = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaY() {
        var m = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaZ() {
        var m = [[-1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaXY() {
        var m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaXZ() {
        var m = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaYZ() {
        var m = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    rotirajX(kutRotacije) {
        var kut = (kutRotacije * Math.PI) / 180;
        var m = [[1, 0, 0, 0], [0, Math.cos(kut), -Math.sin(kut), 0], [0, Math.sin(kut), Math.cos(kut), 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    rotirajY(kutRotacije) {
        var kut = (kutRotacije * Math.PI) / 180;
        var m = [[Math.cos(kut), 0, Math.sin(kut), 0], [0, 1, 0, 0], [-Math.sin(kut), 0, Math.cos(kut), 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    rotirajZ(kutRotacije) {
        var kut = (kutRotacije * Math.PI) / 180;
        var m = [[Math.cos(kut), -Math.sin(kut), 0, 0], [Math.sin(kut), Math.cos(kut), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    rotiraj(kutRotacije) {
        var kut = kutRotacije * (Math.PI / 180)
        var m = [[Math.cos(kut), -1 * (Math.sin(kut)), 0], [Math.sin(kut), Math.cos(kut), 0], [0, 0, 1]];
        this.mult(m);
    }

    smicanje(alfa1, beta1) {
        var alfa = alfa1 * (Math.PI / 180);
        var beta = beta1 * (Math.PI / 180);
        var m = [[1, Math.tan(beta), 0], [Math.tan(alfa), 1, 0], [0, 0, 1]];
        this.mult(m);
    }

    mult(m) {
        var m1 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    m1[i][j] += this.matrica[i][k] * m[k][j];
                }
            }
        }
        this.matrica = m1;
    }

    zrcaliNa(k, l) {
        var kut = Math.atan(k);
        var pretvoreniKut = kut * (180 / Math.PI);
        this.pomakni(0, l);
        this.rotiraj(pretvoreniKut);
        this.zrcaliNaX();
        this.rotiraj(-pretvoreniKut);
        this.pomakni(0, -l);
    }

    rotiraj_oko_tocke(x, y, kut) {
        this.pomakni(x, y);
        this.rotiraj(kut);
        this.pomakni(-x, -y);
    }

    rotiraj_oko_osi(x0, y0, z0, u1, u2, u3, kut) {
        var u1u = u1 / (Math.sqrt(Math.pow(u1, 2) + Math.pow(u2, 2) + Math.pow(u3, 2)));
        var u2u = u2 / (Math.sqrt(Math.pow(u1, 2) + Math.pow(u2, 2) + Math.pow(u3, 2)));
        var u3u = u3 / (Math.sqrt(Math.pow(u1, 2) + Math.pow(u2, 2) + Math.pow(u3, 2)));

        var alfa = Math.asin(u2u / (Math.sqrt(Math.pow(u2u, 2) + Math.pow(u3u, 2)))) * (180 / Math.PI);
        var beta = Math.asin(u1u) * (180 / Math.PI);

        this.pomakni(x0, y0, z0);
        this.rotirajX(-1 * alfa);
        this.rotirajY(beta);
        this.rotirajZ(kut);
        this.rotirajY(-1 * beta);
        this.rotirajX(alfa);
        this.pomakni(-1 * x0, -1 * y0, -1 * z0);
    }

    mnoziMatrice(m1, m2) {
        var novaMatrica = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < 4; k++) {
                    novaMatrica[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }
        return novaMatrica;
    }

    VP(u, v) {
        var vektor = [0, 0, 0];
        vektor[0] = u[1] * v[2] - u[2] * v[1];
        vektor[1] = u[2] * v[0] - u[0] * v[2];
        vektor[2] = u[0] * v[1] - u[1] * v[0];
        return vektor;
    }

    postaviKameru(x0, y0, z0, x1, y1, z1, Vx, Vy, Vz) {
        var xn = (x0 - x1) / Math.sqrt(Math.pow((x0 - x1), 2) + Math.pow((y0 - y1), 2) + Math.pow((z0 - z1), 2));
        var yn = (y0 - y1) / Math.sqrt(Math.pow((x0 - x1), 2) + Math.pow((y0 - y1), 2) + Math.pow((z0 - z1), 2));
        var zn = (z0 - z1) / Math.sqrt(Math.pow((x0 - x1), 2) + Math.pow((y0 - y1), 2) + Math.pow((z0 - z1), 2));

        var vektorU = this.VP([Vx, Vy, Vz], [xn, yn, zn]);

        var xu = vektorU[0] / Math.sqrt(Math.pow(vektorU[0], 2) + Math.pow(vektorU[1], 2) + Math.pow(vektorU[2], 2));
        var yu = vektorU[1] / Math.sqrt(Math.pow(vektorU[0], 2) + Math.pow(vektorU[1], 2) + Math.pow(vektorU[2], 2));
        var zu = vektorU[2] / Math.sqrt(Math.pow(vektorU[0], 2) + Math.pow(vektorU[1], 2) + Math.pow(vektorU[2], 2));

        var v = this.VP([xn, yn, zn], [xu, yu, zu]);
        this.kamera = [[xu, yu, zu, -xu * x0 - yu * y0 - zu * z0], [v[0], v[1], v[2], -v[0] * x0 - v[1] * y0 - v[2] * z0], [xn, yn, zn, -xn * x0 - yn * y0 - zn * z0], [0, 0, 0, 1]];
        this.mult(this.kamera);
    }

    persp(xmin, xmax, ymin, ymax, zpr, zst) {
        var kamera2 = [[(2 * zpr) / (xmax - xmin), 0, (xmax + xmin) / (xmax - xmin), 0],
        [0, (2 * zpr) / (ymax - ymin), (ymax + ymin) / (ymax - ymin), 0],
        [0, 0, (zpr + zst) / (zpr - zst), (2 * zpr * zst) / (zpr - zst)],
        [0, 0, -1, 0]];
        this.mult(kamera2);

    }

    lista() {
        var lista2 = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                lista2.push(this.matrica[j][i]);
            }
        }
        return lista2;
    }
}