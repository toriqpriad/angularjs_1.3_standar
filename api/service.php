<?php

function connection()
{
    $host = "localhost";
    $user = "root" ;
    $pass = "";
    $db = "yoguku";
    $con = mysqli_connect($host, $user, $pass, $db) or die(mysqli_error($con));
    return $con;
}

$con = connection();

function generatetoken($length = 10)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function checkheader()
{
    $con = connection();
    $header = getallheaders();
    if (isset($header['app_token'])) {
        $token = $header['app_token'];
        if (isset($token)) {
            $sql = "SELECT * FROM `token` WHERE `token` = '{$token}'";
            $query = mysqli_query($con, $sql);
            $count = mysqli_num_rows($query);
            if ($count > 0) {
                $return = 'OK';
                return $return;
            } else {
                $return = 'FAILED';
                exit();
            }
        } else {
            $return = 'FAILED';
            exit();
        }
    } else {
        $return = 'FAILED';
        exit();
    }
}

if ($_GET['action'] == 'all_material') {
    checkheader();
    $sql = "SELECT * FROM `product`";
    $query = mysqli_query($con, $sql);
    while ($row = mysqli_fetch_assoc($query)) {
        $output[] = $row;
    }
    if ($output) {
        $status = "OK";
        $message = "Successfull";
        $data = array("status" => $status, "message" => $message, "data" => $output);
    } else {
        $status = "FAIL";
        $message = "Failed";
        $data = array("status" => $status, "message" => $message);
    }
    
    echo json_encode($data);
}

if ($_GET['action'] == 'add_material') {
    checkheader();
    $data = json_decode(file_get_contents('php://input'));
    $nama = $data->name;
    $total = $data->total;
    $sql = "INSERT INTO `product` VALUES('','{$nama}','{$total}')";
    $query = mysqli_query($con, $sql);
    if ($query == true) {
        $status = "OK";
        $message = "Successfull";
        $data = array("status" => $status, "message" => $message);
    } else {
        $status = "FAIL";
        $message = "Failed";
        $data = array("status" => $status, "message" => $message);
    }
    echo json_encode($data);
}

if ($_GET['action'] == 'detail_material') {
    checkheader();
    $id = $_GET['id'];
    $sql = "SELECT * FROM `product` WHERE id = '$id'";
    $query = mysqli_query($con, $sql);
    $row = mysqli_fetch_assoc($query);
    if ($query == true) {
        $status = "OK";
        $message = "Successfull";
        $data = array("status" => $status, "message" => $message, "data" => $row);
    } else {
        $status = "FAIL";
        $message = "Failed";
        $data = array("status" => $status, "message" => $message);
    }
    echo json_encode($data);
}
if ($_GET['action'] == 'delete_material') {
    checkheader();
    $id = $_GET['id'];
    $sql = "DELETE FROM `product` WHERE id = '$id'";
    $query = mysqli_query($con, $sql);
    if ($query == true) {
        $status = "OK";
        $message = "Successfull";
        $data = array("status" => $status, "message" => $message);
    } else {
        $status = "FAIL";
        $message = "Failed";
        $data = array("status" => $status, "message" => $message);
    }
    echo json_encode($data);
}
if ($_GET['action'] == 'update_material') {
    checkheader();
    $data = json_decode(file_get_contents('php://input'));
    $nama = $data->name;
    $kota = $data->total;
    $id = $data->id;

    $sql = "UPDATE `product` SET `name` = '{$nama}' , `total` = '{$kota}' WHERE `id` = '{$id}'";
    $query = mysqli_query($con, $sql);
    if ($query == true) {
        $status = "OK";
        $message = "Successfull";
        $data = array("status" => $status, "message" => $message);
    } else {
        $status = "FAIL";
        $message = "Failed";
        $data = array("status" => $status, "message" => $message);
    }
    echo json_encode($data);
}

if ($_GET['action'] == 'login') {
    $data = json_decode(file_get_contents('php://input'));
    $username = $data->username;
    $password = $data->password;
    $sql = "SELECT * FROM `user` WHERE `username` = '{$username}' AND `password` = '{$password}' ";
    $query = mysqli_query($con, $sql);
    $row = mysqli_fetch_assoc($query);
    $count = mysqli_num_rows($query);

    if ($count > 0) {
        if ($row != null) {
            $username = $row["username"];
            $token = generatetoken();
            $sqlinsert = "INSERT INTO `token` VALUES('','{$username}','{$token}',now(),now() + interval 1 day ) ";
            $inserttoken = mysqli_query($con, $sqlinsert);
            if ($inserttoken) {
                $status = "OK";
                $message = "Success Login";
                $data = array("status" => $status, "message" => $message, "token" => $token);
            } else {
                $status = "FAIL";
                $message = "Failed Create Token";
                $data = array("status" => $status, "message" => $message);
            }
            echo json_encode($data);
        } else {
            $status = "FAIL";
            $message = "Failed Login";
            $data = array("status" => $status, "message" => $message);
            echo json_encode($data);
        }
    } elseif ($count == 0) {
        $status = "FAIL";
        $message = "Failed Login";
        $data = array("status" => $status, "message" => $message);
        echo json_encode($data);
    }
}

if ($_GET['action'] == 'authtoken') {
    $token = json_decode(file_get_contents('php://input'));
    $sql = "SELECT * FROM `token` WHERE `token` = '{$token}'";
    $query = mysqli_query($con, $sql);
    $count = mysqli_num_rows($query);
    if ($count > 0) {
        echo 'OK';
    } else {
        echo 'FAILED';
    }
}

if ($_GET['action'] == 'deletetoken') {
    $data = json_decode(file_get_contents('php://input'));
    $token = $data->token;
    $username = $data->username;
    $sql = "DELETE FROM `token` WHERE `username` = '{$username}' AND `token` = '{$token}'";
    $query = mysqli_query($con, $sql);
    if ($query == true) {
        echo 'OK';
    } else {
        echo 'FAILED';
    }
}
