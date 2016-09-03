#!/usr/bin/env python2

"""Python script to prefilter environment maps, computing spherical
harmonic lighting coefficients.
Python port of the prefilter.c code from
http://graphics.stanford.edu/papers/envmap/
"""

import math
import array


def input(fname, width):
    fp = open(fname, "rb")
    d = array.array('f')
    d.fromfile(fp, width*width * 3)

    hdr = {}
    counter = 0
    for i in range(width):
        for j in range(width):
            pixels = []
            for k in range(3):
                val = d[counter]
                pixels.append(val)
                counter += 1
            hdr[(i,j)] = pixels

    return hdr


def sinc(x):
    """Supporting sinc function
    """
    if (abs(x) < 1.0e-4):
        return 1.0
    else:
        return(math.sin(x)/x)


def prefilter(hdr, width):
    coeffs = {}
    for x in range(9):
        coeffs[x] = {0: 0.0, 1: 0.0, 2: 0.0}

    def updatecoeffs(hdr, domega, x, y, z):
        for col in range(3):
            c = 0.282095
            coeffs[0][col] += hdr[col] * c * domega

            c = 0.488603
            coeffs[1][col] += hdr[col]*(c*y)*domega # Y_{1-1} = 0.488603 y
            coeffs[2][col] += hdr[col]*(c*z)*domega # Y_{10}  = 0.488603 z
            coeffs[3][col] += hdr[col]*(c*x)*domega # Y_{11}  = 0.488603 x

            # The Quadratic terms, L_{2m} -2 <= m <= 2

            # First, L_{2-2}, L_{2-1}, L_{21} corresponding to xy,yz,xz
            c = 1.092548
            coeffs[4][col] += hdr[col]*(c*x*y)*domega # Y_{2-2} = 1.092548 xy
            coeffs[5][col] += hdr[col]*(c*y*z)*domega # Y_{2-1} = 1.092548 yz
            coeffs[7][col] += hdr[col]*(c*x*z)*domega # Y_{21}  = 1.092548 xz

            # L_{20}.  Note that Y_{20} = 0.315392 (3z^2 - 1)
            c = 0.315392
            coeffs[6][col] += hdr[col]*(c*(3*z*z-1))*domega

            # L_{22}.  Note that Y_{22} = 0.546274 (x^2 - y^2)
            c = 0.546274 ;
            coeffs[8][col] += hdr[col]*(c*(x*x-y*y))*domega


    def _prefilter(hdr, width):
        for i in range(width):
            for j in range(width):
                v = (width/2.0 - i) / (width/2.0) # u ranges from -1 to 1 */
                u = (j-width/2.0)/(width/2.0)     # u ranges from -1 to 1 */
                r = math.sqrt(u*u+v*v)            # The "radius"

                if r > 1.0:
                    # Consider only circle with r<1
                    continue

                from math import sin, cos, atan2

                theta = math.pi*r ;       # theta parameter of (i,j)
                phi = atan2(v,u) ;        # phi parameter

                x = sin(theta)*cos(phi)   # Cartesian components
                y = sin(theta)*sin(phi)
                z = cos(theta)

                """
                Computation of the solid angle.  This follows from some
                elementary calculus converting sin(theta) d theta d phi
                into coordinates in terms of r.  This calculation should
                be redone if the form of the input changes
                """

                domega = (2*math.pi/width)*(2*math.pi/width)*sinc(theta)

                updatecoeffs(hdr[(i,j)],domega,x,y,z) # Update Integration

    # Modifies coeffs (made non-global by wrapping this in a function call)
    # TODO: Refactor this into a class or something
    _prefilter(hdr, width)
    return coeffs


