/// Copyright (C) 2016 [MonkeyBrush.js]
///
/// Permission is hereby granted, free of charge, to any person obtaining a copy of this
/// software and associated documentation files (the "Software"), to deal in the Software
/// without restriction, including without limitation the rights to use, copy, modify,
/// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
/// permit persons to whom the Software is furnished to do so, subject to the following
/// conditions:
///
/// The above copyright notice and this permission notice shall be included in
/// all copies or substantial portions of the Software.
///
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
/// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
/// OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
/// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
/// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

"use strict";

namespace MB {
    export namespace resources {
        export namespace Loaders {
            /**
             * [VertexBufferGeometryLoader description]
             * @param {string} src [description]
             */
            export function VertexBufferGeometryLoader(src: string) {
                // TODO
            };
            /**
             * Get alias from src resource
             * @param  {string} src: Src name
             * @param  {string = ""} alias: Optional alias
             * @return {string}: Src if alias undefined. Otherwise, alias.
             */
            export function _getAlias(src: string, alias: string = ""): string {
                return (alias.length < 1) ? src : alias;
            };
            /**
             * [xhrLoader description]
             * @param {string}     url     [description]
             * @param {boolean =       true}          sync         [description]
             * @param {string  =       "arraybuffer"} responseType [description]
             * @param {[type]}     onLoad  [description]
             * @param {[type]}     onError =               ()           =>            {  } [description]
             */
            export function xhrLoader(url: string, sync: boolean = true,
                responseType: string = "arraybuffer", onLoad, onError = () => { /**/ }) {
                let request = new XMLHttpRequest();

                request.open("GET", url, sync);

                request.responseType = responseType;

                request.onload = onLoad;
                request.onerror = onError;

                request.send();
            };
            /**
             * [loadVideo description]
             * @param {string}    videoSrc [description]
             * @param {string =        ""}          alias [description]
             */
            export function loadVideo(videoSrc: string, alias: string = "") {
                alias = _getAlias(videoSrc, alias);
                if (!ResourceMap.isAssetLoaded(alias)) {
                    // Update resources in load counter
                    ResourceMap.asyncLoadRequested(alias);

                    // xhrLoader(videoSrc, true, "arraybuffer", function(ev: ProgressEvent) {
                        // Asynchronously decode, then call the function in parameter.
                        let video: HTMLVideoElement = <HTMLVideoElement> document.createElement(alias);
                        video.src = videoSrc;
                        video.addEventListener("loadeddata", function() {
                            // Video is loaded and can be played
                            ResourceMap.asyncLoadCompleted(alias, video);
                        }, false);
                    // }.bind(this));
                }
                /*// Create HTML Video Element to play the video
                var video = document.createElement('video');
                video.addEventListener('canplay', function (e) {
                    videoTexture.setSource(video);
                });
                video.src = this.videoUrl;
                video.crossOrigin = 'anonymous';
                video.loop = true;
                video.play();*/
            };
            /**
             * [unloadVideo description]
             * @param {string} imageSrc [description]
             */
            export function unloadVideo(videoSrc: string) {
                ResourceMap.unloadAsset(videoSrc);
            };
            /**
             * [loadCubeMap description]
             * @param {string} directorySrc [description]
             */
            export function loadCubeMap(directorySrc: string) {
                [
                    "/back.jpg", "/bottom.jpg", "/front.jpg",
                    "/left.jpg", "/right.jpg", "/top.jpg"
                ].map(function(imageSrc: string) {
                    loadImage(directorySrc + imageSrc, "");
                });
            };
            /**
             * [loadImage description]
             * @param {string}    imageSrc [description]
             * @param {string =        ""}          alias [description]
             */
            export function loadImage(imageSrc: string, alias: string = "") {
                alias = _getAlias(imageSrc, alias);
                if (!ResourceMap.isAssetLoaded(alias)) {
                    let img = new Image();
                    ResourceMap.asyncLoadRequested(alias);
                    img.onload = function() {
                        // setTimeout(function() {
                            ResourceMap.asyncLoadCompleted(alias, img);
                        // }, 2500);
                    };
                    img.onerror = function(err) {
                        ResourceMap.asyncLoadFailed(alias);
                    };
                    img.src = imageSrc;
                } else {
                    ResourceMap.incAssetRefCount(alias);
                }
            };
            /**
             * [unloadImage description]
             * @param {string} imageSrc [description]
             */
            export function unloadImage(imageSrc: string) {
                ResourceMap.unloadAsset(imageSrc);
            };
            /**
             * [loadAudio description]
             * @param {string}    clipName [description]
             * @param {string =        ""}          alias [description]
             */
            export function loadAudio(clipName: string, alias: string = "") {
                alias = _getAlias(clipName, alias);
                if (!(ResourceMap.isAssetLoaded(alias))) {
                    // Update resources in load counter
                    ResourceMap.asyncLoadRequested(alias);

                    // Async request the data from server
                    let request = new XMLHttpRequest();
                    request.open("GET", clipName, true);

                    // Specify that the request retrieves binary data.
                    request.responseType = "arraybuffer";

                    request.onload = function () {
                        // Asynchronously decode, then call the function in parameter.
                        this._audioContext.decodeAudioData(request.response,
                            function (buffer) {
                                ResourceMap.asyncLoadCompleted(alias, buffer);
                            }
                      );
                    }.bind(this);
                    request.send();
                }
            };
            /**
             * [unloadAudio description]
             * @param {string} clipName [description]
             */
            export function unloadAudio(clipName: string) {
                ResourceMap.unloadAsset(clipName);
            };
            // Code based on http://www.graphics.cornell.edu/~bjw/rgbe/rgbe.c
            function RGBEParser(buffer: ArrayBuffer) {

                // Return codes for rgbe routines
                // const RGBE_RETURN_SUCCESS =  0;
                const RGBE_RETURN_FAILURE = -1;

                // Default error routine.  change this to change error handling
                const rgbe_read_error     = 1;
                const rgbe_write_error    = 2;
                const rgbe_format_error   = 3;
                const rgbe_memory_error   = 4;
                function rgbe_error (rgbe_error_code, msg: string = "") {
                    switch (rgbe_error_code) {
                        case rgbe_read_error: console.error(`RGBEParser Read Error: ${msg}`);
                            break;
                        case rgbe_write_error: console.error(`RGBEParser Write Error: ${msg}`);
                            break;
                        case rgbe_format_error: console.error(`RGBEParser Bad File Format: ${msg}`);
                            break;
                        default:
                        case rgbe_memory_error: console.error(`RGBEParser: Error: ${msg}`);
                    }
                    return RGBE_RETURN_FAILURE;

                };

                // Offsets to red, green, and blue components in a data (float) pixel
                // const RGBE_DATA_RED: number = 0;
                // const RGBE_DATA_GREEN: number = 1;
                // const RGBE_DATA_BLUE: number = 2;

                // Number of floats per pixel, use 4 since stored in rgba image format
                // const RGBE_DATA_SIZE: number = 4;

                // Flags indicating which fields in an rgbe_header_info are valid
                const RGBE_VALID_PROGRAMTYPE: number = 1;
                const RGBE_VALID_FORMAT: number = 2;
                const RGBE_VALID_DIMENSIONS: number = 4;

                const NEWLINE: string = "\n";

                function _fgets(buffer, lineLimit?, consume?): any {
                    lineLimit = ! lineLimit ? 1024 : lineLimit;
                    let p = buffer.pos,
                        i = - 1, len = 0, s = "", chunkSize = 128,
                        chunk = String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)))
                    ;
                    while ((0 > (i = chunk.indexOf(NEWLINE))) && (len < lineLimit) && (p < buffer.byteLength)) {

                        s += chunk; len += chunk.length;
                        p += chunkSize;
                        chunk += String.fromCharCode.apply(null, new Uint16Array(buffer.subarray(p, p + chunkSize)));

                    }

