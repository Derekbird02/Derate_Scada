<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Graava Portal</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;

      /* 🌄 Background image with soft overlay */
      background: 
        linear-gradient(rgba(20, 30, 48, 0.6), rgba(36, 59, 85, 0.6)),
        url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80');
      background-size: cover;
      background-position: center;
      background-attachment: fixed;

      animation: fadeIn 1.2s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .container {
      text-align: center;
      background: rgba(255, 255, 255, 0.9);
      padding: 40px 60px;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
      max-width: 400px;
      width: 90%;
      transition: transform 0.3s ease;
      backdrop-filter: blur(6px);
    }

    .container:hover {
      transform: translateY(-5px);
    }

    h1 {
      color: #1a2b44;
      font-size: 1.8rem;
      margin-bottom: 24px;
    }

    .links {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    a {
      text-decoration: none;
      background: #0078d7;
      color: white;
      padding: 14px 28px;
      border-radius: 10px;
      font-weight: 600;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 10px rgba(0, 120, 215, 0.3);
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }

    a::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, rgba(255,255,255,0.3), rgba(255,255,255,0));
      transition: all 0.5s ease;
    }

    a:hover::before {
      left: 100%;
    }

    a:hover {
      background: #005ea1;
      transform: scale(1.05);
      box-shadow: 0 6px 18px rgba(0, 94, 161, 0.4);
    }

    /* 🚫 Disabled button style */
    .disabled {
      background: #a0aec0 !important;
      color: #f4f4f4 !important;
      box-shadow: none !important;
      cursor: not-allowed;
      pointer-events: none;
      opacity: 0.6;
      position: relative;
    }

    .disabled::after {
      content: "Coming Soon";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.85rem;
      color: #444;
      opacity: 0.8;
      margin-top: 4px;
    }

    footer {
      margin-top: 20px;
      font-size: 0.9rem;
      color: #334;
    }

    @media (max-width: 500px) {
      .container {
        padding: 30px 20px;
      }
      h1 {
        font-size: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to the Graava Portal</h1>
    <div class="links">
      <!-- Disabled Grafana button -->
      <a href="#" class="disabled">Go to Grafana</a>
      <a href="/aio">Go to AIO</a>
    </div>
    <footer>© 2025 Graava Systems</footer>
  </div>
</body>
</html>
