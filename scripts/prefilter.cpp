/******************************************************************************

prefilter.c : Program to prefilter environment maps, computing
              spherical harmonic lighting coefficients. 

Input       : Name of file storing high-dynamic range environment.
              The format of these files is that used by Paul Debevec
	      and examples are available from www.debevec.org/Probes
	      In particular, images are in raw floating-point format.
	      The examples here are big-endian with interleaved color
	      planes, although there are also little-endian versions
	      available.  The endian-ness of the input needs to be the 
	      same as that for the host computer unless called with
	      the "-swap" flag.

Output      : RGB values for lighting coefficients L_{lm} with 
              0 <= l <= 2 and -l <= m <= l.  There are 9 coefficients
	      in all.

Reference   : This is an implementation of the method described by
              Ravi Ramamoorthi and Pat Hanrahan in their SIGGRAPH 2001 
	      paper, "An Efficient Representation for Irradiance
	      Environment Maps".

Author      : Ravi Ramamoorthi

Date        : Last modified on April 13, 2001 

------------------------------------------------------------------------------

Compilation : (On my system) gcc prefilter.c -o prefilter -lm

Usage       : prefilter [-swap] input size
              The -swap flag indicates if the input endian-ness is
	      different from host-machine.  For instance, using
	      big-endian input files on a little-endian pc

Examples    : See the bottom of this file. 

******************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <assert.h>
#include <string.h>

#define PI 3.141593
#define MAXWIDTH 2000               /* Maximum width of light probe */
float hdr[MAXWIDTH][MAXWIDTH][3] ;  /* Input light probe image */
float coeffs[9][3] ;                /* Spherical harmonic coefficients */
float matrix[4][4][3] ;             /* Matrix for quadratic form */
int swapflag = 0 ;                  /* Do we swap endian-ness? */


void input(const char * filename, const int width) ; /* Read in light
							probe */
void updatecoeffs(float hdr[3], float domega, float x, float y, float z) ;
/* Update the coefficients (i.e. compute the next term in the
   integral) based on the lighting value hdr[], the differential
   solid angle domega and cartesian components of surface normal x,y,z 
*/
void prefilter(int width) ;         /* The main integration routine */
void tomatrix(void) ;               /* Convert coefficients to matrix
				       for quadratic form (Eq. 12) */

float sinc(float x) {               /* Supporting sinc function */
  if (fabs(x) < 1.0e-4) return 1.0 ;
  else return(sin(x)/x) ;
}

void input(const char * filename, const int width) { /* Read in light
							probe */
  int i,j,k ;
  FILE *fp ;
  assert(fp = fopen(filename,"rb")) ;

  for (i = 0 ; i < width ; i++)
    for (j = 0 ; j < width ; j++)
      for (k = 0 ; k < 3 ; k++) {

	/* This is a little ugly since the input is in binary format
	   and we need to do some tests on endian-ness */

	float val ;
	unsigned char * c = (unsigned char *) &val ;
	if (swapflag) { /* Endianness of computer different from input 
			   Read in the bytes in reversed order.  
			 */
	  assert(fscanf(fp,"%c%c%c%c",&(c[3]),&(c[2]),&(c[1]),&(c[0]))==4);
	}
	else { /* Endianness same as input */
	  assert(fscanf(fp,"%c%c%c%c",&(c[0]),&(c[1]),&(c[2]),&(c[3]))==4);
	}
	hdr[i][j][k] = val ; /* Remember that c pointed to val */

      }
  fclose(fp) ;
}


void updatecoeffs(float hdr[3], float domega, float x, float y, float z) { 
	domega *= 0.315f;
  /****************************************************************** 
   Update the coefficients (i.e. compute the next term in the
   integral) based on the lighting value hdr[3], the differential
   solid angle domega and cartesian components of surface normal x,y,z

   Inputs:  hdr = L(x,y,z) [note that x^2+y^2+z^2 = 1]
            i.e. the illumination at position (x,y,z)

            domega = The solid angle at the pixel corresponding to 
	    (x,y,z).  For these light probes, this is given by 

	    x,y,z  = Cartesian components of surface normal

   Notes:   Of course, there are better numerical methods to do
            integration, but this naive approach is sufficient for our
	    purpose.

  *********************************************************************/

  int col ;
  for (col = 0 ; col < 3 ; col++) {
    float c ; /* A different constant for each coefficient */

    /* L_{00}.  Note that Y_{00} = 0.282095 */
    c = 0.282095 ;
    coeffs[0][col] += hdr[col]*c*domega ;

    /* L_{1m}. -1 <= m <= 1.  The linear terms */
    c = 0.488603 ;
    coeffs[1][col] += hdr[col]*(c*y)*domega ;   /* Y_{1-1} = 0.488603 y  */
    coeffs[2][col] += hdr[col]*(c*z)*domega ;   /* Y_{10}  = 0.488603 z  */
    coeffs[3][col] += hdr[col]*(c*x)*domega ;   /* Y_{11}  = 0.488603 x  */

    /* The Quadratic terms, L_{2m} -2 <= m <= 2 */

    /* First, L_{2-2}, L_{2-1}, L_{21} corresponding to xy,yz,xz */
    c = 1.092548 ;
    coeffs[4][col] += hdr[col]*(c*x*y)*domega ; /* Y_{2-2} = 1.092548 xy */ 
    coeffs[5][col] += hdr[col]*(c*y*z)*domega ; /* Y_{2-1} = 1.092548 yz */ 
    coeffs[7][col] += hdr[col]*(c*x*z)*domega ; /* Y_{21}  = 1.092548 xz */ 

    /* L_{20}.  Note that Y_{20} = 0.315392 (3z^2 - 1) */
    c = 0.315392 ;
    coeffs[6][col] += hdr[col]*(c*(3*z*z-1))*domega ; 

    /* L_{22}.  Note that Y_{22} = 0.546274 (x^2 - y^2) */
    c = 0.546274 ;
    coeffs[8][col] += hdr[col]*(c*(x*x-y*y))*domega ;

  }
}

