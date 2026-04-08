import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThreeDBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useEffect(() => {
    // Only run canvas logic heavily in dark mode
    if (isLight) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const particles = [];
    const numParticles = window.innerWidth > 768 ? 160 : 80;
    const fov = 280;
    
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let time = 0;
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width * 2 - canvas.width,
        y: Math.random() * canvas.height * 2 - canvas.height,
        z: Math.random() * fov * 3,
        radius: Math.random() * 2 + 1,
        speedZ: Math.random() * 2.5 + 0.5,
        offset: Math.random() * Math.PI * 2
      });
    }

    const render = () => {
      ctx.fillStyle = 'rgba(10, 10, 12, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.005;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const mouseRotX = (mouse.y - cy) * 0.0001;
      const mouseRotY = (mouse.x - cx) * 0.0001;
      
      const rotX = mouseRotX + Math.sin(time) * 0.2;
      const rotY = mouseRotY + Math.cos(time) * 0.2;

      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        let p1 = particles[i];

        p1.z -= p1.speedZ;
        if (p1.z <= 0) {
          p1.z = fov * 3;
          p1.x = Math.random() * canvas.width * 2 - canvas.width;
          p1.y = Math.random() * canvas.height * 2 - canvas.height;
        }

        const x1 = p1.x * Math.cos(rotY) - p1.z * Math.sin(rotY);
        const z1 = p1.z * Math.cos(rotY) + p1.x * Math.sin(rotY);
        const y2 = p1.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = z1 * Math.cos(rotX) + p1.y * Math.sin(rotX);

        const scale1 = fov / (fov + z2);
        const px1 = cx + x1 * scale1;
        const py1 = cy + y2 * scale1;

        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
          
          if (dist < 150) {
            const rx1 = p2.x * Math.cos(rotY) - p2.z * Math.sin(rotY);
            const rz1 = p2.z * Math.cos(rotY) + p2.x * Math.sin(rotY);
            const ry2 = p2.y * Math.cos(rotX) - rz1 * Math.sin(rotX);
            const rz2 = rz1 * Math.cos(rotX) + p2.y * Math.sin(rotX);
            
            const scale2 = fov / (fov + rz2);
            const px2 = cx + rx1 * scale2;
            const py2 = cy + ry2 * scale2;

            const alpha = (1 - dist / 150) * scale1 * 0.6; 
            if (alpha > 0) {
               ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
               ctx.lineWidth = 1;
               ctx.moveTo(px1, py1);
               ctx.lineTo(px2, py2);
            }
          }
        }

        ctx.fillStyle = `rgba(34, 211, 238, ${scale1})`;
        ctx.beginPath();
        ctx.arc(px1, py1, p1.radius * scale1, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLight]); 

  // CSS injection for Light Mode animations
  useEffect(() => {
    if (isLight) {
      if (!document.getElementById('light-bg-animations')) {
        const style = document.createElement('style');
        style.id = 'light-bg-animations';
        style.innerHTML = `
          @keyframes float1 {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes float2 {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(-30px, 50px) scale(1.2); }
            66% { transform: translate(20px, -20px) scale(0.8); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes float3 {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(50px, 50px) scale(0.9); }
            66% { transform: translate(-50px, -50px) scale(1.1); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, [isLight]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}>
      
      {isLight ? (
        // Exceptionally beautiful minimal glass gradient effect specifically for Light Theme
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#F8F9FA' }}>
          
          <div style={{
            position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(147, 197, 253, 0.1) 100%)',
            filter: 'blur(100px)', borderRadius: '50%',
            animation: 'float1 15s infinite ease-in-out'
          }} />

          <div style={{
            position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(139, 92, 246, 0.3) 100%)',
            filter: 'blur(120px)', borderRadius: '50%',
            animation: 'float2 20s infinite ease-in-out'
          }} />

          <div style={{
            position: 'absolute', top: '30%', left: '40%', width: '40vw', height: '40vw',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(244, 63, 94, 0.15) 100%)',
            filter: 'blur(90px)', borderRadius: '50%',
            animation: 'float3 18s infinite ease-in-out'
          }} />
          
          {/* Subtle noise/grid texture over light background */}
          <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              opacity: 0.8
          }} />

        </div>
      ) : (
        // The intensive 3D Canvas
        <>
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
          <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
              pointerEvents: 'none'
          }} />
        </>
      )}

    </div>
  );
};

export default ThreeDBackground;
