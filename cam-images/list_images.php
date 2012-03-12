<?php
header('Content-type: application/json');
echo json_encode( array_slice( glob("*.{jpg,gif,png}", GLOB_BRACE), -4, 3) );
?>