void prefilter(int width) {

  /* The main integration routine.  Of course, there are better ways
     to do quadrature but this suffices.  Calls updatecoeffs to
     actually increment the integral. Width is the size of the
     environment map */

  int i,j ;
  for (i = 0 ; i < width ; i++)
    for (j = 0 ; j < width ; j++) {

      /* We now find the cartesian components for the point (i,j) */
      float u,v,r,theta,phi,x,y,z,domega ;

      v = (width/2.0 - i)/(width/2.0);  /* v ranges from -1 to 1 */
      u = (j-width/2.0)/(width/2.0);    /* u ranges from -1 to 1 */
      r = sqrt(u*u+v*v) ;               /* The "radius" */
      if (r > 1.0) continue ;           /* Consider only circle with r<1 */

      theta = PI*r ;                    /* theta parameter of (i,j) */
      phi = atan2(v,u) ;                /* phi parameter */

      x = sin(theta)*cos(phi) ;         /* Cartesian components */
      y = sin(theta)*sin(phi) ;
      z = cos(theta) ;

      /* Computation of the solid angle.  This follows from some
	 elementary calculus converting sin(theta) d theta d phi into
	 coordinates in terms of r.  This calculation should be redone 
	 if the form of the input changes */

      domega = (2*PI/width)*(2*PI/width)*sinc(theta) ;

      updatecoeffs(hdr[i][j],domega,x,y,z) ; /* Update Integration */

    }
}

void tomatrix(void) {

  /* Form the quadratic form matrix (see equations 11 and 12 in paper) */

  int col ;
  float c1,c2,c3,c4,c5 ;
  c1 = 0.429043 ; c2 = 0.511664 ;
  c3 = 0.743125 ; c4 = 0.886227 ; c5 = 0.247708 ;

  for (col = 0 ; col < 3 ; col++) { /* Equation 12 */

    matrix[0][0][col] = c1*coeffs[8][col] ; /* c1 L_{22}  */
    matrix[0][1][col] = c1*coeffs[4][col] ; /* c1 L_{2-2} */
    matrix[0][2][col] = c1*coeffs[7][col] ; /* c1 L_{21}  */
    matrix[0][3][col] = c2*coeffs[3][col] ; /* c2 L_{11}  */

    matrix[1][0][col] = c1*coeffs[4][col] ; /* c1 L_{2-2} */
    matrix[1][1][col] = -c1*coeffs[8][col]; /*-c1 L_{22}  */
    matrix[1][2][col] = c1*coeffs[5][col] ; /* c1 L_{2-1} */
    matrix[1][3][col] = c2*coeffs[1][col] ; /* c2 L_{1-1} */

    matrix[2][0][col] = c1*coeffs[7][col] ; /* c1 L_{21}  */
    matrix[2][1][col] = c1*coeffs[5][col] ; /* c1 L_{2-1} */
    matrix[2][2][col] = c3*coeffs[6][col] ; /* c3 L_{20}  */
    matrix[2][3][col] = c2*coeffs[2][col] ; /* c2 L_{10}  */

    matrix[3][0][col] = c2*coeffs[3][col] ; /* c2 L_{11}  */
    matrix[3][1][col] = c2*coeffs[1][col] ; /* c2 L_{1-1} */
    matrix[3][2][col] = c2*coeffs[2][col] ; /* c2 L_{10}  */
    matrix[3][3][col] = c4*coeffs[0][col] - c5*coeffs[6][col] ; 
                                            /* c4 L_{00} - c5 L_{20} */
  }
}

