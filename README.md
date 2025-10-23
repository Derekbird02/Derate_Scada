<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've Moved!</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in {
      animation: fadeIn 1s ease-out forwards;
    }
  </style>
</head>
<body class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
  <div class="text-center bg-white shadow-2xl rounded-2xl p-10 max-w-md mx-4 fade-in">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">We've Moved!</h1>
    <p class="text-gray-600 mb-8">
      Our website has a new home. Please click below to visit our updated site.
    </p>
    <a href="https://NEW_DOMAIN_URL" 
       class="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold transition-transform duration-300 hover:scale-105 hover:bg-blue-700 shadow-md">
       Go to New Site →
    </a>
    <p class="text-gray-400 text-sm mt-6">You will be redirected shortly...</p>
  </div>

  <script>
    // Auto-redirect after 7 seconds
    setTimeout(() => {
      window.location.href = "https://NEW_DOMAIN_URL";
    }, 7000);
  </script>
</body>
</html>
