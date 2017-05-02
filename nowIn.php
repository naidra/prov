<?php
   if(isset($_FILES['image'])){
      $link = mysqli_connect("sql210.ezyro.com", "ezyro_19769330", "robocop1", "ezyro_19769330_ardi");
       
      // Check connection
      if($link === false){
          die("ERROR: Could not connect. " . mysqli_connect_error());
      }

      $errors= array();
      $file_name = $_FILES['image']['name'];
      $file_size =$_FILES['image']['size'];
      $file_tmp =$_FILES['image']['tmp_name'];
      $file_type=$_FILES['image']['type'];
      $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));
      
      $expensions= array("jpeg","jpg","png");
      
      if(in_array($file_ext,$expensions)=== false){
         $errors[]="extension not allowed, please choose a JPEG or PNG file.";
      }
      
      if($file_size > 2097152){
         $errors[]='File size must be excately 2 MB';
      }
      
      if(empty($errors)==true){
         move_uploaded_file($file_tmp,"dope/".$file_name);

         $el = "dope/{$file_name}";
         date_default_timezone_set('Europe/Zagreb');
         $time = date('Y-m-d H:i:s');
         $sql = "INSERT INTO images VALUES (null, '$file_name', '$el', '$file_size', '$time')";

         if (!mysqli_query($link, $sql)) {
             echo "Error: " . $sql . "<br>" . mysqli_error($link);
         }
         
      }else{
         print_r($errors);
      }

      // close connection
      mysqli_close($link);
   }
?>