int main(int argc, char ** argv) {

  int i,j,k ;
  char * filename ;
  int width ;

  if (argc > 1 && !strcmp(argv[1],"-swap")) {
    /* Check for swap option to change endian-ness */

    swapflag = 1 ;
    if (argc != 4) {
      fprintf(stderr,"prefilter [-swap] input size\n") ;
      exit(1) ;
    }
    filename = argv[2] ;
    width = atoi(argv[3]) ; assert(width > 0) ;
  }

  else {
    if (argc != 3) {
      fprintf(stderr,"prefilter [-swap] input size\n") ;
      exit(1) ;
    }
    filename = argv[1] ;
    width = atoi(argv[2]) ; assert(width > 0) ;
  }

  /* Read in data, and prefilter */

  input(filename,width) ;
  prefilter(width) ;
  tomatrix() ;

  /* Output Results */
  
  printf("\n         Lighting Coefficients\n\n") ;
  printf("(l,m)       RED        GREEN     BLUE\n") ;
  
  printf("vec3(%9.6f, %9.6f, %9.6f),\n",
	 coeffs[0][0],coeffs[0][1],coeffs[0][2]) ;
  printf("vec3(%9.6f, %9.6f, %9.6f),\n",
	 coeffs[1][0],coeffs[1][1],coeffs[1][2]) ;
  printf("vec3(%9.6f, %9.6f, %9.6f),\n",
	 coeffs[2][0],coeffs[2][1],coeffs[2][2]) ;
  printf("vec3(%9.6f, %9.6f, %9.6f),\n",
	 coeffs[3][0],coeffs[3][1],coeffs[3][2]) ;
  printf("vec3(%9.6f, %9.6f, %9.6f),\n",
	 coeffs[4][0],coeffs[4][1],coeffs[4][2]) ;
  printf("vec3(%9.6f, %9.6f, %9.6f),\n",
	 coeffs[5][0],coeffs[5][1],coeffs[5][2]) ;
  printf("vec3(%9.6f, %9.6f, %9.6f),\n",
	 coeffs[6][0],coeffs[6][1],coeffs[6][2]) ;
  printf("vec3(%9.6f, %9.6f, %9.6f),\n",
	 coeffs[7][0],coeffs[7][1],coeffs[7][2]) ;
  printf("vec3(%9.6f, %9.6f, %9.6f)\n",
	 coeffs[8][0],coeffs[8][1],coeffs[8][2]) ;

  printf("\nMATRIX M: RED\n") ;
  for (i = 0 ; i < 4 ; i++) {
    for (j = 0 ; j < 4 ; j++)
      printf("%9.6f ",matrix[i][j][0]) ;
    printf("\n") ;
  }
  printf("\nMATRIX M: GREEN\n") ;
  for (i = 0 ; i < 4 ; i++) {
    for (j = 0 ; j < 4 ; j++)
      printf("%9.6f ",matrix[i][j][1]) ;
    printf("\n") ;
  }
  printf("\nMATRIX M: BLUE\n") ;
  for (i = 0 ; i < 4 ; i++) {
    for (j = 0 ; j < 4 ; j++)
      printf("%9.6f ",matrix[i][j][2]) ;
    printf("\n") ;
  }
  exit(0) ;
}

/***************************************************************************

I ran the code on the 3 environments shown in our paper corresponding to 
files grace_probe.float rnl_probe.float and stpeters_probe.float
In all cases, I used the big-endian inputs on my little-endian PC.  
The input commands were of the form.

% prefilter -swap grace_probe.float 1000
% prefilter -swap rnl_probe.float 900
% prefilter -swap stpeters_probe.float 1500

The output is shown for only the first of these (Grace Cathedral).  It 
should be noted that the values reported in Figure 2 of our Siggraph
paper are scaled by multiplying by 10 for the Grace Cathedral and
dividing by 10 for the Eucalyptus Grove (rnl_probe) and St. Peters Basilica.

% prefilter -swap grace_probe.float 1000

         Lighting Coefficients

(l,m)       RED        GREEN     BLUE
L_{0,0}    0.078908  0.043710  0.054161
L_{1,-1}   0.039499  0.034989  0.060488
L_{1,0}   -0.033974 -0.018236 -0.026940
L_{1,1}   -0.029213 -0.005562  0.000944
L_{2,-2}  -0.011141 -0.005090 -0.012231
L_{2,-1}  -0.026240 -0.022401 -0.047479
L_{2,0}   -0.015570 -0.009471 -0.014733
L_{2,1}    0.056014  0.021444  0.013915
L_{2,2}    0.021205 -0.005432 -0.030374

MATRIX M: RED
 0.009098 -0.004780  0.024033 -0.014947 
-0.004780 -0.009098 -0.011258  0.020210 
 0.024033 -0.011258 -0.011570 -0.017383 
-0.014947  0.020210 -0.017383  0.073787 

MATRIX M: GREEN
-0.002331 -0.002184  0.009201 -0.002846 
-0.002184  0.002331 -0.009611  0.017903 
 0.009201 -0.009611 -0.007038 -0.009331 
-0.002846  0.017903 -0.009331  0.041083 

MATRIX M: BLUE
-0.013032 -0.005248  0.005970  0.000483 
-0.005248  0.013032 -0.020370  0.030949 
 0.005970 -0.020370 -0.010948 -0.013784 
 0.000483  0.030949 -0.013784  0.051648 

*****************************************************************************/