                    if (i > -1) {
                        if (false !== consume) buffer.pos += len + i + 1;
                        return s + chunk.slice(0, i);

                    }
                    return false;
                };

                function RGBE_ReadHeader(buffer: Uint8Array): any {
                    let line, match: string,
                        // regexes to parse header info fields
                        magic_token_re = /^#\?(\S+)$/,
                        gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,
                        exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,
                        format_re = /^\s*FORMAT=(\S+)\s*$/,
                        dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,

                        // RGBE format header struct
                        header = {
                            valid: 0,                         // indicate which fields are valid
                            string: "",                       // the actual header string
                            comments: "",                     // comments found in header
                            programtype: "RGBE",              // listed at beginning of file to identify it
                                                              //     after "#?".  defaults to "RGBE"
                            format: "",                       // RGBE format, default 32-bit_rle_rgbe
                            gamma: 1.0,                       // image has already been gamma corrected with
                                                              //    given gamma.  defaults to 1.0 (no correction)
                            exposure: 1.0,                    // a value of 1.0 in an image corresponds to
                                                              //    <exposure> watts/steradian/m^2.
                            width: 0, height: 0               // image dimensions, width/height
                        };

                    if (buffer["pos"] >= buffer.byteLength || !(line = _fgets(buffer))) {
                        return rgbe_error(rgbe_read_error, "no header found");
                    }
                    if (!(match = line.match(magic_token_re))) {
                        return rgbe_error(rgbe_format_error, "bad initial token");
                    }
                    header.valid |= RGBE_VALID_PROGRAMTYPE;
                    header.programtype = match[1];
                    header.string += line + "\n";

                    while (true) {
                        line = _fgets(buffer);
                        if (false === line) break;
                        header.string += line + "\n";

                        if ("#" === line.charAt(0)) {
                            header.comments += line + "\n";
                            continue; // comment line
                        }
                        if (match = line.match(gamma_re)) {
                            header.gamma = parseFloat(match[1]);
                        }
                        if (match = line.match(exposure_re)) {
                            header.exposure = parseFloat(match[1]);
                        }
                        if (match = line.match(format_re)) {
                            header.valid |= RGBE_VALID_FORMAT;
                            header.format = match[1]; // '32-bit_rle_rgbe';
                        }
                        if (match = line.match(dimensions_re)) {
                            header.valid |= RGBE_VALID_DIMENSIONS;
                            header.height = parseInt(match[1], 10);
                            header.width = parseInt(match[2], 10);
                        }
                        if ((header.valid & RGBE_VALID_FORMAT) && (header.valid & RGBE_VALID_DIMENSIONS)) break;
                    }

                    if (!(header.valid & RGBE_VALID_FORMAT)) {
                        return rgbe_error(rgbe_format_error, "missing format specifier");
                    }
                    if (!(header.valid & RGBE_VALID_DIMENSIONS)) {
                        return rgbe_error(rgbe_format_error, "missing image size specifier");
                    }

                    return header;
                };

