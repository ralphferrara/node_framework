<?php
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
// Captcha
// Version 6.0.01
// 2021-03-01
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
    // Captcha
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

    class CAPTCHA {

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // Packet
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        static function packet($type, $area, $data, $width, $height) {
        	if (!isset(Stash::env('config')['SECURITY']) || !isset(Stash::env('config')['SECURITY']['captcha']) || Stash::env('config')['SECURITY']['captcha'] == '') die('CAPTCHA Security Key not specified');
        	$ip    = Internet::ip();
        	$code  = self::code();
        	$json  = self::serialize($data);
        	$salt  =  Stash::env('config')['SECURITY']['captcha'];
        	$list  = $salt . $type . $area . $json . $ip . $code;
        	$token = sha1($list);
        	$image = self::image($code, $width, $height, true);
        	return array('type' => $type, 'area' => $area, 'data' => $data, 'ip' => $ip, 'token' => $token, 'image' => $image['image'], 'bg' => $image['background']);
	}

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // Serialize
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        static function serialize($data) {
        	$keys = array();
        	$resp = array();
        	foreach($data  as $k => $v) $keys[] = $k;
    		sort($keys);
	    	foreach($keys  as $k) { $resp[$k] = $data[$k]; }
    		return json_encode($resp);
    	}

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // Code
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        static function code() {
        	$chars = str_split("abcdefghkmnpqrstuvwxyz245678", 1);
        	$l     = rand(4,8);
        	$r     = '';
        	for($i=0;$i<$l;$i++) $r .= $chars[rand(0, count($chars) - 1)];
		    return strtoupper($r);
	    }

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // Image
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        static function image($code, $width = 400, $height = 50, $base64 = false) {
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Generate the Background
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            $im			= imagecreatetruecolor($width, $height);
            $code 		= strtoupper($code);
            imageantialias($im, true);
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Generate the Colors/Fonts
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            $colors 	= [];
            $red 		= rand(100, 200);
            $green 		= rand(100, 200);
            $blue 		= rand(100, 200);
            $black 		= imagecolorallocate($im, 0, 0, 0);
            $white 		= imagecolorallocate($im, 255, 255, 255);
            $blackl 	= imagecolorallocate($im, 80, 80, 80);
            $whitel 	= imagecolorallocate($im, 200, 200, 200);
            $fonts 		= array();
            $fonts[] 	= ROOT . '.babble/assets/fonts/AlphabitSoup.ttf';
            $fonts[] 	= ROOT . '.babble/assets/fonts/BadComic-Regular.ttf';
            $fonts[] 	= ROOT . '.babble/assets/fonts/CactronBold.otf';
            //$fonts[] 	= ROOT . '.babble/assets/fonts/E1234.ttf';
            $fonts[] 	= ROOT . '.babble/assets/fonts/SunDried.ttf';
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Get the Max Text Color
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            $max = array('color' => 'red', 'max' => $red);
            if ($green > $max['max']) $max = array('color' => 'green', 'max' => $green);
            if ($blue  > $max['max']) $max = array('color' => 'blue',  'max' => $blue);
            switch($max['color']) {
                case 'red' :
                    $r = 255;
                    $g = floor(255 * ($green / $red));
                    $b = floor(255 * ($blue / $red));
                    break;
                case 'green' :
                    $r = floor(255 * ($red / $green));
                    $g = 255;
                    $b = floor(255 * ($blue / $green));
                    break;
                case 'blue' :
                    $r = floor(255 * ($red / $blue));
                    $g = floor(255 * ($green / $blue));
                    $b = 255;
                    break;
            }
            $text_color = imagecolorallocate($im, $r, $g, $b);
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Generate the Background
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            for($i = 0; $i < 5; $i++) {
                $colors[] = imagecolorallocate($im, $red - 20*$i, $green - 20*$i, $blue - 20*$i);
            }
            imagefill($im, 0, 0, $colors[0]);
            $r = rand(10,20);
            for($i = 0; $i < $r; $i++) {
                imagesetthickness($im, rand(2, 10));
                $rect_color = $colors[rand(1, 4)];
                imagerectangle($im, rand(-10, $width), rand(-10, $height), rand(40, $width), rand(40, $height), $rect_color);
            }
            for($i = 0; $i < 3; $i++) {
                imagesetthickness($im, rand(2, 10));
                $rect_color = $colors[rand(1, 4)];
                imagearc ($im, rand(-10, $width), rand(-10, $height), rand(40, $width), rand(40, $height),rand(-10, $width), rand(20, $width), $rect_color);
            }
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Generate the Background
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            $string_length = strlen($code);
            for($i = 0; $i < $string_length; $i++) {
                $initial = 15;
                $size = ($height / 3);
                if ($height < 100) $size = ($height / 3);
                $each = ($width / (strlen($code) + 1));
                $pad  = ($height / 4);
                imagettftext(
                    $im, //Image
                    $size, //Font Size
                    rand(-15, 15), //Angle
                    $initial + $i*$each, //X
                    rand($pad, $height - $pad) + 10, //Y
                    $text_color, // COLOR
                    $fonts[array_rand($fonts)], //FONT
                    $code[$i] //TEXT
                );
            }
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Base64
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            if ($base64) {
                $stream = fopen('php://memory','r+');
                imagepng($im, $stream);
                rewind($stream);
                $base64 = base64_encode(stream_get_contents($stream));
                $bg     = sprintf("#%02x%02x%02x", $red, $green, $blue);
                return array('background' => $bg, 'image' => 'data:image/png;base64,' . $base64);
            }
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Generate
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            header('Content-Type: image/png');
            imagepng($im);
            imagedestroy($im);
            exit();
        }

        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
        //|| Error
        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||

        static function error($message, $isImage = false, $width = 200,  $height = 50) {
            if (!$isImage) die($message);
        }


    };