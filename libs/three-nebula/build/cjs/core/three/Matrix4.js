"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Matrix4 = Matrix4;

var _Vector = require("./Vector3.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */
function Matrix4() {
  this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  if (arguments.length > 0) {
    console.error('THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.');
  }
}

Object.assign(Matrix4.prototype, {
  isMatrix4: true,
  set: function set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    var te = this.elements;
    te[0] = n11;
    te[4] = n12;
    te[8] = n13;
    te[12] = n14;
    te[1] = n21;
    te[5] = n22;
    te[9] = n23;
    te[13] = n24;
    te[2] = n31;
    te[6] = n32;
    te[10] = n33;
    te[14] = n34;
    te[3] = n41;
    te[7] = n42;
    te[11] = n43;
    te[15] = n44;
    return this;
  },
  identity: function identity() {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  clone: function clone() {
    return new Matrix4().fromArray(this.elements);
  },
  copy: function copy(m) {
    var te = this.elements;
    var me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    te[9] = me[9];
    te[10] = me[10];
    te[11] = me[11];
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    te[15] = me[15];
    return this;
  },
  copyPosition: function copyPosition(m) {
    var te = this.elements,
        me = m.elements;
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    return this;
  },
  extractBasis: function extractBasis(xAxis, yAxis, zAxis) {
    xAxis.setFromMatrixColumn(this, 0);
    yAxis.setFromMatrixColumn(this, 1);
    zAxis.setFromMatrixColumn(this, 2);
    return this;
  },
  makeBasis: function makeBasis(xAxis, yAxis, zAxis) {
    this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
    return this;
  },
  extractRotation: function () {
    var v1 = new _Vector.Vector3();
    return function extractRotation(m) {
      // this method does not support reflection matrices
      var te = this.elements;
      var me = m.elements;
      var scaleX = 1 / v1.setFromMatrixColumn(m, 0).length();
      var scaleY = 1 / v1.setFromMatrixColumn(m, 1).length();
      var scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();
      te[0] = me[0] * scaleX;
      te[1] = me[1] * scaleX;
      te[2] = me[2] * scaleX;
      te[3] = 0;
      te[4] = me[4] * scaleY;
      te[5] = me[5] * scaleY;
      te[6] = me[6] * scaleY;
      te[7] = 0;
      te[8] = me[8] * scaleZ;
      te[9] = me[9] * scaleZ;
      te[10] = me[10] * scaleZ;
      te[11] = 0;
      te[12] = 0;
      te[13] = 0;
      te[14] = 0;
      te[15] = 1;
      return this;
    };
  }(),
  makeRotationFromEuler: function makeRotationFromEuler(euler) {
    if (!(euler && euler.isEuler)) {
      console.error('THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.');
    }

    var te = this.elements;
    var x = euler.x,
        y = euler.y,
        z = euler.z;
    var a = Math.cos(x),
        b = Math.sin(x);
    var c = Math.cos(y),
        d = Math.sin(y);
    var e = Math.cos(z),
        f = Math.sin(z);

    if (euler.order === 'XYZ') {
      var ae = a * e,
          af = a * f,
          be = b * e,
          bf = b * f;
      te[0] = c * e;
      te[4] = -c * f;
      te[8] = d;
      te[1] = af + be * d;
      te[5] = ae - bf * d;
      te[9] = -b * c;
      te[2] = bf - ae * d;
      te[6] = be + af * d;
      te[10] = a * c;
    } else if (euler.order === 'YXZ') {
      var ce = c * e,
          cf = c * f,
          de = d * e,
          df = d * f;
      te[0] = ce + df * b;
      te[4] = de * b - cf;
      te[8] = a * d;
      te[1] = a * f;
      te[5] = a * e;
      te[9] = -b;
      te[2] = cf * b - de;
      te[6] = df + ce * b;
      te[10] = a * c;
    } else if (euler.order === 'ZXY') {
      var ce = c * e,
          cf = c * f,
          de = d * e,
          df = d * f;
      te[0] = ce - df * b;
      te[4] = -a * f;
      te[8] = de + cf * b;
      te[1] = cf + de * b;
      te[5] = a * e;
      te[9] = df - ce * b;
      te[2] = -a * d;
      te[6] = b;
      te[10] = a * c;
    } else if (euler.order === 'ZYX') {
      var ae = a * e,
          af = a * f,
          be = b * e,
          bf = b * f;
      te[0] = c * e;
      te[4] = be * d - af;
      te[8] = ae * d + bf;
      te[1] = c * f;
      te[5] = bf * d + ae;
      te[9] = af * d - be;
      te[2] = -d;
      te[6] = b * c;
      te[10] = a * c;
    } else if (euler.order === 'YZX') {
      var ac = a * c,
          ad = a * d,
          bc = b * c,
          bd = b * d;
      te[0] = c * e;
      te[4] = bd - ac * f;
      te[8] = bc * f + ad;
      te[1] = f;
      te[5] = a * e;
      te[9] = -b * e;
      te[2] = -d * e;
      te[6] = ad * f + bc;
      te[10] = ac - bd * f;
    } else if (euler.order === 'XZY') {
      var ac = a * c,
          ad = a * d,
          bc = b * c,
          bd = b * d;
      te[0] = c * e;
      te[4] = -f;
      te[8] = d * e;
      te[1] = ac * f + bd;
      te[5] = a * e;
      te[9] = ad * f - bc;
      te[2] = bc * f - ad;
      te[6] = b * e;
      te[10] = bd * f + ac;
    } // bottom row


    te[3] = 0;
    te[7] = 0;
    te[11] = 0; // last column

    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  },
  makeRotationFromQuaternion: function () {
    var zero = new _Vector.Vector3(0, 0, 0);
    var one = new _Vector.Vector3(1, 1, 1);
    return function makeRotationFromQuaternion(q) {
      return this.compose(zero, q, one);
    };
  }(),
  lookAt: function () {
    var x = new _Vector.Vector3();
    var y = new _Vector.Vector3();
    var z = new _Vector.Vector3();
    return function lookAt(eye, target, up) {
      var te = this.elements;
      z.subVectors(eye, target);

      if (z.lengthSq() === 0) {
        // eye and target are in the same position
        z.z = 1;
      }

      z.normalize();
      x.crossVectors(up, z);

      if (x.lengthSq() === 0) {
        // up and z are parallel
        if (Math.abs(up.z) === 1) {
          z.x += 0.0001;
        } else {
          z.z += 0.0001;
        }

        z.normalize();
        x.crossVectors(up, z);
      }

      x.normalize();
      y.crossVectors(z, x);
      te[0] = x.x;
      te[4] = y.x;
      te[8] = z.x;
      te[1] = x.y;
      te[5] = y.y;
      te[9] = z.y;
      te[2] = x.z;
      te[6] = y.z;
      te[10] = z.z;
      return this;
    };
  }(),
  multiply: function multiply(m, n) {
    if (n !== undefined) {
      console.warn('THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');
      return this.multiplyMatrices(m, n);
    }

    return this.multiplyMatrices(this, m);
  },
  premultiply: function premultiply(m) {
    return this.multiplyMatrices(m, this);
  },
  multiplyMatrices: function multiplyMatrices(a, b) {
    var ae = a.elements;
    var be = b.elements;
    var te = this.elements;
    var a11 = ae[0],
        a12 = ae[4],
        a13 = ae[8],
        a14 = ae[12];
    var a21 = ae[1],
        a22 = ae[5],
        a23 = ae[9],
        a24 = ae[13];
    var a31 = ae[2],
        a32 = ae[6],
        a33 = ae[10],
        a34 = ae[14];
    var a41 = ae[3],
        a42 = ae[7],
        a43 = ae[11],
        a44 = ae[15];
    var b11 = be[0],
        b12 = be[4],
        b13 = be[8],
        b14 = be[12];
    var b21 = be[1],
        b22 = be[5],
        b23 = be[9],
        b24 = be[13];
    var b31 = be[2],
        b32 = be[6],
        b33 = be[10],
        b34 = be[14];
    var b41 = be[3],
        b42 = be[7],
        b43 = be[11],
        b44 = be[15];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    return this;
  },
  multiplyScalar: function multiplyScalar(s) {
    var te = this.elements;
    te[0] *= s;
    te[4] *= s;
    te[8] *= s;
    te[12] *= s;
    te[1] *= s;
    te[5] *= s;
    te[9] *= s;
    te[13] *= s;
    te[2] *= s;
    te[6] *= s;
    te[10] *= s;
    te[14] *= s;
    te[3] *= s;
    te[7] *= s;
    te[11] *= s;
    te[15] *= s;
    return this;
  },
  applyToBufferAttribute: function () {
    var v1 = new _Vector.Vector3();
    return function applyToBufferAttribute(attribute) {
      for (var i = 0, l = attribute.count; i < l; i++) {
        v1.x = attribute.getX(i);
        v1.y = attribute.getY(i);
        v1.z = attribute.getZ(i);
        v1.applyMatrix4(this);
        attribute.setXYZ(i, v1.x, v1.y, v1.z);
      }

      return attribute;
    };
  }(),
  determinant: function determinant() {
    var te = this.elements;
    var n11 = te[0],
        n12 = te[4],
        n13 = te[8],
        n14 = te[12];
    var n21 = te[1],
        n22 = te[5],
        n23 = te[9],
        n24 = te[13];
    var n31 = te[2],
        n32 = te[6],
        n33 = te[10],
        n34 = te[14];
    var n41 = te[3],
        n42 = te[7],
        n43 = te[11],
        n44 = te[15]; //TODO: make this more efficient
    //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

    return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
  },
  transpose: function transpose() {
    var te = this.elements;
    var tmp;
    tmp = te[1];
    te[1] = te[4];
    te[4] = tmp;
    tmp = te[2];
    te[2] = te[8];
    te[8] = tmp;
    tmp = te[6];
    te[6] = te[9];
    te[9] = tmp;
    tmp = te[3];
    te[3] = te[12];
    te[12] = tmp;
    tmp = te[7];
    te[7] = te[13];
    te[13] = tmp;
    tmp = te[11];
    te[11] = te[14];
    te[14] = tmp;
    return this;
  },
  setPosition: function setPosition(x, y, z) {
    var te = this.elements;

    if (x.isVector3) {
      te[12] = x.x;
      te[13] = x.y;
      te[14] = x.z;
    } else {
      te[12] = x;
      te[13] = y;
      te[14] = z;
    }

    return this;
  },
  getInverse: function getInverse(m, throwOnDegenerate) {
    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    var te = this.elements,
        me = m.elements,
        n11 = me[0],
        n21 = me[1],
        n31 = me[2],
        n41 = me[3],
        n12 = me[4],
        n22 = me[5],
        n32 = me[6],
        n42 = me[7],
        n13 = me[8],
        n23 = me[9],
        n33 = me[10],
        n43 = me[11],
        n14 = me[12],
        n24 = me[13],
        n34 = me[14],
        n44 = me[15],
        t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
        t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
        t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
        t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if (det === 0) {
      var msg = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";

      if (throwOnDegenerate === true) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }

      return this.identity();
    }

    var detInv = 1 / det;
    te[0] = t11 * detInv;
    te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
    te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
    te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
    te[4] = t12 * detInv;
    te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
    te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
    te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
    te[8] = t13 * detInv;
    te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
    te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
    te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
    te[12] = t14 * detInv;
    te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
    te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
    te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
    return this;
  },
  scale: function scale(v) {
    var te = this.elements;
    var x = v.x,
        y = v.y,
        z = v.z;
    te[0] *= x;
    te[4] *= y;
    te[8] *= z;
    te[1] *= x;
    te[5] *= y;
    te[9] *= z;
    te[2] *= x;
    te[6] *= y;
    te[10] *= z;
    te[3] *= x;
    te[7] *= y;
    te[11] *= z;
    return this;
  },
  getMaxScaleOnAxis: function getMaxScaleOnAxis() {
    var te = this.elements;
    var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
    var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
    var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
    return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
  },
  makeTranslation: function makeTranslation(x, y, z) {
    this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
    return this;
  },
  makeRotationX: function makeRotationX(theta) {
    var c = Math.cos(theta),
        s = Math.sin(theta);
    this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationY: function makeRotationY(theta) {
    var c = Math.cos(theta),
        s = Math.sin(theta);
    this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationZ: function makeRotationZ(theta) {
    var c = Math.cos(theta),
        s = Math.sin(theta);
    this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationAxis: function makeRotationAxis(axis, angle) {
    // Based on http://www.gamedev.net/reference/articles/article1199.asp
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var t = 1 - c;
    var x = axis.x,
        y = axis.y,
        z = axis.z;
    var tx = t * x,
        ty = t * y;
    this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
    return this;
  },
  makeScale: function makeScale(x, y, z) {
    this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    return this;
  },
  makeShear: function makeShear(x, y, z) {
    this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1);
    return this;
  },
  compose: function compose(position, quaternion, scale) {
    var te = this.elements;
    var x = quaternion._x,
        y = quaternion._y,
        z = quaternion._z,
        w = quaternion._w;
    var x2 = x + x,
        y2 = y + y,
        z2 = z + z;
    var xx = x * x2,
        xy = x * y2,
        xz = x * z2;
    var yy = y * y2,
        yz = y * z2,
        zz = z * z2;
    var wx = w * x2,
        wy = w * y2,
        wz = w * z2;
    var sx = scale.x,
        sy = scale.y,
        sz = scale.z;
    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;
    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;
    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
    return this;
  },
  decompose: function () {
    var vector = new _Vector.Vector3();
    var matrix = new Matrix4();
    return function decompose(position, quaternion, scale) {
      var te = this.elements;
      var sx = vector.set(te[0], te[1], te[2]).length();
      var sy = vector.set(te[4], te[5], te[6]).length();
      var sz = vector.set(te[8], te[9], te[10]).length(); // if determine is negative, we need to invert one scale

      var det = this.determinant();
      if (det < 0) sx = -sx;
      position.x = te[12];
      position.y = te[13];
      position.z = te[14]; // scale the rotation part

      matrix.copy(this);
      var invSX = 1 / sx;
      var invSY = 1 / sy;
      var invSZ = 1 / sz;
      matrix.elements[0] *= invSX;
      matrix.elements[1] *= invSX;
      matrix.elements[2] *= invSX;
      matrix.elements[4] *= invSY;
      matrix.elements[5] *= invSY;
      matrix.elements[6] *= invSY;
      matrix.elements[8] *= invSZ;
      matrix.elements[9] *= invSZ;
      matrix.elements[10] *= invSZ;
      quaternion.setFromRotationMatrix(matrix);
      scale.x = sx;
      scale.y = sy;
      scale.z = sz;
      return this;
    };
  }(),
  makePerspective: function makePerspective(left, right, top, bottom, near, far) {
    if (far === undefined) {
      console.warn('THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.');
    }

    var te = this.elements;
    var x = 2 * near / (right - left);
    var y = 2 * near / (top - bottom);
    var a = (right + left) / (right - left);
    var b = (top + bottom) / (top - bottom);
    var c = -(far + near) / (far - near);
    var d = -2 * far * near / (far - near);
    te[0] = x;
    te[4] = 0;
    te[8] = a;
    te[12] = 0;
    te[1] = 0;
    te[5] = y;
    te[9] = b;
    te[13] = 0;
    te[2] = 0;
    te[6] = 0;
    te[10] = c;
    te[14] = d;
    te[3] = 0;
    te[7] = 0;
    te[11] = -1;
    te[15] = 0;
    return this;
  },
  makeOrthographic: function makeOrthographic(left, right, top, bottom, near, far) {
    var te = this.elements;
    var w = 1.0 / (right - left);
    var h = 1.0 / (top - bottom);
    var p = 1.0 / (far - near);
    var x = (right + left) * w;
    var y = (top + bottom) * h;
    var z = (far + near) * p;
    te[0] = 2 * w;
    te[4] = 0;
    te[8] = 0;
    te[12] = -x;
    te[1] = 0;
    te[5] = 2 * h;
    te[9] = 0;
    te[13] = -y;
    te[2] = 0;
    te[6] = 0;
    te[10] = -2 * p;
    te[14] = -z;
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[15] = 1;
    return this;
  },
  equals: function equals(matrix) {
    var te = this.elements;
    var me = matrix.elements;

    for (var i = 0; i < 16; i++) {
      if (te[i] !== me[i]) return false;
    }

    return true;
  },
  fromArray: function fromArray(array, offset) {
    if (offset === undefined) offset = 0;

    for (var i = 0; i < 16; i++) {
      this.elements[i] = array[i + offset];
    }

    return this;
  },
  toArray: function toArray(array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    var te = this.elements;
    array[offset] = te[0];
    array[offset + 1] = te[1];
    array[offset + 2] = te[2];
    array[offset + 3] = te[3];
    array[offset + 4] = te[4];
    array[offset + 5] = te[5];
    array[offset + 6] = te[6];
    array[offset + 7] = te[7];
    array[offset + 8] = te[8];
    array[offset + 9] = te[9];
    array[offset + 10] = te[10];
    array[offset + 11] = te[11];
    array[offset + 12] = te[12];
    array[offset + 13] = te[13];
    array[offset + 14] = te[14];
    array[offset + 15] = te[15];
    return array;
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3RocmVlL01hdHJpeDQuanMiXSwibmFtZXMiOlsiTWF0cml4NCIsImVsZW1lbnRzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiY29uc29sZSIsImVycm9yIiwiT2JqZWN0IiwiYXNzaWduIiwicHJvdG90eXBlIiwiaXNNYXRyaXg0Iiwic2V0IiwibjExIiwibjEyIiwibjEzIiwibjE0IiwibjIxIiwibjIyIiwibjIzIiwibjI0IiwibjMxIiwibjMyIiwibjMzIiwibjM0IiwibjQxIiwibjQyIiwibjQzIiwibjQ0IiwidGUiLCJpZGVudGl0eSIsImNsb25lIiwiZnJvbUFycmF5IiwiY29weSIsIm0iLCJtZSIsImNvcHlQb3NpdGlvbiIsImV4dHJhY3RCYXNpcyIsInhBeGlzIiwieUF4aXMiLCJ6QXhpcyIsInNldEZyb21NYXRyaXhDb2x1bW4iLCJtYWtlQmFzaXMiLCJ4IiwieSIsInoiLCJleHRyYWN0Um90YXRpb24iLCJ2MSIsIlZlY3RvcjMiLCJzY2FsZVgiLCJzY2FsZVkiLCJzY2FsZVoiLCJtYWtlUm90YXRpb25Gcm9tRXVsZXIiLCJldWxlciIsImlzRXVsZXIiLCJhIiwiTWF0aCIsImNvcyIsImIiLCJzaW4iLCJjIiwiZCIsImUiLCJmIiwib3JkZXIiLCJhZSIsImFmIiwiYmUiLCJiZiIsImNlIiwiY2YiLCJkZSIsImRmIiwiYWMiLCJhZCIsImJjIiwiYmQiLCJtYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbiIsInplcm8iLCJvbmUiLCJxIiwiY29tcG9zZSIsImxvb2tBdCIsImV5ZSIsInRhcmdldCIsInVwIiwic3ViVmVjdG9ycyIsImxlbmd0aFNxIiwibm9ybWFsaXplIiwiY3Jvc3NWZWN0b3JzIiwiYWJzIiwibXVsdGlwbHkiLCJuIiwidW5kZWZpbmVkIiwid2FybiIsIm11bHRpcGx5TWF0cmljZXMiLCJwcmVtdWx0aXBseSIsImExMSIsImExMiIsImExMyIsImExNCIsImEyMSIsImEyMiIsImEyMyIsImEyNCIsImEzMSIsImEzMiIsImEzMyIsImEzNCIsImE0MSIsImE0MiIsImE0MyIsImE0NCIsImIxMSIsImIxMiIsImIxMyIsImIxNCIsImIyMSIsImIyMiIsImIyMyIsImIyNCIsImIzMSIsImIzMiIsImIzMyIsImIzNCIsImI0MSIsImI0MiIsImI0MyIsImI0NCIsIm11bHRpcGx5U2NhbGFyIiwicyIsImFwcGx5VG9CdWZmZXJBdHRyaWJ1dGUiLCJhdHRyaWJ1dGUiLCJpIiwibCIsImNvdW50IiwiZ2V0WCIsImdldFkiLCJnZXRaIiwiYXBwbHlNYXRyaXg0Iiwic2V0WFlaIiwiZGV0ZXJtaW5hbnQiLCJ0cmFuc3Bvc2UiLCJ0bXAiLCJzZXRQb3NpdGlvbiIsImlzVmVjdG9yMyIsImdldEludmVyc2UiLCJ0aHJvd09uRGVnZW5lcmF0ZSIsInQxMSIsInQxMiIsInQxMyIsInQxNCIsImRldCIsIm1zZyIsIkVycm9yIiwiZGV0SW52Iiwic2NhbGUiLCJ2IiwiZ2V0TWF4U2NhbGVPbkF4aXMiLCJzY2FsZVhTcSIsInNjYWxlWVNxIiwic2NhbGVaU3EiLCJzcXJ0IiwibWF4IiwibWFrZVRyYW5zbGF0aW9uIiwibWFrZVJvdGF0aW9uWCIsInRoZXRhIiwibWFrZVJvdGF0aW9uWSIsIm1ha2VSb3RhdGlvbloiLCJtYWtlUm90YXRpb25BeGlzIiwiYXhpcyIsImFuZ2xlIiwidCIsInR4IiwidHkiLCJtYWtlU2NhbGUiLCJtYWtlU2hlYXIiLCJwb3NpdGlvbiIsInF1YXRlcm5pb24iLCJfeCIsIl95IiwiX3oiLCJ3IiwiX3ciLCJ4MiIsInkyIiwiejIiLCJ4eCIsInh5IiwieHoiLCJ5eSIsInl6IiwienoiLCJ3eCIsInd5Iiwid3oiLCJzeCIsInN5Iiwic3oiLCJkZWNvbXBvc2UiLCJ2ZWN0b3IiLCJtYXRyaXgiLCJpbnZTWCIsImludlNZIiwiaW52U1oiLCJzZXRGcm9tUm90YXRpb25NYXRyaXgiLCJtYWtlUGVyc3BlY3RpdmUiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJuZWFyIiwiZmFyIiwibWFrZU9ydGhvZ3JhcGhpYyIsImgiLCJwIiwiZXF1YWxzIiwiYXJyYXkiLCJvZmZzZXQiLCJ0b0FycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsU0FBU0EsT0FBVCxHQUFtQjtBQUVsQixPQUFLQyxRQUFMLEdBQWdCLENBRWYsQ0FGZSxFQUVaLENBRlksRUFFVCxDQUZTLEVBRU4sQ0FGTSxFQUdmLENBSGUsRUFHWixDQUhZLEVBR1QsQ0FIUyxFQUdOLENBSE0sRUFJZixDQUplLEVBSVosQ0FKWSxFQUlULENBSlMsRUFJTixDQUpNLEVBS2YsQ0FMZSxFQUtaLENBTFksRUFLVCxDQUxTLEVBS04sQ0FMTSxDQUFoQjs7QUFTQSxNQUFLQyxTQUFTLENBQUNDLE1BQVYsR0FBbUIsQ0FBeEIsRUFBNEI7QUFFM0JDLElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFlLCtFQUFmO0FBRUE7QUFFRDs7QUFFREMsTUFBTSxDQUFDQyxNQUFQLENBQWVQLE9BQU8sQ0FBQ1EsU0FBdkIsRUFBa0M7QUFFakNDLEVBQUFBLFNBQVMsRUFBRSxJQUZzQjtBQUlqQ0MsRUFBQUEsR0FBRyxFQUFFLGFBQVdDLEdBQVgsRUFBZ0JDLEdBQWhCLEVBQXFCQyxHQUFyQixFQUEwQkMsR0FBMUIsRUFBK0JDLEdBQS9CLEVBQW9DQyxHQUFwQyxFQUF5Q0MsR0FBekMsRUFBOENDLEdBQTlDLEVBQW1EQyxHQUFuRCxFQUF3REMsR0FBeEQsRUFBNkRDLEdBQTdELEVBQWtFQyxHQUFsRSxFQUF1RUMsR0FBdkUsRUFBNEVDLEdBQTVFLEVBQWlGQyxHQUFqRixFQUFzRkMsR0FBdEYsRUFBNEY7QUFFaEcsUUFBSUMsRUFBRSxHQUFHLEtBQUsxQixRQUFkO0FBRUEwQixJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVoQixHQUFWO0FBQWVnQixJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVmLEdBQVY7QUFBZWUsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVZCxHQUFWO0FBQWVjLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV2IsR0FBWDtBQUM3Q2EsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVWixHQUFWO0FBQWVZLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVVgsR0FBVjtBQUFlVyxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVWLEdBQVY7QUFBZVUsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXVCxHQUFYO0FBQzdDUyxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVSLEdBQVY7QUFBZVEsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVUCxHQUFWO0FBQWVPLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV04sR0FBWDtBQUFnQk0sSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXTCxHQUFYO0FBQzlDSyxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVKLEdBQVY7QUFBZUksSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVSCxHQUFWO0FBQWVHLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV0YsR0FBWDtBQUFnQkUsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXRCxHQUFYO0FBRTlDLFdBQU8sSUFBUDtBQUVBLEdBZmdDO0FBaUJqQ0UsRUFBQUEsUUFBUSxFQUFFLG9CQUFZO0FBRXJCLFNBQUtsQixHQUFMLENBRUMsQ0FGRCxFQUVJLENBRkosRUFFTyxDQUZQLEVBRVUsQ0FGVixFQUdDLENBSEQsRUFHSSxDQUhKLEVBR08sQ0FIUCxFQUdVLENBSFYsRUFJQyxDQUpELEVBSUksQ0FKSixFQUlPLENBSlAsRUFJVSxDQUpWLEVBS0MsQ0FMRCxFQUtJLENBTEosRUFLTyxDQUxQLEVBS1UsQ0FMVjtBQVNBLFdBQU8sSUFBUDtBQUVBLEdBOUJnQztBQWdDakNtQixFQUFBQSxLQUFLLEVBQUUsaUJBQVk7QUFFbEIsV0FBTyxJQUFJN0IsT0FBSixHQUFjOEIsU0FBZCxDQUF5QixLQUFLN0IsUUFBOUIsQ0FBUDtBQUVBLEdBcENnQztBQXNDakM4QixFQUFBQSxJQUFJLEVBQUUsY0FBV0MsQ0FBWCxFQUFlO0FBRXBCLFFBQUlMLEVBQUUsR0FBRyxLQUFLMUIsUUFBZDtBQUNBLFFBQUlnQyxFQUFFLEdBQUdELENBQUMsQ0FBQy9CLFFBQVg7QUFFQTBCLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVU0sRUFBRSxDQUFFLENBQUYsQ0FBWjtBQUFtQk4sSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVTSxFQUFFLENBQUUsQ0FBRixDQUFaO0FBQW1CTixJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVNLEVBQUUsQ0FBRSxDQUFGLENBQVo7QUFBbUJOLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVU0sRUFBRSxDQUFFLENBQUYsQ0FBWjtBQUN6RE4sSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVTSxFQUFFLENBQUUsQ0FBRixDQUFaO0FBQW1CTixJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVNLEVBQUUsQ0FBRSxDQUFGLENBQVo7QUFBbUJOLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVU0sRUFBRSxDQUFFLENBQUYsQ0FBWjtBQUFtQk4sSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVTSxFQUFFLENBQUUsQ0FBRixDQUFaO0FBQ3pETixJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVNLEVBQUUsQ0FBRSxDQUFGLENBQVo7QUFBbUJOLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVU0sRUFBRSxDQUFFLENBQUYsQ0FBWjtBQUFtQk4sSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXTSxFQUFFLENBQUUsRUFBRixDQUFiO0FBQXFCTixJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdNLEVBQUUsQ0FBRSxFQUFGLENBQWI7QUFDM0ROLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV00sRUFBRSxDQUFFLEVBQUYsQ0FBYjtBQUFxQk4sSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXTSxFQUFFLENBQUUsRUFBRixDQUFiO0FBQXFCTixJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdNLEVBQUUsQ0FBRSxFQUFGLENBQWI7QUFBcUJOLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV00sRUFBRSxDQUFFLEVBQUYsQ0FBYjtBQUUvRCxXQUFPLElBQVA7QUFFQSxHQWxEZ0M7QUFvRGpDQyxFQUFBQSxZQUFZLEVBQUUsc0JBQVdGLENBQVgsRUFBZTtBQUU1QixRQUFJTCxFQUFFLEdBQUcsS0FBSzFCLFFBQWQ7QUFBQSxRQUF3QmdDLEVBQUUsR0FBR0QsQ0FBQyxDQUFDL0IsUUFBL0I7QUFFQTBCLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV00sRUFBRSxDQUFFLEVBQUYsQ0FBYjtBQUNBTixJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdNLEVBQUUsQ0FBRSxFQUFGLENBQWI7QUFDQU4sSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXTSxFQUFFLENBQUUsRUFBRixDQUFiO0FBRUEsV0FBTyxJQUFQO0FBRUEsR0E5RGdDO0FBZ0VqQ0UsRUFBQUEsWUFBWSxFQUFFLHNCQUFXQyxLQUFYLEVBQWtCQyxLQUFsQixFQUF5QkMsS0FBekIsRUFBaUM7QUFFOUNGLElBQUFBLEtBQUssQ0FBQ0csbUJBQU4sQ0FBMkIsSUFBM0IsRUFBaUMsQ0FBakM7QUFDQUYsSUFBQUEsS0FBSyxDQUFDRSxtQkFBTixDQUEyQixJQUEzQixFQUFpQyxDQUFqQztBQUNBRCxJQUFBQSxLQUFLLENBQUNDLG1CQUFOLENBQTJCLElBQTNCLEVBQWlDLENBQWpDO0FBRUEsV0FBTyxJQUFQO0FBRUEsR0F4RWdDO0FBMEVqQ0MsRUFBQUEsU0FBUyxFQUFFLG1CQUFXSixLQUFYLEVBQWtCQyxLQUFsQixFQUF5QkMsS0FBekIsRUFBaUM7QUFFM0MsU0FBSzVCLEdBQUwsQ0FDQzBCLEtBQUssQ0FBQ0ssQ0FEUCxFQUNVSixLQUFLLENBQUNJLENBRGhCLEVBQ21CSCxLQUFLLENBQUNHLENBRHpCLEVBQzRCLENBRDVCLEVBRUNMLEtBQUssQ0FBQ00sQ0FGUCxFQUVVTCxLQUFLLENBQUNLLENBRmhCLEVBRW1CSixLQUFLLENBQUNJLENBRnpCLEVBRTRCLENBRjVCLEVBR0NOLEtBQUssQ0FBQ08sQ0FIUCxFQUdVTixLQUFLLENBQUNNLENBSGhCLEVBR21CTCxLQUFLLENBQUNLLENBSHpCLEVBRzRCLENBSDVCLEVBSUMsQ0FKRCxFQUlJLENBSkosRUFJTyxDQUpQLEVBSVUsQ0FKVjtBQU9BLFdBQU8sSUFBUDtBQUVBLEdBckZnQztBQXVGakNDLEVBQUFBLGVBQWUsRUFBRSxZQUFZO0FBRTVCLFFBQUlDLEVBQUUsR0FBRyxJQUFJQyxlQUFKLEVBQVQ7QUFFQSxXQUFPLFNBQVNGLGVBQVQsQ0FBMEJaLENBQTFCLEVBQThCO0FBRXBDO0FBRUEsVUFBSUwsRUFBRSxHQUFHLEtBQUsxQixRQUFkO0FBQ0EsVUFBSWdDLEVBQUUsR0FBR0QsQ0FBQyxDQUFDL0IsUUFBWDtBQUVBLFVBQUk4QyxNQUFNLEdBQUcsSUFBSUYsRUFBRSxDQUFDTixtQkFBSCxDQUF3QlAsQ0FBeEIsRUFBMkIsQ0FBM0IsRUFBK0I3QixNQUEvQixFQUFqQjtBQUNBLFVBQUk2QyxNQUFNLEdBQUcsSUFBSUgsRUFBRSxDQUFDTixtQkFBSCxDQUF3QlAsQ0FBeEIsRUFBMkIsQ0FBM0IsRUFBK0I3QixNQUEvQixFQUFqQjtBQUNBLFVBQUk4QyxNQUFNLEdBQUcsSUFBSUosRUFBRSxDQUFDTixtQkFBSCxDQUF3QlAsQ0FBeEIsRUFBMkIsQ0FBM0IsRUFBK0I3QixNQUEvQixFQUFqQjtBQUVBd0IsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVTSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVjLE1BQXBCO0FBQ0FwQixNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVNLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVWMsTUFBcEI7QUFDQXBCLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVU0sRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVYyxNQUFwQjtBQUNBcEIsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQVY7QUFFQUEsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVTSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVlLE1BQXBCO0FBQ0FyQixNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVNLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVWUsTUFBcEI7QUFDQXJCLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVU0sRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVZSxNQUFwQjtBQUNBckIsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQVY7QUFFQUEsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVTSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVnQixNQUFwQjtBQUNBdEIsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVTSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVnQixNQUFwQjtBQUNBdEIsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXTSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdnQixNQUF0QjtBQUNBdEIsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXLENBQVg7QUFFQUEsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXLENBQVg7QUFDQUEsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXLENBQVg7QUFDQUEsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXLENBQVg7QUFDQUEsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXLENBQVg7QUFFQSxhQUFPLElBQVA7QUFFQSxLQWpDRDtBQW1DQSxHQXZDZ0IsRUF2RmdCO0FBZ0lqQ3VCLEVBQUFBLHFCQUFxQixFQUFFLCtCQUFXQyxLQUFYLEVBQW1CO0FBRXpDLFFBQUssRUFBSUEsS0FBSyxJQUFJQSxLQUFLLENBQUNDLE9BQW5CLENBQUwsRUFBb0M7QUFFbkNoRCxNQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBZSx1R0FBZjtBQUVBOztBQUVELFFBQUlzQixFQUFFLEdBQUcsS0FBSzFCLFFBQWQ7QUFFQSxRQUFJd0MsQ0FBQyxHQUFHVSxLQUFLLENBQUNWLENBQWQ7QUFBQSxRQUFpQkMsQ0FBQyxHQUFHUyxLQUFLLENBQUNULENBQTNCO0FBQUEsUUFBOEJDLENBQUMsR0FBR1EsS0FBSyxDQUFDUixDQUF4QztBQUNBLFFBQUlVLENBQUMsR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVVkLENBQVYsQ0FBUjtBQUFBLFFBQXVCZSxDQUFDLEdBQUdGLElBQUksQ0FBQ0csR0FBTCxDQUFVaEIsQ0FBVixDQUEzQjtBQUNBLFFBQUlpQixDQUFDLEdBQUdKLElBQUksQ0FBQ0MsR0FBTCxDQUFVYixDQUFWLENBQVI7QUFBQSxRQUF1QmlCLENBQUMsR0FBR0wsSUFBSSxDQUFDRyxHQUFMLENBQVVmLENBQVYsQ0FBM0I7QUFDQSxRQUFJa0IsQ0FBQyxHQUFHTixJQUFJLENBQUNDLEdBQUwsQ0FBVVosQ0FBVixDQUFSO0FBQUEsUUFBdUJrQixDQUFDLEdBQUdQLElBQUksQ0FBQ0csR0FBTCxDQUFVZCxDQUFWLENBQTNCOztBQUVBLFFBQUtRLEtBQUssQ0FBQ1csS0FBTixLQUFnQixLQUFyQixFQUE2QjtBQUU1QixVQUFJQyxFQUFFLEdBQUdWLENBQUMsR0FBR08sQ0FBYjtBQUFBLFVBQWdCSSxFQUFFLEdBQUdYLENBQUMsR0FBR1EsQ0FBekI7QUFBQSxVQUE0QkksRUFBRSxHQUFHVCxDQUFDLEdBQUdJLENBQXJDO0FBQUEsVUFBd0NNLEVBQUUsR0FBR1YsQ0FBQyxHQUFHSyxDQUFqRDtBQUVBbEMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVK0IsQ0FBQyxHQUFHRSxDQUFkO0FBQ0FqQyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRStCLENBQUYsR0FBTUcsQ0FBaEI7QUFDQWxDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVWdDLENBQVY7QUFFQWhDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXFDLEVBQUUsR0FBR0MsRUFBRSxHQUFHTixDQUFwQjtBQUNBaEMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVb0MsRUFBRSxHQUFHRyxFQUFFLEdBQUdQLENBQXBCO0FBQ0FoQyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRTZCLENBQUYsR0FBTUUsQ0FBaEI7QUFFQS9CLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXVDLEVBQUUsR0FBR0gsRUFBRSxHQUFHSixDQUFwQjtBQUNBaEMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVc0MsRUFBRSxHQUFHRCxFQUFFLEdBQUdMLENBQXBCO0FBQ0FoQyxNQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcwQixDQUFDLEdBQUdLLENBQWY7QUFFQSxLQWhCRCxNQWdCTyxJQUFLUCxLQUFLLENBQUNXLEtBQU4sS0FBZ0IsS0FBckIsRUFBNkI7QUFFbkMsVUFBSUssRUFBRSxHQUFHVCxDQUFDLEdBQUdFLENBQWI7QUFBQSxVQUFnQlEsRUFBRSxHQUFHVixDQUFDLEdBQUdHLENBQXpCO0FBQUEsVUFBNEJRLEVBQUUsR0FBR1YsQ0FBQyxHQUFHQyxDQUFyQztBQUFBLFVBQXdDVSxFQUFFLEdBQUdYLENBQUMsR0FBR0UsQ0FBakQ7QUFFQWxDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXdDLEVBQUUsR0FBR0csRUFBRSxHQUFHZCxDQUFwQjtBQUNBN0IsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVMEMsRUFBRSxHQUFHYixDQUFMLEdBQVNZLEVBQW5CO0FBQ0F6QyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUwQixDQUFDLEdBQUdNLENBQWQ7QUFFQWhDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVTBCLENBQUMsR0FBR1EsQ0FBZDtBQUNBbEMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVMEIsQ0FBQyxHQUFHTyxDQUFkO0FBQ0FqQyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRTZCLENBQVo7QUFFQTdCLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXlDLEVBQUUsR0FBR1osQ0FBTCxHQUFTYSxFQUFuQjtBQUNBMUMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVMkMsRUFBRSxHQUFHSCxFQUFFLEdBQUdYLENBQXBCO0FBQ0E3QixNQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcwQixDQUFDLEdBQUdLLENBQWY7QUFFQSxLQWhCTSxNQWdCQSxJQUFLUCxLQUFLLENBQUNXLEtBQU4sS0FBZ0IsS0FBckIsRUFBNkI7QUFFbkMsVUFBSUssRUFBRSxHQUFHVCxDQUFDLEdBQUdFLENBQWI7QUFBQSxVQUFnQlEsRUFBRSxHQUFHVixDQUFDLEdBQUdHLENBQXpCO0FBQUEsVUFBNEJRLEVBQUUsR0FBR1YsQ0FBQyxHQUFHQyxDQUFyQztBQUFBLFVBQXdDVSxFQUFFLEdBQUdYLENBQUMsR0FBR0UsQ0FBakQ7QUFFQWxDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXdDLEVBQUUsR0FBR0csRUFBRSxHQUFHZCxDQUFwQjtBQUNBN0IsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQUUwQixDQUFGLEdBQU1RLENBQWhCO0FBQ0FsQyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUwQyxFQUFFLEdBQUdELEVBQUUsR0FBR1osQ0FBcEI7QUFFQTdCLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXlDLEVBQUUsR0FBR0MsRUFBRSxHQUFHYixDQUFwQjtBQUNBN0IsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVMEIsQ0FBQyxHQUFHTyxDQUFkO0FBQ0FqQyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUyQyxFQUFFLEdBQUdILEVBQUUsR0FBR1gsQ0FBcEI7QUFFQTdCLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFFMEIsQ0FBRixHQUFNTSxDQUFoQjtBQUNBaEMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVNkIsQ0FBVjtBQUNBN0IsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXMEIsQ0FBQyxHQUFHSyxDQUFmO0FBRUEsS0FoQk0sTUFnQkEsSUFBS1AsS0FBSyxDQUFDVyxLQUFOLEtBQWdCLEtBQXJCLEVBQTZCO0FBRW5DLFVBQUlDLEVBQUUsR0FBR1YsQ0FBQyxHQUFHTyxDQUFiO0FBQUEsVUFBZ0JJLEVBQUUsR0FBR1gsQ0FBQyxHQUFHUSxDQUF6QjtBQUFBLFVBQTRCSSxFQUFFLEdBQUdULENBQUMsR0FBR0ksQ0FBckM7QUFBQSxVQUF3Q00sRUFBRSxHQUFHVixDQUFDLEdBQUdLLENBQWpEO0FBRUFsQyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUrQixDQUFDLEdBQUdFLENBQWQ7QUFDQWpDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXNDLEVBQUUsR0FBR04sQ0FBTCxHQUFTSyxFQUFuQjtBQUNBckMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVb0MsRUFBRSxHQUFHSixDQUFMLEdBQVNPLEVBQW5CO0FBRUF2QyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUrQixDQUFDLEdBQUdHLENBQWQ7QUFDQWxDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXVDLEVBQUUsR0FBR1AsQ0FBTCxHQUFTSSxFQUFuQjtBQUNBcEMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVcUMsRUFBRSxHQUFHTCxDQUFMLEdBQVNNLEVBQW5CO0FBRUF0QyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRWdDLENBQVo7QUFDQWhDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVTZCLENBQUMsR0FBR0UsQ0FBZDtBQUNBL0IsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXMEIsQ0FBQyxHQUFHSyxDQUFmO0FBRUEsS0FoQk0sTUFnQkEsSUFBS1AsS0FBSyxDQUFDVyxLQUFOLEtBQWdCLEtBQXJCLEVBQTZCO0FBRW5DLFVBQUlTLEVBQUUsR0FBR2xCLENBQUMsR0FBR0ssQ0FBYjtBQUFBLFVBQWdCYyxFQUFFLEdBQUduQixDQUFDLEdBQUdNLENBQXpCO0FBQUEsVUFBNEJjLEVBQUUsR0FBR2pCLENBQUMsR0FBR0UsQ0FBckM7QUFBQSxVQUF3Q2dCLEVBQUUsR0FBR2xCLENBQUMsR0FBR0csQ0FBakQ7QUFFQWhDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVStCLENBQUMsR0FBR0UsQ0FBZDtBQUNBakMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVK0MsRUFBRSxHQUFHSCxFQUFFLEdBQUdWLENBQXBCO0FBQ0FsQyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVU4QyxFQUFFLEdBQUdaLENBQUwsR0FBU1csRUFBbkI7QUFFQTdDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVWtDLENBQVY7QUFDQWxDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVTBCLENBQUMsR0FBR08sQ0FBZDtBQUNBakMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQUU2QixDQUFGLEdBQU1JLENBQWhCO0FBRUFqQyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRWdDLENBQUYsR0FBTUMsQ0FBaEI7QUFDQWpDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVTZDLEVBQUUsR0FBR1gsQ0FBTCxHQUFTWSxFQUFuQjtBQUNBOUMsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXNEMsRUFBRSxHQUFHRyxFQUFFLEdBQUdiLENBQXJCO0FBRUEsS0FoQk0sTUFnQkEsSUFBS1YsS0FBSyxDQUFDVyxLQUFOLEtBQWdCLEtBQXJCLEVBQTZCO0FBRW5DLFVBQUlTLEVBQUUsR0FBR2xCLENBQUMsR0FBR0ssQ0FBYjtBQUFBLFVBQWdCYyxFQUFFLEdBQUduQixDQUFDLEdBQUdNLENBQXpCO0FBQUEsVUFBNEJjLEVBQUUsR0FBR2pCLENBQUMsR0FBR0UsQ0FBckM7QUFBQSxVQUF3Q2dCLEVBQUUsR0FBR2xCLENBQUMsR0FBR0csQ0FBakQ7QUFFQWhDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVStCLENBQUMsR0FBR0UsQ0FBZDtBQUNBakMsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQUVrQyxDQUFaO0FBQ0FsQyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVnQyxDQUFDLEdBQUdDLENBQWQ7QUFFQWpDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVTRDLEVBQUUsR0FBR1YsQ0FBTCxHQUFTYSxFQUFuQjtBQUNBL0MsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVMEIsQ0FBQyxHQUFHTyxDQUFkO0FBQ0FqQyxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVU2QyxFQUFFLEdBQUdYLENBQUwsR0FBU1ksRUFBbkI7QUFFQTlDLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVThDLEVBQUUsR0FBR1osQ0FBTCxHQUFTVyxFQUFuQjtBQUNBN0MsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVNkIsQ0FBQyxHQUFHSSxDQUFkO0FBQ0FqQyxNQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcrQyxFQUFFLEdBQUdiLENBQUwsR0FBU1UsRUFBcEI7QUFFQSxLQS9Hd0MsQ0FpSHpDOzs7QUFDQTVDLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFWO0FBQ0FBLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFWO0FBQ0FBLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBVyxDQUFYLENBcEh5QyxDQXNIekM7O0FBQ0FBLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBVyxDQUFYO0FBQ0FBLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBVyxDQUFYO0FBQ0FBLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBVyxDQUFYO0FBQ0FBLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBVyxDQUFYO0FBRUEsV0FBTyxJQUFQO0FBRUEsR0E5UGdDO0FBZ1FqQ2dELEVBQUFBLDBCQUEwQixFQUFFLFlBQVk7QUFFdkMsUUFBSUMsSUFBSSxHQUFHLElBQUk5QixlQUFKLENBQWEsQ0FBYixFQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFYO0FBQ0EsUUFBSStCLEdBQUcsR0FBRyxJQUFJL0IsZUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBVjtBQUVBLFdBQU8sU0FBUzZCLDBCQUFULENBQXFDRyxDQUFyQyxFQUF5QztBQUUvQyxhQUFPLEtBQUtDLE9BQUwsQ0FBY0gsSUFBZCxFQUFvQkUsQ0FBcEIsRUFBdUJELEdBQXZCLENBQVA7QUFFQSxLQUpEO0FBTUEsR0FYMkIsRUFoUUs7QUE2UWpDRyxFQUFBQSxNQUFNLEVBQUUsWUFBWTtBQUVuQixRQUFJdkMsQ0FBQyxHQUFHLElBQUlLLGVBQUosRUFBUjtBQUNBLFFBQUlKLENBQUMsR0FBRyxJQUFJSSxlQUFKLEVBQVI7QUFDQSxRQUFJSCxDQUFDLEdBQUcsSUFBSUcsZUFBSixFQUFSO0FBRUEsV0FBTyxTQUFTa0MsTUFBVCxDQUFpQkMsR0FBakIsRUFBc0JDLE1BQXRCLEVBQThCQyxFQUE5QixFQUFtQztBQUV6QyxVQUFJeEQsRUFBRSxHQUFHLEtBQUsxQixRQUFkO0FBRUEwQyxNQUFBQSxDQUFDLENBQUN5QyxVQUFGLENBQWNILEdBQWQsRUFBbUJDLE1BQW5COztBQUVBLFVBQUt2QyxDQUFDLENBQUMwQyxRQUFGLE9BQWlCLENBQXRCLEVBQTBCO0FBRXpCO0FBRUExQyxRQUFBQSxDQUFDLENBQUNBLENBQUYsR0FBTSxDQUFOO0FBRUE7O0FBRURBLE1BQUFBLENBQUMsQ0FBQzJDLFNBQUY7QUFDQTdDLE1BQUFBLENBQUMsQ0FBQzhDLFlBQUYsQ0FBZ0JKLEVBQWhCLEVBQW9CeEMsQ0FBcEI7O0FBRUEsVUFBS0YsQ0FBQyxDQUFDNEMsUUFBRixPQUFpQixDQUF0QixFQUEwQjtBQUV6QjtBQUVBLFlBQUsvQixJQUFJLENBQUNrQyxHQUFMLENBQVVMLEVBQUUsQ0FBQ3hDLENBQWIsTUFBcUIsQ0FBMUIsRUFBOEI7QUFFN0JBLFVBQUFBLENBQUMsQ0FBQ0YsQ0FBRixJQUFPLE1BQVA7QUFFQSxTQUpELE1BSU87QUFFTkUsVUFBQUEsQ0FBQyxDQUFDQSxDQUFGLElBQU8sTUFBUDtBQUVBOztBQUVEQSxRQUFBQSxDQUFDLENBQUMyQyxTQUFGO0FBQ0E3QyxRQUFBQSxDQUFDLENBQUM4QyxZQUFGLENBQWdCSixFQUFoQixFQUFvQnhDLENBQXBCO0FBRUE7O0FBRURGLE1BQUFBLENBQUMsQ0FBQzZDLFNBQUY7QUFDQTVDLE1BQUFBLENBQUMsQ0FBQzZDLFlBQUYsQ0FBZ0I1QyxDQUFoQixFQUFtQkYsQ0FBbkI7QUFFQWQsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVYyxDQUFDLENBQUNBLENBQVo7QUFBZWQsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVZSxDQUFDLENBQUNELENBQVo7QUFBZWQsTUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVZ0IsQ0FBQyxDQUFDRixDQUFaO0FBQzlCZCxNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVjLENBQUMsQ0FBQ0MsQ0FBWjtBQUFlZixNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVlLENBQUMsQ0FBQ0EsQ0FBWjtBQUFlZixNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVnQixDQUFDLENBQUNELENBQVo7QUFDOUJmLE1BQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVWMsQ0FBQyxDQUFDRSxDQUFaO0FBQWVoQixNQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVlLENBQUMsQ0FBQ0MsQ0FBWjtBQUFlaEIsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXZ0IsQ0FBQyxDQUFDQSxDQUFiO0FBRTlCLGFBQU8sSUFBUDtBQUVBLEtBN0NEO0FBK0NBLEdBckRPLEVBN1F5QjtBQW9VakM4QyxFQUFBQSxRQUFRLEVBQUUsa0JBQVd6RCxDQUFYLEVBQWMwRCxDQUFkLEVBQWtCO0FBRTNCLFFBQUtBLENBQUMsS0FBS0MsU0FBWCxFQUF1QjtBQUV0QnZGLE1BQUFBLE9BQU8sQ0FBQ3dGLElBQVIsQ0FBYyxrR0FBZDtBQUNBLGFBQU8sS0FBS0MsZ0JBQUwsQ0FBdUI3RCxDQUF2QixFQUEwQjBELENBQTFCLENBQVA7QUFFQTs7QUFFRCxXQUFPLEtBQUtHLGdCQUFMLENBQXVCLElBQXZCLEVBQTZCN0QsQ0FBN0IsQ0FBUDtBQUVBLEdBL1VnQztBQWlWakM4RCxFQUFBQSxXQUFXLEVBQUUscUJBQVc5RCxDQUFYLEVBQWU7QUFFM0IsV0FBTyxLQUFLNkQsZ0JBQUwsQ0FBdUI3RCxDQUF2QixFQUEwQixJQUExQixDQUFQO0FBRUEsR0FyVmdDO0FBdVZqQzZELEVBQUFBLGdCQUFnQixFQUFFLDBCQUFXeEMsQ0FBWCxFQUFjRyxDQUFkLEVBQWtCO0FBRW5DLFFBQUlPLEVBQUUsR0FBR1YsQ0FBQyxDQUFDcEQsUUFBWDtBQUNBLFFBQUlnRSxFQUFFLEdBQUdULENBQUMsQ0FBQ3ZELFFBQVg7QUFDQSxRQUFJMEIsRUFBRSxHQUFHLEtBQUsxQixRQUFkO0FBRUEsUUFBSThGLEdBQUcsR0FBR2hDLEVBQUUsQ0FBRSxDQUFGLENBQVo7QUFBQSxRQUFtQmlDLEdBQUcsR0FBR2pDLEVBQUUsQ0FBRSxDQUFGLENBQTNCO0FBQUEsUUFBa0NrQyxHQUFHLEdBQUdsQyxFQUFFLENBQUUsQ0FBRixDQUExQztBQUFBLFFBQWlEbUMsR0FBRyxHQUFHbkMsRUFBRSxDQUFFLEVBQUYsQ0FBekQ7QUFDQSxRQUFJb0MsR0FBRyxHQUFHcEMsRUFBRSxDQUFFLENBQUYsQ0FBWjtBQUFBLFFBQW1CcUMsR0FBRyxHQUFHckMsRUFBRSxDQUFFLENBQUYsQ0FBM0I7QUFBQSxRQUFrQ3NDLEdBQUcsR0FBR3RDLEVBQUUsQ0FBRSxDQUFGLENBQTFDO0FBQUEsUUFBaUR1QyxHQUFHLEdBQUd2QyxFQUFFLENBQUUsRUFBRixDQUF6RDtBQUNBLFFBQUl3QyxHQUFHLEdBQUd4QyxFQUFFLENBQUUsQ0FBRixDQUFaO0FBQUEsUUFBbUJ5QyxHQUFHLEdBQUd6QyxFQUFFLENBQUUsQ0FBRixDQUEzQjtBQUFBLFFBQWtDMEMsR0FBRyxHQUFHMUMsRUFBRSxDQUFFLEVBQUYsQ0FBMUM7QUFBQSxRQUFrRDJDLEdBQUcsR0FBRzNDLEVBQUUsQ0FBRSxFQUFGLENBQTFEO0FBQ0EsUUFBSTRDLEdBQUcsR0FBRzVDLEVBQUUsQ0FBRSxDQUFGLENBQVo7QUFBQSxRQUFtQjZDLEdBQUcsR0FBRzdDLEVBQUUsQ0FBRSxDQUFGLENBQTNCO0FBQUEsUUFBa0M4QyxHQUFHLEdBQUc5QyxFQUFFLENBQUUsRUFBRixDQUExQztBQUFBLFFBQWtEK0MsR0FBRyxHQUFHL0MsRUFBRSxDQUFFLEVBQUYsQ0FBMUQ7QUFFQSxRQUFJZ0QsR0FBRyxHQUFHOUMsRUFBRSxDQUFFLENBQUYsQ0FBWjtBQUFBLFFBQW1CK0MsR0FBRyxHQUFHL0MsRUFBRSxDQUFFLENBQUYsQ0FBM0I7QUFBQSxRQUFrQ2dELEdBQUcsR0FBR2hELEVBQUUsQ0FBRSxDQUFGLENBQTFDO0FBQUEsUUFBaURpRCxHQUFHLEdBQUdqRCxFQUFFLENBQUUsRUFBRixDQUF6RDtBQUNBLFFBQUlrRCxHQUFHLEdBQUdsRCxFQUFFLENBQUUsQ0FBRixDQUFaO0FBQUEsUUFBbUJtRCxHQUFHLEdBQUduRCxFQUFFLENBQUUsQ0FBRixDQUEzQjtBQUFBLFFBQWtDb0QsR0FBRyxHQUFHcEQsRUFBRSxDQUFFLENBQUYsQ0FBMUM7QUFBQSxRQUFpRHFELEdBQUcsR0FBR3JELEVBQUUsQ0FBRSxFQUFGLENBQXpEO0FBQ0EsUUFBSXNELEdBQUcsR0FBR3RELEVBQUUsQ0FBRSxDQUFGLENBQVo7QUFBQSxRQUFtQnVELEdBQUcsR0FBR3ZELEVBQUUsQ0FBRSxDQUFGLENBQTNCO0FBQUEsUUFBa0N3RCxHQUFHLEdBQUd4RCxFQUFFLENBQUUsRUFBRixDQUExQztBQUFBLFFBQWtEeUQsR0FBRyxHQUFHekQsRUFBRSxDQUFFLEVBQUYsQ0FBMUQ7QUFDQSxRQUFJMEQsR0FBRyxHQUFHMUQsRUFBRSxDQUFFLENBQUYsQ0FBWjtBQUFBLFFBQW1CMkQsR0FBRyxHQUFHM0QsRUFBRSxDQUFFLENBQUYsQ0FBM0I7QUFBQSxRQUFrQzRELEdBQUcsR0FBRzVELEVBQUUsQ0FBRSxFQUFGLENBQTFDO0FBQUEsUUFBa0Q2RCxHQUFHLEdBQUc3RCxFQUFFLENBQUUsRUFBRixDQUExRDtBQUVBdEMsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVb0UsR0FBRyxHQUFHZ0IsR0FBTixHQUFZZixHQUFHLEdBQUdtQixHQUFsQixHQUF3QmxCLEdBQUcsR0FBR3NCLEdBQTlCLEdBQW9DckIsR0FBRyxHQUFHeUIsR0FBcEQ7QUFDQWhHLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVW9FLEdBQUcsR0FBR2lCLEdBQU4sR0FBWWhCLEdBQUcsR0FBR29CLEdBQWxCLEdBQXdCbkIsR0FBRyxHQUFHdUIsR0FBOUIsR0FBb0N0QixHQUFHLEdBQUcwQixHQUFwRDtBQUNBakcsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVb0UsR0FBRyxHQUFHa0IsR0FBTixHQUFZakIsR0FBRyxHQUFHcUIsR0FBbEIsR0FBd0JwQixHQUFHLEdBQUd3QixHQUE5QixHQUFvQ3ZCLEdBQUcsR0FBRzJCLEdBQXBEO0FBQ0FsRyxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdvRSxHQUFHLEdBQUdtQixHQUFOLEdBQVlsQixHQUFHLEdBQUdzQixHQUFsQixHQUF3QnJCLEdBQUcsR0FBR3lCLEdBQTlCLEdBQW9DeEIsR0FBRyxHQUFHNEIsR0FBckQ7QUFFQW5HLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXdFLEdBQUcsR0FBR1ksR0FBTixHQUFZWCxHQUFHLEdBQUdlLEdBQWxCLEdBQXdCZCxHQUFHLEdBQUdrQixHQUE5QixHQUFvQ2pCLEdBQUcsR0FBR3FCLEdBQXBEO0FBQ0FoRyxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVV3RSxHQUFHLEdBQUdhLEdBQU4sR0FBWVosR0FBRyxHQUFHZ0IsR0FBbEIsR0FBd0JmLEdBQUcsR0FBR21CLEdBQTlCLEdBQW9DbEIsR0FBRyxHQUFHc0IsR0FBcEQ7QUFDQWpHLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXdFLEdBQUcsR0FBR2MsR0FBTixHQUFZYixHQUFHLEdBQUdpQixHQUFsQixHQUF3QmhCLEdBQUcsR0FBR29CLEdBQTlCLEdBQW9DbkIsR0FBRyxHQUFHdUIsR0FBcEQ7QUFDQWxHLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV3dFLEdBQUcsR0FBR2UsR0FBTixHQUFZZCxHQUFHLEdBQUdrQixHQUFsQixHQUF3QmpCLEdBQUcsR0FBR3FCLEdBQTlCLEdBQW9DcEIsR0FBRyxHQUFHd0IsR0FBckQ7QUFFQW5HLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVTRFLEdBQUcsR0FBR1EsR0FBTixHQUFZUCxHQUFHLEdBQUdXLEdBQWxCLEdBQXdCVixHQUFHLEdBQUdjLEdBQTlCLEdBQW9DYixHQUFHLEdBQUdpQixHQUFwRDtBQUNBaEcsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVNEUsR0FBRyxHQUFHUyxHQUFOLEdBQVlSLEdBQUcsR0FBR1ksR0FBbEIsR0FBd0JYLEdBQUcsR0FBR2UsR0FBOUIsR0FBb0NkLEdBQUcsR0FBR2tCLEdBQXBEO0FBQ0FqRyxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVc0RSxHQUFHLEdBQUdVLEdBQU4sR0FBWVQsR0FBRyxHQUFHYSxHQUFsQixHQUF3QlosR0FBRyxHQUFHZ0IsR0FBOUIsR0FBb0NmLEdBQUcsR0FBR21CLEdBQXJEO0FBQ0FsRyxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVc0RSxHQUFHLEdBQUdXLEdBQU4sR0FBWVYsR0FBRyxHQUFHYyxHQUFsQixHQUF3QmIsR0FBRyxHQUFHaUIsR0FBOUIsR0FBb0NoQixHQUFHLEdBQUdvQixHQUFyRDtBQUVBbkcsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVZ0YsR0FBRyxHQUFHSSxHQUFOLEdBQVlILEdBQUcsR0FBR08sR0FBbEIsR0FBd0JOLEdBQUcsR0FBR1UsR0FBOUIsR0FBb0NULEdBQUcsR0FBR2EsR0FBcEQ7QUFDQWhHLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVWdGLEdBQUcsR0FBR0ssR0FBTixHQUFZSixHQUFHLEdBQUdRLEdBQWxCLEdBQXdCUCxHQUFHLEdBQUdXLEdBQTlCLEdBQW9DVixHQUFHLEdBQUdjLEdBQXBEO0FBQ0FqRyxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdnRixHQUFHLEdBQUdNLEdBQU4sR0FBWUwsR0FBRyxHQUFHUyxHQUFsQixHQUF3QlIsR0FBRyxHQUFHWSxHQUE5QixHQUFvQ1gsR0FBRyxHQUFHZSxHQUFyRDtBQUNBbEcsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXZ0YsR0FBRyxHQUFHTyxHQUFOLEdBQVlOLEdBQUcsR0FBR1UsR0FBbEIsR0FBd0JULEdBQUcsR0FBR2EsR0FBOUIsR0FBb0NaLEdBQUcsR0FBR2dCLEdBQXJEO0FBRUEsV0FBTyxJQUFQO0FBRUEsR0E3WGdDO0FBK1hqQ0MsRUFBQUEsY0FBYyxFQUFFLHdCQUFXQyxDQUFYLEVBQWU7QUFFOUIsUUFBSXJHLEVBQUUsR0FBRyxLQUFLMUIsUUFBZDtBQUVBMEIsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixJQUFXcUcsQ0FBWDtBQUFjckcsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixJQUFXcUcsQ0FBWDtBQUFjckcsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixJQUFXcUcsQ0FBWDtBQUFjckcsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixJQUFZcUcsQ0FBWjtBQUMxQ3JHLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsSUFBV3FHLENBQVg7QUFBY3JHLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsSUFBV3FHLENBQVg7QUFBY3JHLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsSUFBV3FHLENBQVg7QUFBY3JHLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsSUFBWXFHLENBQVo7QUFDMUNyRyxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLElBQVdxRyxDQUFYO0FBQWNyRyxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLElBQVdxRyxDQUFYO0FBQWNyRyxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLElBQVlxRyxDQUFaO0FBQWVyRyxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLElBQVlxRyxDQUFaO0FBQzNDckcsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixJQUFXcUcsQ0FBWDtBQUFjckcsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixJQUFXcUcsQ0FBWDtBQUFjckcsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixJQUFZcUcsQ0FBWjtBQUFlckcsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixJQUFZcUcsQ0FBWjtBQUUzQyxXQUFPLElBQVA7QUFFQSxHQTFZZ0M7QUE0WWpDQyxFQUFBQSxzQkFBc0IsRUFBRSxZQUFZO0FBRW5DLFFBQUlwRixFQUFFLEdBQUcsSUFBSUMsZUFBSixFQUFUO0FBRUEsV0FBTyxTQUFTbUYsc0JBQVQsQ0FBaUNDLFNBQWpDLEVBQTZDO0FBRW5ELFdBQU0sSUFBSUMsQ0FBQyxHQUFHLENBQVIsRUFBV0MsQ0FBQyxHQUFHRixTQUFTLENBQUNHLEtBQS9CLEVBQXNDRixDQUFDLEdBQUdDLENBQTFDLEVBQTZDRCxDQUFDLEVBQTlDLEVBQW9EO0FBRW5EdEYsUUFBQUEsRUFBRSxDQUFDSixDQUFILEdBQU95RixTQUFTLENBQUNJLElBQVYsQ0FBZ0JILENBQWhCLENBQVA7QUFDQXRGLFFBQUFBLEVBQUUsQ0FBQ0gsQ0FBSCxHQUFPd0YsU0FBUyxDQUFDSyxJQUFWLENBQWdCSixDQUFoQixDQUFQO0FBQ0F0RixRQUFBQSxFQUFFLENBQUNGLENBQUgsR0FBT3VGLFNBQVMsQ0FBQ00sSUFBVixDQUFnQkwsQ0FBaEIsQ0FBUDtBQUVBdEYsUUFBQUEsRUFBRSxDQUFDNEYsWUFBSCxDQUFpQixJQUFqQjtBQUVBUCxRQUFBQSxTQUFTLENBQUNRLE1BQVYsQ0FBa0JQLENBQWxCLEVBQXFCdEYsRUFBRSxDQUFDSixDQUF4QixFQUEyQkksRUFBRSxDQUFDSCxDQUE5QixFQUFpQ0csRUFBRSxDQUFDRixDQUFwQztBQUVBOztBQUVELGFBQU91RixTQUFQO0FBRUEsS0FoQkQ7QUFrQkEsR0F0QnVCLEVBNVlTO0FBb2FqQ1MsRUFBQUEsV0FBVyxFQUFFLHVCQUFZO0FBRXhCLFFBQUloSCxFQUFFLEdBQUcsS0FBSzFCLFFBQWQ7QUFFQSxRQUFJVSxHQUFHLEdBQUdnQixFQUFFLENBQUUsQ0FBRixDQUFaO0FBQUEsUUFBbUJmLEdBQUcsR0FBR2UsRUFBRSxDQUFFLENBQUYsQ0FBM0I7QUFBQSxRQUFrQ2QsR0FBRyxHQUFHYyxFQUFFLENBQUUsQ0FBRixDQUExQztBQUFBLFFBQWlEYixHQUFHLEdBQUdhLEVBQUUsQ0FBRSxFQUFGLENBQXpEO0FBQ0EsUUFBSVosR0FBRyxHQUFHWSxFQUFFLENBQUUsQ0FBRixDQUFaO0FBQUEsUUFBbUJYLEdBQUcsR0FBR1csRUFBRSxDQUFFLENBQUYsQ0FBM0I7QUFBQSxRQUFrQ1YsR0FBRyxHQUFHVSxFQUFFLENBQUUsQ0FBRixDQUExQztBQUFBLFFBQWlEVCxHQUFHLEdBQUdTLEVBQUUsQ0FBRSxFQUFGLENBQXpEO0FBQ0EsUUFBSVIsR0FBRyxHQUFHUSxFQUFFLENBQUUsQ0FBRixDQUFaO0FBQUEsUUFBbUJQLEdBQUcsR0FBR08sRUFBRSxDQUFFLENBQUYsQ0FBM0I7QUFBQSxRQUFrQ04sR0FBRyxHQUFHTSxFQUFFLENBQUUsRUFBRixDQUExQztBQUFBLFFBQWtETCxHQUFHLEdBQUdLLEVBQUUsQ0FBRSxFQUFGLENBQTFEO0FBQ0EsUUFBSUosR0FBRyxHQUFHSSxFQUFFLENBQUUsQ0FBRixDQUFaO0FBQUEsUUFBbUJILEdBQUcsR0FBR0csRUFBRSxDQUFFLENBQUYsQ0FBM0I7QUFBQSxRQUFrQ0YsR0FBRyxHQUFHRSxFQUFFLENBQUUsRUFBRixDQUExQztBQUFBLFFBQWtERCxHQUFHLEdBQUdDLEVBQUUsQ0FBRSxFQUFGLENBQTFELENBUHdCLENBU3hCO0FBQ0E7O0FBRUEsV0FDQ0osR0FBRyxJQUNGLENBQUVULEdBQUYsR0FBUUcsR0FBUixHQUFjRyxHQUFkLEdBQ0dQLEdBQUcsR0FBR0ssR0FBTixHQUFZRSxHQURmLEdBRUdOLEdBQUcsR0FBR0UsR0FBTixHQUFZSyxHQUZmLEdBR0dULEdBQUcsR0FBR00sR0FBTixHQUFZRyxHQUhmLEdBSUdSLEdBQUcsR0FBR0csR0FBTixHQUFZTSxHQUpmLEdBS0dWLEdBQUcsR0FBR0ssR0FBTixHQUFZSyxHQU5iLENBQUgsR0FRQUUsR0FBRyxJQUNGLENBQUViLEdBQUYsR0FBUU0sR0FBUixHQUFjSyxHQUFkLEdBQ0dYLEdBQUcsR0FBR08sR0FBTixHQUFZRyxHQURmLEdBRUdQLEdBQUcsR0FBR0MsR0FBTixHQUFZTSxHQUZmLEdBR0dSLEdBQUcsR0FBR0UsR0FBTixHQUFZTyxHQUhmLEdBSUdULEdBQUcsR0FBR0ssR0FBTixHQUFZQyxHQUpmLEdBS0dMLEdBQUcsR0FBR0csR0FBTixHQUFZRSxHQU5iLENBUkgsR0FnQkFNLEdBQUcsSUFDRixDQUFFZCxHQUFGLEdBQVFPLEdBQVIsR0FBY0UsR0FBZCxHQUNHVCxHQUFHLEdBQUdLLEdBQU4sR0FBWU0sR0FEZixHQUVHUixHQUFHLEdBQUdDLEdBQU4sR0FBWUssR0FGZixHQUdHUixHQUFHLEdBQUdHLEdBQU4sR0FBWU8sR0FIZixHQUlHUixHQUFHLEdBQUdFLEdBQU4sR0FBWUcsR0FKZixHQUtHUCxHQUFHLEdBQUdNLEdBQU4sR0FBWUMsR0FOYixDQWhCSCxHQXdCQU8sR0FBRyxJQUNGLENBQUViLEdBQUYsR0FBUUcsR0FBUixHQUFjRyxHQUFkLEdBQ0dSLEdBQUcsR0FBR00sR0FBTixHQUFZRyxHQURmLEdBRUdULEdBQUcsR0FBR0ssR0FBTixHQUFZSyxHQUZmLEdBR0dSLEdBQUcsR0FBR0UsR0FBTixHQUFZSyxHQUhmLEdBSUdSLEdBQUcsR0FBR0csR0FBTixHQUFZTSxHQUpmLEdBS0dULEdBQUcsR0FBR0ssR0FBTixHQUFZRSxHQU5iLENBekJKO0FBb0NBLEdBcGRnQztBQXNkakN5SCxFQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFFdEIsUUFBSWpILEVBQUUsR0FBRyxLQUFLMUIsUUFBZDtBQUNBLFFBQUk0SSxHQUFKO0FBRUFBLElBQUFBLEdBQUcsR0FBR2xILEVBQUUsQ0FBRSxDQUFGLENBQVI7QUFBZUEsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVQSxFQUFFLENBQUUsQ0FBRixDQUFaO0FBQW1CQSxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVrSCxHQUFWO0FBQ2xDQSxJQUFBQSxHQUFHLEdBQUdsSCxFQUFFLENBQUUsQ0FBRixDQUFSO0FBQWVBLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVUEsRUFBRSxDQUFFLENBQUYsQ0FBWjtBQUFtQkEsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVa0gsR0FBVjtBQUNsQ0EsSUFBQUEsR0FBRyxHQUFHbEgsRUFBRSxDQUFFLENBQUYsQ0FBUjtBQUFlQSxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVBLEVBQUUsQ0FBRSxDQUFGLENBQVo7QUFBbUJBLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVWtILEdBQVY7QUFFbENBLElBQUFBLEdBQUcsR0FBR2xILEVBQUUsQ0FBRSxDQUFGLENBQVI7QUFBZUEsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVQSxFQUFFLENBQUUsRUFBRixDQUFaO0FBQW9CQSxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdrSCxHQUFYO0FBQ25DQSxJQUFBQSxHQUFHLEdBQUdsSCxFQUFFLENBQUUsQ0FBRixDQUFSO0FBQWVBLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVUEsRUFBRSxDQUFFLEVBQUYsQ0FBWjtBQUFvQkEsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXa0gsR0FBWDtBQUNuQ0EsSUFBQUEsR0FBRyxHQUFHbEgsRUFBRSxDQUFFLEVBQUYsQ0FBUjtBQUFnQkEsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXQSxFQUFFLENBQUUsRUFBRixDQUFiO0FBQXFCQSxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdrSCxHQUFYO0FBRXJDLFdBQU8sSUFBUDtBQUVBLEdBcmVnQztBQXVlakNDLEVBQUFBLFdBQVcsRUFBRSxxQkFBV3JHLENBQVgsRUFBY0MsQ0FBZCxFQUFpQkMsQ0FBakIsRUFBcUI7QUFFakMsUUFBSWhCLEVBQUUsR0FBRyxLQUFLMUIsUUFBZDs7QUFFQSxRQUFLd0MsQ0FBQyxDQUFDc0csU0FBUCxFQUFtQjtBQUVsQnBILE1BQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV2MsQ0FBQyxDQUFDQSxDQUFiO0FBQ0FkLE1BQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV2MsQ0FBQyxDQUFDQyxDQUFiO0FBQ0FmLE1BQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV2MsQ0FBQyxDQUFDRSxDQUFiO0FBRUEsS0FORCxNQU1PO0FBRU5oQixNQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdjLENBQVg7QUFDQWQsTUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXZSxDQUFYO0FBQ0FmLE1BQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBV2dCLENBQVg7QUFFQTs7QUFFRCxXQUFPLElBQVA7QUFFQSxHQTNmZ0M7QUE2ZmpDcUcsRUFBQUEsVUFBVSxFQUFFLG9CQUFXaEgsQ0FBWCxFQUFjaUgsaUJBQWQsRUFBa0M7QUFFN0M7QUFDQSxRQUFJdEgsRUFBRSxHQUFHLEtBQUsxQixRQUFkO0FBQUEsUUFDQ2dDLEVBQUUsR0FBR0QsQ0FBQyxDQUFDL0IsUUFEUjtBQUFBLFFBR0NVLEdBQUcsR0FBR3NCLEVBQUUsQ0FBRSxDQUFGLENBSFQ7QUFBQSxRQUdnQmxCLEdBQUcsR0FBR2tCLEVBQUUsQ0FBRSxDQUFGLENBSHhCO0FBQUEsUUFHK0JkLEdBQUcsR0FBR2MsRUFBRSxDQUFFLENBQUYsQ0FIdkM7QUFBQSxRQUc4Q1YsR0FBRyxHQUFHVSxFQUFFLENBQUUsQ0FBRixDQUh0RDtBQUFBLFFBSUNyQixHQUFHLEdBQUdxQixFQUFFLENBQUUsQ0FBRixDQUpUO0FBQUEsUUFJZ0JqQixHQUFHLEdBQUdpQixFQUFFLENBQUUsQ0FBRixDQUp4QjtBQUFBLFFBSStCYixHQUFHLEdBQUdhLEVBQUUsQ0FBRSxDQUFGLENBSnZDO0FBQUEsUUFJOENULEdBQUcsR0FBR1MsRUFBRSxDQUFFLENBQUYsQ0FKdEQ7QUFBQSxRQUtDcEIsR0FBRyxHQUFHb0IsRUFBRSxDQUFFLENBQUYsQ0FMVDtBQUFBLFFBS2dCaEIsR0FBRyxHQUFHZ0IsRUFBRSxDQUFFLENBQUYsQ0FMeEI7QUFBQSxRQUsrQlosR0FBRyxHQUFHWSxFQUFFLENBQUUsRUFBRixDQUx2QztBQUFBLFFBSytDUixHQUFHLEdBQUdRLEVBQUUsQ0FBRSxFQUFGLENBTHZEO0FBQUEsUUFNQ25CLEdBQUcsR0FBR21CLEVBQUUsQ0FBRSxFQUFGLENBTlQ7QUFBQSxRQU1pQmYsR0FBRyxHQUFHZSxFQUFFLENBQUUsRUFBRixDQU56QjtBQUFBLFFBTWlDWCxHQUFHLEdBQUdXLEVBQUUsQ0FBRSxFQUFGLENBTnpDO0FBQUEsUUFNaURQLEdBQUcsR0FBR08sRUFBRSxDQUFFLEVBQUYsQ0FOekQ7QUFBQSxRQVFDaUgsR0FBRyxHQUFHakksR0FBRyxHQUFHSyxHQUFOLEdBQVlFLEdBQVosR0FBa0JOLEdBQUcsR0FBR0csR0FBTixHQUFZRyxHQUE5QixHQUFvQ04sR0FBRyxHQUFHRSxHQUFOLEdBQVlLLEdBQWhELEdBQXNEVCxHQUFHLEdBQUdNLEdBQU4sR0FBWUcsR0FBbEUsR0FBd0VSLEdBQUcsR0FBR0csR0FBTixHQUFZTSxHQUFwRixHQUEwRlYsR0FBRyxHQUFHSyxHQUFOLEdBQVlLLEdBUjdHO0FBQUEsUUFTQ3lILEdBQUcsR0FBR3JJLEdBQUcsR0FBR08sR0FBTixHQUFZRyxHQUFaLEdBQWtCWCxHQUFHLEdBQUdTLEdBQU4sR0FBWUUsR0FBOUIsR0FBb0NWLEdBQUcsR0FBR00sR0FBTixHQUFZSyxHQUFoRCxHQUFzRGIsR0FBRyxHQUFHVSxHQUFOLEdBQVlHLEdBQWxFLEdBQXdFWixHQUFHLEdBQUdPLEdBQU4sR0FBWU0sR0FBcEYsR0FBMEZkLEdBQUcsR0FBR1MsR0FBTixHQUFZSyxHQVQ3RztBQUFBLFFBVUMwSCxHQUFHLEdBQUd2SSxHQUFHLEdBQUdLLEdBQU4sR0FBWU0sR0FBWixHQUFrQlYsR0FBRyxHQUFHRyxHQUFOLEdBQVlPLEdBQTlCLEdBQW9DVixHQUFHLEdBQUdFLEdBQU4sR0FBWVMsR0FBaEQsR0FBc0RiLEdBQUcsR0FBR00sR0FBTixHQUFZTyxHQUFsRSxHQUF3RVosR0FBRyxHQUFHRyxHQUFOLEdBQVlVLEdBQXBGLEdBQTBGZCxHQUFHLEdBQUdLLEdBQU4sR0FBWVMsR0FWN0c7QUFBQSxRQVdDMkgsR0FBRyxHQUFHdkksR0FBRyxHQUFHRyxHQUFOLEdBQVlHLEdBQVosR0FBa0JQLEdBQUcsR0FBR0ssR0FBTixHQUFZRSxHQUE5QixHQUFvQ04sR0FBRyxHQUFHRSxHQUFOLEdBQVlLLEdBQWhELEdBQXNEVCxHQUFHLEdBQUdNLEdBQU4sR0FBWUcsR0FBbEUsR0FBd0VSLEdBQUcsR0FBR0csR0FBTixHQUFZTSxHQUFwRixHQUEwRlYsR0FBRyxHQUFHSyxHQUFOLEdBQVlLLEdBWDdHO0FBYUEsUUFBSWdJLEdBQUcsR0FBRzNJLEdBQUcsR0FBR3VJLEdBQU4sR0FBWW5JLEdBQUcsR0FBR29JLEdBQWxCLEdBQXdCaEksR0FBRyxHQUFHaUksR0FBOUIsR0FBb0M3SCxHQUFHLEdBQUc4SCxHQUFwRDs7QUFFQSxRQUFLQyxHQUFHLEtBQUssQ0FBYixFQUFpQjtBQUVoQixVQUFJQyxHQUFHLEdBQUcsb0VBQVY7O0FBRUEsVUFBS04saUJBQWlCLEtBQUssSUFBM0IsRUFBa0M7QUFFakMsY0FBTSxJQUFJTyxLQUFKLENBQVdELEdBQVgsQ0FBTjtBQUVBLE9BSkQsTUFJTztBQUVObkosUUFBQUEsT0FBTyxDQUFDd0YsSUFBUixDQUFjMkQsR0FBZDtBQUVBOztBQUVELGFBQU8sS0FBSzNILFFBQUwsRUFBUDtBQUVBOztBQUVELFFBQUk2SCxNQUFNLEdBQUcsSUFBSUgsR0FBakI7QUFFQTNILElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXVILEdBQUcsR0FBR08sTUFBaEI7QUFDQTlILElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFFVCxHQUFHLEdBQUdHLEdBQU4sR0FBWUUsR0FBWixHQUFrQk4sR0FBRyxHQUFHSyxHQUFOLEdBQVlDLEdBQTlCLEdBQW9DTCxHQUFHLEdBQUdDLEdBQU4sR0FBWU0sR0FBaEQsR0FBc0RWLEdBQUcsR0FBR08sR0FBTixHQUFZRyxHQUFsRSxHQUF3RVIsR0FBRyxHQUFHRSxHQUFOLEdBQVlPLEdBQXBGLEdBQTBGWCxHQUFHLEdBQUdNLEdBQU4sR0FBWUssR0FBeEcsSUFBZ0grSCxNQUExSDtBQUNBOUgsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQUVYLEdBQUcsR0FBR00sR0FBTixHQUFZQyxHQUFaLEdBQWtCTCxHQUFHLEdBQUdFLEdBQU4sR0FBWUcsR0FBOUIsR0FBb0NMLEdBQUcsR0FBR0MsR0FBTixHQUFZSyxHQUFoRCxHQUFzRFQsR0FBRyxHQUFHTyxHQUFOLEdBQVlFLEdBQWxFLEdBQXdFUixHQUFHLEdBQUdHLEdBQU4sR0FBWU8sR0FBcEYsR0FBMEZYLEdBQUcsR0FBR0ssR0FBTixHQUFZTSxHQUF4RyxJQUFnSCtILE1BQTFIO0FBQ0E5SCxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRVYsR0FBRyxHQUFHRyxHQUFOLEdBQVlHLEdBQVosR0FBa0JQLEdBQUcsR0FBR0ssR0FBTixHQUFZRSxHQUE5QixHQUFvQ04sR0FBRyxHQUFHRSxHQUFOLEdBQVlLLEdBQWhELEdBQXNEVCxHQUFHLEdBQUdNLEdBQU4sR0FBWUcsR0FBbEUsR0FBd0VSLEdBQUcsR0FBR0csR0FBTixHQUFZTSxHQUFwRixHQUEwRlYsR0FBRyxHQUFHSyxHQUFOLEdBQVlLLEdBQXhHLElBQWdIZ0ksTUFBMUg7QUFFQTlILElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXdILEdBQUcsR0FBR00sTUFBaEI7QUFDQTlILElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFFZCxHQUFHLEdBQUdTLEdBQU4sR0FBWUMsR0FBWixHQUFrQlQsR0FBRyxHQUFHTyxHQUFOLEdBQVlFLEdBQTlCLEdBQW9DVCxHQUFHLEdBQUdLLEdBQU4sR0FBWU0sR0FBaEQsR0FBc0RkLEdBQUcsR0FBR1csR0FBTixHQUFZRyxHQUFsRSxHQUF3RVosR0FBRyxHQUFHTSxHQUFOLEdBQVlPLEdBQXBGLEdBQTBGZixHQUFHLEdBQUdVLEdBQU4sR0FBWUssR0FBeEcsSUFBZ0grSCxNQUExSDtBQUNBOUgsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQUViLEdBQUcsR0FBR00sR0FBTixHQUFZRyxHQUFaLEdBQWtCWCxHQUFHLEdBQUdVLEdBQU4sR0FBWUMsR0FBOUIsR0FBb0NULEdBQUcsR0FBR0ssR0FBTixHQUFZSyxHQUFoRCxHQUFzRGIsR0FBRyxHQUFHVyxHQUFOLEdBQVlFLEdBQWxFLEdBQXdFWixHQUFHLEdBQUdPLEdBQU4sR0FBWU8sR0FBcEYsR0FBMEZmLEdBQUcsR0FBR1MsR0FBTixHQUFZTSxHQUF4RyxJQUFnSCtILE1BQTFIO0FBQ0E5SCxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRWYsR0FBRyxHQUFHUyxHQUFOLEdBQVlFLEdBQVosR0FBa0JWLEdBQUcsR0FBR08sR0FBTixHQUFZRyxHQUE5QixHQUFvQ1YsR0FBRyxHQUFHTSxHQUFOLEdBQVlLLEdBQWhELEdBQXNEYixHQUFHLEdBQUdVLEdBQU4sR0FBWUcsR0FBbEUsR0FBd0VaLEdBQUcsR0FBR08sR0FBTixHQUFZTSxHQUFwRixHQUEwRmQsR0FBRyxHQUFHUyxHQUFOLEdBQVlLLEdBQXhHLElBQWdIZ0ksTUFBMUg7QUFFQTlILElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVXlILEdBQUcsR0FBR0ssTUFBaEI7QUFDQTlILElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFFYixHQUFHLEdBQUdHLEdBQU4sR0FBWU0sR0FBWixHQUFrQlYsR0FBRyxHQUFHSyxHQUFOLEdBQVlLLEdBQTlCLEdBQW9DVCxHQUFHLEdBQUdDLEdBQU4sR0FBWVUsR0FBaEQsR0FBc0RkLEdBQUcsR0FBR08sR0FBTixHQUFZTyxHQUFsRSxHQUF3RVosR0FBRyxHQUFHRSxHQUFOLEdBQVlXLEdBQXBGLEdBQTBGZixHQUFHLEdBQUdNLEdBQU4sR0FBWVMsR0FBeEcsSUFBZ0grSCxNQUExSDtBQUNBOUgsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXLENBQUVmLEdBQUcsR0FBR00sR0FBTixHQUFZSyxHQUFaLEdBQWtCVCxHQUFHLEdBQUdFLEdBQU4sR0FBWU8sR0FBOUIsR0FBb0NULEdBQUcsR0FBR0MsR0FBTixHQUFZUyxHQUFoRCxHQUFzRGIsR0FBRyxHQUFHTyxHQUFOLEdBQVlNLEdBQWxFLEdBQXdFWixHQUFHLEdBQUdHLEdBQU4sR0FBWVcsR0FBcEYsR0FBMEZmLEdBQUcsR0FBR0ssR0FBTixHQUFZVSxHQUF4RyxJQUFnSCtILE1BQTNIO0FBQ0E5SCxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcsQ0FBRWQsR0FBRyxHQUFHRyxHQUFOLEdBQVlPLEdBQVosR0FBa0JYLEdBQUcsR0FBR0ssR0FBTixHQUFZTSxHQUE5QixHQUFvQ1YsR0FBRyxHQUFHRSxHQUFOLEdBQVlTLEdBQWhELEdBQXNEYixHQUFHLEdBQUdNLEdBQU4sR0FBWU8sR0FBbEUsR0FBd0VaLEdBQUcsR0FBR0csR0FBTixHQUFZVSxHQUFwRixHQUEwRmQsR0FBRyxHQUFHSyxHQUFOLEdBQVlTLEdBQXhHLElBQWdIZ0ksTUFBM0g7QUFFQTlILElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBVzBILEdBQUcsR0FBR0ksTUFBakI7QUFDQTlILElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBVyxDQUFFZCxHQUFHLEdBQUdLLEdBQU4sR0FBWUMsR0FBWixHQUFrQkwsR0FBRyxHQUFHRyxHQUFOLEdBQVlFLEdBQTlCLEdBQW9DTCxHQUFHLEdBQUdDLEdBQU4sR0FBWU0sR0FBaEQsR0FBc0RWLEdBQUcsR0FBR08sR0FBTixHQUFZRyxHQUFsRSxHQUF3RVIsR0FBRyxHQUFHRSxHQUFOLEdBQVlPLEdBQXBGLEdBQTBGWCxHQUFHLEdBQUdNLEdBQU4sR0FBWUssR0FBeEcsSUFBZ0htSSxNQUEzSDtBQUNBOUgsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXLENBQUViLEdBQUcsR0FBR0UsR0FBTixHQUFZRyxHQUFaLEdBQWtCUCxHQUFHLEdBQUdNLEdBQU4sR0FBWUMsR0FBOUIsR0FBb0NMLEdBQUcsR0FBR0MsR0FBTixHQUFZSyxHQUFoRCxHQUFzRFQsR0FBRyxHQUFHTyxHQUFOLEdBQVlFLEdBQWxFLEdBQXdFUixHQUFHLEdBQUdHLEdBQU4sR0FBWU8sR0FBcEYsR0FBMEZYLEdBQUcsR0FBR0ssR0FBTixHQUFZTSxHQUF4RyxJQUFnSG1JLE1BQTNIO0FBQ0E5SCxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcsQ0FBRWYsR0FBRyxHQUFHSyxHQUFOLEdBQVlFLEdBQVosR0FBa0JOLEdBQUcsR0FBR0csR0FBTixHQUFZRyxHQUE5QixHQUFvQ04sR0FBRyxHQUFHRSxHQUFOLEdBQVlLLEdBQWhELEdBQXNEVCxHQUFHLEdBQUdNLEdBQU4sR0FBWUcsR0FBbEUsR0FBd0VSLEdBQUcsR0FBR0csR0FBTixHQUFZTSxHQUFwRixHQUEwRlYsR0FBRyxHQUFHSyxHQUFOLEdBQVlLLEdBQXhHLElBQWdIb0ksTUFBM0g7QUFFQSxXQUFPLElBQVA7QUFFQSxHQXpqQmdDO0FBMmpCakNDLEVBQUFBLEtBQUssRUFBRSxlQUFXQyxDQUFYLEVBQWU7QUFFckIsUUFBSWhJLEVBQUUsR0FBRyxLQUFLMUIsUUFBZDtBQUNBLFFBQUl3QyxDQUFDLEdBQUdrSCxDQUFDLENBQUNsSCxDQUFWO0FBQUEsUUFBYUMsQ0FBQyxHQUFHaUgsQ0FBQyxDQUFDakgsQ0FBbkI7QUFBQSxRQUFzQkMsQ0FBQyxHQUFHZ0gsQ0FBQyxDQUFDaEgsQ0FBNUI7QUFFQWhCLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsSUFBV2MsQ0FBWDtBQUFjZCxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLElBQVdlLENBQVg7QUFBY2YsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixJQUFXZ0IsQ0FBWDtBQUM1QmhCLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsSUFBV2MsQ0FBWDtBQUFjZCxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLElBQVdlLENBQVg7QUFBY2YsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixJQUFXZ0IsQ0FBWDtBQUM1QmhCLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsSUFBV2MsQ0FBWDtBQUFjZCxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLElBQVdlLENBQVg7QUFBY2YsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixJQUFZZ0IsQ0FBWjtBQUM1QmhCLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsSUFBV2MsQ0FBWDtBQUFjZCxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLElBQVdlLENBQVg7QUFBY2YsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixJQUFZZ0IsQ0FBWjtBQUU1QixXQUFPLElBQVA7QUFFQSxHQXZrQmdDO0FBeWtCakNpSCxFQUFBQSxpQkFBaUIsRUFBRSw2QkFBWTtBQUU5QixRQUFJakksRUFBRSxHQUFHLEtBQUsxQixRQUFkO0FBRUEsUUFBSTRKLFFBQVEsR0FBR2xJLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVUEsRUFBRSxDQUFFLENBQUYsQ0FBWixHQUFvQkEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVQSxFQUFFLENBQUUsQ0FBRixDQUFoQyxHQUF3Q0EsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVQSxFQUFFLENBQUUsQ0FBRixDQUFuRTtBQUNBLFFBQUltSSxRQUFRLEdBQUduSSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVBLEVBQUUsQ0FBRSxDQUFGLENBQVosR0FBb0JBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVUEsRUFBRSxDQUFFLENBQUYsQ0FBaEMsR0FBd0NBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVUEsRUFBRSxDQUFFLENBQUYsQ0FBbkU7QUFDQSxRQUFJb0ksUUFBUSxHQUFHcEksRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVQSxFQUFFLENBQUUsQ0FBRixDQUFaLEdBQW9CQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVBLEVBQUUsQ0FBRSxDQUFGLENBQWhDLEdBQXdDQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdBLEVBQUUsQ0FBRSxFQUFGLENBQXBFO0FBRUEsV0FBTzJCLElBQUksQ0FBQzBHLElBQUwsQ0FBVzFHLElBQUksQ0FBQzJHLEdBQUwsQ0FBVUosUUFBVixFQUFvQkMsUUFBcEIsRUFBOEJDLFFBQTlCLENBQVgsQ0FBUDtBQUVBLEdBbmxCZ0M7QUFxbEJqQ0csRUFBQUEsZUFBZSxFQUFFLHlCQUFXekgsQ0FBWCxFQUFjQyxDQUFkLEVBQWlCQyxDQUFqQixFQUFxQjtBQUVyQyxTQUFLakMsR0FBTCxDQUVDLENBRkQsRUFFSSxDQUZKLEVBRU8sQ0FGUCxFQUVVK0IsQ0FGVixFQUdDLENBSEQsRUFHSSxDQUhKLEVBR08sQ0FIUCxFQUdVQyxDQUhWLEVBSUMsQ0FKRCxFQUlJLENBSkosRUFJTyxDQUpQLEVBSVVDLENBSlYsRUFLQyxDQUxELEVBS0ksQ0FMSixFQUtPLENBTFAsRUFLVSxDQUxWO0FBU0EsV0FBTyxJQUFQO0FBRUEsR0FsbUJnQztBQW9tQmpDd0gsRUFBQUEsYUFBYSxFQUFFLHVCQUFXQyxLQUFYLEVBQW1CO0FBRWpDLFFBQUkxRyxDQUFDLEdBQUdKLElBQUksQ0FBQ0MsR0FBTCxDQUFVNkcsS0FBVixDQUFSO0FBQUEsUUFBMkJwQyxDQUFDLEdBQUcxRSxJQUFJLENBQUNHLEdBQUwsQ0FBVTJHLEtBQVYsQ0FBL0I7QUFFQSxTQUFLMUosR0FBTCxDQUVDLENBRkQsRUFFSSxDQUZKLEVBRU8sQ0FGUCxFQUVVLENBRlYsRUFHQyxDQUhELEVBR0lnRCxDQUhKLEVBR08sQ0FBRXNFLENBSFQsRUFHWSxDQUhaLEVBSUMsQ0FKRCxFQUlJQSxDQUpKLEVBSU90RSxDQUpQLEVBSVUsQ0FKVixFQUtDLENBTEQsRUFLSSxDQUxKLEVBS08sQ0FMUCxFQUtVLENBTFY7QUFTQSxXQUFPLElBQVA7QUFFQSxHQW5uQmdDO0FBcW5CakMyRyxFQUFBQSxhQUFhLEVBQUUsdUJBQVdELEtBQVgsRUFBbUI7QUFFakMsUUFBSTFHLENBQUMsR0FBR0osSUFBSSxDQUFDQyxHQUFMLENBQVU2RyxLQUFWLENBQVI7QUFBQSxRQUEyQnBDLENBQUMsR0FBRzFFLElBQUksQ0FBQ0csR0FBTCxDQUFVMkcsS0FBVixDQUEvQjtBQUVBLFNBQUsxSixHQUFMLENBRUVnRCxDQUZGLEVBRUssQ0FGTCxFQUVRc0UsQ0FGUixFQUVXLENBRlgsRUFHRSxDQUhGLEVBR0ssQ0FITCxFQUdRLENBSFIsRUFHVyxDQUhYLEVBSUMsQ0FBRUEsQ0FKSCxFQUlNLENBSk4sRUFJU3RFLENBSlQsRUFJWSxDQUpaLEVBS0UsQ0FMRixFQUtLLENBTEwsRUFLUSxDQUxSLEVBS1csQ0FMWDtBQVNBLFdBQU8sSUFBUDtBQUVBLEdBcG9CZ0M7QUFzb0JqQzRHLEVBQUFBLGFBQWEsRUFBRSx1QkFBV0YsS0FBWCxFQUFtQjtBQUVqQyxRQUFJMUcsQ0FBQyxHQUFHSixJQUFJLENBQUNDLEdBQUwsQ0FBVTZHLEtBQVYsQ0FBUjtBQUFBLFFBQTJCcEMsQ0FBQyxHQUFHMUUsSUFBSSxDQUFDRyxHQUFMLENBQVUyRyxLQUFWLENBQS9CO0FBRUEsU0FBSzFKLEdBQUwsQ0FFQ2dELENBRkQsRUFFSSxDQUFFc0UsQ0FGTixFQUVTLENBRlQsRUFFWSxDQUZaLEVBR0NBLENBSEQsRUFHSXRFLENBSEosRUFHTyxDQUhQLEVBR1UsQ0FIVixFQUlDLENBSkQsRUFJSSxDQUpKLEVBSU8sQ0FKUCxFQUlVLENBSlYsRUFLQyxDQUxELEVBS0ksQ0FMSixFQUtPLENBTFAsRUFLVSxDQUxWO0FBU0EsV0FBTyxJQUFQO0FBRUEsR0FycEJnQztBQXVwQmpDNkcsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVdDLElBQVgsRUFBaUJDLEtBQWpCLEVBQXlCO0FBRTFDO0FBRUEsUUFBSS9HLENBQUMsR0FBR0osSUFBSSxDQUFDQyxHQUFMLENBQVVrSCxLQUFWLENBQVI7QUFDQSxRQUFJekMsQ0FBQyxHQUFHMUUsSUFBSSxDQUFDRyxHQUFMLENBQVVnSCxLQUFWLENBQVI7QUFDQSxRQUFJQyxDQUFDLEdBQUcsSUFBSWhILENBQVo7QUFDQSxRQUFJakIsQ0FBQyxHQUFHK0gsSUFBSSxDQUFDL0gsQ0FBYjtBQUFBLFFBQWdCQyxDQUFDLEdBQUc4SCxJQUFJLENBQUM5SCxDQUF6QjtBQUFBLFFBQTRCQyxDQUFDLEdBQUc2SCxJQUFJLENBQUM3SCxDQUFyQztBQUNBLFFBQUlnSSxFQUFFLEdBQUdELENBQUMsR0FBR2pJLENBQWI7QUFBQSxRQUFnQm1JLEVBQUUsR0FBR0YsQ0FBQyxHQUFHaEksQ0FBekI7QUFFQSxTQUFLaEMsR0FBTCxDQUVDaUssRUFBRSxHQUFHbEksQ0FBTCxHQUFTaUIsQ0FGVixFQUVhaUgsRUFBRSxHQUFHakksQ0FBTCxHQUFTc0YsQ0FBQyxHQUFHckYsQ0FGMUIsRUFFNkJnSSxFQUFFLEdBQUdoSSxDQUFMLEdBQVNxRixDQUFDLEdBQUd0RixDQUYxQyxFQUU2QyxDQUY3QyxFQUdDaUksRUFBRSxHQUFHakksQ0FBTCxHQUFTc0YsQ0FBQyxHQUFHckYsQ0FIZCxFQUdpQmlJLEVBQUUsR0FBR2xJLENBQUwsR0FBU2dCLENBSDFCLEVBRzZCa0gsRUFBRSxHQUFHakksQ0FBTCxHQUFTcUYsQ0FBQyxHQUFHdkYsQ0FIMUMsRUFHNkMsQ0FIN0MsRUFJQ2tJLEVBQUUsR0FBR2hJLENBQUwsR0FBU3FGLENBQUMsR0FBR3RGLENBSmQsRUFJaUJrSSxFQUFFLEdBQUdqSSxDQUFMLEdBQVNxRixDQUFDLEdBQUd2RixDQUo5QixFQUlpQ2lJLENBQUMsR0FBRy9ILENBQUosR0FBUUEsQ0FBUixHQUFZZSxDQUo3QyxFQUlnRCxDQUpoRCxFQUtDLENBTEQsRUFLSSxDQUxKLEVBS08sQ0FMUCxFQUtVLENBTFY7QUFTQyxXQUFPLElBQVA7QUFFRCxHQTVxQmdDO0FBOHFCakNtSCxFQUFBQSxTQUFTLEVBQUUsbUJBQVdwSSxDQUFYLEVBQWNDLENBQWQsRUFBaUJDLENBQWpCLEVBQXFCO0FBRS9CLFNBQUtqQyxHQUFMLENBRUMrQixDQUZELEVBRUksQ0FGSixFQUVPLENBRlAsRUFFVSxDQUZWLEVBR0MsQ0FIRCxFQUdJQyxDQUhKLEVBR08sQ0FIUCxFQUdVLENBSFYsRUFJQyxDQUpELEVBSUksQ0FKSixFQUlPQyxDQUpQLEVBSVUsQ0FKVixFQUtDLENBTEQsRUFLSSxDQUxKLEVBS08sQ0FMUCxFQUtVLENBTFY7QUFTQSxXQUFPLElBQVA7QUFFQSxHQTNyQmdDO0FBNnJCakNtSSxFQUFBQSxTQUFTLEVBQUUsbUJBQVdySSxDQUFYLEVBQWNDLENBQWQsRUFBaUJDLENBQWpCLEVBQXFCO0FBRS9CLFNBQUtqQyxHQUFMLENBRUMsQ0FGRCxFQUVJZ0MsQ0FGSixFQUVPQyxDQUZQLEVBRVUsQ0FGVixFQUdDRixDQUhELEVBR0ksQ0FISixFQUdPRSxDQUhQLEVBR1UsQ0FIVixFQUlDRixDQUpELEVBSUlDLENBSkosRUFJTyxDQUpQLEVBSVUsQ0FKVixFQUtDLENBTEQsRUFLSSxDQUxKLEVBS08sQ0FMUCxFQUtVLENBTFY7QUFTQSxXQUFPLElBQVA7QUFFQSxHQTFzQmdDO0FBNHNCakNxQyxFQUFBQSxPQUFPLEVBQUUsaUJBQVdnRyxRQUFYLEVBQXFCQyxVQUFyQixFQUFpQ3RCLEtBQWpDLEVBQXlDO0FBRWpELFFBQUkvSCxFQUFFLEdBQUcsS0FBSzFCLFFBQWQ7QUFFQSxRQUFJd0MsQ0FBQyxHQUFHdUksVUFBVSxDQUFDQyxFQUFuQjtBQUFBLFFBQXVCdkksQ0FBQyxHQUFHc0ksVUFBVSxDQUFDRSxFQUF0QztBQUFBLFFBQTBDdkksQ0FBQyxHQUFHcUksVUFBVSxDQUFDRyxFQUF6RDtBQUFBLFFBQTZEQyxDQUFDLEdBQUdKLFVBQVUsQ0FBQ0ssRUFBNUU7QUFDQSxRQUFJQyxFQUFFLEdBQUc3SSxDQUFDLEdBQUdBLENBQWI7QUFBQSxRQUFnQjhJLEVBQUUsR0FBRzdJLENBQUMsR0FBR0EsQ0FBekI7QUFBQSxRQUE0QjhJLEVBQUUsR0FBRzdJLENBQUMsR0FBR0EsQ0FBckM7QUFDQSxRQUFJOEksRUFBRSxHQUFHaEosQ0FBQyxHQUFHNkksRUFBYjtBQUFBLFFBQWlCSSxFQUFFLEdBQUdqSixDQUFDLEdBQUc4SSxFQUExQjtBQUFBLFFBQThCSSxFQUFFLEdBQUdsSixDQUFDLEdBQUcrSSxFQUF2QztBQUNBLFFBQUlJLEVBQUUsR0FBR2xKLENBQUMsR0FBRzZJLEVBQWI7QUFBQSxRQUFpQk0sRUFBRSxHQUFHbkosQ0FBQyxHQUFHOEksRUFBMUI7QUFBQSxRQUE4Qk0sRUFBRSxHQUFHbkosQ0FBQyxHQUFHNkksRUFBdkM7QUFDQSxRQUFJTyxFQUFFLEdBQUdYLENBQUMsR0FBR0UsRUFBYjtBQUFBLFFBQWlCVSxFQUFFLEdBQUdaLENBQUMsR0FBR0csRUFBMUI7QUFBQSxRQUE4QlUsRUFBRSxHQUFHYixDQUFDLEdBQUdJLEVBQXZDO0FBRUEsUUFBSVUsRUFBRSxHQUFHeEMsS0FBSyxDQUFDakgsQ0FBZjtBQUFBLFFBQWtCMEosRUFBRSxHQUFHekMsS0FBSyxDQUFDaEgsQ0FBN0I7QUFBQSxRQUFnQzBKLEVBQUUsR0FBRzFDLEtBQUssQ0FBQy9HLENBQTNDO0FBRUFoQixJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRSxLQUFNaUssRUFBRSxHQUFHRSxFQUFYLENBQUYsSUFBc0JJLEVBQWhDO0FBQ0F2SyxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRStKLEVBQUUsR0FBR08sRUFBUCxJQUFjQyxFQUF4QjtBQUNBdkssSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQUVnSyxFQUFFLEdBQUdLLEVBQVAsSUFBY0UsRUFBeEI7QUFDQXZLLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFWO0FBRUFBLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFFK0osRUFBRSxHQUFHTyxFQUFQLElBQWNFLEVBQXhCO0FBQ0F4SyxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRSxLQUFNOEosRUFBRSxHQUFHSyxFQUFYLENBQUYsSUFBc0JLLEVBQWhDO0FBQ0F4SyxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBRWtLLEVBQUUsR0FBR0UsRUFBUCxJQUFjSSxFQUF4QjtBQUNBeEssSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQVY7QUFFQUEsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQUVnSyxFQUFFLEdBQUdLLEVBQVAsSUFBY0ksRUFBeEI7QUFDQXpLLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFFa0ssRUFBRSxHQUFHRSxFQUFQLElBQWNLLEVBQXhCO0FBQ0F6SyxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcsQ0FBRSxLQUFNOEosRUFBRSxHQUFHRyxFQUFYLENBQUYsSUFBc0JRLEVBQWpDO0FBQ0F6SyxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcsQ0FBWDtBQUVBQSxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdvSixRQUFRLENBQUN0SSxDQUFwQjtBQUNBZCxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdvSixRQUFRLENBQUNySSxDQUFwQjtBQUNBZixJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVdvSixRQUFRLENBQUNwSSxDQUFwQjtBQUNBaEIsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXLENBQVg7QUFFQSxXQUFPLElBQVA7QUFFQSxHQTl1QmdDO0FBZ3ZCakMwSyxFQUFBQSxTQUFTLEVBQUUsWUFBWTtBQUV0QixRQUFJQyxNQUFNLEdBQUcsSUFBSXhKLGVBQUosRUFBYjtBQUNBLFFBQUl5SixNQUFNLEdBQUcsSUFBSXZNLE9BQUosRUFBYjtBQUVBLFdBQU8sU0FBU3FNLFNBQVQsQ0FBb0J0QixRQUFwQixFQUE4QkMsVUFBOUIsRUFBMEN0QixLQUExQyxFQUFrRDtBQUV4RCxVQUFJL0gsRUFBRSxHQUFHLEtBQUsxQixRQUFkO0FBRUEsVUFBSWlNLEVBQUUsR0FBR0ksTUFBTSxDQUFDNUwsR0FBUCxDQUFZaUIsRUFBRSxDQUFFLENBQUYsQ0FBZCxFQUFxQkEsRUFBRSxDQUFFLENBQUYsQ0FBdkIsRUFBOEJBLEVBQUUsQ0FBRSxDQUFGLENBQWhDLEVBQXdDeEIsTUFBeEMsRUFBVDtBQUNBLFVBQUlnTSxFQUFFLEdBQUdHLE1BQU0sQ0FBQzVMLEdBQVAsQ0FBWWlCLEVBQUUsQ0FBRSxDQUFGLENBQWQsRUFBcUJBLEVBQUUsQ0FBRSxDQUFGLENBQXZCLEVBQThCQSxFQUFFLENBQUUsQ0FBRixDQUFoQyxFQUF3Q3hCLE1BQXhDLEVBQVQ7QUFDQSxVQUFJaU0sRUFBRSxHQUFHRSxNQUFNLENBQUM1TCxHQUFQLENBQVlpQixFQUFFLENBQUUsQ0FBRixDQUFkLEVBQXFCQSxFQUFFLENBQUUsQ0FBRixDQUF2QixFQUE4QkEsRUFBRSxDQUFFLEVBQUYsQ0FBaEMsRUFBeUN4QixNQUF6QyxFQUFULENBTndELENBUXhEOztBQUNBLFVBQUltSixHQUFHLEdBQUcsS0FBS1gsV0FBTCxFQUFWO0FBQ0EsVUFBS1csR0FBRyxHQUFHLENBQVgsRUFBZTRDLEVBQUUsR0FBRyxDQUFFQSxFQUFQO0FBRWZuQixNQUFBQSxRQUFRLENBQUN0SSxDQUFULEdBQWFkLEVBQUUsQ0FBRSxFQUFGLENBQWY7QUFDQW9KLE1BQUFBLFFBQVEsQ0FBQ3JJLENBQVQsR0FBYWYsRUFBRSxDQUFFLEVBQUYsQ0FBZjtBQUNBb0osTUFBQUEsUUFBUSxDQUFDcEksQ0FBVCxHQUFhaEIsRUFBRSxDQUFFLEVBQUYsQ0FBZixDQWR3RCxDQWdCeEQ7O0FBQ0E0SyxNQUFBQSxNQUFNLENBQUN4SyxJQUFQLENBQWEsSUFBYjtBQUVBLFVBQUl5SyxLQUFLLEdBQUcsSUFBSU4sRUFBaEI7QUFDQSxVQUFJTyxLQUFLLEdBQUcsSUFBSU4sRUFBaEI7QUFDQSxVQUFJTyxLQUFLLEdBQUcsSUFBSU4sRUFBaEI7QUFFQUcsTUFBQUEsTUFBTSxDQUFDdE0sUUFBUCxDQUFpQixDQUFqQixLQUF3QnVNLEtBQXhCO0FBQ0FELE1BQUFBLE1BQU0sQ0FBQ3RNLFFBQVAsQ0FBaUIsQ0FBakIsS0FBd0J1TSxLQUF4QjtBQUNBRCxNQUFBQSxNQUFNLENBQUN0TSxRQUFQLENBQWlCLENBQWpCLEtBQXdCdU0sS0FBeEI7QUFFQUQsTUFBQUEsTUFBTSxDQUFDdE0sUUFBUCxDQUFpQixDQUFqQixLQUF3QndNLEtBQXhCO0FBQ0FGLE1BQUFBLE1BQU0sQ0FBQ3RNLFFBQVAsQ0FBaUIsQ0FBakIsS0FBd0J3TSxLQUF4QjtBQUNBRixNQUFBQSxNQUFNLENBQUN0TSxRQUFQLENBQWlCLENBQWpCLEtBQXdCd00sS0FBeEI7QUFFQUYsTUFBQUEsTUFBTSxDQUFDdE0sUUFBUCxDQUFpQixDQUFqQixLQUF3QnlNLEtBQXhCO0FBQ0FILE1BQUFBLE1BQU0sQ0FBQ3RNLFFBQVAsQ0FBaUIsQ0FBakIsS0FBd0J5TSxLQUF4QjtBQUNBSCxNQUFBQSxNQUFNLENBQUN0TSxRQUFQLENBQWlCLEVBQWpCLEtBQXlCeU0sS0FBekI7QUFFQTFCLE1BQUFBLFVBQVUsQ0FBQzJCLHFCQUFYLENBQWtDSixNQUFsQztBQUVBN0MsTUFBQUEsS0FBSyxDQUFDakgsQ0FBTixHQUFVeUosRUFBVjtBQUNBeEMsTUFBQUEsS0FBSyxDQUFDaEgsQ0FBTixHQUFVeUosRUFBVjtBQUNBekMsTUFBQUEsS0FBSyxDQUFDL0csQ0FBTixHQUFVeUosRUFBVjtBQUVBLGFBQU8sSUFBUDtBQUVBLEtBM0NEO0FBNkNBLEdBbERVLEVBaHZCc0I7QUFveUJqQ1EsRUFBQUEsZUFBZSxFQUFFLHlCQUFXQyxJQUFYLEVBQWlCQyxLQUFqQixFQUF3QkMsR0FBeEIsRUFBNkJDLE1BQTdCLEVBQXFDQyxJQUFyQyxFQUEyQ0MsR0FBM0MsRUFBaUQ7QUFFakUsUUFBS0EsR0FBRyxLQUFLdkgsU0FBYixFQUF5QjtBQUV4QnZGLE1BQUFBLE9BQU8sQ0FBQ3dGLElBQVIsQ0FBYyxzR0FBZDtBQUVBOztBQUVELFFBQUlqRSxFQUFFLEdBQUcsS0FBSzFCLFFBQWQ7QUFDQSxRQUFJd0MsQ0FBQyxHQUFHLElBQUl3SyxJQUFKLElBQWFILEtBQUssR0FBR0QsSUFBckIsQ0FBUjtBQUNBLFFBQUluSyxDQUFDLEdBQUcsSUFBSXVLLElBQUosSUFBYUYsR0FBRyxHQUFHQyxNQUFuQixDQUFSO0FBRUEsUUFBSTNKLENBQUMsR0FBRyxDQUFFeUosS0FBSyxHQUFHRCxJQUFWLEtBQXFCQyxLQUFLLEdBQUdELElBQTdCLENBQVI7QUFDQSxRQUFJckosQ0FBQyxHQUFHLENBQUV1SixHQUFHLEdBQUdDLE1BQVIsS0FBcUJELEdBQUcsR0FBR0MsTUFBM0IsQ0FBUjtBQUNBLFFBQUl0SixDQUFDLEdBQUcsRUFBSXdKLEdBQUcsR0FBR0QsSUFBVixLQUFxQkMsR0FBRyxHQUFHRCxJQUEzQixDQUFSO0FBQ0EsUUFBSXRKLENBQUMsR0FBRyxDQUFFLENBQUYsR0FBTXVKLEdBQU4sR0FBWUQsSUFBWixJQUFxQkMsR0FBRyxHQUFHRCxJQUEzQixDQUFSO0FBRUF0TCxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVVjLENBQVY7QUFBYWQsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQVY7QUFBYUEsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVMEIsQ0FBVjtBQUFhMUIsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXLENBQVg7QUFDdkNBLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFWO0FBQWFBLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVWUsQ0FBVjtBQUFhZixJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVU2QixDQUFWO0FBQWE3QixJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcsQ0FBWDtBQUN2Q0EsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQVY7QUFBYUEsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQVY7QUFBYUEsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXK0IsQ0FBWDtBQUFjL0IsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXZ0MsQ0FBWDtBQUN4Q2hDLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFWO0FBQWFBLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFWO0FBQWFBLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBVyxDQUFFLENBQWI7QUFBZ0JBLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBVyxDQUFYO0FBRTFDLFdBQU8sSUFBUDtBQUVBLEdBNXpCZ0M7QUE4ekJqQ3dMLEVBQUFBLGdCQUFnQixFQUFFLDBCQUFXTixJQUFYLEVBQWlCQyxLQUFqQixFQUF3QkMsR0FBeEIsRUFBNkJDLE1BQTdCLEVBQXFDQyxJQUFyQyxFQUEyQ0MsR0FBM0MsRUFBaUQ7QUFFbEUsUUFBSXZMLEVBQUUsR0FBRyxLQUFLMUIsUUFBZDtBQUNBLFFBQUltTCxDQUFDLEdBQUcsT0FBUTBCLEtBQUssR0FBR0QsSUFBaEIsQ0FBUjtBQUNBLFFBQUlPLENBQUMsR0FBRyxPQUFRTCxHQUFHLEdBQUdDLE1BQWQsQ0FBUjtBQUNBLFFBQUlLLENBQUMsR0FBRyxPQUFRSCxHQUFHLEdBQUdELElBQWQsQ0FBUjtBQUVBLFFBQUl4SyxDQUFDLEdBQUcsQ0FBRXFLLEtBQUssR0FBR0QsSUFBVixJQUFtQnpCLENBQTNCO0FBQ0EsUUFBSTFJLENBQUMsR0FBRyxDQUFFcUssR0FBRyxHQUFHQyxNQUFSLElBQW1CSSxDQUEzQjtBQUNBLFFBQUl6SyxDQUFDLEdBQUcsQ0FBRXVLLEdBQUcsR0FBR0QsSUFBUixJQUFpQkksQ0FBekI7QUFFQTFMLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxJQUFJeUosQ0FBZDtBQUFpQnpKLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFWO0FBQWFBLElBQUFBLEVBQUUsQ0FBRSxDQUFGLENBQUYsR0FBVSxDQUFWO0FBQWFBLElBQUFBLEVBQUUsQ0FBRSxFQUFGLENBQUYsR0FBVyxDQUFFYyxDQUFiO0FBQzNDZCxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBVjtBQUFhQSxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsSUFBSXlMLENBQWQ7QUFBaUJ6TCxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBVjtBQUFhQSxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcsQ0FBRWUsQ0FBYjtBQUMzQ2YsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQVY7QUFBYUEsSUFBQUEsRUFBRSxDQUFFLENBQUYsQ0FBRixHQUFVLENBQVY7QUFBYUEsSUFBQUEsRUFBRSxDQUFFLEVBQUYsQ0FBRixHQUFXLENBQUUsQ0FBRixHQUFNMEwsQ0FBakI7QUFBb0IxTCxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcsQ0FBRWdCLENBQWI7QUFDOUNoQixJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBVjtBQUFhQSxJQUFBQSxFQUFFLENBQUUsQ0FBRixDQUFGLEdBQVUsQ0FBVjtBQUFhQSxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcsQ0FBWDtBQUFjQSxJQUFBQSxFQUFFLENBQUUsRUFBRixDQUFGLEdBQVcsQ0FBWDtBQUV4QyxXQUFPLElBQVA7QUFFQSxHQWgxQmdDO0FBazFCakMyTCxFQUFBQSxNQUFNLEVBQUUsZ0JBQVdmLE1BQVgsRUFBb0I7QUFFM0IsUUFBSTVLLEVBQUUsR0FBRyxLQUFLMUIsUUFBZDtBQUNBLFFBQUlnQyxFQUFFLEdBQUdzSyxNQUFNLENBQUN0TSxRQUFoQjs7QUFFQSxTQUFNLElBQUlrSSxDQUFDLEdBQUcsQ0FBZCxFQUFpQkEsQ0FBQyxHQUFHLEVBQXJCLEVBQXlCQSxDQUFDLEVBQTFCLEVBQWdDO0FBRS9CLFVBQUt4RyxFQUFFLENBQUV3RyxDQUFGLENBQUYsS0FBWWxHLEVBQUUsQ0FBRWtHLENBQUYsQ0FBbkIsRUFBMkIsT0FBTyxLQUFQO0FBRTNCOztBQUVELFdBQU8sSUFBUDtBQUVBLEdBLzFCZ0M7QUFpMkJqQ3JHLEVBQUFBLFNBQVMsRUFBRSxtQkFBV3lMLEtBQVgsRUFBa0JDLE1BQWxCLEVBQTJCO0FBRXJDLFFBQUtBLE1BQU0sS0FBSzdILFNBQWhCLEVBQTRCNkgsTUFBTSxHQUFHLENBQVQ7O0FBRTVCLFNBQU0sSUFBSXJGLENBQUMsR0FBRyxDQUFkLEVBQWlCQSxDQUFDLEdBQUcsRUFBckIsRUFBeUJBLENBQUMsRUFBMUIsRUFBZ0M7QUFFL0IsV0FBS2xJLFFBQUwsQ0FBZWtJLENBQWYsSUFBcUJvRixLQUFLLENBQUVwRixDQUFDLEdBQUdxRixNQUFOLENBQTFCO0FBRUE7O0FBRUQsV0FBTyxJQUFQO0FBRUEsR0E3MkJnQztBQSsyQmpDQyxFQUFBQSxPQUFPLEVBQUUsaUJBQVdGLEtBQVgsRUFBa0JDLE1BQWxCLEVBQTJCO0FBRW5DLFFBQUtELEtBQUssS0FBSzVILFNBQWYsRUFBMkI0SCxLQUFLLEdBQUcsRUFBUjtBQUMzQixRQUFLQyxNQUFNLEtBQUs3SCxTQUFoQixFQUE0QjZILE1BQU0sR0FBRyxDQUFUO0FBRTVCLFFBQUk3TCxFQUFFLEdBQUcsS0FBSzFCLFFBQWQ7QUFFQXNOLElBQUFBLEtBQUssQ0FBRUMsTUFBRixDQUFMLEdBQWtCN0wsRUFBRSxDQUFFLENBQUYsQ0FBcEI7QUFDQTRMLElBQUFBLEtBQUssQ0FBRUMsTUFBTSxHQUFHLENBQVgsQ0FBTCxHQUFzQjdMLEVBQUUsQ0FBRSxDQUFGLENBQXhCO0FBQ0E0TCxJQUFBQSxLQUFLLENBQUVDLE1BQU0sR0FBRyxDQUFYLENBQUwsR0FBc0I3TCxFQUFFLENBQUUsQ0FBRixDQUF4QjtBQUNBNEwsSUFBQUEsS0FBSyxDQUFFQyxNQUFNLEdBQUcsQ0FBWCxDQUFMLEdBQXNCN0wsRUFBRSxDQUFFLENBQUYsQ0FBeEI7QUFFQTRMLElBQUFBLEtBQUssQ0FBRUMsTUFBTSxHQUFHLENBQVgsQ0FBTCxHQUFzQjdMLEVBQUUsQ0FBRSxDQUFGLENBQXhCO0FBQ0E0TCxJQUFBQSxLQUFLLENBQUVDLE1BQU0sR0FBRyxDQUFYLENBQUwsR0FBc0I3TCxFQUFFLENBQUUsQ0FBRixDQUF4QjtBQUNBNEwsSUFBQUEsS0FBSyxDQUFFQyxNQUFNLEdBQUcsQ0FBWCxDQUFMLEdBQXNCN0wsRUFBRSxDQUFFLENBQUYsQ0FBeEI7QUFDQTRMLElBQUFBLEtBQUssQ0FBRUMsTUFBTSxHQUFHLENBQVgsQ0FBTCxHQUFzQjdMLEVBQUUsQ0FBRSxDQUFGLENBQXhCO0FBRUE0TCxJQUFBQSxLQUFLLENBQUVDLE1BQU0sR0FBRyxDQUFYLENBQUwsR0FBc0I3TCxFQUFFLENBQUUsQ0FBRixDQUF4QjtBQUNBNEwsSUFBQUEsS0FBSyxDQUFFQyxNQUFNLEdBQUcsQ0FBWCxDQUFMLEdBQXNCN0wsRUFBRSxDQUFFLENBQUYsQ0FBeEI7QUFDQTRMLElBQUFBLEtBQUssQ0FBRUMsTUFBTSxHQUFHLEVBQVgsQ0FBTCxHQUF1QjdMLEVBQUUsQ0FBRSxFQUFGLENBQXpCO0FBQ0E0TCxJQUFBQSxLQUFLLENBQUVDLE1BQU0sR0FBRyxFQUFYLENBQUwsR0FBdUI3TCxFQUFFLENBQUUsRUFBRixDQUF6QjtBQUVBNEwsSUFBQUEsS0FBSyxDQUFFQyxNQUFNLEdBQUcsRUFBWCxDQUFMLEdBQXVCN0wsRUFBRSxDQUFFLEVBQUYsQ0FBekI7QUFDQTRMLElBQUFBLEtBQUssQ0FBRUMsTUFBTSxHQUFHLEVBQVgsQ0FBTCxHQUF1QjdMLEVBQUUsQ0FBRSxFQUFGLENBQXpCO0FBQ0E0TCxJQUFBQSxLQUFLLENBQUVDLE1BQU0sR0FBRyxFQUFYLENBQUwsR0FBdUI3TCxFQUFFLENBQUUsRUFBRixDQUF6QjtBQUNBNEwsSUFBQUEsS0FBSyxDQUFFQyxNQUFNLEdBQUcsRUFBWCxDQUFMLEdBQXVCN0wsRUFBRSxDQUFFLEVBQUYsQ0FBekI7QUFFQSxXQUFPNEwsS0FBUDtBQUVBO0FBNTRCZ0MsQ0FBbEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi9WZWN0b3IzLmpzJztcblxuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICogQGF1dGhvciBzdXBlcmVnZ2JlcnQgLyBodHRwOi8vd3d3LnBhdWxicnVudC5jby51ay9cbiAqIEBhdXRob3IgcGhpbG9nYiAvIGh0dHA6Ly9ibG9nLnRoZWppdC5vcmcvXG4gKiBAYXV0aG9yIGpvcmRpX3JvcyAvIGh0dHA6Ly9wbGF0dHNvZnQuY29tXG4gKiBAYXV0aG9yIEQxcGxvMWQgLyBodHRwOi8vZ2l0aHViLmNvbS9EMXBsbzFkXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICogQGF1dGhvciBtaWthZWwgZW10aW5nZXIgLyBodHRwOi8vZ29tby5zZS9cbiAqIEBhdXRob3IgdGlta25pcCAvIGh0dHA6Ly93d3cuZmxvb3JwbGFubmVyLmNvbS9cbiAqIEBhdXRob3IgYmhvdXN0b24gLyBodHRwOi8vY2xhcmEuaW9cbiAqIEBhdXRob3IgV2VzdExhbmdsZXkgLyBodHRwOi8vZ2l0aHViLmNvbS9XZXN0TGFuZ2xleVxuICovXG5cbmZ1bmN0aW9uIE1hdHJpeDQoKSB7XG5cblx0dGhpcy5lbGVtZW50cyA9IFtcblxuXHRcdDEsIDAsIDAsIDAsXG5cdFx0MCwgMSwgMCwgMCxcblx0XHQwLCAwLCAxLCAwLFxuXHRcdDAsIDAsIDAsIDFcblxuXHRdO1xuXG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCA+IDAgKSB7XG5cblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4NDogdGhlIGNvbnN0cnVjdG9yIG5vIGxvbmdlciByZWFkcyBhcmd1bWVudHMuIHVzZSAuc2V0KCkgaW5zdGVhZC4nICk7XG5cblx0fVxuXG59XG5cbk9iamVjdC5hc3NpZ24oIE1hdHJpeDQucHJvdG90eXBlLCB7XG5cblx0aXNNYXRyaXg0OiB0cnVlLFxuXG5cdHNldDogZnVuY3Rpb24gKCBuMTEsIG4xMiwgbjEzLCBuMTQsIG4yMSwgbjIyLCBuMjMsIG4yNCwgbjMxLCBuMzIsIG4zMywgbjM0LCBuNDEsIG40MiwgbjQzLCBuNDQgKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0dGVbIDAgXSA9IG4xMTsgdGVbIDQgXSA9IG4xMjsgdGVbIDggXSA9IG4xMzsgdGVbIDEyIF0gPSBuMTQ7XG5cdFx0dGVbIDEgXSA9IG4yMTsgdGVbIDUgXSA9IG4yMjsgdGVbIDkgXSA9IG4yMzsgdGVbIDEzIF0gPSBuMjQ7XG5cdFx0dGVbIDIgXSA9IG4zMTsgdGVbIDYgXSA9IG4zMjsgdGVbIDEwIF0gPSBuMzM7IHRlWyAxNCBdID0gbjM0O1xuXHRcdHRlWyAzIF0gPSBuNDE7IHRlWyA3IF0gPSBuNDI7IHRlWyAxMSBdID0gbjQzOyB0ZVsgMTUgXSA9IG40NDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0aWRlbnRpdHk6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHQxLCAwLCAwLCAwLFxuXHRcdFx0MCwgMSwgMCwgMCxcblx0XHRcdDAsIDAsIDEsIDAsXG5cdFx0XHQwLCAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRjbG9uZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIG5ldyBNYXRyaXg0KCkuZnJvbUFycmF5KCB0aGlzLmVsZW1lbnRzICk7XG5cblx0fSxcblxuXHRjb3B5OiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXHRcdHZhciBtZSA9IG0uZWxlbWVudHM7XG5cblx0XHR0ZVsgMCBdID0gbWVbIDAgXTsgdGVbIDEgXSA9IG1lWyAxIF07IHRlWyAyIF0gPSBtZVsgMiBdOyB0ZVsgMyBdID0gbWVbIDMgXTtcblx0XHR0ZVsgNCBdID0gbWVbIDQgXTsgdGVbIDUgXSA9IG1lWyA1IF07IHRlWyA2IF0gPSBtZVsgNiBdOyB0ZVsgNyBdID0gbWVbIDcgXTtcblx0XHR0ZVsgOCBdID0gbWVbIDggXTsgdGVbIDkgXSA9IG1lWyA5IF07IHRlWyAxMCBdID0gbWVbIDEwIF07IHRlWyAxMSBdID0gbWVbIDExIF07XG5cdFx0dGVbIDEyIF0gPSBtZVsgMTIgXTsgdGVbIDEzIF0gPSBtZVsgMTMgXTsgdGVbIDE0IF0gPSBtZVsgMTQgXTsgdGVbIDE1IF0gPSBtZVsgMTUgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y29weVBvc2l0aW9uOiBmdW5jdGlvbiAoIG0gKSB7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzLCBtZSA9IG0uZWxlbWVudHM7XG5cblx0XHR0ZVsgMTIgXSA9IG1lWyAxMiBdO1xuXHRcdHRlWyAxMyBdID0gbWVbIDEzIF07XG5cdFx0dGVbIDE0IF0gPSBtZVsgMTQgXTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZXh0cmFjdEJhc2lzOiBmdW5jdGlvbiAoIHhBeGlzLCB5QXhpcywgekF4aXMgKSB7XG5cblx0XHR4QXhpcy5zZXRGcm9tTWF0cml4Q29sdW1uKCB0aGlzLCAwICk7XG5cdFx0eUF4aXMuc2V0RnJvbU1hdHJpeENvbHVtbiggdGhpcywgMSApO1xuXHRcdHpBeGlzLnNldEZyb21NYXRyaXhDb2x1bW4oIHRoaXMsIDIgKTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZUJhc2lzOiBmdW5jdGlvbiAoIHhBeGlzLCB5QXhpcywgekF4aXMgKSB7XG5cblx0XHR0aGlzLnNldChcblx0XHRcdHhBeGlzLngsIHlBeGlzLngsIHpBeGlzLngsIDAsXG5cdFx0XHR4QXhpcy55LCB5QXhpcy55LCB6QXhpcy55LCAwLFxuXHRcdFx0eEF4aXMueiwgeUF4aXMueiwgekF4aXMueiwgMCxcblx0XHRcdDAsIDAsIDAsIDFcblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRleHRyYWN0Um90YXRpb246IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MSA9IG5ldyBWZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gZXh0cmFjdFJvdGF0aW9uKCBtICkge1xuXG5cdFx0XHQvLyB0aGlzIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0IHJlZmxlY3Rpb24gbWF0cmljZXNcblxuXHRcdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHRcdHZhciBtZSA9IG0uZWxlbWVudHM7XG5cblx0XHRcdHZhciBzY2FsZVggPSAxIC8gdjEuc2V0RnJvbU1hdHJpeENvbHVtbiggbSwgMCApLmxlbmd0aCgpO1xuXHRcdFx0dmFyIHNjYWxlWSA9IDEgLyB2MS5zZXRGcm9tTWF0cml4Q29sdW1uKCBtLCAxICkubGVuZ3RoKCk7XG5cdFx0XHR2YXIgc2NhbGVaID0gMSAvIHYxLnNldEZyb21NYXRyaXhDb2x1bW4oIG0sIDIgKS5sZW5ndGgoKTtcblxuXHRcdFx0dGVbIDAgXSA9IG1lWyAwIF0gKiBzY2FsZVg7XG5cdFx0XHR0ZVsgMSBdID0gbWVbIDEgXSAqIHNjYWxlWDtcblx0XHRcdHRlWyAyIF0gPSBtZVsgMiBdICogc2NhbGVYO1xuXHRcdFx0dGVbIDMgXSA9IDA7XG5cblx0XHRcdHRlWyA0IF0gPSBtZVsgNCBdICogc2NhbGVZO1xuXHRcdFx0dGVbIDUgXSA9IG1lWyA1IF0gKiBzY2FsZVk7XG5cdFx0XHR0ZVsgNiBdID0gbWVbIDYgXSAqIHNjYWxlWTtcblx0XHRcdHRlWyA3IF0gPSAwO1xuXG5cdFx0XHR0ZVsgOCBdID0gbWVbIDggXSAqIHNjYWxlWjtcblx0XHRcdHRlWyA5IF0gPSBtZVsgOSBdICogc2NhbGVaO1xuXHRcdFx0dGVbIDEwIF0gPSBtZVsgMTAgXSAqIHNjYWxlWjtcblx0XHRcdHRlWyAxMSBdID0gMDtcblxuXHRcdFx0dGVbIDEyIF0gPSAwO1xuXHRcdFx0dGVbIDEzIF0gPSAwO1xuXHRcdFx0dGVbIDE0IF0gPSAwO1xuXHRcdFx0dGVbIDE1IF0gPSAxO1xuXG5cdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdH07XG5cblx0fSgpLFxuXG5cdG1ha2VSb3RhdGlvbkZyb21FdWxlcjogZnVuY3Rpb24gKCBldWxlciApIHtcblxuXHRcdGlmICggISAoIGV1bGVyICYmIGV1bGVyLmlzRXVsZXIgKSApIHtcblxuXHRcdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDQ6IC5tYWtlUm90YXRpb25Gcm9tRXVsZXIoKSBub3cgZXhwZWN0cyBhIEV1bGVyIHJvdGF0aW9uIHJhdGhlciB0aGFuIGEgVmVjdG9yMyBhbmQgb3JkZXIuJyApO1xuXG5cdFx0fVxuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciB4ID0gZXVsZXIueCwgeSA9IGV1bGVyLnksIHogPSBldWxlci56O1xuXHRcdHZhciBhID0gTWF0aC5jb3MoIHggKSwgYiA9IE1hdGguc2luKCB4ICk7XG5cdFx0dmFyIGMgPSBNYXRoLmNvcyggeSApLCBkID0gTWF0aC5zaW4oIHkgKTtcblx0XHR2YXIgZSA9IE1hdGguY29zKCB6ICksIGYgPSBNYXRoLnNpbiggeiApO1xuXG5cdFx0aWYgKCBldWxlci5vcmRlciA9PT0gJ1hZWicgKSB7XG5cblx0XHRcdHZhciBhZSA9IGEgKiBlLCBhZiA9IGEgKiBmLCBiZSA9IGIgKiBlLCBiZiA9IGIgKiBmO1xuXG5cdFx0XHR0ZVsgMCBdID0gYyAqIGU7XG5cdFx0XHR0ZVsgNCBdID0gLSBjICogZjtcblx0XHRcdHRlWyA4IF0gPSBkO1xuXG5cdFx0XHR0ZVsgMSBdID0gYWYgKyBiZSAqIGQ7XG5cdFx0XHR0ZVsgNSBdID0gYWUgLSBiZiAqIGQ7XG5cdFx0XHR0ZVsgOSBdID0gLSBiICogYztcblxuXHRcdFx0dGVbIDIgXSA9IGJmIC0gYWUgKiBkO1xuXHRcdFx0dGVbIDYgXSA9IGJlICsgYWYgKiBkO1xuXHRcdFx0dGVbIDEwIF0gPSBhICogYztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWVhaJyApIHtcblxuXHRcdFx0dmFyIGNlID0gYyAqIGUsIGNmID0gYyAqIGYsIGRlID0gZCAqIGUsIGRmID0gZCAqIGY7XG5cblx0XHRcdHRlWyAwIF0gPSBjZSArIGRmICogYjtcblx0XHRcdHRlWyA0IF0gPSBkZSAqIGIgLSBjZjtcblx0XHRcdHRlWyA4IF0gPSBhICogZDtcblxuXHRcdFx0dGVbIDEgXSA9IGEgKiBmO1xuXHRcdFx0dGVbIDUgXSA9IGEgKiBlO1xuXHRcdFx0dGVbIDkgXSA9IC0gYjtcblxuXHRcdFx0dGVbIDIgXSA9IGNmICogYiAtIGRlO1xuXHRcdFx0dGVbIDYgXSA9IGRmICsgY2UgKiBiO1xuXHRcdFx0dGVbIDEwIF0gPSBhICogYztcblxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWlhZJyApIHtcblxuXHRcdFx0dmFyIGNlID0gYyAqIGUsIGNmID0gYyAqIGYsIGRlID0gZCAqIGUsIGRmID0gZCAqIGY7XG5cblx0XHRcdHRlWyAwIF0gPSBjZSAtIGRmICogYjtcblx0XHRcdHRlWyA0IF0gPSAtIGEgKiBmO1xuXHRcdFx0dGVbIDggXSA9IGRlICsgY2YgKiBiO1xuXG5cdFx0XHR0ZVsgMSBdID0gY2YgKyBkZSAqIGI7XG5cdFx0XHR0ZVsgNSBdID0gYSAqIGU7XG5cdFx0XHR0ZVsgOSBdID0gZGYgLSBjZSAqIGI7XG5cblx0XHRcdHRlWyAyIF0gPSAtIGEgKiBkO1xuXHRcdFx0dGVbIDYgXSA9IGI7XG5cdFx0XHR0ZVsgMTAgXSA9IGEgKiBjO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdaWVgnICkge1xuXG5cdFx0XHR2YXIgYWUgPSBhICogZSwgYWYgPSBhICogZiwgYmUgPSBiICogZSwgYmYgPSBiICogZjtcblxuXHRcdFx0dGVbIDAgXSA9IGMgKiBlO1xuXHRcdFx0dGVbIDQgXSA9IGJlICogZCAtIGFmO1xuXHRcdFx0dGVbIDggXSA9IGFlICogZCArIGJmO1xuXG5cdFx0XHR0ZVsgMSBdID0gYyAqIGY7XG5cdFx0XHR0ZVsgNSBdID0gYmYgKiBkICsgYWU7XG5cdFx0XHR0ZVsgOSBdID0gYWYgKiBkIC0gYmU7XG5cblx0XHRcdHRlWyAyIF0gPSAtIGQ7XG5cdFx0XHR0ZVsgNiBdID0gYiAqIGM7XG5cdFx0XHR0ZVsgMTAgXSA9IGEgKiBjO1xuXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdZWlgnICkge1xuXG5cdFx0XHR2YXIgYWMgPSBhICogYywgYWQgPSBhICogZCwgYmMgPSBiICogYywgYmQgPSBiICogZDtcblxuXHRcdFx0dGVbIDAgXSA9IGMgKiBlO1xuXHRcdFx0dGVbIDQgXSA9IGJkIC0gYWMgKiBmO1xuXHRcdFx0dGVbIDggXSA9IGJjICogZiArIGFkO1xuXG5cdFx0XHR0ZVsgMSBdID0gZjtcblx0XHRcdHRlWyA1IF0gPSBhICogZTtcblx0XHRcdHRlWyA5IF0gPSAtIGIgKiBlO1xuXG5cdFx0XHR0ZVsgMiBdID0gLSBkICogZTtcblx0XHRcdHRlWyA2IF0gPSBhZCAqIGYgKyBiYztcblx0XHRcdHRlWyAxMCBdID0gYWMgLSBiZCAqIGY7XG5cblx0XHR9IGVsc2UgaWYgKCBldWxlci5vcmRlciA9PT0gJ1haWScgKSB7XG5cblx0XHRcdHZhciBhYyA9IGEgKiBjLCBhZCA9IGEgKiBkLCBiYyA9IGIgKiBjLCBiZCA9IGIgKiBkO1xuXG5cdFx0XHR0ZVsgMCBdID0gYyAqIGU7XG5cdFx0XHR0ZVsgNCBdID0gLSBmO1xuXHRcdFx0dGVbIDggXSA9IGQgKiBlO1xuXG5cdFx0XHR0ZVsgMSBdID0gYWMgKiBmICsgYmQ7XG5cdFx0XHR0ZVsgNSBdID0gYSAqIGU7XG5cdFx0XHR0ZVsgOSBdID0gYWQgKiBmIC0gYmM7XG5cblx0XHRcdHRlWyAyIF0gPSBiYyAqIGYgLSBhZDtcblx0XHRcdHRlWyA2IF0gPSBiICogZTtcblx0XHRcdHRlWyAxMCBdID0gYmQgKiBmICsgYWM7XG5cblx0XHR9XG5cblx0XHQvLyBib3R0b20gcm93XG5cdFx0dGVbIDMgXSA9IDA7XG5cdFx0dGVbIDcgXSA9IDA7XG5cdFx0dGVbIDExIF0gPSAwO1xuXG5cdFx0Ly8gbGFzdCBjb2x1bW5cblx0XHR0ZVsgMTIgXSA9IDA7XG5cdFx0dGVbIDEzIF0gPSAwO1xuXHRcdHRlWyAxNCBdID0gMDtcblx0XHR0ZVsgMTUgXSA9IDE7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VSb3RhdGlvbkZyb21RdWF0ZXJuaW9uOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgemVybyA9IG5ldyBWZWN0b3IzKCAwLCAwLCAwICk7XG5cdFx0dmFyIG9uZSA9IG5ldyBWZWN0b3IzKCAxLCAxLCAxICk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gbWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oIHEgKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLmNvbXBvc2UoIHplcm8sIHEsIG9uZSApO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0bG9va0F0OiBmdW5jdGlvbiAoKSB7XG5cblx0XHR2YXIgeCA9IG5ldyBWZWN0b3IzKCk7XG5cdFx0dmFyIHkgPSBuZXcgVmVjdG9yMygpO1xuXHRcdHZhciB6ID0gbmV3IFZlY3RvcjMoKTtcblxuXHRcdHJldHVybiBmdW5jdGlvbiBsb29rQXQoIGV5ZSwgdGFyZ2V0LCB1cCApIHtcblxuXHRcdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdFx0ei5zdWJWZWN0b3JzKCBleWUsIHRhcmdldCApO1xuXG5cdFx0XHRpZiAoIHoubGVuZ3RoU3EoKSA9PT0gMCApIHtcblxuXHRcdFx0XHQvLyBleWUgYW5kIHRhcmdldCBhcmUgaW4gdGhlIHNhbWUgcG9zaXRpb25cblxuXHRcdFx0XHR6LnogPSAxO1xuXG5cdFx0XHR9XG5cblx0XHRcdHoubm9ybWFsaXplKCk7XG5cdFx0XHR4LmNyb3NzVmVjdG9ycyggdXAsIHogKTtcblxuXHRcdFx0aWYgKCB4Lmxlbmd0aFNxKCkgPT09IDAgKSB7XG5cblx0XHRcdFx0Ly8gdXAgYW5kIHogYXJlIHBhcmFsbGVsXG5cblx0XHRcdFx0aWYgKCBNYXRoLmFicyggdXAueiApID09PSAxICkge1xuXG5cdFx0XHRcdFx0ei54ICs9IDAuMDAwMTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0ei56ICs9IDAuMDAwMTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ei5ub3JtYWxpemUoKTtcblx0XHRcdFx0eC5jcm9zc1ZlY3RvcnMoIHVwLCB6ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0eC5ub3JtYWxpemUoKTtcblx0XHRcdHkuY3Jvc3NWZWN0b3JzKCB6LCB4ICk7XG5cblx0XHRcdHRlWyAwIF0gPSB4Lng7IHRlWyA0IF0gPSB5Lng7IHRlWyA4IF0gPSB6Lng7XG5cdFx0XHR0ZVsgMSBdID0geC55OyB0ZVsgNSBdID0geS55OyB0ZVsgOSBdID0gei55O1xuXHRcdFx0dGVbIDIgXSA9IHguejsgdGVbIDYgXSA9IHkuejsgdGVbIDEwIF0gPSB6Lno7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0bXVsdGlwbHk6IGZ1bmN0aW9uICggbSwgbiApIHtcblxuXHRcdGlmICggbiAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAubXVsdGlwbHkoKSBub3cgb25seSBhY2NlcHRzIG9uZSBhcmd1bWVudC4gVXNlIC5tdWx0aXBseU1hdHJpY2VzKCBhLCBiICkgaW5zdGVhZC4nICk7XG5cdFx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseU1hdHJpY2VzKCBtLCBuICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseU1hdHJpY2VzKCB0aGlzLCBtICk7XG5cblx0fSxcblxuXHRwcmVtdWx0aXBseTogZnVuY3Rpb24gKCBtICkge1xuXG5cdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlNYXRyaWNlcyggbSwgdGhpcyApO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlNYXRyaWNlczogZnVuY3Rpb24gKCBhLCBiICkge1xuXG5cdFx0dmFyIGFlID0gYS5lbGVtZW50cztcblx0XHR2YXIgYmUgPSBiLmVsZW1lbnRzO1xuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR2YXIgYTExID0gYWVbIDAgXSwgYTEyID0gYWVbIDQgXSwgYTEzID0gYWVbIDggXSwgYTE0ID0gYWVbIDEyIF07XG5cdFx0dmFyIGEyMSA9IGFlWyAxIF0sIGEyMiA9IGFlWyA1IF0sIGEyMyA9IGFlWyA5IF0sIGEyNCA9IGFlWyAxMyBdO1xuXHRcdHZhciBhMzEgPSBhZVsgMiBdLCBhMzIgPSBhZVsgNiBdLCBhMzMgPSBhZVsgMTAgXSwgYTM0ID0gYWVbIDE0IF07XG5cdFx0dmFyIGE0MSA9IGFlWyAzIF0sIGE0MiA9IGFlWyA3IF0sIGE0MyA9IGFlWyAxMSBdLCBhNDQgPSBhZVsgMTUgXTtcblxuXHRcdHZhciBiMTEgPSBiZVsgMCBdLCBiMTIgPSBiZVsgNCBdLCBiMTMgPSBiZVsgOCBdLCBiMTQgPSBiZVsgMTIgXTtcblx0XHR2YXIgYjIxID0gYmVbIDEgXSwgYjIyID0gYmVbIDUgXSwgYjIzID0gYmVbIDkgXSwgYjI0ID0gYmVbIDEzIF07XG5cdFx0dmFyIGIzMSA9IGJlWyAyIF0sIGIzMiA9IGJlWyA2IF0sIGIzMyA9IGJlWyAxMCBdLCBiMzQgPSBiZVsgMTQgXTtcblx0XHR2YXIgYjQxID0gYmVbIDMgXSwgYjQyID0gYmVbIDcgXSwgYjQzID0gYmVbIDExIF0sIGI0NCA9IGJlWyAxNSBdO1xuXG5cdFx0dGVbIDAgXSA9IGExMSAqIGIxMSArIGExMiAqIGIyMSArIGExMyAqIGIzMSArIGExNCAqIGI0MTtcblx0XHR0ZVsgNCBdID0gYTExICogYjEyICsgYTEyICogYjIyICsgYTEzICogYjMyICsgYTE0ICogYjQyO1xuXHRcdHRlWyA4IF0gPSBhMTEgKiBiMTMgKyBhMTIgKiBiMjMgKyBhMTMgKiBiMzMgKyBhMTQgKiBiNDM7XG5cdFx0dGVbIDEyIF0gPSBhMTEgKiBiMTQgKyBhMTIgKiBiMjQgKyBhMTMgKiBiMzQgKyBhMTQgKiBiNDQ7XG5cblx0XHR0ZVsgMSBdID0gYTIxICogYjExICsgYTIyICogYjIxICsgYTIzICogYjMxICsgYTI0ICogYjQxO1xuXHRcdHRlWyA1IF0gPSBhMjEgKiBiMTIgKyBhMjIgKiBiMjIgKyBhMjMgKiBiMzIgKyBhMjQgKiBiNDI7XG5cdFx0dGVbIDkgXSA9IGEyMSAqIGIxMyArIGEyMiAqIGIyMyArIGEyMyAqIGIzMyArIGEyNCAqIGI0Mztcblx0XHR0ZVsgMTMgXSA9IGEyMSAqIGIxNCArIGEyMiAqIGIyNCArIGEyMyAqIGIzNCArIGEyNCAqIGI0NDtcblxuXHRcdHRlWyAyIF0gPSBhMzEgKiBiMTEgKyBhMzIgKiBiMjEgKyBhMzMgKiBiMzEgKyBhMzQgKiBiNDE7XG5cdFx0dGVbIDYgXSA9IGEzMSAqIGIxMiArIGEzMiAqIGIyMiArIGEzMyAqIGIzMiArIGEzNCAqIGI0Mjtcblx0XHR0ZVsgMTAgXSA9IGEzMSAqIGIxMyArIGEzMiAqIGIyMyArIGEzMyAqIGIzMyArIGEzNCAqIGI0Mztcblx0XHR0ZVsgMTQgXSA9IGEzMSAqIGIxNCArIGEzMiAqIGIyNCArIGEzMyAqIGIzNCArIGEzNCAqIGI0NDtcblxuXHRcdHRlWyAzIF0gPSBhNDEgKiBiMTEgKyBhNDIgKiBiMjEgKyBhNDMgKiBiMzEgKyBhNDQgKiBiNDE7XG5cdFx0dGVbIDcgXSA9IGE0MSAqIGIxMiArIGE0MiAqIGIyMiArIGE0MyAqIGIzMiArIGE0NCAqIGI0Mjtcblx0XHR0ZVsgMTEgXSA9IGE0MSAqIGIxMyArIGE0MiAqIGIyMyArIGE0MyAqIGIzMyArIGE0NCAqIGI0Mztcblx0XHR0ZVsgMTUgXSA9IGE0MSAqIGIxNCArIGE0MiAqIGIyNCArIGE0MyAqIGIzNCArIGE0NCAqIGI0NDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bXVsdGlwbHlTY2FsYXI6IGZ1bmN0aW9uICggcyApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR0ZVsgMCBdICo9IHM7IHRlWyA0IF0gKj0gczsgdGVbIDggXSAqPSBzOyB0ZVsgMTIgXSAqPSBzO1xuXHRcdHRlWyAxIF0gKj0gczsgdGVbIDUgXSAqPSBzOyB0ZVsgOSBdICo9IHM7IHRlWyAxMyBdICo9IHM7XG5cdFx0dGVbIDIgXSAqPSBzOyB0ZVsgNiBdICo9IHM7IHRlWyAxMCBdICo9IHM7IHRlWyAxNCBdICo9IHM7XG5cdFx0dGVbIDMgXSAqPSBzOyB0ZVsgNyBdICo9IHM7IHRlWyAxMSBdICo9IHM7IHRlWyAxNSBdICo9IHM7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGFwcGx5VG9CdWZmZXJBdHRyaWJ1dGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2MSA9IG5ldyBWZWN0b3IzKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gYXBwbHlUb0J1ZmZlckF0dHJpYnV0ZSggYXR0cmlidXRlICkge1xuXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGwgPSBhdHRyaWJ1dGUuY291bnQ7IGkgPCBsOyBpICsrICkge1xuXG5cdFx0XHRcdHYxLnggPSBhdHRyaWJ1dGUuZ2V0WCggaSApO1xuXHRcdFx0XHR2MS55ID0gYXR0cmlidXRlLmdldFkoIGkgKTtcblx0XHRcdFx0djEueiA9IGF0dHJpYnV0ZS5nZXRaKCBpICk7XG5cblx0XHRcdFx0djEuYXBwbHlNYXRyaXg0KCB0aGlzICk7XG5cblx0XHRcdFx0YXR0cmlidXRlLnNldFhZWiggaSwgdjEueCwgdjEueSwgdjEueiApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhdHRyaWJ1dGU7XG5cblx0XHR9O1xuXG5cdH0oKSxcblxuXHRkZXRlcm1pbmFudDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciBuMTEgPSB0ZVsgMCBdLCBuMTIgPSB0ZVsgNCBdLCBuMTMgPSB0ZVsgOCBdLCBuMTQgPSB0ZVsgMTIgXTtcblx0XHR2YXIgbjIxID0gdGVbIDEgXSwgbjIyID0gdGVbIDUgXSwgbjIzID0gdGVbIDkgXSwgbjI0ID0gdGVbIDEzIF07XG5cdFx0dmFyIG4zMSA9IHRlWyAyIF0sIG4zMiA9IHRlWyA2IF0sIG4zMyA9IHRlWyAxMCBdLCBuMzQgPSB0ZVsgMTQgXTtcblx0XHR2YXIgbjQxID0gdGVbIDMgXSwgbjQyID0gdGVbIDcgXSwgbjQzID0gdGVbIDExIF0sIG40NCA9IHRlWyAxNSBdO1xuXG5cdFx0Ly9UT0RPOiBtYWtlIHRoaXMgbW9yZSBlZmZpY2llbnRcblx0XHQvLyggYmFzZWQgb24gaHR0cDovL3d3dy5ldWNsaWRlYW5zcGFjZS5jb20vbWF0aHMvYWxnZWJyYS9tYXRyaXgvZnVuY3Rpb25zL2ludmVyc2UvZm91ckQvaW5kZXguaHRtIClcblxuXHRcdHJldHVybiAoXG5cdFx0XHRuNDEgKiAoXG5cdFx0XHRcdCsgbjE0ICogbjIzICogbjMyXG5cdFx0XHRcdCAtIG4xMyAqIG4yNCAqIG4zMlxuXHRcdFx0XHQgLSBuMTQgKiBuMjIgKiBuMzNcblx0XHRcdFx0ICsgbjEyICogbjI0ICogbjMzXG5cdFx0XHRcdCArIG4xMyAqIG4yMiAqIG4zNFxuXHRcdFx0XHQgLSBuMTIgKiBuMjMgKiBuMzRcblx0XHRcdCkgK1xuXHRcdFx0bjQyICogKFxuXHRcdFx0XHQrIG4xMSAqIG4yMyAqIG4zNFxuXHRcdFx0XHQgLSBuMTEgKiBuMjQgKiBuMzNcblx0XHRcdFx0ICsgbjE0ICogbjIxICogbjMzXG5cdFx0XHRcdCAtIG4xMyAqIG4yMSAqIG4zNFxuXHRcdFx0XHQgKyBuMTMgKiBuMjQgKiBuMzFcblx0XHRcdFx0IC0gbjE0ICogbjIzICogbjMxXG5cdFx0XHQpICtcblx0XHRcdG40MyAqIChcblx0XHRcdFx0KyBuMTEgKiBuMjQgKiBuMzJcblx0XHRcdFx0IC0gbjExICogbjIyICogbjM0XG5cdFx0XHRcdCAtIG4xNCAqIG4yMSAqIG4zMlxuXHRcdFx0XHQgKyBuMTIgKiBuMjEgKiBuMzRcblx0XHRcdFx0ICsgbjE0ICogbjIyICogbjMxXG5cdFx0XHRcdCAtIG4xMiAqIG4yNCAqIG4zMVxuXHRcdFx0KSArXG5cdFx0XHRuNDQgKiAoXG5cdFx0XHRcdC0gbjEzICogbjIyICogbjMxXG5cdFx0XHRcdCAtIG4xMSAqIG4yMyAqIG4zMlxuXHRcdFx0XHQgKyBuMTEgKiBuMjIgKiBuMzNcblx0XHRcdFx0ICsgbjEzICogbjIxICogbjMyXG5cdFx0XHRcdCAtIG4xMiAqIG4yMSAqIG4zM1xuXHRcdFx0XHQgKyBuMTIgKiBuMjMgKiBuMzFcblx0XHRcdClcblxuXHRcdCk7XG5cblx0fSxcblxuXHR0cmFuc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0dmFyIHRtcDtcblxuXHRcdHRtcCA9IHRlWyAxIF07IHRlWyAxIF0gPSB0ZVsgNCBdOyB0ZVsgNCBdID0gdG1wO1xuXHRcdHRtcCA9IHRlWyAyIF07IHRlWyAyIF0gPSB0ZVsgOCBdOyB0ZVsgOCBdID0gdG1wO1xuXHRcdHRtcCA9IHRlWyA2IF07IHRlWyA2IF0gPSB0ZVsgOSBdOyB0ZVsgOSBdID0gdG1wO1xuXG5cdFx0dG1wID0gdGVbIDMgXTsgdGVbIDMgXSA9IHRlWyAxMiBdOyB0ZVsgMTIgXSA9IHRtcDtcblx0XHR0bXAgPSB0ZVsgNyBdOyB0ZVsgNyBdID0gdGVbIDEzIF07IHRlWyAxMyBdID0gdG1wO1xuXHRcdHRtcCA9IHRlWyAxMSBdOyB0ZVsgMTEgXSA9IHRlWyAxNCBdOyB0ZVsgMTQgXSA9IHRtcDtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c2V0UG9zaXRpb246IGZ1bmN0aW9uICggeCwgeSwgeiApIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHRpZiAoIHguaXNWZWN0b3IzICkge1xuXG5cdFx0XHR0ZVsgMTIgXSA9IHgueDtcblx0XHRcdHRlWyAxMyBdID0geC55O1xuXHRcdFx0dGVbIDE0IF0gPSB4Lno7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0ZVsgMTIgXSA9IHg7XG5cdFx0XHR0ZVsgMTMgXSA9IHk7XG5cdFx0XHR0ZVsgMTQgXSA9IHo7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGdldEludmVyc2U6IGZ1bmN0aW9uICggbSwgdGhyb3dPbkRlZ2VuZXJhdGUgKSB7XG5cblx0XHQvLyBiYXNlZCBvbiBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9hbGdlYnJhL21hdHJpeC9mdW5jdGlvbnMvaW52ZXJzZS9mb3VyRC9pbmRleC5odG1cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzLFxuXHRcdFx0bWUgPSBtLmVsZW1lbnRzLFxuXG5cdFx0XHRuMTEgPSBtZVsgMCBdLCBuMjEgPSBtZVsgMSBdLCBuMzEgPSBtZVsgMiBdLCBuNDEgPSBtZVsgMyBdLFxuXHRcdFx0bjEyID0gbWVbIDQgXSwgbjIyID0gbWVbIDUgXSwgbjMyID0gbWVbIDYgXSwgbjQyID0gbWVbIDcgXSxcblx0XHRcdG4xMyA9IG1lWyA4IF0sIG4yMyA9IG1lWyA5IF0sIG4zMyA9IG1lWyAxMCBdLCBuNDMgPSBtZVsgMTEgXSxcblx0XHRcdG4xNCA9IG1lWyAxMiBdLCBuMjQgPSBtZVsgMTMgXSwgbjM0ID0gbWVbIDE0IF0sIG40NCA9IG1lWyAxNSBdLFxuXG5cdFx0XHR0MTEgPSBuMjMgKiBuMzQgKiBuNDIgLSBuMjQgKiBuMzMgKiBuNDIgKyBuMjQgKiBuMzIgKiBuNDMgLSBuMjIgKiBuMzQgKiBuNDMgLSBuMjMgKiBuMzIgKiBuNDQgKyBuMjIgKiBuMzMgKiBuNDQsXG5cdFx0XHR0MTIgPSBuMTQgKiBuMzMgKiBuNDIgLSBuMTMgKiBuMzQgKiBuNDIgLSBuMTQgKiBuMzIgKiBuNDMgKyBuMTIgKiBuMzQgKiBuNDMgKyBuMTMgKiBuMzIgKiBuNDQgLSBuMTIgKiBuMzMgKiBuNDQsXG5cdFx0XHR0MTMgPSBuMTMgKiBuMjQgKiBuNDIgLSBuMTQgKiBuMjMgKiBuNDIgKyBuMTQgKiBuMjIgKiBuNDMgLSBuMTIgKiBuMjQgKiBuNDMgLSBuMTMgKiBuMjIgKiBuNDQgKyBuMTIgKiBuMjMgKiBuNDQsXG5cdFx0XHR0MTQgPSBuMTQgKiBuMjMgKiBuMzIgLSBuMTMgKiBuMjQgKiBuMzIgLSBuMTQgKiBuMjIgKiBuMzMgKyBuMTIgKiBuMjQgKiBuMzMgKyBuMTMgKiBuMjIgKiBuMzQgLSBuMTIgKiBuMjMgKiBuMzQ7XG5cblx0XHR2YXIgZGV0ID0gbjExICogdDExICsgbjIxICogdDEyICsgbjMxICogdDEzICsgbjQxICogdDE0O1xuXG5cdFx0aWYgKCBkZXQgPT09IDAgKSB7XG5cblx0XHRcdHZhciBtc2cgPSBcIlRIUkVFLk1hdHJpeDQ6IC5nZXRJbnZlcnNlKCkgY2FuJ3QgaW52ZXJ0IG1hdHJpeCwgZGV0ZXJtaW5hbnQgaXMgMFwiO1xuXG5cdFx0XHRpZiAoIHRocm93T25EZWdlbmVyYXRlID09PSB0cnVlICkge1xuXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggbXNnICk7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCBtc2cgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcy5pZGVudGl0eSgpO1xuXG5cdFx0fVxuXG5cdFx0dmFyIGRldEludiA9IDEgLyBkZXQ7XG5cblx0XHR0ZVsgMCBdID0gdDExICogZGV0SW52O1xuXHRcdHRlWyAxIF0gPSAoIG4yNCAqIG4zMyAqIG40MSAtIG4yMyAqIG4zNCAqIG40MSAtIG4yNCAqIG4zMSAqIG40MyArIG4yMSAqIG4zNCAqIG40MyArIG4yMyAqIG4zMSAqIG40NCAtIG4yMSAqIG4zMyAqIG40NCApICogZGV0SW52O1xuXHRcdHRlWyAyIF0gPSAoIG4yMiAqIG4zNCAqIG40MSAtIG4yNCAqIG4zMiAqIG40MSArIG4yNCAqIG4zMSAqIG40MiAtIG4yMSAqIG4zNCAqIG40MiAtIG4yMiAqIG4zMSAqIG40NCArIG4yMSAqIG4zMiAqIG40NCApICogZGV0SW52O1xuXHRcdHRlWyAzIF0gPSAoIG4yMyAqIG4zMiAqIG40MSAtIG4yMiAqIG4zMyAqIG40MSAtIG4yMyAqIG4zMSAqIG40MiArIG4yMSAqIG4zMyAqIG40MiArIG4yMiAqIG4zMSAqIG40MyAtIG4yMSAqIG4zMiAqIG40MyApICogZGV0SW52O1xuXG5cdFx0dGVbIDQgXSA9IHQxMiAqIGRldEludjtcblx0XHR0ZVsgNSBdID0gKCBuMTMgKiBuMzQgKiBuNDEgLSBuMTQgKiBuMzMgKiBuNDEgKyBuMTQgKiBuMzEgKiBuNDMgLSBuMTEgKiBuMzQgKiBuNDMgLSBuMTMgKiBuMzEgKiBuNDQgKyBuMTEgKiBuMzMgKiBuNDQgKSAqIGRldEludjtcblx0XHR0ZVsgNiBdID0gKCBuMTQgKiBuMzIgKiBuNDEgLSBuMTIgKiBuMzQgKiBuNDEgLSBuMTQgKiBuMzEgKiBuNDIgKyBuMTEgKiBuMzQgKiBuNDIgKyBuMTIgKiBuMzEgKiBuNDQgLSBuMTEgKiBuMzIgKiBuNDQgKSAqIGRldEludjtcblx0XHR0ZVsgNyBdID0gKCBuMTIgKiBuMzMgKiBuNDEgLSBuMTMgKiBuMzIgKiBuNDEgKyBuMTMgKiBuMzEgKiBuNDIgLSBuMTEgKiBuMzMgKiBuNDIgLSBuMTIgKiBuMzEgKiBuNDMgKyBuMTEgKiBuMzIgKiBuNDMgKSAqIGRldEludjtcblxuXHRcdHRlWyA4IF0gPSB0MTMgKiBkZXRJbnY7XG5cdFx0dGVbIDkgXSA9ICggbjE0ICogbjIzICogbjQxIC0gbjEzICogbjI0ICogbjQxIC0gbjE0ICogbjIxICogbjQzICsgbjExICogbjI0ICogbjQzICsgbjEzICogbjIxICogbjQ0IC0gbjExICogbjIzICogbjQ0ICkgKiBkZXRJbnY7XG5cdFx0dGVbIDEwIF0gPSAoIG4xMiAqIG4yNCAqIG40MSAtIG4xNCAqIG4yMiAqIG40MSArIG4xNCAqIG4yMSAqIG40MiAtIG4xMSAqIG4yNCAqIG40MiAtIG4xMiAqIG4yMSAqIG40NCArIG4xMSAqIG4yMiAqIG40NCApICogZGV0SW52O1xuXHRcdHRlWyAxMSBdID0gKCBuMTMgKiBuMjIgKiBuNDEgLSBuMTIgKiBuMjMgKiBuNDEgLSBuMTMgKiBuMjEgKiBuNDIgKyBuMTEgKiBuMjMgKiBuNDIgKyBuMTIgKiBuMjEgKiBuNDMgLSBuMTEgKiBuMjIgKiBuNDMgKSAqIGRldEludjtcblxuXHRcdHRlWyAxMiBdID0gdDE0ICogZGV0SW52O1xuXHRcdHRlWyAxMyBdID0gKCBuMTMgKiBuMjQgKiBuMzEgLSBuMTQgKiBuMjMgKiBuMzEgKyBuMTQgKiBuMjEgKiBuMzMgLSBuMTEgKiBuMjQgKiBuMzMgLSBuMTMgKiBuMjEgKiBuMzQgKyBuMTEgKiBuMjMgKiBuMzQgKSAqIGRldEludjtcblx0XHR0ZVsgMTQgXSA9ICggbjE0ICogbjIyICogbjMxIC0gbjEyICogbjI0ICogbjMxIC0gbjE0ICogbjIxICogbjMyICsgbjExICogbjI0ICogbjMyICsgbjEyICogbjIxICogbjM0IC0gbjExICogbjIyICogbjM0ICkgKiBkZXRJbnY7XG5cdFx0dGVbIDE1IF0gPSAoIG4xMiAqIG4yMyAqIG4zMSAtIG4xMyAqIG4yMiAqIG4zMSArIG4xMyAqIG4yMSAqIG4zMiAtIG4xMSAqIG4yMyAqIG4zMiAtIG4xMiAqIG4yMSAqIG4zMyArIG4xMSAqIG4yMiAqIG4zMyApICogZGV0SW52O1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzY2FsZTogZnVuY3Rpb24gKCB2ICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgeCA9IHYueCwgeSA9IHYueSwgeiA9IHYuejtcblxuXHRcdHRlWyAwIF0gKj0geDsgdGVbIDQgXSAqPSB5OyB0ZVsgOCBdICo9IHo7XG5cdFx0dGVbIDEgXSAqPSB4OyB0ZVsgNSBdICo9IHk7IHRlWyA5IF0gKj0gejtcblx0XHR0ZVsgMiBdICo9IHg7IHRlWyA2IF0gKj0geTsgdGVbIDEwIF0gKj0gejtcblx0XHR0ZVsgMyBdICo9IHg7IHRlWyA3IF0gKj0geTsgdGVbIDExIF0gKj0gejtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Z2V0TWF4U2NhbGVPbkF4aXM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cblx0XHR2YXIgc2NhbGVYU3EgPSB0ZVsgMCBdICogdGVbIDAgXSArIHRlWyAxIF0gKiB0ZVsgMSBdICsgdGVbIDIgXSAqIHRlWyAyIF07XG5cdFx0dmFyIHNjYWxlWVNxID0gdGVbIDQgXSAqIHRlWyA0IF0gKyB0ZVsgNSBdICogdGVbIDUgXSArIHRlWyA2IF0gKiB0ZVsgNiBdO1xuXHRcdHZhciBzY2FsZVpTcSA9IHRlWyA4IF0gKiB0ZVsgOCBdICsgdGVbIDkgXSAqIHRlWyA5IF0gKyB0ZVsgMTAgXSAqIHRlWyAxMCBdO1xuXG5cdFx0cmV0dXJuIE1hdGguc3FydCggTWF0aC5tYXgoIHNjYWxlWFNxLCBzY2FsZVlTcSwgc2NhbGVaU3EgKSApO1xuXG5cdH0sXG5cblx0bWFrZVRyYW5zbGF0aW9uOiBmdW5jdGlvbiAoIHgsIHksIHogKSB7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0MSwgMCwgMCwgeCxcblx0XHRcdDAsIDEsIDAsIHksXG5cdFx0XHQwLCAwLCAxLCB6LFxuXHRcdFx0MCwgMCwgMCwgMVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZVJvdGF0aW9uWDogZnVuY3Rpb24gKCB0aGV0YSApIHtcblxuXHRcdHZhciBjID0gTWF0aC5jb3MoIHRoZXRhICksIHMgPSBNYXRoLnNpbiggdGhldGEgKTtcblxuXHRcdHRoaXMuc2V0KFxuXG5cdFx0XHQxLCAwLCAwLCAwLFxuXHRcdFx0MCwgYywgLSBzLCAwLFxuXHRcdFx0MCwgcywgYywgMCxcblx0XHRcdDAsIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VSb3RhdGlvblk6IGZ1bmN0aW9uICggdGhldGEgKSB7XG5cblx0XHR2YXIgYyA9IE1hdGguY29zKCB0aGV0YSApLCBzID0gTWF0aC5zaW4oIHRoZXRhICk7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0IGMsIDAsIHMsIDAsXG5cdFx0XHQgMCwgMSwgMCwgMCxcblx0XHRcdC0gcywgMCwgYywgMCxcblx0XHRcdCAwLCAwLCAwLCAxXG5cblx0XHQpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlUm90YXRpb25aOiBmdW5jdGlvbiAoIHRoZXRhICkge1xuXG5cdFx0dmFyIGMgPSBNYXRoLmNvcyggdGhldGEgKSwgcyA9IE1hdGguc2luKCB0aGV0YSApO1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdGMsIC0gcywgMCwgMCxcblx0XHRcdHMsIGMsIDAsIDAsXG5cdFx0XHQwLCAwLCAxLCAwLFxuXHRcdFx0MCwgMCwgMCwgMVxuXG5cdFx0KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0bWFrZVJvdGF0aW9uQXhpczogZnVuY3Rpb24gKCBheGlzLCBhbmdsZSApIHtcblxuXHRcdC8vIEJhc2VkIG9uIGh0dHA6Ly93d3cuZ2FtZWRldi5uZXQvcmVmZXJlbmNlL2FydGljbGVzL2FydGljbGUxMTk5LmFzcFxuXG5cdFx0dmFyIGMgPSBNYXRoLmNvcyggYW5nbGUgKTtcblx0XHR2YXIgcyA9IE1hdGguc2luKCBhbmdsZSApO1xuXHRcdHZhciB0ID0gMSAtIGM7XG5cdFx0dmFyIHggPSBheGlzLngsIHkgPSBheGlzLnksIHogPSBheGlzLno7XG5cdFx0dmFyIHR4ID0gdCAqIHgsIHR5ID0gdCAqIHk7XG5cblx0XHR0aGlzLnNldChcblxuXHRcdFx0dHggKiB4ICsgYywgdHggKiB5IC0gcyAqIHosIHR4ICogeiArIHMgKiB5LCAwLFxuXHRcdFx0dHggKiB5ICsgcyAqIHosIHR5ICogeSArIGMsIHR5ICogeiAtIHMgKiB4LCAwLFxuXHRcdFx0dHggKiB6IC0gcyAqIHksIHR5ICogeiArIHMgKiB4LCB0ICogeiAqIHogKyBjLCAwLFxuXHRcdFx0MCwgMCwgMCwgMVxuXG5cdFx0KTtcblxuXHRcdCByZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VTY2FsZTogZnVuY3Rpb24gKCB4LCB5LCB6ICkge1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdHgsIDAsIDAsIDAsXG5cdFx0XHQwLCB5LCAwLCAwLFxuXHRcdFx0MCwgMCwgeiwgMCxcblx0XHRcdDAsIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG1ha2VTaGVhcjogZnVuY3Rpb24gKCB4LCB5LCB6ICkge1xuXG5cdFx0dGhpcy5zZXQoXG5cblx0XHRcdDEsIHksIHosIDAsXG5cdFx0XHR4LCAxLCB6LCAwLFxuXHRcdFx0eCwgeSwgMSwgMCxcblx0XHRcdDAsIDAsIDAsIDFcblxuXHRcdCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNvbXBvc2U6IGZ1bmN0aW9uICggcG9zaXRpb24sIHF1YXRlcm5pb24sIHNjYWxlICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblxuXHRcdHZhciB4ID0gcXVhdGVybmlvbi5feCwgeSA9IHF1YXRlcm5pb24uX3ksIHogPSBxdWF0ZXJuaW9uLl96LCB3ID0gcXVhdGVybmlvbi5fdztcblx0XHR2YXIgeDIgPSB4ICsgeCxcdHkyID0geSArIHksIHoyID0geiArIHo7XG5cdFx0dmFyIHh4ID0geCAqIHgyLCB4eSA9IHggKiB5MiwgeHogPSB4ICogejI7XG5cdFx0dmFyIHl5ID0geSAqIHkyLCB5eiA9IHkgKiB6MiwgenogPSB6ICogejI7XG5cdFx0dmFyIHd4ID0gdyAqIHgyLCB3eSA9IHcgKiB5Miwgd3ogPSB3ICogejI7XG5cblx0XHR2YXIgc3ggPSBzY2FsZS54LCBzeSA9IHNjYWxlLnksIHN6ID0gc2NhbGUuejtcblxuXHRcdHRlWyAwIF0gPSAoIDEgLSAoIHl5ICsgenogKSApICogc3g7XG5cdFx0dGVbIDEgXSA9ICggeHkgKyB3eiApICogc3g7XG5cdFx0dGVbIDIgXSA9ICggeHogLSB3eSApICogc3g7XG5cdFx0dGVbIDMgXSA9IDA7XG5cblx0XHR0ZVsgNCBdID0gKCB4eSAtIHd6ICkgKiBzeTtcblx0XHR0ZVsgNSBdID0gKCAxIC0gKCB4eCArIHp6ICkgKSAqIHN5O1xuXHRcdHRlWyA2IF0gPSAoIHl6ICsgd3ggKSAqIHN5O1xuXHRcdHRlWyA3IF0gPSAwO1xuXG5cdFx0dGVbIDggXSA9ICggeHogKyB3eSApICogc3o7XG5cdFx0dGVbIDkgXSA9ICggeXogLSB3eCApICogc3o7XG5cdFx0dGVbIDEwIF0gPSAoIDEgLSAoIHh4ICsgeXkgKSApICogc3o7XG5cdFx0dGVbIDExIF0gPSAwO1xuXG5cdFx0dGVbIDEyIF0gPSBwb3NpdGlvbi54O1xuXHRcdHRlWyAxMyBdID0gcG9zaXRpb24ueTtcblx0XHR0ZVsgMTQgXSA9IHBvc2l0aW9uLno7XG5cdFx0dGVbIDE1IF0gPSAxO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRkZWNvbXBvc2U6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB2ZWN0b3IgPSBuZXcgVmVjdG9yMygpO1xuXHRcdHZhciBtYXRyaXggPSBuZXcgTWF0cml4NCgpO1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGRlY29tcG9zZSggcG9zaXRpb24sIHF1YXRlcm5pb24sIHNjYWxlICkge1xuXG5cdFx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0XHR2YXIgc3ggPSB2ZWN0b3Iuc2V0KCB0ZVsgMCBdLCB0ZVsgMSBdLCB0ZVsgMiBdICkubGVuZ3RoKCk7XG5cdFx0XHR2YXIgc3kgPSB2ZWN0b3Iuc2V0KCB0ZVsgNCBdLCB0ZVsgNSBdLCB0ZVsgNiBdICkubGVuZ3RoKCk7XG5cdFx0XHR2YXIgc3ogPSB2ZWN0b3Iuc2V0KCB0ZVsgOCBdLCB0ZVsgOSBdLCB0ZVsgMTAgXSApLmxlbmd0aCgpO1xuXG5cdFx0XHQvLyBpZiBkZXRlcm1pbmUgaXMgbmVnYXRpdmUsIHdlIG5lZWQgdG8gaW52ZXJ0IG9uZSBzY2FsZVxuXHRcdFx0dmFyIGRldCA9IHRoaXMuZGV0ZXJtaW5hbnQoKTtcblx0XHRcdGlmICggZGV0IDwgMCApIHN4ID0gLSBzeDtcblxuXHRcdFx0cG9zaXRpb24ueCA9IHRlWyAxMiBdO1xuXHRcdFx0cG9zaXRpb24ueSA9IHRlWyAxMyBdO1xuXHRcdFx0cG9zaXRpb24ueiA9IHRlWyAxNCBdO1xuXG5cdFx0XHQvLyBzY2FsZSB0aGUgcm90YXRpb24gcGFydFxuXHRcdFx0bWF0cml4LmNvcHkoIHRoaXMgKTtcblxuXHRcdFx0dmFyIGludlNYID0gMSAvIHN4O1xuXHRcdFx0dmFyIGludlNZID0gMSAvIHN5O1xuXHRcdFx0dmFyIGludlNaID0gMSAvIHN6O1xuXG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDAgXSAqPSBpbnZTWDtcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMSBdICo9IGludlNYO1xuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyAyIF0gKj0gaW52U1g7XG5cblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgNCBdICo9IGludlNZO1xuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyA1IF0gKj0gaW52U1k7XG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDYgXSAqPSBpbnZTWTtcblxuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyA4IF0gKj0gaW52U1o7XG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDkgXSAqPSBpbnZTWjtcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMTAgXSAqPSBpbnZTWjtcblxuXHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tUm90YXRpb25NYXRyaXgoIG1hdHJpeCApO1xuXG5cdFx0XHRzY2FsZS54ID0gc3g7XG5cdFx0XHRzY2FsZS55ID0gc3k7XG5cdFx0XHRzY2FsZS56ID0gc3o7XG5cblx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0fTtcblxuXHR9KCksXG5cblx0bWFrZVBlcnNwZWN0aXZlOiBmdW5jdGlvbiAoIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSwgbmVhciwgZmFyICkge1xuXG5cdFx0aWYgKCBmYXIgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnVEhSRUUuTWF0cml4NDogLm1ha2VQZXJzcGVjdGl2ZSgpIGhhcyBiZWVuIHJlZGVmaW5lZCBhbmQgaGFzIGEgbmV3IHNpZ25hdHVyZS4gUGxlYXNlIGNoZWNrIHRoZSBkb2NzLicgKTtcblxuXHRcdH1cblxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XG5cdFx0dmFyIHggPSAyICogbmVhciAvICggcmlnaHQgLSBsZWZ0ICk7XG5cdFx0dmFyIHkgPSAyICogbmVhciAvICggdG9wIC0gYm90dG9tICk7XG5cblx0XHR2YXIgYSA9ICggcmlnaHQgKyBsZWZ0ICkgLyAoIHJpZ2h0IC0gbGVmdCApO1xuXHRcdHZhciBiID0gKCB0b3AgKyBib3R0b20gKSAvICggdG9wIC0gYm90dG9tICk7XG5cdFx0dmFyIGMgPSAtICggZmFyICsgbmVhciApIC8gKCBmYXIgLSBuZWFyICk7XG5cdFx0dmFyIGQgPSAtIDIgKiBmYXIgKiBuZWFyIC8gKCBmYXIgLSBuZWFyICk7XG5cblx0XHR0ZVsgMCBdID0geDtcdHRlWyA0IF0gPSAwO1x0dGVbIDggXSA9IGE7XHR0ZVsgMTIgXSA9IDA7XG5cdFx0dGVbIDEgXSA9IDA7XHR0ZVsgNSBdID0geTtcdHRlWyA5IF0gPSBiO1x0dGVbIDEzIF0gPSAwO1xuXHRcdHRlWyAyIF0gPSAwO1x0dGVbIDYgXSA9IDA7XHR0ZVsgMTAgXSA9IGM7XHR0ZVsgMTQgXSA9IGQ7XG5cdFx0dGVbIDMgXSA9IDA7XHR0ZVsgNyBdID0gMDtcdHRlWyAxMSBdID0gLSAxO1x0dGVbIDE1IF0gPSAwO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRtYWtlT3J0aG9ncmFwaGljOiBmdW5jdGlvbiAoIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSwgbmVhciwgZmFyICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgdyA9IDEuMCAvICggcmlnaHQgLSBsZWZ0ICk7XG5cdFx0dmFyIGggPSAxLjAgLyAoIHRvcCAtIGJvdHRvbSApO1xuXHRcdHZhciBwID0gMS4wIC8gKCBmYXIgLSBuZWFyICk7XG5cblx0XHR2YXIgeCA9ICggcmlnaHQgKyBsZWZ0ICkgKiB3O1xuXHRcdHZhciB5ID0gKCB0b3AgKyBib3R0b20gKSAqIGg7XG5cdFx0dmFyIHogPSAoIGZhciArIG5lYXIgKSAqIHA7XG5cblx0XHR0ZVsgMCBdID0gMiAqIHc7XHR0ZVsgNCBdID0gMDtcdHRlWyA4IF0gPSAwO1x0dGVbIDEyIF0gPSAtIHg7XG5cdFx0dGVbIDEgXSA9IDA7XHR0ZVsgNSBdID0gMiAqIGg7XHR0ZVsgOSBdID0gMDtcdHRlWyAxMyBdID0gLSB5O1xuXHRcdHRlWyAyIF0gPSAwO1x0dGVbIDYgXSA9IDA7XHR0ZVsgMTAgXSA9IC0gMiAqIHA7XHR0ZVsgMTQgXSA9IC0gejtcblx0XHR0ZVsgMyBdID0gMDtcdHRlWyA3IF0gPSAwO1x0dGVbIDExIF0gPSAwO1x0dGVbIDE1IF0gPSAxO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlcXVhbHM6IGZ1bmN0aW9uICggbWF0cml4ICkge1xuXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcblx0XHR2YXIgbWUgPSBtYXRyaXguZWxlbWVudHM7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCAxNjsgaSArKyApIHtcblxuXHRcdFx0aWYgKCB0ZVsgaSBdICE9PSBtZVsgaSBdICkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fSxcblxuXHRmcm9tQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgMTY7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMuZWxlbWVudHNbIGkgXSA9IGFycmF5WyBpICsgb2Zmc2V0IF07XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcblxuXHRcdGlmICggYXJyYXkgPT09IHVuZGVmaW5lZCApIGFycmF5ID0gW107XG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XG5cblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xuXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGVbIDAgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMSBdID0gdGVbIDEgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGVbIDIgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMyBdID0gdGVbIDMgXTtcblxuXHRcdGFycmF5WyBvZmZzZXQgKyA0IF0gPSB0ZVsgNCBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA1IF0gPSB0ZVsgNSBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA2IF0gPSB0ZVsgNiBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyA3IF0gPSB0ZVsgNyBdO1xuXG5cdFx0YXJyYXlbIG9mZnNldCArIDggXSA9IHRlWyA4IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDkgXSA9IHRlWyA5IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDEwIF0gPSB0ZVsgMTAgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTEgXSA9IHRlWyAxMSBdO1xuXG5cdFx0YXJyYXlbIG9mZnNldCArIDEyIF0gPSB0ZVsgMTIgXTtcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTMgXSA9IHRlWyAxMyBdO1xuXHRcdGFycmF5WyBvZmZzZXQgKyAxNCBdID0gdGVbIDE0IF07XG5cdFx0YXJyYXlbIG9mZnNldCArIDE1IF0gPSB0ZVsgMTUgXTtcblxuXHRcdHJldHVybiBhcnJheTtcblxuXHR9XG5cbn0gKTtcblxuXG5leHBvcnQgeyBNYXRyaXg0IH07Il19