                function RGBE_ReadPixels_RLE(buffer, w, h): Uint8Array {
                    let data_rgba, offset, pos, count, byteValue,
                        scanline_buffer, ptr, ptr_end, i, l, off, isEncodedRun,
                        scanline_width = w, num_scanlines = h, rgbeStart;

                    if (
                        // run length encoding is not allowed so read flat
                        ((scanline_width < 8) || (scanline_width > 0x7fff)) ||
                        // this file is not run length encoded
                        ((2 !== buffer[0]) || (2 !== buffer[1]) || (buffer[2] & 0x80))
                  ) {
                        // return the flat buffer
                        return new Uint8Array(buffer);
                    }

                    if (scanline_width !== ((buffer[2] << 8) | buffer[3])) {
                        rgbe_error(rgbe_format_error, "wrong scanline width");
                        throw new Error("ERROR");
                    }

                    data_rgba = new Uint8Array(4 * w * h);

                    if (! data_rgba || ! data_rgba.length) {
                        rgbe_error(rgbe_memory_error, "unable to allocate buffer space");
                        throw new Error("ERROR");
                    }

                    offset = 0; pos = 0; ptr_end = 4 * scanline_width;
                    rgbeStart = new Uint8Array(4);
                    scanline_buffer = new Uint8Array(ptr_end);

                    // read in each successive scanline
                    while ((num_scanlines > 0) && (pos < buffer.byteLength)) {
                        if (pos + 4 > buffer.byteLength) {
                            rgbe_error(rgbe_read_error);
                            throw new Error("ERROR");
                        }

                        rgbeStart[0] = buffer[pos++];
                        rgbeStart[1] = buffer[pos++];
                        rgbeStart[2] = buffer[pos++];
                        rgbeStart[3] = buffer[pos++];

                        // TODO: CRISTIAN !== to != CHANGE!!
                        if ((2 !== rgbeStart[0]) || (2 !== rgbeStart[1]) ||
                            (((rgbeStart[2] << 8) | rgbeStart[3]) !== scanline_width)) {
                            rgbe_error(rgbe_format_error, "bad rgbe scanline format");
                            throw new Error("ERROR");
                        }

                        // read each of the four channels for the scanline into the buffer
                        // first red, then green, then blue, then exponent
                        ptr = 0;
                        while ((ptr < ptr_end) && (pos < buffer.byteLength)) {
                            count = buffer[pos++];
                            isEncodedRun = count > 128;
                            if (isEncodedRun) count -= 128;

                            if ((0 === count) || (ptr + count > ptr_end)) {
                                rgbe_error(rgbe_format_error, "bad scanline data");
                                throw new Error("ERROR");
                            }
                            if (isEncodedRun) {
                                // a (encoded) run of the same value
                                byteValue = buffer[pos++];
                                for (i = 0; i < count; ++i) {
                                    scanline_buffer[ptr++] = byteValue;
                                }
                                // ptr += count;
                            } else {
                                // a literal-run
                                scanline_buffer.set(buffer.subarray(pos, pos + count), ptr);
                                ptr += count; pos += count;
                            }
                        }
                        // now convert data from buffer into rgba
                        // first red, then green, then blue, then exponent (alpha)
                        l = scanline_width; // scanline_buffer.byteLength;
                        for (i = 0; i < l; ++i) {
                            off = 0;
                            data_rgba[offset] = scanline_buffer[i + off];
                            off += scanline_width; // 1;
                            data_rgba[offset + 1] = scanline_buffer[i + off];
                            off += scanline_width; // 1;
                            data_rgba[offset + 2] = scanline_buffer[i + off];
                            off += scanline_width; // 1;
                            data_rgba[offset + 3] = scanline_buffer[i + off];
                            offset += 4;
                        }
                        num_scanlines --;
                    }
                    return data_rgba;
                };

