import React, {useRef, useEffect } from "react";

function Canvas(props) {
     let canvasRef = useRef(null)

    var mouse = {
        x: undefined,
        y: undefined
    }

    var maxRadius = 40;
    var minRadius = 5;

    useEffect(() => {
        const canvas = canvasRef.current
        const c = canvas.getContext('2d')
        
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y
        })
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth; 
            canvas.height = window.innerHeight;
            circleGenerator();
        })
        
        function getRandColor() {
            let r = 255*Math.random()|0,
                g = 255*Math.random()|0,
                b = 255*Math.random()|0;
            return 'rgb(' + r + ',' + g + ',' + b + ',' + 0.7 + ')';
        }
        function circle(x, y, dx, dy, radius) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.minRadius = radius;
            this.color = getRandColor()

            this.draw = () => {
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
                c.fillStyle = this.color
                c.fill();
            }

            this.collision = () => {
                if( this.x + radius > canvas.width || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }else if ( this.y + radius > canvas.height || this.y - this.radius < 0) {
                    this.dy = -this.dy
                }
        
                this.x += this.dx;
                this.y += this.dy;
        
                if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
                    if( this.radius < maxRadius){
                        this.radius +=1;
                    }
                }else if (this.radius > this.minRadius){ 
                    this.radius -=1;
                }
                this.draw();
            }
        }

        var circleArray = []
        function circleGenerator() {
            for(var i = 0; i < 300; i++) {
                var radius = Math.random() * 15 + 1;
                var x = Math.random() * (canvas.width - radius * 2 ) + radius;
                var y = Math.random() * (canvas.height - radius * 2) + radius;
                var dx = (Math.random() - 0.5 * 5);
                var dy = (Math.random() - 0.5 * 5);
                circleArray.push(new circle(x, y, dx, dy, radius))
            }
        }

        circleGenerator();

        const animate =() => {
            requestAnimationFrame(animate);
            c.clearRect(0,0,canvas.width,canvas.height);
        
            for(var i = 0; i < circleArray.length; i++) {
                circleArray[i].collision()
            }
        }
        
        animate()
    }, [])



    return (
      <div className="canvas">
          <canvas ref={canvasRef}></canvas>
      </div>

    );
  }

  export default Canvas;