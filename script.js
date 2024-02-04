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
        context.lineWidth = 1;
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
  });
  