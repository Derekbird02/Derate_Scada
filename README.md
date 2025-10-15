<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Graava Portal</title>
  <style>
    /* Base Styles */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #e9f0f6, #d2e0f2);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      animation: fadeIn 1.2s ease-in-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .container {
      text-align: center;
      background: #ffffff;
      padding: 40px 60px;
      border-radius: 16px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 90%;
      transition: transform 0.3s ease;
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

    footer {
      margin-top: 20px;
      font-size: 0.9rem;
      color: #556;
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
      <a href="/grafana" target="_blank">Go to Grafana</a>
      <a href="/aio">Go to AIO</a>
    </div>
    <footer>© 2025 Graava Systems</footer>
  </div>
</body>
</html>
