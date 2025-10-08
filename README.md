<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>

    <!-- Handlers -->
    <handlers>
      <!-- iisnode for Node.js -->
      <add name="iisnode" path="index.js" verb="*" modules="iisnode" />
      <!-- Serve static files (Vite dist) -->
      <add name="StaticFile" path="*" verb="GET,HEAD" modules="StaticFileModule" resourceType="File" />
    </handlers>

    <!-- URL Rewrite -->
    <rewrite>
      <rules>
        <!-- Route API calls to Node -->
        <rule name="Node API" stopProcessing="true">
          <match url=".*" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
          </conditions>
          <action type="Rewrite" url="index.js" />
        </rule>
      </rules>
    </rewrite>

    <!-- iisnode settings -->
    <iisnode
      node_env="production"
      loggingEnabled="true"
      devErrorsEnabled="true"
    />

    <!-- Serve static content correctly -->
    <staticContent>
      <mimeMap fileExtension=".js" mimeType="application/javascript" />
      <mimeMap fileExtension=".css" mimeType="text/css" />
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
      <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
    </staticContent>

    <!-- Allow large payloads if needed -->
    <security>
      <requestFiltering>
        <requestLimits maxAllowedContentLength="2147483648" />
      </requestFiltering>
    </security>

  </system.webServer>
</configuration>
