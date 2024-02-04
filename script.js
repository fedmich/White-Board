document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('whiteboard');
    const context = canvas.getContext('2d');
    let drawing = false;
    let currentColor = 'black';
  
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
  
    function startDrawing(e) {
      drawing = true;
      setPosition(e);
      draw(e);
    }
  
    function stopDrawing() {
      drawing = false;
      context.beginPath();
    }
  
    function draw(e) {
        if (!drawing) return;
      
        const { offsetX, offsetY } = getPosition(e);
      
        context.strokeStyle = currentColor;
        context.fillStyle = currentColor;
        // context.lineWidth = 3;
        // context.lineWidth = 5;
        context.lineWidth = 3;
        context.lineCap = 'round';
      
        context.lineTo(offsetX, offsetY);
        context.stroke();
        context.beginPath();
        context.arc(offsetX, offsetY, 1.5, 0, Math.PI * 2);
        context.fill();
        context.beginPath();
        context.moveTo(offsetX, offsetY);
      }

      

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
      
        const offsetX = (e.clientX - rect.left) * scaleX;
        const offsetY = (e.clientY - rect.top) * scaleY;
      
        return { offsetX, offsetY };
      }
          
  
    function setPosition(e) {
      const { offsetX, offsetY } = getPosition(e);
      context.moveTo(offsetX, offsetY);
    }
  
    // Toolbar functionality
    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach(button => {
      button.addEventListener('click', function () {
        currentColor = button.style.backgroundColor;
      });
    });
  
    // Save button functionality
    const saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', function () {
      saveCanvas();
    });
  
    // Print button functionality
    const printButton = document.getElementById('printButton');
    printButton.addEventListener('click', function () {
      printCanvas();
    });
  
    // Clear button functionality
    const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', function () {
      confirmClear();
    });
  
    function confirmClear() {
      const isDrawing = context.getImageData(0, 0, canvas.width, canvas.height).data.some(channel => channel !== 0);
  
      if (isDrawing && confirm('Are you sure you want to clear the canvas?')) {
        clearCanvas();
      }
    }
  
    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    function saveCanvas() {
      const timestamp = new Date();
      const filename = `Drawing-${timestamp.getHours()}-${timestamp.getMinutes()}.png`;
  
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = filename;
      link.click();
    }
  
    function printCanvas() {
      const printWindow = window.open('', '_blank');
      const printCanvas = document.createElement('canvas');
      const printContext = printCanvas.getContext('2d');
  
      printCanvas.width = canvas.width;
      printCanvas.height = canvas.height;
  
      printContext.drawImage(canvas, 0, 0);
  
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write('<img src="' + printCanvas.toDataURL() + '" onload="window.print();window.onafterprint=function(){window.close();};"/>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
    }
  });
  