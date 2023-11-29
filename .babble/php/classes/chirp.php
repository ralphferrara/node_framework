<?php
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
// Chirp
// Version 6.0.01
// 2021-02-01
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
    // Controller
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

    class Chirp {

	var $wrap;

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // Construct
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        function __construct($type = null, $area = null, $data = null, $lang = null) {
	    $id 			= md5(microtime() . mt_rand());
	    $this->wrap['head'] 	= array('id' => $id, 'to' => null, 'from' => $_SERVER['SERVER_ADDR']);
	    $this->wrap['status']	= 100;
	    $this->wrap['auth']		= array();
	    $this->wrap['method']	= 'NA';
	    $this->wrap['type']		= $type;
	    $this->wrap['area']		= $area;
	    $this->wrap['site']		= $_SERVER['SERVER_NAME'];
	    $this->wrap['data']		= $data;
	    $this->wrap['internal']  	= array();
	    $this->wrap['response']  	= array();
	    $this->wrap['lang'] 	= $lang;
	    $this->wrap['time']		= array('requested' => time(), 'completed' => null, 'total' => null);
	    $this->wrap['ip'] 		= Internet::ip();
	    $this->wrap['raw'] 		= '';
	    $this->wrap['message'] = 'Pending';
	    return $this;
        }

        static function make($type, $area, $data) {
            $x = new Chirp($type, $area, $data);
            return $x;
	}

	function type($set = null) 	{ if ($set != null) $this->wrap['type'] = $set; else return $this->wrap['type']; }
	function area($set = null) 	{ if ($set != null) $this->wrap['area'] = $set; else return $this->wrap['area']; }
	function status($set = null) 	{ if ($set != null) $this->wrap['status'] = $set; else return $this->wrap['status']; }
	function message($set = null) 	{ if ($set != null) $this->wrap['message'] = $set; else return $this->wrap['message']; }
	function data($k = null, $v = null) 	{
		if ($k == null) return Str::ifset($this->wrap, 'data', null);
		if ($v == null) return Str::ifset($this->wrap['data'], $k, null);
		$this->wrap['data'][$k] = $v;
		return $v;
        }

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // Time Outs are in milliseconds
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        function whisper($to, $timeout = 60000, $redis = null) {
	    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
	    // Time and Handler
	    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
	    if ($redis === null) $handler = Core::cache(); else $handler = Core::cache($redis);
	    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
	    // Whisper
	    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
	    $this->wrap['head']["to"] 		= $to;
	    $this->wrap["auth"] 		= array("whisper" => Stash::env('config', 'SECURITY')['whisper'], 'status' => 110);
	    $this->method 			= 'WHISPER';
	    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
	    // Set Session and Publish
	    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
	    $handler->publish(json_encode($this->wrap, true));
	    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
	    // Set Session and Publish
	    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
	    return true;
        }


        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // Get
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        function get($url, $headers = array()) {
            return Internet::get($url, json_encode($this->wrap, true));
        }

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // Post
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        function post($url, $headers = array()) {
            return Internet::post($url, json_encode($this->wrap, true));
        }

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // TO JSON
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        function toJSON() {
            return json_encode($this->wrap, true);
        }

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // Read
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        static function read() {
	    $json = file_get_contents('php://input');
	    $data = json_decode($json, true);
	    $x = new Chirp();
	    $x->wrap['raw'] = $json;
	    if (!$data) 		{$x->wrap['status'] = 400; $x->wrap['message'] = 'Invalid JSON'; return $x;}
	    if (!isset($data['type']))	{$x->wrap['status'] = 402; $x->wrap['message'] = 'Missing Type'; return $x;}
	    if (!isset($data['area']))	{$x->wrap['status'] = 402; $x->wrap['message'] = 'Missing Area'; return $x;}
	    if (!isset($data['data']))	{$x->wrap['status'] = 402; $x->wrap['message'] = 'Missing Data'; return $x;}
	    $x->wrap['type']   = $data['type'];
	    $x->wrap['area']   = $data['area'];
	    $x->wrap['data']   = $data['data'];
	    $x->wrap['status'] = 110;
	    return $x;
	}


        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // Respond HTTP
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

        static function respond($code, $type, $area, $data, $message = 'No response', $more = array()) {
            switch($code) {
		case true :
		case 200  : http_response_code(200); break;
		default   : http_response_code($code); break;
	    }
	    $x = json_encode(array(
	    	'type' => $type,
	    	'area' => $area,
	    	'data' => $data,
	    	'message' => $message,
	    	'more'    => $more
	    ));
	    echo($x);
	    exit();
        }

        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||
        // End
        //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-||

    }


