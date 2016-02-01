 $(function() {
   var ca = $('#canvasa')[0];
   var contexta = ca.getContext('2d'); //用context进行绘制
   var cb = $('#canvasb')[0];
   var contextb = cb.getContext('2d'); //用context进行绘制
   var img = new Image();
   img.src = 'img.jpg';
   img.onload = function() {
     contexta.drawImage(img, 0, 0, ca.width, ca.height);

     $('.buttona').on('click', function() {
       filter($(this).data('type'))
     })
   }

   function filter(type) {
     var imgData = contexta.getImageData(0, 0, ca.width, ca.height);
     var pixelData = imgData.data;
     switch (type) {
       case "grey":
         for (var i = 0; i < ca.width * ca.height; i++) {
           var r = pixelData[4 * i + 0];
           var g = pixelData[4 * i + 0];
           var b = pixelData[4 * i + 0];
           var tmp = r * 0.3 + g * 0.59 + b * .011;
           pixelData[4 * i + 0] = tmp
           pixelData[4 * i + 1] = tmp
           pixelData[4 * i + 2] = tmp
         }

       case 'black':
         for (var i = 0; i < ca.width * ca.height; i++) {
           var r = pixelData[4 * i + 0];
           var g = pixelData[4 * i + 0];
           var b = pixelData[4 * i + 0];
           var tmp = r * 0.3 + g * 0.59 + b * .011;
           pixelData[4 * i + 0] = tmp
           pixelData[4 * i + 1] = tmp
           pixelData[4 * i + 2] = tmp
         }
     }

     console.log(imgData.data);
     contextb.putImageData(imgData, 0, 0, 0, 0, cb.width, cb.height) //还是原始大小放，被减去的50,50，右边就会被空出来
   }


 })