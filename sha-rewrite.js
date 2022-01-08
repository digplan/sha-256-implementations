function sha256(ascii){

}	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};

	var i, j, result = '', words = [], asciiBitLength = ascii['length']*8;

	const hash = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225]
	const k = [
		1116352408,  1899447441, -1245643825,  -373957723, 961987163,  1508970993, -1841331548, -1424204075,
		-670586216,   310598401,   607225278,  1426881987, 1925078388, -2132889090, -1680079193, -1046744716,	
		-459576895,  -272742522,   264347078,   604807628,	 770255983,  1249150122,  1555081692,  1996064986,
	    -1740746414, -1473132947, -1341970488, -1084653625,	-958395405,  -710438585,   113926993,   338241895,	 
	    666307205,   773529912,  1294757372,  1396182291, 1695183700,  1986661051, -2117940946, -1838011259,   
	    -1564481375, -1474664885, -1035236496,  -949202525,	-778901479,  -694614492,  -200395387,   275423344,
		430227734,   506948616,   659060556,   883997877,	 958139571,  1322822218,  1537002063,  1747873779,	
		1955562222,  2024104815, -2067236844, -1933114872,  -1866530822, -1538233109, -1090935817,  -965641998 ]

	ascii += '' + String.fromCharCode(0).repeat(55 - (ascii.length % 64))

	for (i = 0; i < ascii.length; i++)
		words[i>>2] |= ascii.charCodeAt(i) << 24-i%4*8;

	words[words.length] = 0
	words[words.length] = asciiBitLength
/*
	for(i=16; i<64; i++){
		words[i] = words[i-16] + (rightRotate(words[i-15], 7) | rightRotate(words[i-15], 18) | words[i-15] >> 3)
		words[i] += words[i-7] + (rightRotate(words[i-2], 17) | rightRotate(words[i-2], 19) | words[i-2] >> 10)
	}

	console.log(words)
	*/
	for (j = 0; j < words.length;) {
		var w = words.slice(j, j += 16);
		var [a, b, c, d, e, f, g, h] = hash;
		
		for (i = 0; i < 64; i++) {
			//var a = abcdefgh[0], e = abcdefgh[4];
			var temp1 = h
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&f)^((~e)&g)) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w[i - 15], 7) ^ rightRotate(w[i - 15], 18) ^ (w[i - 15]>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w[i - 2], 17) ^ rightRotate(w[i - 2], 19) ^ (w[i - 2]>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&b)^(a&c)^(b&c)); // maj
			
				[a,b,c,d,e,f,g,h] = [(temp1 + temp2)|0].concat([a,b,c,d,e,f,g,h]); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
				e = (e + temp1)|0;
		}
		
		var abcdefgh = [a,b,c,d,e,f,g,h]
		for (i = 0; i < 8; i++)
		  abcdefgh[i] = (abcdefgh[i] + hash[i])|0;
		   
	}
	
	for(i=0; i<8; i++)
	  result += (abcdefgh[i] >>> 0).toString(16)
	
}
	console.log(sha256('CB') == '' ? '\x1b[32mOK\x1b[0m' : '\x1b[31mFAILED\x1b[0m')