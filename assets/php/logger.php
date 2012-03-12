<?php
  $app_key = $_SERVER['X-Pusher-Key'];
  $webhook_signature = $_SERVER['X-Pusher-Signature'];
  $body = http_get_request_body();

  $expected_signature = hash_hmac( 'sha256', $body, $app_secret, false );

  if($webhook_signature == $expected_signature) {
    $payload = json_decode($body);
    foreach($payload['events'] as &$event) {
      // do something with the event
    }

    header("Status: 200 OK");
  }
  else {
    header("Status: 401 Not authenticated");
  }
?>