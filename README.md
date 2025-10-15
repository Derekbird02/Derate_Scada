<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>

    <!-- Allow Node to handle incoming requests -->
    <handlers>
      <add name="iisnode" path="index.js" verb="*" modules="iisnode" />
    </handlers>

    <rewrite>
      <rules>

        <!-- ✅ 1. Let static files (JS, CSS, images, etc.) be served directly -->
        <rule name="StaticFiles" stopProcessing="true">
          <match url="^aio/(.*\.(js|css|png|jpg|jpeg|gif|svg|ico|json|txt|woff2?|ttf))$" />
          <action type="None" />
        </rule>

        <!-- ✅ 2. Handle React client-side routing -->
        <rule name="ReactRoutes" stopProcessing="true">
          <match url="^aio/.*$" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="index.js" />
        </rule>

        <!-- ✅ 3. Default: all other requests go to Node -->
        <rule name="NodeJS" stopProcessing="true">
          <match url=".*" />
          <action type="Rewrite" url="index.js" />
        </rule>

      </rules>
    </rewrite>

  </system.webServer>
</configuration>
