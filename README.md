<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've Moved!</title>
  <style>
    body {
      margin: 0;
      font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: linear-gradient(135deg, #e0f2ff, #cde1ff);
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container {
      background: white;
      padding: 3rem 2.5rem;
      border-radius: 20px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 400px;
      animation: fadeIn 1s ease-out forwards;
      opacity: 0;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    h1 {
      font-size: 2rem;
      color: #222;
      margin-bottom: 0.75rem;
    }

    p {
      color: #555;
      margin-bottom: 2rem;
      line-height: 1.5;
    }

    .button {
      display: inline-block;
      background-color: #1e90ff;
      color: white;
      text-decoration: none;
      font-size: 1rem;
      font-weight: 600;
      padding: 0.8rem 1.8rem;
      border-radius: 12px;
      transition: transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
    }

    .button:hover {
      background-color: #187bcd;
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(30, 144, 255, 0.3);
    }

    .note {
      color: #999;
      font-size: 0.85rem;
      margin-top: 1.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>We've Moved!</h1>
    <p>Our website has a new home. Please click below to visit our updated site.</p>
    <a href="https://NEW_DOMAIN_URL" class="button">Go to New Site →</a>
    <p class="note">You will be redirected automatically in a few seconds...</p>
  </div>

  <script>
    // Redirect automatically after 7 seconds
    setTimeout(() => {
      window.location.href = "https://NEW_DOMAIN_URL";
    }, 7000);
  </script>
</body>
</html>