                let byteArray = new Uint8Array(buffer)/*,
                    byteLength = byteArray.byteLength*/;

                byteArray["pos"] = 0;
                let rgbe_header_info = RGBE_ReadHeader(byteArray);

                console.log(rgbe_header_info);

                if (RGBE_RETURN_FAILURE !== rgbe_header_info) {
                    const w = rgbe_header_info.width,
                        h = rgbe_header_info.height,
                        image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray["pos"]), w, h);
                    // if (RGBE_RETURN_FAILURE !== image_rgba_data) {
                        return {
                            width: w, height: h,
                            data: image_rgba_data,
                            header: rgbe_header_info.string,
                            gamma: rgbe_header_info.gamma,
                            exposure: rgbe_header_info.exposure
                            // format: RGBE, // RGBA
                            // type: UnsignedByteType
                        };
                    // }
                }
                return null;
            };
            /**
             * [loadHDRImage description]
             * @param {string}    imageSrc [description]
             * @param {string =        ""}          alias [description]
             */
            export function loadHDRImage(imageSrc: string, alias: string = "") {
                // TODO: https://github.com/vorg/parse-hdr
                alias = _getAlias(imageSrc, alias);
                if (!ResourceMap.isAssetLoaded(alias)) {
                    ResourceMap.asyncLoadRequested(alias);
                    // Async request the data from server
                    let request = new XMLHttpRequest();
                    request.open("GET", imageSrc, true);

                    // Specify that the request retrieves binary data.
                    request.responseType = "arraybuffer";

                    request.onload = function () {
                        let texData = RGBEParser(request.response);

                        ResourceMap.asyncLoadCompleted(alias, texData);

                        // Asynchronously decode, then call the function in parameter.
                        /*const arrayBuffer = request.response;
                        if (arrayBuffer) {
                            let bytes = new Uint8Array(arrayBuffer);
                            let data = new Float32Array(width * height * 3);

                            let byteIdx = 0;

                            // skip the main header (we already assume the format, width and height)
                            for (; byteIdx < bytes.length; byteIdx++) {
                                if (bytes[byteIdx] === 0x0A && bytes[byteIdx + 1] === 0x0A) {
                                    byteIdx = byteIdx + 2;
                                    break;
                                }
                            }
                            // skip the resolution bit
                            for (; byteIdx < bytes.length; byteIdx++) {
                                if (bytes[byteIdx] === 0x0A) {
                                    byteIdx = byteIdx + 1;
                                    break;
                                }
                            }

                            let idx = 0;
                            for (let row = 0; row < height; row++) {
                                for (let col = 0; col < width; col++) {
                                    const r = bytes[byteIdx++];
                                    const g = bytes[byteIdx++];
                                    const b = bytes[byteIdx++];
                                    const e = bytes[byteIdx++];
                                    const expFactor = Math.pow(2, e - 128);
                                    data[idx++] = (r / 256) * expFactor;
                                    data[idx++] = (g / 256) * expFactor;
                                    data[idx++] = (b / 256) * expFactor;
                                }
                            }
                            ResourceMap.asyncLoadCompleted(alias, data);
                        }*/

                    }.bind(this);
                    request.send();
                } else {
                    ResourceMap.incAssetRefCount(alias);
                }
            }
            /**
             * [unloadHDRImage description]
             * @param {string} imageSrc [description]
             */
            export function unloadHDRImage(imageSrc: string) {
                ResourceMap.unloadAsset(imageSrc);
            };
        };
    };
};