def tomatrix(coeffs):
    """Form the quadratic form matrix (see equations 11 and 12 in paper)
    """

    matrix = {}
    for a in range(4):
        matrix[a] = {}
        for b in range(4):
            matrix[a][b] = {}

    c1 = 0.429043; c2 = 0.511664 ;
    c3 = 0.743125 ; c4 = 0.886227 ; c5 = 0.247708 ;

    for col in range(3):
        # Equation 12 */

        matrix[0][0][col] = c1*coeffs[8][col] #; /* c1 L_{22}  */
        matrix[0][1][col] = c1*coeffs[4][col] #; /* c1 L_{2-2} */
        matrix[0][2][col] = c1*coeffs[7][col] #; /* c1 L_{21}  */
        matrix[0][3][col] = c2*coeffs[3][col] #; /* c2 L_{11}  */

        matrix[1][0][col] = c1*coeffs[4][col] #; /* c1 L_{2-2} */
        matrix[1][1][col] = -c1*coeffs[8][col]#; /*-c1 L_{22}  */
        matrix[1][2][col] = c1*coeffs[5][col] #; /* c1 L_{2-1} */
        matrix[1][3][col] = c2*coeffs[1][col] #; /* c2 L_{1-1} */

        matrix[2][0][col] = c1*coeffs[7][col] #; /* c1 L_{21}  */
        matrix[2][1][col] = c1*coeffs[5][col] #; /* c1 L_{2-1} */
        matrix[2][2][col] = c3*coeffs[6][col] #; /* c3 L_{20}  */
        matrix[2][3][col] = c2*coeffs[2][col] #; /* c2 L_{10}  */

        matrix[3][0][col] = c2*coeffs[3][col] #; /* c2 L_{11}  */
        matrix[3][1][col] = c2*coeffs[1][col] #; /* c2 L_{1-1} */
        matrix[3][2][col] = c2*coeffs[2][col] #; /* c2 L_{10}  */
        matrix[3][3][col] = c4*coeffs[0][col] - c5*coeffs[6][col] ;
                                              # /* c4 L_{00} - c5 L_{20} */

    return matrix

def print_values(coeffs, matrix):
    print("\n          Lighting Coefficients\n")
    print("(l,m)       RED        GREEN     BLUE")

    print("L_{0,0}   %9.6f %9.6f %9.6f" % (coeffs[0][0],coeffs[0][1],coeffs[0][2]))
    print("L_{1,-1}  %9.6f %9.6f %9.6f" % (coeffs[1][0],coeffs[1][1],coeffs[1][2]))
    print("L_{1,0}   %9.6f %9.6f %9.6f" % (coeffs[2][0],coeffs[2][1],coeffs[2][2]))
    print("L_{1,1}   %9.6f %9.6f %9.6f" % (coeffs[3][0],coeffs[3][1],coeffs[3][2]))
    print("L_{2,-2}  %9.6f %9.6f %9.6f" % (coeffs[4][0],coeffs[4][1],coeffs[4][2]))
    print("L_{2,-1}  %9.6f %9.6f %9.6f" % (coeffs[5][0],coeffs[5][1],coeffs[5][2]))
    print("L_{2,0}   %9.6f %9.6f %9.6f" % (coeffs[6][0],coeffs[6][1],coeffs[6][2]))
    print("L_{2,1}   %9.6f %9.6f %9.6f" % (coeffs[7][0],coeffs[7][1],coeffs[7][2]))
    print("L_{2,2}   %9.6f %9.6f %9.6f" % (coeffs[8][0],coeffs[8][1],coeffs[8][2]))

    for chan, name in enumerate(("red", "green", "blue")):
        print "\nMATRIX M: %s" % (name.upper())
        for i in range(4):
            for j in range(4):
                print "%9.6f " % matrix[i][j][chan],
            print


def main():
    import sys
    if len(sys.argv) != 3:
        print "%s <input .float file> <width>"
        sys.exit(2)

    fname = sys.argv[1]
    imgwidth = int(sys.argv[2])
    print "Loading image"
    hdr = input("grace_probe.float", imgwidth)

    """
    # http://taoofmac.com/space/projects/PNGCanvas
    import pngcanvas
    c = pngcanvas.PNGCanvas(imgwidth, imgwidth)
    def clamp(a, lower = 0, upper = 255):
        return max(min(a, upper), lower)
    def eightbitify(a):
        return clamp(int(round(a*255)), lower = 0, upper = 255)
    print "Writing PNG preview"
    for xcoord in range(imgwidth):
        for ycoord in range(imgwidth):
            color = [int(clamp(x**0.454545*255)) for x in hdr[(xcoord, ycoord)]]
            color.append(255)
            c.point(xcoord, ycoord, color = color)
    f = open("checkprobe.png", "wb")
    f.write(c.dump())
    f.close()
    """

    print "Prefiltering"
    coeffs = prefilter(hdr, imgwidth)
    print "Coefficients"

    matrix = tomatrix(coeffs)
    print_values(coeffs, matrix)


if __name__ == '__main__':
    main()
