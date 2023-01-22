<?php 
    $url = $_REQUEST['url'];
    function get_proxy_site_page( $url )
    {
        $options = [
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => true,     // return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
        ];
 
        $ch = curl_init($url);
        curl_setopt_array($ch, $options);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          "Content Type: application/json",
          "Authentication: Basic ". base64_encode(getenv('METRON_USER' . ':' . getenv('METRON_PASS'))),
        ));
        $remoteSite = curl_exec($ch);
        $header = curl_getinfo($ch);
        curl_close($ch);
 
        $header['content'] = $remoteSite;
        return $header;
    }
?>